# Skills for Claude Cowork

A curated directory of enterprise AI skills — tested and reviewed.

## Architecture

```
Next.js (static site) → Vercel (hosting)
```

- **Skills data** lives in `lib/skills.js` — edit the file, push, site updates
- **No database, no auth, no server** — pure static site

## Setup (5 minutes)

### 1. Install and run

```bash
cd skills-marketplace
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000)

### 2. Deploy to Vercel (free)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Deploy — no environment variables needed

Your site is live. Custom domain can be added in Vercel settings.

## Day-to-day usage

### Edit a skill
Open `lib/skills.js` → find the skill → edit any field → push. Site rebuilds in ~30 seconds.

### Add a new skill
Add a new object to the `SKILLS` array in `lib/skills.js`:

```js
{
  id: 11,
  slug: "my-new-skill",
  name: "My New Skill",
  author: "AuthorName",
  description: "Short description for the directory card.",
  long_description: "Longer description for the detail page.",
  repo_url: "https://github.com/...",   // or null
  installs: 0,
  stars: 0,
  badge: null,                           // or "Editor's Pick", "Popular", "Trending", "New"
  industries: ["retail", "cpg"],
  functions: ["strategy", "marketing"],
  use_cases: [
    { ask: "Example question", returns: "What Claude returns" },
  ],
}
```

### Remove a skill
Delete the object from the array. Push. Gone.

## File structure

```
skills-marketplace/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   ├── page.js              # Directory listing
│   └── skill/
│       └── [slug]/
│           └── page.js      # Skill detail page
├── lib/
│   ├── constants.js         # Industry/function definitions
│   ├── data.js              # Data access helpers
│   └── skills.js            # ← All skill data lives here
├── next.config.js
├── package.json
└── README.md
```

## Cost

| Service | Free tier |
|---------|-----------|
| Vercel | 100GB bandwidth, custom domain |
| **Total** | **$0/month** |
