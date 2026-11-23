# Git feature branch and Pull Request

## 1. Set up the repository (once)

```bash
mkdir hospital-site && cd hospital-site
git init -b main
# copy before.html here and rename it to index.html for the baseline
cp ../before.html index.html
git add index.html
git commit -m "chore: add original non-semantic hospital page"
```

On GitHub, create an empty repository (for example `hospital-site`), then:

```bash
git remote add origin https://github.com/<your-username>/hospital-site.git
git push -u origin main
```

## 2. Create the feature branch

```bash
git checkout -b feature/semantic-accessible-html
```

## 3. Add the refactored files and commit in small steps

Copy the new `index.html`, `styles.css`, `form.js`, `AUDIT.md` into the folder (overwriting `index.html`), keep `before.html` as a reference copy, then:

```bash
git add index.html styles.css
git commit -m "refactor: use HTML5 semantic elements and heading hierarchy"

git add form.js
git commit -m "feat(form): add labels, input types, keyboard support and validation"

git add AUDIT.md before.html
git commit -m "docs: add before-and-after accessibility audit"
```

## 4. Push and open the Pull Request

```bash
git push -u origin feature/semantic-accessible-html
```

On GitHub click **Compare & pull request**, base `main`, compare `feature/semantic-accessible-html`.

Suggested PR title:

```
Refactor hospital site to semantic, accessible HTML
```

Suggested PR description:

```
## What changed
- Replaced div-based layout with header, nav, main, section, article, footer
- Added a proper heading hierarchy (one h1, h2 sections, h3 items)
- Rebuilt the appointment form with labels, fieldsets, correct input types,
  autocomplete, required fields, inline errors and an error summary
- Added skip link, visible focus styles and WCAG AA contrast

## Testing
- Lighthouse accessibility: before ___ -> after ___
- axe issues: before ___ -> after ___
- Keyboard-only walkthrough and NVDA screen-reader test (see AUDIT.md)

## Checklist
- [x] Semantic landmarks
- [x] Accessible form and validation
- [x] Before/after audit included
```

## 5. Submit on the LMS

Paste the **Pull Request URL** (and the repo URL) in the "Add submission" box, and upload the audit if the LMS asks for a file. Check the PR link opens when you are logged out.
