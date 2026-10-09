# Build for Bharat 2026

An event site built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide icons. Event copy and schedule data live in `data/event.ts`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Useful routes are `/`, `/tracks`, `/prizes`, `/schedule`, `/rules`, `/faq`, and `/contact`.

## Edit event content

Use `data/event.ts` as the source of truth for public event details:

- Update the event name, tagline, dates, venue, eligibility, team size, fee, prize pool, and registration deadline in the `event` object.
- Keep date/time values as ISO strings with an explicit `+05:30` offset so comparisons and displays remain in Indian Standard Time.
- Update `stages` and `daySchedule` together when event timing changes. The schedule page, announcement ticker, calendar download, and animated sky use these timestamps.
- Edit `tracks`, `innovationAreas`, `aiChallenge`, `techGuidance`, `judging`, `deliverables`, `finalRoundMustExplain`, and `designPrinciples` to update their corresponding pages.
- FAQ entries include a category and an `isPlaceholder` flag. The FAQ page and its FAQPage structured data are generated from this list.
- Replace entries marked as placeholders in `generalRules`, `teamSize.note`, `contacts`, and `organiserCards` before publishing confirmed information.
- `REGISTER_URL`, `REGISTRATION_OPEN`, `registrationDeadline`, and `registrationMode` in `data/event.ts` control registration. Manual mode follows the master switch; auto mode also closes at the configured deadline.

The hero poster is `public/images/poster.png`. Replace it with the approved event artwork at the same path to keep the existing Open Graph and page image references.

## Deploy to Vercel

1. Push the repository to a Git provider supported by Vercel.
2. Import the repository in Vercel and keep the detected Next.js build settings.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin, for example `https://events.example.org` after connecting the chosen domain. Vercel's deployment URL is used when this variable is unset.
4. Deploy, then verify the home, tracks, prizes, schedule, rules, FAQ, and contact routes. Check `/sitemap.xml`, `/robots.txt`, and the Open Graph preview image.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

In development only, `/schedule?simulate=2026-10-31T03:00` previews the live night schedule and corresponding sky phase. The simulation query is ignored in production.
