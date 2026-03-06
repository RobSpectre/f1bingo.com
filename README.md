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
