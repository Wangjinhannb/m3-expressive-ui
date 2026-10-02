# Motion

## Motion has a job

Every animation should explain continuity, causality, state, or hierarchy.

If the animation does none of these, remove it.

## Standard vs expressive motion

Material 3 provides a useful conceptual split:

- **Standard motion**: recurring, utilitarian interactions. Keep it quick and predictable.
- **Expressive motion**: prominent elements and hero interactions. Use springs, more spatial movement, and stronger shape/size changes.

Use standard motion for:

- Table row hover.
- Checkbox and switch state.
- Routine menu opening.
- Repeated list selection.

Use expressive motion for:

- Primary creation action.
- Onboarding.
- AI processing.
- Navigation between major surfaces.
- Hero media/state changes.
- Shape morphing button groups or system-style controls.

## Spatial continuity

Prefer transitions where the user can track an element from old state to new state.

Examples:

- A card expands into a detail surface.
- A compact search control grows into a search panel.
- A selected chip changes shape and width rather than disappearing and being replaced.
- A floating action becomes a toolbar or sheet action.

Avoid abrupt "cut" transitions when the same object conceptually continues.

## Springs

Use springs for spatial movement and prominent interactions when the stack supports them.

Target feel:

- Responsive.
- Slightly elastic.
- Controlled.
- No cartoonish repeated bounce.

## Shape morphing

Good uses:

- Active/inactive icon buttons.
- Loading indicators.
- Button groups.
- Expand/collapse states.
- AI listening/thinking states.

Keep text readable throughout the morph.

## Effects motion

Color, opacity, blur, and content fades should usually be calmer than spatial movement.

Use them to support, not replace, meaningful transition.

## Suggested web timing

When springs are not available:

- Micro feedback: 100-160 ms.
- Color/effect change: 120-200 ms.
- Menu/popover: 160-240 ms.
- Panel transition: 220-360 ms.
- Hero/expressive transition: 300-600 ms.

Use easing curves that feel decelerating on entry and accelerating on exit.

## Reduced motion

Respect `prefers-reduced-motion` and platform accessibility settings.

For reduced motion:

- Remove large translation and scale.
- Keep immediate or short opacity/state change.
- Preserve the information that the animation communicated.
