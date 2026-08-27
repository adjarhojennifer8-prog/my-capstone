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

## Project-specific rules

### Forms and validation

* Keep form validation logic separate from React UI components in `src/validation/` so validation functions can be tested independently.
* When adding or changing validation rules, add or update corresponding Vitest tests for required fields, invalid input, boundary values, and valid input.

### Accessibility

* Form fields must have associated labels and use `aria-invalid` and `aria-describedby` when validation errors are displayed.
* Form-level success or error messages must use an appropriate live-region pattern so status changes can be communicated to assistive technology.

### Verification

* After implementing a form or validation change, run the relevant Vitest tests and verify both successful and failure paths before considering the task complete.
* Test important boundaries explicitly, such as the exact maximum allowed value and the first invalid value beyond it.

