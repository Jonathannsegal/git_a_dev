import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../pages/api/users.js';
const response = () => ({ headers: {}, code: 200, setHeader(k,v) { this.headers[k]=v; }, status(code) { this.code=code; return this; }, json(body) { this.body=body; return this; } });
test('GitHub credentials stay server-side and only public profile fields are returned', async () => {
  const originalFetch=globalThis.fetch, originalToken=process.env.GH_TOKEN;
  process.env.GH_TOKEN='security-test-canary';
  const calls=[];
  globalThis.fetch=async (url, options) => { calls.push({url,options}); return { ok: true, json: async () => url.includes('/search/') ? {items:[{login:'octocat'}]} : {name:'Octocat',private_token:'must-not-return'} }; };
  try {
    const res=response(); await handler({method:'GET',query:{location:'NY',language:'JS',experience:'1'}},res);
    assert.equal(res.code,200); assert.equal(calls[0].options.headers.Authorization,'Bearer security-test-canary');
    assert.equal(calls[1].url,'https://api.github.com/users/octocat');
    assert.equal(res.body[0].name,'Octocat'); assert.ok(!JSON.stringify(res.body).includes('must-not-return'));
    assert.ok(!JSON.stringify(res.body).includes('security-test-canary'));
  } finally { globalThis.fetch=originalFetch; if(originalToken===undefined)delete process.env.GH_TOKEN;else process.env.GH_TOKEN=originalToken; }
});
test('unsupported methods and malformed search inputs are rejected', async () => {
  const res=response(); await handler({method:'POST',query:{}},res);assert.equal(res.code,405);
  const invalid=response();await handler({method:'GET',query:{location:['a','b']}},invalid);assert.equal(invalid.code,400);
});
