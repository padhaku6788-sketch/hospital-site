# Accessibility Audit: City Care Hospital Appointment Website

**Tools:** Lighthouse (Chrome DevTools), axe DevTools, WAVE, keyboard-only testing, NVDA screen reader (Windows, Chrome)
**Standard:** WCAG 2.2 Level AA

> Replace the "Score" placeholders below with the numbers from your own runs. The findings list is based on the code in `before.html` and `index.html`, so confirm each item in the tools and add screenshots to `/audit-screenshots`.

## 1. Scores

| Tool | Before (`before.html`) | After (`index.html`) |
|---|---|---|
| Lighthouse Accessibility | ___ / 100 | ___ / 100 |
| axe DevTools: total issues | ___ | ___ |
| WAVE: errors / contrast errors | ___ / ___ | ___ / ___ |

## 2. Findings and fixes

| # | Issue found in "before" | WCAG criterion | Fix in "after" |
|---|---|---|---|
| 1 | No `lang` attribute on `<html>` | 3.1.1 Language of Page | Added `lang="en"` |
| 2 | Generic `<title>Page</title>` | 2.4.2 Page Titled | Descriptive title |
| 3 | Everything is a `div`; no landmarks | 1.3.1 Info and Relationships, 2.4.1 Bypass Blocks | `header`, `nav`, `main`, `section`, `article`, `footer`, `address` |
| 4 | Headings are styled divs, no heading outline | 1.3.1, 2.4.6 | One `h1`, `h2` per section, `h3` per card |
| 5 | Menu items are `span` with `onclick` | 2.1.1 Keyboard, 4.1.2 Name, Role, Value | Real `<a href>` links inside `nav > ul` |
| 6 | No skip link | 2.4.1 Bypass Blocks | Skip link to `#main` |
| 7 | Header text `#9cc` on `#5aa` and footer `#777` on `#333` | 1.4.3 Contrast (Minimum) | Palette with 4.5:1 or better |
| 8 | Doctor images have no `alt` | 1.1.1 Non-text Content | Descriptive `alt`, `width`/`height` set |
| 9 | Form labels are plain `div` text, not tied to inputs | 1.3.1, 3.3.2 Labels or Instructions, 4.1.2 | `<label for>` on every control |
| 10 | Phone, email and date are all `type="text"` | 1.3.5 Identify Input Purpose | `tel`, `email`, `date`, plus `autocomplete` |
| 11 | No required indication | 3.3.2 | `required`, visible asterisk, explanatory note |
| 12 | `outline: none` removes focus ring | 2.4.7 Focus Visible | High-visibility `:focus-visible` style |
| 13 | Submit is a `div` with `onclick`, not focusable | 2.1.1, 4.1.2 | Real `<button type="submit">` |
| 14 | No validation or error messages; success uses `alert()` | 3.3.1 Error Identification, 3.3.3 Error Suggestion, 4.1.3 Status Messages | Inline errors with `aria-describedby`, `aria-invalid`, focused error summary, `role="status"` confirmation |
| 15 | Related fields not grouped | 1.3.1 | `<fieldset>` and `<legend>` |
| 16 | Fixed pixel sizes and floats; small click targets | 1.4.4 Resize Text, 1.4.10 Reflow, 2.5.8 Target Size | rem units, CSS grid, 44px button |
| 17 | No motion preference handling | 2.3.3 | `prefers-reduced-motion` respected |

## 3. Keyboard test

| Step | Before | After |
|---|---|---|
| Tab reaches nav links | Fails (spans not focusable) | Pass |
| Skip link appears on first Tab | No skip link | Pass |
| Focus indicator visible everywhere | Fails (outline removed) | Pass |
| Complete and submit form with keyboard only | Fails (submit div not focusable) | Pass |
| Errors announced and focus moved to summary | No errors shown | Pass |

## 4. Screen-reader test (NVDA + Chrome)

How to run it: start NVDA (Ctrl+Alt+N), open the page, then try these.

- Press **D** to jump between landmarks, **H** to jump between headings, **F** to jump between form fields, **K** for links.
- Press **NVDA+F7** to open the Elements List and check the headings and landmarks outline.
- Tab through the form and note what NVDA reads for each field.
- Submit the empty form and note what is announced.

| Check | Before: NVDA output | After: NVDA output |
|---|---|---|
| Landmarks list (D key) | None found | banner, navigation, main, contentinfo |
| Headings list (H key) | None | h1, h2 sections, h3 items |
| Focus on Name field | "edit" with no name | "Full name, required, edit" |
| Focus on Phone field | "edit" with no name | "Phone number, required, edit, 10 to 15 digits..." |
| Submit with errors | Nothing announced | Error summary read aloud, focus on first problem |
| Successful submit | Browser `alert` | "Thank you. Your appointment request has been received." |

Edit the "Before" column to match what you actually hear.

## 5. Remaining limitations

- Contrast and Lighthouse results do not replace manual testing.
- Client-side validation only; a real site also needs server-side validation.
- Placeholder images `doc1.jpg` to `doc3.jpg` must exist in the repo or the alt text will be shown instead.
