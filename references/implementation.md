# Implementation Guidance

## Token-first requirement

Do not scatter raw hex values, radii, or shadow strings through page code.

Create semantic variables for:

- Color roles.
- Shape roles.
- Type roles.
- Spacing.
- Elevation.
- Motion.

Use `assets/m3-googleish-tokens.css` as a web fallback baseline when the project has no existing theme.

## Plain HTML/CSS/JS

- Use CSS custom properties.
- Use semantic component classes.
- Use `prefers-color-scheme` only when it matches product requirements; also support explicit theme switching when requested.
- Use `prefers-reduced-motion` for motion reduction.
- Use `color-mix()` only when target browser support is acceptable.

## React

- Build primitives: `Surface`, `Button`, `IconButton`, `Chip`, `TextField`, `Card`, `Dialog`, `Sheet`, `NavItem`, `SearchBar`.
- Keep variants semantic: `filled`, `tonal`, `outlined`, `text`, `danger`.
- Separate product data/state from styling.
- Keep focus/keyboard behavior native where possible.

## Tailwind

Map Material tokens into CSS variables or Tailwind theme values. Do not fill components with arbitrary values like `rounded-[27px]` and literal color classes unless the value is a one-off optical correction.

Prefer:

```css
background: var(--md-sys-color-surface-container);
color: var(--md-sys-color-on-surface);
border-radius: var(--md-sys-shape-large);
```

## Jetpack Compose

Prefer official Material 3 / Material 3 Expressive APIs when available.

- Theme with `MaterialTheme` or `MaterialExpressiveTheme` where appropriate.
- Use semantic `ColorScheme` roles.
- Use `Shapes` rather than hardcoded corner values per component.
- Use `MotionScheme.standard()` for utilitarian recurring interactions.
- Use `MotionScheme.expressive()` for prominent/hero interactions.
- Allow Android dynamic color when product identity permits.
- Use official components before custom recreations.

M3 Expressive APIs may vary by Compose Material 3 version; verify current stable/alpha status before relying on experimental components in production.

## Flutter

Enable Material 3 and map the same semantic roles into `ColorScheme`, `TextTheme`, and `ThemeData`.

If a specific M3 Expressive component is unavailable, emulate the hierarchy with theme tokens and animation rather than copying Android code literally.

## ArkUI / HarmonyOS / other frameworks

Keep the design system framework-independent:

- Map semantic color roles to theme resources.
- Create shared shape/type/motion tokens.
- Build local equivalents of Material component roles.
- Preserve native platform navigation and accessibility expectations.

## Existing codebase migration

1. Inventory colors, radii, type, shadows, and shared components.
2. Introduce semantic tokens without changing behavior.
3. Restyle shared navigation/search/actions.
4. Migrate surfaces and component variants.
5. Add expressive motion selectively.
6. Remove duplicate legacy styles only after visual QA.

Do not rewrite business logic solely for visual consistency.

## Code completeness

When the user asks for a website/app implementation:

- Produce runnable code when practical.
- Include responsive layout.
- Include hover/focus/pressed/disabled/loading/error states when relevant.
- Use realistic content density for the product category.
- Avoid placeholder-only mockups unless the user asked for a static concept.
