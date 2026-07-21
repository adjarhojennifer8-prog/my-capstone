# Contributing

Thank you for your interest in this project. These guidelines help keep contributions consistent and easy to review.

## Getting started

1. Fork or clone the repository and create a branch from the default branch.
2. Use a short, descriptive branch name (for example, `feat/add-health-check` or `docs/update-readme`).
3. Install dependencies with `npm install` once a `package.json` is present (see [README.md](README.md)).

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- **Format:** `<type>: <short description>` (optional scope: `feat(api): ...`)
- **Common types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Example:** `docs: add contribution guidelines`

Write messages in the imperative mood (“add feature” not “added feature”). Keep the subject line concise; add a body only when extra context is needed.

## Code guidelines

- Target **Node.js 20 LTS** and **JavaScript** as described in the README.
- Follow the conventions in [CLAUDE.md](CLAUDE.md): small, readable functions, clear names, and comments only where behavior is not obvious.
- Match existing patterns in the codebase before introducing new abstractions.
- Prefer focused changes that address one concern per commit or pull request when possible.

## Pull requests

1. Update documentation if your change affects setup, usage, or behavior.
2. Ensure the project runs and any relevant scripts pass before requesting review (for example `npm test` when tests exist).
3. Describe **what** changed and **why** in the pull request description.
4. Link related issues if applicable.

Reviewers may ask for edits; keeping PRs small helps them merge faster.

## Reporting issues

When opening an issue, include:

- A clear title and description of the problem or suggestion
- Steps to reproduce (for bugs), if applicable
- Your environment (Node.js version, OS) when relevant

## License

By contributing, you agree that your contributions will be licensed under the same terms as the project (see [LICENSE](LICENSE)).
