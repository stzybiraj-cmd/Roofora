import { useState, useEffect, useRef, useId } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, Check,
  Home, Wrench, Layers, ClipboardCheck, CloudLightning, Droplets,
  BadgeCheck, CalendarCheck, Users, Hammer, MessageSquare, Ruler,
} from "lucide-react";

/* ==========================================================================
   CONTENT & CONFIG
   Everything a contractor would customise lives in this section.
   ========================================================================== */

const BRAND = {
  name: "Roofora",
  tagline: "Protecting What Matters. One Roof at a Time.",
  // Demo contact details. 555-01xx numbers and .example domains are reserved for fiction.
  phone: "(555) 010-0199",
  phoneHref: "tel:+15550100199",
  email: "hello@roofora.example",
  address: "100 Sample Street, Anytown, USA",
  hours: "Mon to Fri, 8am to 5pm",
};

const SEO = {
  title: "Roofora | Roof Installation, Repair & Replacement",
  description:
    "Roof installation, repair, replacement, inspection, storm damage assessment and gutters from Roofora. Request a free quote. Demo website concept.",
};

/**
 * PHOTOGRAPHY
 * Paste real image URLs into `src` (hero: ~1800px wide, others: ~1100px, WebP or AVIF).
 * While `src` is empty, or if an image fails to load, a flat roof illustration is shown instead.
 */
const IMAGES = {
  hero: {
    src: "",
    alt: "Roofer installing shingles on a residential rooftop",
  },
  about: {
    src: "",
    alt: "Roofing professional inspecting a shingle roof at a family home",
  },
  projects: [
    { src: "", alt: "Newly installed architectural shingle roof with a brick chimney" },
    { src: "", alt: "Close-up of a repaired section of shingle roof" },
    { src: "", alt: "Standing seam metal roof on a modern home" },
    { src: "", alt: "New seamless gutter and downspout along a roof edge" },
    { src: "", alt: "Orange protective tarp covering storm damage on a roof" },
    { src: "", alt: "Old worn shingles beside a freshly installed roof" },
  ],
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Quality Workmanship",
    text: "Every layer, seam and detail is installed with care, so your roof performs the way it should.",
  },
  {
    icon: CalendarCheck,
    title: "Reliable Service",
    text: "We show up when we say we will, keep you updated and finish what we start.",
  },
  {
    icon: Users,
    title: "Customer-Focused Approach",
    text: "Your questions, budget and priorities shape every recommendation we make.",
  },
];

const SERVICES = [
  {
    icon: Home,
    title: "Roof Installation",
    text: "New roofs built correctly from the deck up, with materials matched to your home and climate.",
  },
  {
    icon: Wrench,
    title: "Roof Repair",
    text: "Leaks, lifted shingles and damaged flashing fixed promptly, before small problems become big ones.",
  },
  {
    icon: Layers,
    title: "Roof Replacement",
    text: "A full tear-off and fresh roof system when repairs no longer make sense, with a clear scope and timeline.",
  },
  {
    icon: ClipboardCheck,
    title: "Roof Inspection",
    text: "A careful look at your roof's condition, with a plain-language summary of what needs attention and what doesn't.",
  },
  {
    icon: CloudLightning,
    title: "Storm Damage Assessment",
    text: "Wind, hail and fallen-branch damage documented clearly, with options for temporary cover and lasting repair.",
  },
  {
    icon: Droplets,
    title: "Gutter Installation",
    text: "Gutters and downspouts sized and sloped to move water away from your roof, walls and foundation.",
  },
];

const WHY = [
  {
    icon: Hammer,
    title: "Professional workmanship",
    text: "Underlayment, flashing, vents and ridge are all installed to the same standard, because a roof is only as strong as its weakest detail.",
  },
  {
    icon: Layers,
    title: "Quality materials",
    text: "We recommend proven roofing products suited to your home, your climate and your budget, and explain why.",
  },
  {
    icon: MessageSquare,
    title: "Clear communication",
    text: "You get a written scope, straight answers and updates at every stage, without the jargon.",
  },
  {
    icon: Ruler,
    title: "Attention to detail",
    text: "Edges, penetrations and cleanup get as much focus as the shingles. Small details protect a big investment.",
  },
];

