# Michel Ayikoe Atayi — Portfolio

An original editorial portfolio built with Next.js App Router, TypeScript, and Tailwind CSS v4. Features oversized typography, warm neutral colors, large project showcases with original CSS artwork, engineering experience, education, skills, activities, and contact links. The design follows the minimal/editorial direction requested with alikashif.co as inspiration; no source code, copy, or assets are taken from that site.

## Local development

Requires Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Content is in `lib/content.ts`; the layout is in `app/page.tsx` and styles are in `app/globals.css`. No credentials or environment variables are needed.

## Production and validation

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

For production browser checks:

```bash
npx playwright install chromium
npm run test:e2e
```

The GitHub Actions workflow installs dependencies, lints, checks TypeScript, builds the site, and runs Chromium tests at 375, 390, 768, 1280, and 1920 pixel widths. Tests check horizontal overflow, page errors, internal links, supplied external hrefs and tab attributes, metadata, and assets. Screenshots are uploaded in the browser-checks artifact. External destination uptime is not guaranteed by these tests.

## Vercel deployment

1. Import the existing `milllsdev/Portfolio-` repository at https://vercel.com/new.
2. Select the Next.js framework preset and the repository root.
3. Use `npm install` as the install command and `npm run build` as the build command; leave the output directory at the Next.js default.
4. Deploy. There are no environment variables to configure.

Open Graph image and favicon are generated locally by the app. Once a public domain is chosen, you can add a `metadataBase` URL to `app/layout.tsx` and a canonical URL. Do not set a fictitious domain.

## Personal portrait

The original portrait is **`public/IMG_2300.jpeg`**, rendered by `components/portrait.tsx` in the existing rectangular photo area. It is served directly without image optimization, filters, or file modifications. Existing responsive CSS uses `object-fit: cover` in a 4:5 frame. To replace the photo later, update that same original file and redeploy.

## Content accuracy and accessibility

Rendo and the Fintech Dashboard frontend have no live links. DreamTrip AI’s description and implementation details are verified against the source in `milllsdev/dreamtrip-ai`: its generation API, trip interface, and package manifest. No user counts or performance metrics are claimed. Project artwork is abstract, original CSS art, not screenshots of the applications. GitHub repositories may require permission, particularly the private Rendo repository.

Semantic headings and landmarks, a skip link, visible focus states, reduced-motion support, and readable layouts are included. Reveal effects progressively enhance server-rendered content; content remains visible without JavaScript.

## Execution environment

Implementation was written through the GitHub connector because the authoring session did not expose a terminal or browser. Production verification is performed by the repository's GitHub Actions workflow. The reference website and DreamTrip live site could not be directly browsed in that session.
