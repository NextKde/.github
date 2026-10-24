# NextKDE website

The organization website is a buildless HTML/CSS/JavaScript site in this folder. It is published from this repository to <https://nextkde.github.io/.github/> with GitHub Pages. `profile/README.md` remains the organization profile.

The page follows the structure of an OS release page: a global bar, a sticky capsule sub-nav, a hero with a real desktop capture, a statement section, a tabbed highlight carousel, a design section with a live material lab, full-bleed galleries, an icon grid, a compatibility card, the install command, developers, and a directory footer.

Every claim is grounded in the product source (`NextKde/NextKde`): version 0.1.1, three shell styles, three glass presets, KWin 6.6+ / Quickshell 0.3.x / Qt 6.6+, the five supported distributions with their real status, and GPLv3. Opt-in or limited features are labelled as such rather than marketed flatly.

The website workflow runs browser checks on a GitHub-hosted runner before publishing. Local application launches, browser tests, and previews are intentionally not part of the maintainer workflow. Test screenshots are uploaded as workflow artifacts.

## What is measured, not guessed

The layout tracks <https://www.apple.com/os/macos/?version=no-hero> at 1440 px. Values below were read from that page's computed styles, not estimated:

- **Type.** Section headline 48 px / 600 / `-0.003em` / line-height 1.083. Eyebrow 21 px / 600 / `+0.011em`, in the surrounding band's full-contrast ink. Body and leads 17 px / 25 px / `-0.022em`. The grid item text is 17 px / 600 with the lead-in phrase in full ink and the rest in `#6e6e73`.
- **Bands.** One dark region, then a continuous light body: `#000` hero → `#1d1d1f` highlights and design → `#000` desktop → `#f5f5f7` from the apps section through the footer. An earlier build alternated dark and light every section, which reads as a template.
- **Nav.** The global bar scrolls away; only the capsule bar sticks, at 60 px, `rgba(0,0,0,.6)` with `blur(20px)`. Over a light band it becomes `rgba(255,255,255,.8)` with `rgba(232,232,237,.5)` capsules, `rgb(210,210,215)` borders and `rgba(0,0,0,.8)` labels. Capsules are 36 px tall, 18 px radius, `8px 15px` padding.
- **Compatibility.** A single card holding the centred headline, one action, the runtime strip and a three-column environment list — the shape Apple uses, rather than a section title above a list.
- **Imagery.** Only real captures. The hero is a running session; the design section uses the KWin glass-effect reference photograph; the music block uses KMusic's own discover page. Nothing draws a fake window, dock or control centre.

## Design system

Everything composes from tokens declared at the top of `styles.css`:

- **Typeface** — self-hosted Inter (`fonts/`, SIL OFL, license included). The previous `-apple-system` stack resolved to nothing on Linux and silently fell back to a face whose metrics the negative tracking was not designed for. `Inter Display` is used at display sizes, `Inter Variable` for text, with Noto Sans CJK behind them for Chinese runs.
- **Glass** — `--glass-bg`, `--glass-border`, `--glass-specular`, `--glass-blur`, `--glass-sat`. `.pill`, `.stage-controls` and `.slide-plate` compose from that recipe.
- **Type** — a fluid scale (`--t-display` … `--t-micro`) plus per-role tracking (`--ls-display`, `--ls-eyebrow`, `--ls-text`). CJK drops the negative tracking, loosens leading, and keeps tabular figures so `0.1.1` does not collapse to `0.11`.
- **Rhythm** — `--gutter`, `--measure` (1024), `--wide` (1280) and `--section-y`, all `clamp()`-ed so spacing scales continuously rather than in breakpoint jumps.
- **Motion** — two curves only: `--ease-out` for feedback, `--ease-apple` for surfaces that travel.

A fixed film-grain layer (`.grain`) keeps the large dark gradients from banding.

## Content

- `index.html`: Chinese source markup; the visible language is resolved before first paint.
- `styles.css`: tokens, glass recipe, band system, layouts, and reduced-motion / reduced-transparency / increased-contrast variants.
- `site.js`: the English dictionary, the six-slide carousel, the material lab, install-command copy, band polarity, staggered reveal and sub-nav spy.
- `assets/`: captures, icons and logos.
- `fonts/`: the self-hosted Inter files and their OFL license.

## Language

The page language follows the operating system, using the same policy as the desktop (`shared/qml/i18n/SystemLanguage.mjs`): only the primary UI language counts — `zh` / `zh-*` start in Chinese, everything else starts in English. An explicit switch is stored in `localStorage` and wins on later visits.

A small `<head>` script resolves the language before first paint. English starts with `data-lang-pending`, which hides the Chinese source text until `site.js` has swapped it in; `<noscript>` lifts that gate so the page is still readable without JavaScript.

## Real captures

There are no drawn mock-ups. Each filled slot is a real capture with its intrinsic size in the markup:

| Slot | File | Source |
| --- | --- | --- |
| Hero desktop | `assets/desktop.png` | `NextKde/NextKde` `docs/images/desktop.png` |
| Hero window card | `assets/window-glass.png` | `kwin/glass-effect/docs/dolphin.png` |
| Design refraction | `assets/glass-refraction.jpg` | `kwin/glass-effect/docs/latest.png` |
| KMusic | `assets/kmusic.png` | `NextKde/KMusic` discover page |

The remaining gallery figures (top bar, dock, control centre, widgets, the four apps) are **labelled placeholders** that keep their final ratio, tint, radius and shadow. To fill one in, replace the `.shot-label` span with an `<img>` and add `shot-real` to the figure — that class drops the placeholder background and border.

## Interaction notes

- The carousel moves one `transform` track on a single curve. It supports tabs, arrow/Home/End keys, dots, swipe (direction plus release velocity) and autoplay, which holds on hover and on focus and never starts under `prefers-reduced-motion`.
- The material lab offers the three real presets (liquid / soft / frosted) plus the two global strengths, blur and liquid. A preset writes both sliders; dragging a slider clears the preset so nothing claims to be selected. Values are mirrored into `<output>` and the track fill.
- The global nav grows a hairline only after the first 12 px of scroll, so the hero opens without a rule across it.
- The sticky sub-nav flips polarity over the light bands: background, capsule fill, border and label colour all take Apple's measured light-band values.

## Asset provenance

- `logo.svg`, `desktop.png`, `window-glass.png`, `glass-refraction.jpg` and the Calendar/Weather/Calculator/Todo icons: [NextKde/NextKde](https://github.com/NextKde/NextKde) `docs/images/`, `kwin/glass-effect/docs/` and `apps/*/data/`.
- `kmusic.png` and `icons/music.svg`: [NextKde/KMusic](https://github.com/NextKde/KMusic).
- `fonts/`: [Inter](https://github.com/rsms/inter), SIL Open Font License 1.1.

These assets retain their upstream attribution and licensing. Website hosting does not change the licenses of the software, screenshots, or artwork shown.