const PROJECTS = [
  { title: "Full roof replacement", kind: "Architectural shingles", variant: "g1" },
  { title: "Leak repair and flashing", kind: "Targeted repair", variant: "g2" },
  { title: "Standing seam metal roof", kind: "New installation", variant: "g3" },
  { title: "Gutter and downspout upgrade", kind: "Water management", variant: "g4" },
  { title: "Emergency tarp after a storm", kind: "Storm response", variant: "g5" },
  { title: "Tear-off and new roof", kind: "Old roof to new roof", variant: "g6" },
];

const REVIEWS = [
  {
    featured: true,
    quote:
      "The crew explained every step before they started and left the property cleaner than they found it. The new roof looks fantastic, and I never had to chase anyone for an answer.",
    name: "Sample customer",
    job: "Roof replacement",
  },
  {
    quote:
      "I called after a windy night and got a clear plan with no pressure. Just honest advice about what needed fixing.",
    name: "Sample customer",
    job: "Roof repair",
  },
  {
    quote:
      "The quote was detailed and easy to follow, so I knew exactly what I was paying for.",
    name: "Sample customer",
    job: "Roof installation",
  },
];

/* ==========================================================================
   STYLES
   One stylesheet, scoped under .rf. Brand colours are the CSS variables below.
   Orange is used for fills and graphics; text on orange is navy (contrast 6:1),
   and orange text on white uses the darker --orange-ink for AA contrast.
   ========================================================================== */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap");

html { scroll-behavior: smooth; }

.rf {
  --navy: #101C2C;
  --navy-2: #1B2D45;
  --navy-3: #2A3F5C;
  --orange: #F47B35;
  --orange-ink: #B8470F;
  --orange-soft: #FDEBDD;
  --mist: #F4F6F8;
  --line: #DDE3EA;
  --text: #17212B;
  --muted: #4A5866;
  --danger: #B42318;
  --nav-h: 76px;
  --pitch: clamp(32px, 6.5vw, 96px);
  --r-s: 6px;
  --r-m: 12px;

  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text);
  background: #fff;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
}
.rf *, .rf *::before, .rf *::after { box-sizing: border-box; }
.rf p, .rf h1, .rf h2, .rf h3, .rf ul, .rf figure, .rf blockquote { margin: 0; }
.rf ul { padding: 0; list-style: none; }
.rf a { color: inherit; }
.rf img, .rf svg { display: block; }

.rf h1, .rf h2, .rf h3, .rf .rf-display {
  font-family: "Manrope", "Montserrat", "Inter", system-ui, sans-serif;
  color: var(--navy);
  text-wrap: balance;
}
.rf h1 { font-size: clamp(2.75rem, 6.4vw, 5rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.02; }
.rf h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.028em; line-height: 1.08; }
.rf h3 { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.25; }
.rf .rf-lead { font-size: 1.1875rem; line-height: 1.6; color: var(--muted); max-width: 58ch; }

