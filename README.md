# f1bingo.com

Single-page Vue 3 app for generating and sharing Formula 1 bingo cards.

## Commands

- `npm run dev` starts the Vite dev server.
- `npm run build` creates the production bundle in `dist/` and writes `dist/CNAME`.
- `npm run preview` serves the production build locally.

## Project Notes

- Game state is stored in Pinia and persisted locally.
- Social preview images and other externally linked static assets live in `public/`.
- The board content comes from [`src/assets/data/deck.json`](/media/rspectre/Storage/workspace/f1bingo.com/src/assets/data/deck.json).

## Development and verification

Use Node 24 (`nvm use`), then `npm ci`. Vite requires Node 20.19+ or
22.12+. Run `npx playwright install chromium` once, then `npm test` to build
and test the production app at desktop and mobile sizes. Run `npm run test:dev`
to run the same suite against the development server. The tests cover
saved games, selection, winning, reset, analytics configuration, PNG capture,
and clipboard success/error handling. Clipboard writes are mocked; PNG rendering
uses the real capture library. To use an existing Chrome installation, set
`PLAYWRIGHT_EXECUTABLE_PATH` to its executable path.

CI runs these tests before publishing the default branch to `gh-pages`, retaining
the custom domain and 404 fallback. Pull requests and other branches only test.

Tailwind 4 uses its Vite plugin and a plain CSS entry point; Vue component styles
still use Sass. Browser support is Safari 16.4+, Chrome 111+, and Firefox 128+.
`vue-toastification` stays on `2.0.0-rc.5`, its newest Vue 3 release (`next`);
the npm `latest` tag is the older Vue 2-only `1.7.14` release.

After upgrading dependencies, stop and restart any running Vite dev servers so
they reload the installed packages and CSS configuration. The dev command uses
`--strictPort` to report a busy port instead of silently opening another server.
