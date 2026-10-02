# Google Product Pattern Synthesis

Use this as a pattern library, not a screen-copying guide.

## Cross-product observations

Current Google design guidance and product updates point to a consistent system:

- Material 3 themes are built from color roles, typography, and shape.
- Material 3 Expressive adds stronger use of color, shape, size, motion, and containment to direct attention and create emotion.
- Expressiveness can be quiet or loud; choose intensity based on product need.
- Dynamic/responsive components and emphasized typography make important content more glanceable.
- Springy motion and shape changes are used to make interactions feel continuous and tactile.
- Accessibility remains foundational; expressive design should improve discoverability, not trade it away.

## Android and Pixel

Use as the clearest reference for Material 3 Expressive.

Observed direction:

- Dynamic color and deeper tonal palettes.
- Responsive component sizing and grouping.
- Larger, more visible key actions.
- Spring-based spatial motion.
- Shape morphing and varied container shapes.
- Selective blur/depth where it helps retain context.
- Emphasized typography.
- Glanceable surfaces that surface important information without opening a full app.

Implication: a screen should not feel like a collection of static rounded rectangles. State changes should affect shape, size, placement, and motion where useful.

## Gmail

Use as the reference for dense productivity interfaces.

Patterns:

- Dense lists remain dense; Material styling does not destroy information efficiency.
- Large rounded search and compose surfaces provide strong affordance.
- Selected navigation items use soft tonal containers rather than loud saturated fills.
- Icons stay simple and legible.
- Product structure remains familiar while controls and grouping become softer and more modern.

Implication: for productivity, admin, finance, and developer tools, use a **quiet expressive** mode. Keep the data dense; express the system through surfaces, selection, actions, typography, and motion.

## Google Calendar

Use as the reference for structured grids and responsive utility UI.

Official updates emphasize:

- Modern, accessible buttons, dialogs, and sidebars.
- Legible typography.
- Crisp iconography.
- Light, dark, and device-default appearance.
- Improved spacing and responsive behavior.

Implication: M3 does not require turning a grid application into card soup. Preserve the calendar/data grid and modernize the controls around it.

## Google Meet

Use as the reference for stateful controls.

Official Material 3 updates use refreshed colors and **dynamic shapes** to distinguish active, inactive, muted, or selected states.

Implication: shape can communicate state. For important toggles, do more than change fill color; adjust containment, icon treatment, or shape when appropriate.

## Gemini

Use as the reference for AI and expressive brand moments.

Official Google Design material describes:

- Gradients as directional energy and context, not random decoration.
- Circular and rounded foundations that connect to Google's broader visual heritage.
- Responsive containers.
- Soft, spatial, optimistic illustration.
- Motion with clear start/end states and directional flow.
- Internal motion/activity that communicates thinking or synthesis.

Implication: AI surfaces can use more expression than a settings page. Gradients should point attention, explain processing, or create continuity.

## Google Maps

Use as the reference for complex content with minimal chrome.

The design goal is to pair very complex information with a straightforward interface. The map/content canvas stays dominant; controls float above it with clear hierarchy.

Implication: in map, chart, media, or canvas-heavy products, keep chrome subordinate to the primary content surface.

## Family-level rule

A product family should be recognized through shared rules rather than identical screens. Preserve product-specific interaction models while reusing:

- Semantic color roles.
- Shape hierarchy.
- Search/navigation patterns.
- Icon language.
- Typography roles.
- Motion behavior.
- Surface/container logic.
