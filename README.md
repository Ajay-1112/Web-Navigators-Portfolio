# Web Navigators Portfolio

Portfolio website for **Web Navigators** — built with Next.js, React, and TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and add your Web3Forms access key:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
WEB3FORMS_ACCESS_KEY=your_key_here
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — your Web3Forms key (required for contact form)
   - `WEB3FORMS_ACCESS_KEY` — same key (optional, for API route)
4. In Web3Forms, allow domain: `web-navigators-portfolio.vercel.app`
5. Deploy
