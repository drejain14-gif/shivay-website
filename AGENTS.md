# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 14 (App Router) marketing site** for Shivaay Technocrat Service. It is a purely static/SSG frontend — there is no backend, database, or external service to run. Content lives in `src/content/*.ts`; motion (GSAP/ScrollTrigger + Lenis) is gated by `prefers-reduced-motion`.

Standard commands are in `package.json` scripts (`dev`, `build`, `start`, `lint`) and documented in `README.md`. Dependencies use **npm** (`package-lock.json`).

Non-obvious notes:
- The dev server runs on `http://localhost:3000`. Start it with `npm run dev` (keep it running in a long-lived/tmux session).
- The `README.md` mentions `export PATH="$HOME/.local/node/bin:$PATH"`, but on the cloud VM Node (v22) is already on `PATH`; that export is not needed here.
- `next lint` and `next build` both type-check; there are no separate unit tests in this repo.