.rf :focus-visible { outline: 3px solid var(--orange-ink); outline-offset: 3px; border-radius: 4px; }
.rf .rf-dark :focus-visible, .rf .rf-dark:focus-visible { outline-color: #FFB27F; }

.rf-wrap { width: min(1200px, 100% - 48px); margin-inline: auto; }
.rf-section { padding: clamp(72px, 9vw, 128px) 0; scroll-margin-top: var(--nav-h); }
.rf-section--mist { background: var(--mist); }
.rf-head { max-width: 720px; margin-bottom: clamp(40px, 5vw, 64px); }
.rf-head h2 + p { margin-top: 20px; }

.rf-skip {
  position: absolute; left: 16px; top: -80px; z-index: 100;
  padding: 12px 18px; background: var(--navy); color: #fff; border-radius: var(--r-s); font-weight: 600;
}
.rf-skip:focus { top: 12px; }

/* Dark surfaces */
.rf .rf-dark { color: #fff; }
.rf .rf-dark h1, .rf .rf-dark h2, .rf .rf-dark h3 { color: #fff; }
.rf .rf-dark .rf-lead { color: #C9D3DE; }

/* Buttons */
.rf-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 54px; padding: 0 30px;
  font-family: "Manrope", "Montserrat", "Inter", sans-serif; font-weight: 700; font-size: 1rem; line-height: 1;
  border: 2px solid transparent; border-radius: var(--r-s);
  text-decoration: none; cursor: pointer;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease, transform .2s ease;
}
.rf-btn:active { transform: translateY(1px); }
.rf-btn--primary { background: var(--orange); color: var(--navy); }
.rf-btn--primary:hover { background: #FF8F4F; }
.rf-btn--navy { background: var(--navy); color: #fff; }
.rf-btn--navy:hover { background: var(--navy-3); }
.rf-btn--ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,.6); }
.rf-btn--ghost:hover { background: #fff; color: var(--navy); border-color: #fff; }
.rf-btn--sm { min-height: 46px; padding: 0 22px; font-size: .95rem; }
.rf-btn--block { width: 100%; }

.rf-link {
  display: inline-block; font-weight: 700; color: var(--orange-ink);
  text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 6px;
  transition: color .2s ease, text-underline-offset .2s ease;
}
.rf-link:hover { color: var(--navy); text-underline-offset: 9px; }

.rf-chip {
  display: inline-flex; align-items: center; padding: 5px 12px;
  border-radius: 999px; border: 1px solid #F4B48A; background: var(--orange-soft);
  color: var(--navy); font-size: .85rem; font-weight: 600; line-height: 1.4;
}

/* Logo */
.rf-logo { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: var(--navy); }
.rf-logo__word { font-family: "Manrope", "Montserrat", sans-serif; font-weight: 800; font-size: 1.5rem; letter-spacing: -0.03em; line-height: 1; }
.rf-logo--light { color: #fff; }

/* Media (photo or illustrated fallback) */
.rf-media { position: relative; overflow: hidden; background: var(--navy-2); }
.rf-media > img, .rf-media > svg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* Navigation */
.rf-nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,.97); backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.rf-nav.is-scrolled { border-color: var(--line); box-shadow: 0 8px 28px -18px rgba(16,28,44,.35); }
.rf-nav__inner { display: flex; align-items: center; justify-content: space-between; height: var(--nav-h); }
.rf-nav__links { display: flex; align-items: center; gap: 4px; }
.rf-nav__link {
  position: relative; display: inline-block; padding: 10px 14px;
  font-weight: 600; font-size: .97rem; color: var(--text); text-decoration: none;
}
.rf-nav__link::after {
  content: ""; position: absolute; left: 14px; right: 14px; bottom: 4px; height: 2px;
  background: var(--orange); transform: scaleX(0); transform-origin: left; transition: transform .25s ease;
}
.rf-nav__link:hover::after, .rf-nav__link[aria-current="location"]::after { transform: scaleX(1); }
.rf-nav__cta { margin-left: 16px; }
.rf-nav__toggle {
  display: none; align-items: center; justify-content: center;
  width: 48px; height: 48px; border: 1.5px solid var(--line); border-radius: var(--r-s);
  background: #fff; color: var(--navy); cursor: pointer;
}
.rf-nav__panel {
  position: absolute; top: 100%; left: 0; right: 0;
  background: #fff; border-bottom: 1px solid var(--line);
  box-shadow: 0 24px 40px -24px rgba(16,28,44,.4);
  padding: 8px 24px 28px; animation: rf-drop .22s ease-out;
}
.rf-nav__panel a.rf-panel__link {
  display: block; padding: 16px 4px; font-weight: 600; font-size: 1.125rem;
  text-decoration: none; border-bottom: 1px solid var(--line);
}
.rf-nav__panel a.rf-panel__link[aria-current="location"] { color: var(--orange-ink); }
.rf-nav__panel .rf-btn { margin-top: 24px; }
@keyframes rf-drop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }

/* Hero: the roofline cut at the bottom is the one signature shape on the page */
.rf-hero {
  position: relative; display: flex; align-items: center;
  min-height: min(880px, calc(100vh - var(--nav-h)));
  padding: 72px 0 calc(var(--pitch) + 56px);
  background: var(--navy);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% calc(100% - var(--pitch)), 0 100%);
}
.rf-hero__media { position: absolute; inset: 0; }
.rf-hero__overlay { position: absolute; inset: 0; background: rgba(16,28,44,.6); }
.rf-hero__content { position: relative; }
.rf-hero__title span { display: block; }
.rf-hero__lead { margin-top: 28px; max-width: 34em; font-size: clamp(1.125rem, 2vw, 1.375rem); line-height: 1.55; color: #E6ECF2; }
.rf-hero__actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 40px; }
.rf .rf-hero .rf-hero__title { color: #fff; max-width: 11em; }
.rf-reveal { animation: rf-rise .8s cubic-bezier(.2,.7,.2,1) both; animation-delay: calc(var(--i, 0) * 110ms + 100ms); }
@keyframes rf-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }

/* Trust */
.rf-trust { padding: clamp(40px, 5vw, 72px) 0 clamp(72px, 9vw, 120px); }
.rf-trust__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1px solid var(--line); border-radius: var(--r-m); background: #fff; }
.rf-trust__item { display: flex; flex-direction: column; gap: 14px; padding: 36px 32px; }
.rf-trust__item + .rf-trust__item { border-left: 1px solid var(--line); }
.rf-trust__item p { color: var(--muted); }
.rf-icon-tile { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 10px; background: var(--orange); color: var(--navy); flex: none; }

/* About */
.rf-about__grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(40px, 7vw, 104px); align-items: center; }
.rf-gable { --gable: polygon(50% 0, 100% 13%, 100% 100%, 0 100%, 0 13%); position: relative; width: min(100%, 520px); aspect-ratio: 4 / 5; margin: 0 16px 16px 0; }
.rf-gable::before { content: ""; position: absolute; inset: 0; transform: translate(16px, 16px); background: var(--orange); clip-path: var(--gable); }
.rf-gable__img { position: absolute; inset: 0; clip-path: var(--gable); }
.rf-about__copy h2 { margin-bottom: 28px; }
.rf-about__copy p + p { margin-top: 18px; }
.rf-about__copy p { color: var(--muted); max-width: 56ch; }
.rf-about__copy .rf-btn { margin-top: 36px; }

/* Services */
.rf-services__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.rf-card {
  display: flex; flex-direction: column; gap: 16px; padding: 32px;
  background: #fff; border: 1px solid var(--line); border-radius: var(--r-m);
  transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;
}
.rf-card:hover { border-color: var(--navy); transform: translateY(-3px); box-shadow: 0 22px 40px -28px rgba(16,28,44,.45); }
.rf-card p { color: var(--muted); }
.rf-card .rf-link { margin-top: auto; padding-top: 8px; align-self: flex-start; }

/* Why choose us */
.rf-why {
  background-color: var(--navy);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='32'%3E%3Cpath d='M0 16H56M0 32H56M0 0V16M28 16V32' stroke='%23ffffff' stroke-opacity='.045' stroke-width='2' fill='none'/%3E%3C/svg%3E");
}
.rf-why__grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(40px, 7vw, 104px); align-items: start; }
.rf-why__intro { position: sticky; top: calc(var(--nav-h) + 32px); }
.rf-why__intro p { margin-top: 20px; }
.rf-why__intro .rf-btn { margin-top: 36px; }
.rf-why__list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 44px 40px; }
.rf-why__item { display: flex; flex-direction: column; gap: 14px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,.2); }
.rf-why__item .rf-why__icon { color: var(--orange); }
.rf-why__item p { color: #C9D3DE; }

/* Gallery */
.rf-gallery { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); grid-auto-rows: clamp(240px, 27vw, 330px); gap: 20px; }
.rf-tile { position: relative; overflow: hidden; border-radius: var(--r-m); background: var(--navy-2); }
.rf-tile:nth-child(1) { grid-column: span 8; }
.rf-tile:nth-child(2) { grid-column: span 4; }
.rf-tile:nth-child(3) { grid-column: span 4; }
.rf-tile:nth-child(4) { grid-column: span 8; }
.rf-tile:nth-child(5), .rf-tile:nth-child(6) { grid-column: span 6; }
.rf-tile .rf-media { position: absolute; inset: 0; }
.rf-tile .rf-media > * { transition: transform .7s cubic-bezier(.2,.7,.2,1); }
.rf-tile:hover .rf-media > * { transform: scale(1.045); }
.rf-tile__shade { position: absolute; inset: 0; background: var(--navy); opacity: 0; transition: opacity .35s ease; pointer-events: none; }
.rf-tile:hover .rf-tile__shade { opacity: .16; }
.rf-tile__cap { position: absolute; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; padding: 14px 20px 16px; background: rgba(16,28,44,.92); color: #fff; }
.rf-tile__cap strong { font-family: "Manrope", sans-serif; font-weight: 700; font-size: 1.0625rem; line-height: 1.3; }
.rf-tile__cap span { font-size: .9rem; color: #C9D3DE; }
.rf-note { margin-top: 28px; font-size: .95rem; color: var(--muted); }

/* Reviews */
.rf-section.rf-reviews { padding-bottom: calc(clamp(72px, 9vw, 128px) + var(--pitch)); }
.rf-reviews__top { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: clamp(40px, 5vw, 64px); }
.rf-reviews__top .rf-head { margin-bottom: 0; }
.rf-reviews__grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 24px; }
.rf-reviews__side { display: grid; gap: 24px; }
.rf-quote { display: flex; flex-direction: column; gap: 22px; padding: 36px; border-radius: var(--r-m); background: #fff; border: 1px solid var(--line); }
.rf-quote .rf-chip { align-self: flex-start; }
.rf-quote blockquote p { font-size: 1.125rem; line-height: 1.6; }
.rf-quote figcaption { margin-top: auto; display: flex; flex-direction: column; font-size: .95rem; color: var(--muted); }
.rf-quote figcaption strong { color: var(--navy); font-weight: 700; }
.rf-quote--featured { grid-row: span 2; justify-content: space-between; background: var(--navy); border-color: var(--navy); color: #fff; padding: clamp(32px, 4vw, 52px); }
.rf-quote--featured blockquote p { font-family: "Manrope", sans-serif; font-weight: 600; font-size: clamp(1.375rem, 2.4vw, 1.875rem); line-height: 1.35; letter-spacing: -0.015em; }
.rf-quote--featured figcaption { color: #C9D3DE; }
.rf-quote--featured figcaption strong { color: #fff; }

/* Call to action: an orange roof peak, echoing the hero */
.rf-cta {
  position: relative; margin-top: calc(var(--pitch) * -1);
  padding: calc(var(--pitch) + clamp(48px, 6vw, 80px)) 0 clamp(56px, 7vw, 96px);
  background: var(--orange); color: var(--navy);
  clip-path: polygon(0 var(--pitch), 30% 0, 100% var(--pitch), 100% 100%, 0 100%);
}
.rf-cta__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 32px 48px; }
.rf .rf-cta h2 { color: var(--navy); max-width: 14em; }
.rf-cta p { margin-top: 14px; font-size: 1.1875rem; font-weight: 500; max-width: 36em; }

/* Contact */
.rf-contact__grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(40px, 6vw, 88px); align-item
