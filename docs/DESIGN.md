# Design and interaction decisions

## References and adaptation

- https://raifkaya.nl/ — visual reference for a top navigation bar, two-column introduction, oval portrait, spacious About section and project grid. Its live page was visually inspected. The implementation adapts those relationships to a blue palette and Izzwan's content; it is not a pixel-identical reproduction.
- https://fdhlsfi.site/ — reference for an approachable portfolio, project context / contribution / outcome and the two-image portrait interaction requested by Izzwan. The supplied photos are used rather than the reference portrait.
- https://www.satvik.live/ — content reference for About, projects, skills, certificates, experience and contact. The portfolio uses only Izzwan's supported facts.

Reference source code and personal assets were not copied. The implementation uses custom templates, CSS and illustrative project diagrams. Those diagrams are decorative and are not represented as screenshots, detection results or operational dashboards.

## Palette and layout

Warm paper `#faf8f3`, off-white `#fffdf9`, blue `#245ba8`, slate text `#253143`, muted brown `#7d5e43` and light blue-grey borders. Blue is the primary identity accent, reflecting Izzwan's Blue Team direction; brown remains a secondary accent for some project categories. System fonts avoid external font requests. The spacious single-page flow follows introduction, About, projects, focus, skills, education / experience, certificates and contact.

The desktop layout uses two columns for the introduction and About, three for projects and focus areas, and four for skills. At narrower widths these become two or one column. Long project notes open in a dialog instead of expanding every card.

Dark mode uses navy `#151d2b`, cream text `#eee9dc`, sky blue `#8ab9f2` and warm brown `#d6b38d`. All section surfaces, decorative diagrams, card art, buttons, borders, navigation and dialogs use theme tokens. Original photographs and documents retain their supplied colours.

The header's sun/moon button is a labelled native toggle with an `aria-pressed` state and English / Malay tooltips. The site follows `prefers-color-scheme` until an explicit theme is chosen, then remembers `portfolio-theme` in local storage. System changes continue to update the theme before an explicit choice. Theme selection runs in the generated document head before CSS; translation rebuilds the control while preserving the current theme. Storage denial leaves switching available for the current visit. A CSS fallback follows the system theme without JavaScript, with the inactive toggle hidden.

## Motion

GSAP animates a brief heading reveal and section entrances. ScrollTrigger connects a gentle portrait shift and diagram-node movement to scroll position with scrub. Lenis smooths mouse-wheel scrolling. Touch scrolling stays native. These effects are restrained so content remains the focus.

The Pause motion control stops Lenis and removes GSAP effects. The operating system's `prefers-reduced-motion` setting also disables effects. Content is visible by default if JavaScript fails. No mandatory loading animation, autoplay audio or background video is included.

The portrait uses an opacity crossfade between the two supplied images. Hover and keyboard focus reveal the second photo. Click / tap toggles it. Reduced motion makes the state change immediate. CSS performs framing without modifying the original image bytes.

The introduction also includes a low-contrast dot grid, slow blue orbit outlines and four gently drifting points. They use transform-only CSS animation, sit behind the content, ignore pointer events and are hidden from assistive technology. Pause motion and reduced-motion preferences stop these animations too. No additional dependencies are needed.

## Accessibility and behaviour

Semantic navigation and sections, one H1, visible focus outlines, a skip link, labelled controls and `aria-pressed` language / filter / portrait states are included. Project notes use a native modal dialog, a Close button, Escape support and return focus to the launching project. Email-copy success and failure are announced through a live status region.

The language preference uses the standard `ms` locale and a visible BM button. Translation updates content, title, description and the document's language. Project filtering is retained when changing language. The CV and certificates remain in the language of their original documents.

The website makes no live GitHub requests. It links to public sources explicitly; repository visibility and project outcomes should be reviewed as work progresses. It includes no analytics, tracking scripts, embedded social feeds or backend contact form.
