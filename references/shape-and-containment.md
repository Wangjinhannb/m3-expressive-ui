# Shape and Containment

## Shape is hierarchical

Do not use one radius everywhere. Assign shape roles based on component size, prominence, and relationship.

Recommended web approximation of the expanded M3 shape scale:

| Role | Radius | Typical use |
| --- | ---: | --- |
| `extraSmall` | 4 px | small menus, dense fields, compact utility |
| `small` | 8 px | chips, compact controls |
| `medium` | 12 px | cards, fields, small panels |
| `large` | 16 px | drawers, FAB-like controls, standard large surfaces |
| `largeIncreased` | 24 px | emphasized containers, search, grouped actions |
| `extraLarge` | 28 px | dialogs, large cards, sheets |
| `extraLargeIncreased` | 36 px | expressive hero containers, large toolbars |
| `extraExtraLarge` | 48 px | special expressive surfaces |
| `full` | 999 px | pills, icon buttons, segmented controls, circular actions |

Treat these as roles, not rigid pixel law. Scale them for viewport size and platform conventions.

## Shape contrast

Use differences in shape to communicate hierarchy:

- A large rounded container can hold smaller, tighter controls.
- A selected control may become more circular or more filled than its neighbors.
- Related button groups can share edges or coordinated radii.
- Hero moments may use asymmetric, organic, or variable shapes.

Do not introduce unusual shapes if they make labels, numbers, or controls harder to scan.

## Containment before borders

Group related items through:

1. Proximity.
2. Shared surface tone.
3. Shared shape.
4. Alignment.
5. Only then, outline/border if needed.

Avoid a page where every region is a white card with a gray stroke.

## Expressive grouping

Material 3 Expressive uses size and containment to guide attention. For grouped controls:

- Give the primary action more width or stronger container color.
- Let adjacent controls respond together when one changes state.
- Use asymmetry when it improves hierarchy, not merely for novelty.

## Layout rhythm

Use a 4 px base and 8 px composition rhythm.

Common values:

- 4 px: micro adjustment.
- 8 px: icon-label gap.
- 12 px: compact control padding.
- 16 px: routine padding.
- 20-24 px: card/panel padding.
- 32 px: strong section separation.
- 48-64 px: page-level rhythm.

Material 3 Expressive can be spacious, but dense products still need efficient rows and tables.

## Responsive composition

Recompose instead of merely shrinking.

- Mobile: bottom navigation, compact top bar, single-column content, sheets for secondary detail.
- Tablet: navigation rail, two-pane layouts, adaptive cards/groups.
- Desktop: side rail/drawer, split panes, persistent filters, full data density where useful.

A desktop productivity product can remain dense. Expressiveness should come from hierarchy and interaction, not wasted space.

## Depth

Prefer tonal elevation and containment over heavy drop shadows.

Use shadows mainly for:

- Menus and popovers.
- Floating toolbars.
- Dragged items.
- Dialogs/sheets.

Use blur only when it preserves useful context, such as a system shade or overlay. Do not make glassmorphism the default surface language.
