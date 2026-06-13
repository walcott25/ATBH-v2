# Contributing to Asuogyaman Tourism & Business Hub

We love contributions! Here's how to get started.

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Ensure TypeScript compiles: `npm run lint`
5. Build the project: `npm run build`
6. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` — new feature
   - `fix:` — bug fix
   - `refactor:` — code change that neither fixes nor adds
   - `perf:` — performance improvement
   - `style:` — formatting, missing semicolons, etc.
   - `docs:` — documentation only
   - `chore:` — build tooling, dependencies, etc.
7. Push and open a Pull Request

## Pull Request Guidelines

- Keep PRs focused on a single concern
- Include a clear description of what and why
- Reference any related issues
- Ensure CI passes (TypeScript check + build)
- Update documentation if needed

## Code Style

- TypeScript strict mode — avoid `any` when possible
- Functional components with hooks, no class components
- Tailwind CSS for styling — avoid inline styles when possible
- Framer Motion `motion` package for animations
- Prefer `lucide-react` icons over custom SVGs

## Adding a New Page

1. Create the page file in `src/pages/`
2. Add lazy import + route in `src/App.tsx`
3. Add nav item in `src/layouts/MainLayout.tsx`
4. If adding listing data, extend the relevant interface in `src/data.ts`

## Environment Variables

Never commit actual secrets. Use `.env.example` as a template and add any new variables there.

## Questions?

Open a [Discussion](https://github.com/walcott25/ATBH-v2/discussions) or reach out to the maintainers.
