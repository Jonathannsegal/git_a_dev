export const getUsers = async (location, language, experience) => {
  const query = new URLSearchParams({ location, language, experience: String(experience) });
  const response = await fetch(`/api/users?${query}`);
  if (!response.ok) throw new Error('Could not load GitHub users');
  return response.json();
};
