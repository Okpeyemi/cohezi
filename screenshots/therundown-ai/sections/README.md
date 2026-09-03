# therundown.ai — découpe par section

Captures faites le 2026-09-03 depuis https://www.therundown.ai/ (page d'accueil).
Desktop : viewport 1440x900. Mobile : viewport 375x812. Coordonnées Y en pixels CSS depuis le haut de la page.

| # | Section | Desktop (fichier) | Desktop y / hauteur | Mobile (fichier) | Mobile y / hauteur |
|---|---|---|---|---|---|
| 00 | Header (nav sticky) | `desktop/00-header-1440.png` | 0–68 / 68 px | `mobile/00-header-375.png` | 0–69 / 69 px |
| 01 | Hero + header | `desktop/01-hero-1440.png` | 0–704 / 704 px | `mobile/01-hero-375.png` | 0–617 / 617 px |
| 02 | Latest Articles | `desktop/02-latest-articles-1440.png` | 704–1692 / 988 px | `mobile/02-latest-articles-375.png` | 617–2430 / 1813 px |
| 03 | Guides | `desktop/03-guides-1440.png` | 1691–2890 / 1199 px | `mobile/03-guides-375.png` | 2431–3655 / 1224 px |
| 04 | Trending Tools | `desktop/04-trending-tools-1440.png` | 2890–4332 / 1442 px | `mobile/04-trending-tools-375.png` | 3655–4848 / 1193 px |
| 05 | Rowan's Notes (podcast) | `desktop/05-rowans-notes-1440.png` | 4332–5222 / 890 px | `mobile/05-rowans-notes-375.png` | 4848–5790 / 942 px |
| 06 | AI training / Rundown University | `desktop/06-university-cta-1440.png` | 5223–6365 / 1142 px | `mobile/06-university-cta-375.png` | 5789–7713 / 1924 px |
| 07 | Footer | `desktop/07-footer-1440.png` | 6365–6830 / 465 px | `mobile/07-footer-375.png` | 7713–8630 / 917 px |

Structure DOM observée : `header.sticky` > `main > div.page-dark` > [ `section` hero, `div.px-2 > div.sheet` { Latest Articles, Guides, Trending Tools, `section` Rowan's Notes }, `section` University CTA ] > `footer`.
Les pleines pages d'origine sont dans le dossier parent (`02-fullpage-1440.png`, `05-mobile-375x812.png`).
