# AI Development Workflow Comparison



# Overview



This exercise compared two approaches to building the same settings form with validation. Round 1 used a single vague prompt and accepted the generated implementation. Round 2 used a detailed prompt with project context, constraints, examples, and a verification step. The two implementations were kept on separate Git branches and compared using Git diff.



# Correctness



Round 1 placed the validation logic directly inside `SettingsForm.jsx`, including `validateField` and `validateAll`. Round 2 separated validation into `settingsValidation.js` with focused functions for display name, email, username, bio, complete settings, and error detection. This made the validation logic easier to test independently. Round 2 also added tests covering required fields, invalid email addresses, invalid username characters, display-name length, and successful submission.



# Accessibility



Round 2 made accessibility more explicit. It introduced generated IDs with React's `useId()` and connected fields to their validation messages with `aria-describedby`. Invalid fields use `aria-invalid`, while the form status uses `aria-live`, `aria-atomic`, and an appropriate status role. Round 2 also added an automated accessibility test that verifies these attributes.



# Edge Cases



Round 2 covered more edge cases through automated tests. These included empty required fields, whitespace-only display names, invalid usernames, emails containing spaces, bios longer than 200 characters, and a bio of exactly 200 characters. The reset behavior was also tested to confirm that values, errors, and status messages return to their initial state.



# Review Effort



The testing phase took approximately 7 minutes in Round 1 and 6 minutes in Round 2. Although Round 2 introduced more structure and more tests, its verification phase was one minute shorter. The additional tests also provided clearer evidence of correctness than relying only on manual inspection.



# Verification Findings



Round 2 passed all 19 automated tests during verification, including validation, edge-case, reset, and accessibility checks. During manual comparison, I also observed that Round 2 retained the theme selector but did not include theme validation in validateSettings(), whereas Round 1 explicitly validated the theme value. The theme selector also did not visibly change the application's page theme in either round, so this was treated as an implementation limitation rather than a Round 2-specific defect.

No blocking AI-generated defect was caught and fixed during my review. The comparison showed that precise requirements and automated verification produced a more testable and accessible implementation, while human review was still necessary to identify differences and omissions. The main lesson is that directing AI with explicit constraints and verification steps makes its output easier to evaluate than accepting a vague first-pass result.




