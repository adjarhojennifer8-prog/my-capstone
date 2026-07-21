# Project context for AI-assisted development

## Stack

- **Node.js** — JavaScript runtime for server-side and tooling scripts.
- **JavaScript** — Primary language; use modern ES syntax supported by the project’s Node version.

## Coding conventions

### Commits

- Use **Conventional Commits** for all commit messages.
- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- Example: `feat: add user authentication endpoint`

### Functions and structure

- Keep functions **small and readable**; prefer one clear responsibility per function.
- Extract helpers when logic becomes hard to follow in a single block.
- Use descriptive names for variables, functions, and modules.

### Documentation and quality

- Write **clean, well-documented code**; add comments for non-obvious behavior, not for restating the code.
- Match existing patterns in the repository before introducing new styles or abstractions.
- Prefer minimal, focused changes that solve the task at hand.
