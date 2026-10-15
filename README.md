# 👨‍💻 Git a Dev 👩‍💻

> **Archived:** HackISU 2019 project preserved for reference; the GitHub API and dependencies may have changed since release.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) 
[![HitCount](http://hits.dwyl.com/jonathannsegal/git_a_dev.svg)](http://hits.dwyl.com/jonathannsegal/git_a_dev)

![Overview](https://drive.google.com/uc?id=1lKoJxleZYjg4IViQas4gta_CbaGyxoF0)

A developer recruitment tool where you can filter by language, location, and skill level.

## Overview 🗺️

- `pages/*` - Home, direct to other pages.
- `pages/insight` - Data based on your GitHub profile to optimize it for recruiters.
- `pages/search` - Search for developers with set parameters.

## Running Locally 💻

```bash
$ git clone https://github.com/Jonathannsegal/git_a_dev.git
$ cd git_a_dev
$ yarn
$ yarn dev
```

Create a `.env.local` file similar to `.env`.

```
GH_TOKEN=
```

This token is used to call the github API to get profile information.

## HackISU 🏆

Won best domain name at HACKISU

# [Devpost Page](https://devpost.com/software/hack-isu-2019-recruiter) 👨‍💻

<img height="200px" src="https://drive.google.com/uc?id=1hpT7o5Y-DrPEN8JZvt5AdZJ5hdFzEiiq"/>

*The Team*


## Security maintenance

Use Node.js 24 and `npm ci --legacy-peer-deps`, then `npm run dev`. The application now uses patched Next.js 15 and React 18 while preserving the existing pages and components. `npm test` verifies the server-side GitHub API boundary.

Set `GH_TOKEN` only on the server (for example in `.env.local` or your deployment's private environment). Browser searches use `/api/users`; build environment variables are no longer injected into client bundles.
