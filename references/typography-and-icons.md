# Typography and Icons

## Typography roles

Use role-based type rather than ad-hoc sizes. A practical web scale:

| Role | Typical size | Weight |
| --- | ---: | ---: |
| Display Large | 48-64 px | 500-650 |
| Display Medium | 40-48 px | 500-650 |
| Headline Large | 32-40 px | 550-700 |
| Headline Medium | 28-32 px | 550-700 |
| Title Large | 22-26 px | 550-650 |
| Title Medium | 16-20 px | 550-650 |
| Body Large | 16 px | 400-500 |
| Body Medium | 14 px | 400-500 |
| Label Large | 14 px | 550-650 |
| Label Medium | 12-13 px | 550-650 |

Tune for locale and density.

## Emphasized typography

Material 3 Expressive uses typography as an attention tool. Make important information easier to spot through:

- Larger size.
- Stronger weight.
- Tighter grouping with the related action.
- More surrounding whitespace.
- Numeral-specific emphasis for data products.

Do not solve every hierarchy problem with color.

## Variable type

When variable fonts are available, use weight/width changes as subtle state feedback or hero expression.

Good uses:

- A selected tab or filter gains weight.
- A number briefly emphasizes after updating.
- Hero titles use a controlled width/weight transition.

Avoid constant animated text or width changes that cause layout instability.

## Font choice

Do not bundle or redistribute proprietary Google Sans font files.

For an open, Google-adjacent feel:

- Prefer Roboto Flex when a variable font is useful.
- Use platform/system sans when performance and native consistency matter.
- Use Inter or another high-legibility sans if the product already uses it.

The family feeling should come from the whole system, not a font imitation.

## Numerals

For finance, analytics, health, or timers:

- Use tabular numerals where alignment matters.
- Use larger numeral roles for key metrics.
- Keep units and secondary values quieter.
- Avoid decorative gradients on critical numbers.

## Icons

Use simple, highly recognizable icons with consistent optical size and stroke/fill language.

Principles:

- Prefer simple silhouettes.
- Keep negative space clear.
- Use filled vs outlined state intentionally.
- Align icon rounding with component geometry.
- Do not copy Google product icons.
- Do not create icons so complex that they only work at large size.

Selected navigation can combine icon state, tonal container, and typography weight; do not rely on color alone.
