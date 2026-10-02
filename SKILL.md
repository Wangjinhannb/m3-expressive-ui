---
name: m3-expressive-ui
description: "Design, review, restyle, and implement product interfaces using Material Design 3 and Material 3 Expressive principles, with a Google-family visual grammar: tonal color roles, rounded and variable shape language, expressive but purposeful motion, emphasized typography, responsive containment, and disciplined use of Google blue/red/yellow/green brand anchors. Use for websites, mobile apps, dashboards, trading interfaces, AI products, productivity tools, component systems, screenshot critiques, design tokens, and frontend implementation when the user wants a current Google/Pixel/Material 3 look rather than generic rounded SaaS styling."
---

# M3 Expressive Product UI

Build interfaces that feel like members of the same modern Google-family design world without copying Google products screen-for-screen.

The target is **Material Design 3 + Material 3 Expressive**, not "Google colors on generic SaaS".

## Core model

Treat the design language as a system of six coordinated levers:

1. **Color** — semantic tonal roles first; Google four-color anchors second.
2. **Shape** — rounded, varied, hierarchical containers rather than one universal radius.
3. **Size** — use scale to make important actions and information immediately discoverable.
4. **Containment** — group related content with tonal surfaces, shape, and whitespace before adding borders.
5. **Typography** — clear role-based type with deliberate emphasis; use variable typography only when it adds meaning.
6. **Motion** — preserve continuity through spatial movement, springs, and shape morphing; avoid abrupt visual cuts.

## Workflow

1. Identify the product archetype, user goal, platform, screen size, information density, and implementation stack.
2. Read `references/video-principles.md` and `references/google-product-patterns.md` when the request explicitly asks for the Google-like visual language or references the source video.
3. Establish semantic tokens before styling pages. Read `references/color-and-theme.md` and `references/shape-and-containment.md`.
4. Choose an expression level:
   - **Quiet**: dense productivity, finance, admin, developer tools.
   - **Balanced**: consumer apps, dashboards, settings, commerce.
   - **Expressive**: AI, onboarding, media, hero moments, system surfaces.
5. Compose with Material components and hierarchy. Read `references/components.md`.
6. Add typography and motion only after hierarchy is clear. Read `references/typography-and-icons.md` and `references/motion.md`.
7. Adapt to the product instead of forcing every Google pattern into every screen. Read `references/product-archetypes.md`.
8. Implement with semantic tokens and reusable components. Read `references/implementation.md`.
9. Review the finished UI with `references/review-rubric.md`. If a web theme file is available, optionally run `scripts/theme_audit.py`.

## Non-negotiable rules

- Do **not** reduce Material 3 to large border radii.
- Do **not** produce a generic SaaS page and then scatter blue/red/yellow/green accents over it.
- Do **not** make all four Google brand colors equal-weight UI colors.
- Do **not** use a default dark crypto/gaming aesthetic merely because the product is finance, trading, or technical.
- Do **not** turn every section into a floating card. Use whitespace and surface hierarchy first.
- Do **not** make every control a pill. Full rounding is a role, not a default for all geometry.
- Do **not** replace dense, useful tables or lists with oversized cards when information density matters.
- Do **not** use gradients as decoration everywhere. Reserve them for expressive brand, AI, hero, or state-transition moments.
- Do **not** add glassmorphism, neon glow, heavy shadows, or black-and-cyan "tech" styling unless explicitly requested.
- Do **not** copy Google logos, product icons, proprietary Google Sans files, or exact Google product layouts.
- Do **not** imply that generated work is official Google design or affiliated with Google.

## Google-family visual grammar

Apply these principles across products:

- Make each product distinct, but keep the family recognizable through shared geometry, color logic, icon simplicity, typography roles, and motion behavior.
- Use the Google brand anchors exactly for brand moments when appropriate: blue `#4285F4`, red `#EA4335`, yellow `#FBBC05`, green `#34A853`.
- Convert brand anchors into semantic tonal roles for actual UI. Prefer `primary`, `primaryContainer`, `surfaceContainer`, `onSurface`, `outline`, and related Material roles over raw hex values.
- Use the circle and rounded geometry as recurring motifs, but allow asymmetry, variable size, and shape contrast to create hierarchy.
- Use surface containers and tonal contrast to group content. Prefer subtle tonal separation over box borders.
- Keep utility UI calm; spend stronger color, shape, and motion on the moments that matter most.
- Make motion feel causal: pressed controls compress or change state, groups respond together, shapes can morph, and transitions preserve spatial continuity.
- Make important information glanceable through size, placement, containment, and type emphasis before adding more decoration.

## Output behavior

For a **new UI**, normally:

1. State the product archetype and chosen expression level in one short note when useful.
2. Define or reuse tokens.
3. Produce the requested screen, component system, prototype, or runnable implementation.
4. Include responsive and interaction states that materially affect usability.
5. Keep explanations short unless the user asks for a design rationale.

For an **existing UI restyle**:

1. Preserve information architecture and business logic unless they are causing a usability problem.
2. Replace foundations first: color roles, surfaces, typography, shapes, navigation, shared components.
3. Then migrate page-specific styling.
4. Point out when a requested visual treatment conflicts with readability, density, or product semantics.

For a **UI review**:

- Identify exact elements, the failure, the Material/Google-family principle involved, and the concrete replacement.
- Prioritize hierarchy, density, semantics, and interaction over tiny pixel-level differences.

## Resource map

- `references/video-principles.md` — distilled principles from the user's reference video.
- `references/google-product-patterns.md` — patterns observed across current official Google products and design guidance.
- `references/color-and-theme.md` — Google brand anchors, M3 semantic color roles, tonal surfaces, light/dark fallback tokens.
- `references/shape-and-containment.md` — expressive shape hierarchy, spacing, surface grouping, responsive layout.
- `references/typography-and-icons.md` — type roles, emphasis, variable type, icon system.
- `references/motion.md` — standard vs expressive motion, spring behavior, morphing, reduced motion.
- `references/components.md` — component rules and expressive variants.
- `references/product-archetypes.md` — how to tune the system for different product categories.
- `references/implementation.md` — web, React/Tailwind, Compose, Flutter, and framework-agnostic implementation guidance.
- `references/review-rubric.md` — final QA and critique rubric.
- `references/research-sources.md` — official sources used to ground this skill.
- `assets/m3-googleish-tokens.css` — copyable web token baseline.
- `scripts/theme_audit.py` — optional CSS role/contrast audit.
