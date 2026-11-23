# personal_webpage

A webpage showing off my skills, my thought process and results.

Plain HTML, CSS and JavaScript — no build step, no third-party dependencies, strict Content Security Policy, no tracking.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html          # all content (English + Norwegian, toggled with the NO/EN button)
css/style.css       # styling
js/main.js          # language toggle, terminal animation, mobile menu, scroll reveal
assets/favicon.svg
```

Text is bilingual: every piece of content exists as a `lang="en"` and a `lang="no"` element, and CSS shows only the active language.

## Deploy with GitHub Pages

1. Push to `main`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site will be live at `https://haakon89.github.io/personal_webpage/`.

## Contact icons

The LinkedIn and GitHub buttons use the official logos, which are not included here. Download them from the official brand pages and save them as:

- `assets/icons/GitHub_Invertocat_White.png`: the white GitHub mark, from https://github.com/logos
- `assets/icons/InBug-White.png`: the LinkedIn "in" logo, from https://brand.linkedin.com

If a file is missing, the button just shows its text label.

## Adding a project

Copy one of the `<article class="project">` cards in the Projects section of `index.html`, and write both the `lang="en"` and `lang="no"` text.
