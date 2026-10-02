# M3 Expressive Product UI Skill

A reusable ChatGPT skill for designing and implementing interfaces with **Material Design 3 + Material 3 Expressive** principles and a disciplined Google-family visual grammar.

This project was created after analyzing a reference video about "Google style" and cross-checking the ideas against official Google Design, Android Material 3, Pixel/Android, Gmail, Calendar, Meet, Gemini, and related product design sources.

## What this skill is for

Use it when you want to:

- Design a new website or app in a current Material 3 / Pixel-like visual language.
- Restyle an existing product without destroying its information architecture.
- Build a consistent UI family across multiple products.
- Review screenshots or frontend code for Material 3 consistency.
- Generate design tokens, components, responsive layouts, and implementation code.
- Apply the style to dense products such as trading, finance, admin, or developer tools without turning them into oversized card dashboards.

## Key idea

The target is not "Google four colors + rounded corners."

The system is based on:

- Semantic tonal color roles.
- Shape hierarchy and containment.
- Scale and emphasized typography.
- Purposeful spring/morphing motion.
- Product-specific density.
- Shared family grammar with room for each product to remain distinct.

## Brand anchors

The skill keeps these four colors available for brand moments:

- Blue `#4285F4`
- Red `#EA4335`
- Yellow `#FBBC05`
- Green `#34A853`

Routine UI should use Material semantic roles derived from tonal palettes rather than scattering these four hex values everywhere.

## Structure

```text
m3-expressive-ui/
├── SKILL.md
├── README.md
├── agents/
│   └── openai.yaml
├── assets/
│   └── m3-googleish-tokens.css
├── scripts/
│   └── theme_audit.py
└── references/
    ├── color-and-theme.md
    ├── components.md
    ├── google-product-patterns.md
    ├── implementation.md
    ├── motion.md
    ├── product-archetypes.md
    ├── research-sources.md
    ├── review-rubric.md
    ├── shape-and-containment.md
    ├── typography-and-icons.md
    └── video-principles.md
```

## Example prompts

- "Design a crypto exchange homepage using this skill. Keep exchange-level data density, but make it feel like Material 3 Expressive rather than Gate/Bybit styling."
- "Restyle this React dashboard into a quiet Material 3 Expressive productivity UI."
- "Review this screenshot and tell me exactly what prevents it from feeling like a current Google product."
- "Build a Gemini-like AI workspace using original branding and Material 3 Expressive motion."
- "Create light and dark design tokens for this product and implement them in Tailwind."

## Independence and trademarks

Material Design is a Google design system. This repository is an independent skill and is not an official Google project. Do not redistribute proprietary Google font files, Google product icons, logos, or copied product layouts.
