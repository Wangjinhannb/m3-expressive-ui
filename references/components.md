# Components

Use official/native Material 3 components when the platform provides them. On the web, reproduce the roles and behavior rather than mechanically copying Android dimensions.

## Buttons

Use emphasis hierarchy:

- Filled: highest routine emphasis.
- Filled tonal: medium emphasis and grouped actions.
- Outlined: secondary action when a boundary helps.
- Text: low emphasis.
- Icon button: compact action.
- FAB / extended FAB: singular high-value creation action.

Rules:

- One dominant action per local decision region.
- Large/high-expression buttons may use increased rounding and size.
- Do not make every button a full pill in dense utility UI.
- Pressed/selected state may change shape, not only color, when the action is important.

## Search

Search is a signature opportunity for soft Material containment.

- Use a prominent rounded search bar when search is central.
- Put secondary controls inside or adjacent only when they are frequently used.
- Expand into a search surface with continuity rather than replacing it abruptly.

## Navigation

Choose by screen size and task structure:

- Bottom navigation: compact mobile top-level destinations.
- Navigation rail: tablet/desktop compact persistent navigation.
- Drawer/sidebar: many destinations or dense productivity tools.

Selected states:

- Tonal container.
- Icon state change.
- Optional weight increase.
- Clear but not saturated.

## Cards and surfaces

Cards are for meaningful containment, not universal layout.

Choose:

- Filled/tonal cards for grouped information.
- Elevated cards when floating hierarchy is meaningful.
- Outlined cards only when the boundary itself is useful.

In dense list/table products, prefer rows on a shared surface instead of converting every item to a card.

## Chips and filters

Use chips for compact selection, filters, metadata, and short actions.

- Selected chip: tonal fill + icon/check when helpful.
- Avoid using four different brand colors for routine chip categories unless the categories are genuinely semantic.

## Segmented buttons and button groups

Use for mutually exclusive modes or tightly related actions.

Expressive variant:

- Allow selected segment to gain width, stronger shape, or emphasis.
- Preserve label readability and control predictability.

## Inputs

- Always provide visible labels or equivalent accessible naming.
- Use tonal/outlined fields appropriate to density.
- Focus state uses primary role.
- Error state uses semantic error role plus explanatory text.
- Keep form layout calmer than hero surfaces.

## Dialogs and sheets

- Use large rounded container roles.
- Keep actions strongly prioritized.
- Use bottom sheets on mobile for secondary tasks and filters.
- Do not stack multiple rounded panels inside a rounded dialog unless hierarchy requires it.

## Floating toolbar

Use for context actions that should stay available while content remains visible.

- Keep the toolbar compact and highly rounded.
- Use tonal/elevated surface separation.
- Only include frequent actions.

## Loading and progress

This is a strong expressive moment.

- Prefer shape-changing or smoothly morphing indicators when the context permits.
- AI/generative states can use directional gradient energy.
- Always pair long operations with status text when needed.

## Toasts and snackbars

- Compact, high-contrast, clear action.
- Avoid saturated four-color decoration.
- Place above navigation and persistent controls without blocking the main task.

## Data tables

Material 3 Expressive does not justify destroying dense data layouts.

For tables:

- Use calm surface roles.
- Reserve color for selection, semantic status, links, and priority.
- Use rounded filter/search/toolbars around the table.
- Use sticky headers and clear hover/selected states.
- Keep numeric columns aligned and use tabular numerals.

## Charts

- Use domain semantics first.
- Use Google anchor colors as a categorical set only when they do not conflict with meaning.
- Direct-label important series when possible.
- Do not rely on hue alone.
