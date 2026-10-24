# NextKDE website

The organization website is a buildless HTML/CSS/JavaScript site in this folder. It is published from this repository to <https://nextkde.github.io/.github/> with GitHub Pages. `profile/README.md` remains the organization profile.

The website workflow runs browser checks on a GitHub-hosted runner before publishing. Local application launches, browser tests, and previews are intentionally not part of the maintainer workflow. Test screenshots are uploaded as workflow artifacts.

## Content

- `index.html`: Chinese-first content and structure.
- `styles.css`: responsive layouts and reduced-motion support.
- `site.js`: English content, accessible application tabs, and screenshot enlargement.
- `assets/`: actual project screenshots, logos, and application icons.

The application panel currently presents each application's official icon and description. It does not represent those icons as application screenshots. Replace or extend it with actual Calendar, Weather, Calculator, and Todo screenshots once captured in a VM.

## Asset provenance

- `desktop.png`, `logo.svg`, `logo-dark.svg`, and Calendar/Weather/Calculator/Todo icons: [NextKde/NextKde](https://github.com/NextKde/NextKde), `docs/images/` and `apps/*/data/`.
- `kmusic.png` and the KMusic icon: [NextKde/KMusic](https://github.com/NextKde/KMusic), `docs/images/kmusic-discover.png` and `data/kmusic.svg`.

These assets retain their upstream attribution and licensing. Website hosting does not change the licenses of the software, screenshots, or artwork shown.
