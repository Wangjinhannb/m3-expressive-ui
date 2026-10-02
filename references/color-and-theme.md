# Color and Theme

## Brand anchors

Use these exact colors as the recognizable four-color family anchors:

| Anchor | Hex | Primary use |
| --- | --- | --- |
| Google Blue | `#4285F4` | Brand anchor, illustration, multi-color moments |
| Google Red | `#EA4335` | Brand anchor, illustration; not routine destructive fill by default |
| Google Yellow | `#FBBC05` | Brand anchor, attention, illustration; pair with dark foreground |
| Google Green | `#34A853` | Brand anchor, illustration, positive accents |

Do not treat the four anchors as four equal UI primaries.

## Material 3 rule: roles before raw colors

Build real interface color from semantic roles:

- `primary`, `onPrimary`
- `primaryContainer`, `onPrimaryContainer`
- `secondary`, `onSecondary`
- `secondaryContainer`, `onSecondaryContainer`
- `tertiary`, `onTertiary`
- `tertiaryContainer`, `onTertiaryContainer`
- `error`, `onError`, `errorContainer`, `onErrorContainer`
- `surface`, `onSurface`
- `surfaceContainerLowest`
- `surfaceContainerLow`
- `surfaceContainer`
- `surfaceContainerHigh`
- `surfaceContainerHighest`
- `onSurfaceVariant`
- `outline`, `outlineVariant`
- `inverseSurface`, `inverseOnSurface`
- `scrim`

When official Material Theme Builder or Material Color Utilities are available, generate light/dark tonal palettes from brand seed colors instead of inventing arbitrary shades.

## Recommended source-color strategy

For a stable Google-family product theme:

- Primary seed: Google Blue `#4285F4`.
- Secondary: derive a quieter blue/neutral companion from the theme generator; do not automatically use saturated green as a routine secondary UI color.
- Tertiary: use green or yellow-derived tones only when they help create hierarchy or product-specific expression.
- Error: use an accessible error palette. Google Red can remain a brand anchor; semantic error may use a darker tone for contrast.

For Android with dynamic color, allow Material You to replace static app colors when the product benefits from personalization. Keep brand-critical moments recognizable even when the system palette changes.

## Static web fallback — light

Use these as a practical fallback when dynamic tonal generation is not available:

| Role | Value |
| --- | --- |
| `primary` | `#0B57D0` |
| `onPrimary` | `#FFFFFF` |
| `primaryContainer` | `#D3E3FD` |
| `onPrimaryContainer` | `#041E49` |
| `secondary` | `#146C2E` |
| `onSecondary` | `#FFFFFF` |
| `secondaryContainer` | `#E6F4EA` |
| `onSecondaryContainer` | `#0D652D` |
| `tertiary` | `#8A4D00` |
| `onTertiary` | `#FFFFFF` |
| `tertiaryContainer` | `#FFF1D6` |
| `onTertiaryContainer` | `#5F3B00` |
| `error` | `#B3261E` |
| `onError` | `#FFFFFF` |
| `errorContainer` | `#F9DEDC` |
| `onErrorContainer` | `#410E0B` |
| `surface` | `#F8FAFD` |
| `surfaceContainerLowest` | `#FFFFFF` |
| `surfaceContainerLow` | `#F5F7FA` |
| `surfaceContainer` | `#F0F4F9` |
| `surfaceContainerHigh` | `#E9EEF6` |
| `surfaceContainerHighest` | `#DDE3EA` |
| `onSurface` | `#1F1F1F` |
| `onSurfaceVariant` | `#444746` |
| `outline` | `#747775` |
| `outlineVariant` | `#C4C7C5` |

## Static web fallback — dark

| Role | Value |
| --- | --- |
| `primary` | `#A8C7FA` |
| `onPrimary` | `#062E6F` |
| `primaryContainer` | `#0842A0` |
| `onPrimaryContainer` | `#D3E3FD` |
| `secondary` | `#6DD58C` |
| `onSecondary` | `#0A3818` |
| `secondaryContainer` | `#0F5223` |
| `onSecondaryContainer` | `#C4EED0` |
| `tertiary` | `#FDD663` |
| `onTertiary` | `#3A2F00` |
| `tertiaryContainer` | `#5A4700` |
| `onTertiaryContainer` | `#FFF0C3` |
| `error` | `#F2B8B5` |
| `onError` | `#601410` |
| `errorContainer` | `#8C1D18` |
| `onErrorContainer` | `#F9DEDC` |
| `surface` | `#111318` |
| `surfaceContainerLowest` | `#0C0E12` |
| `surfaceContainerLow` | `#1E1F20` |
| `surfaceContainer` | `#252629` |
| `surfaceContainerHigh` | `#2D2E31` |
| `surfaceContainerHighest` | `#35363A` |
| `onSurface` | `#E3E3E3` |
| `onSurfaceVariant` | `#C4C7C5` |
| `outline` | `#8E918F` |
| `outlineVariant` | `#444746` |

These fallback pairs are chosen for readable contrast; still verify custom combinations.

## Surface strategy

Use surface roles for most of the page. Saturated brand colors should occupy a minority of pixels in utility interfaces.

Typical order:

1. `surface` for the page/canvas.
2. `surfaceContainerLow` for quiet grouped regions.
3. `surfaceContainer` for standard contained components.
4. `surfaceContainerHigh` for stronger grouping, sticky controls, or active context.
5. `primaryContainer` for selected or important regions.

Prefer tonal contrast over 1 px borders around every block.

## Multi-color and gradients

Use the four-color family in expressive moments. The video reference emphasizes smooth crossing and blending rather than four isolated blocks.

Good uses:

- Brand/hero art.
- AI processing or generation.
- Loading/progress.
- Celebration.
- Onboarding.
- Illustration.

Rules:

- Keep directionality clear.
- Let one color lead; diffuse or blend others behind it.
- Avoid narrow rainbow stripes.
- Avoid multi-color primary buttons in routine workflows.
- Avoid using red/green brand colors in ways that conflict with domain semantics.

## Domain semantics override brand semantics

In finance/trading:

- Market up/down colors must remain unambiguous.
- Do not use brand red decoratively next to a positive gain signal.
- Do not use brand green decoratively next to a loss signal.
- Use blue/neutral Material roles for primary interaction; reserve red/green for market semantics when necessary.
