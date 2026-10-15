const publicUser = user => Object.fromEntries(
  ['avatar_url', 'name', 'email', 'company', 'blog', 'location', 'hireable', 'bio']
    .map(key => [key, user[key] ?? null])
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { location = '', language = '', experience = '' } = req.query;
  if ([location, language, experience].some(value => typeof value !== 'string' || value.length > 100)) {
    return res.status(400).json({ error: 'Invalid search parameters' });
  }
  const range = { 1: 'repos:<5', 2: 'repos:5..10', 3: 'repos:>10' }[experience] ?? '';
  const query = `language:${language} location:${location} ${range}`.trim();
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
  const get = async url => {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('GitHub request failed');
    return response.json();
  };
  try {
    const search = await get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`);
    const logins = (search.items ?? []).slice(0, 10).map(user => user.login)
      .filter(login => typeof login === 'string' && /^[a-zA-Z0-9-]+$/.test(login));
    const users = await Promise.all(logins.map(login => get(`https://api.github.com/users/${login}`)));
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    return res.status(200).json(users.map(publicUser));
  } catch {
    return res.status(502).json({ error: 'Could not load GitHub users' });
  }
}
