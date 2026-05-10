# Rwoyal Edge — Travel & Recruitment Website

A premium, single-page website for **Rwoyal Edge**, a Ghana-based company offering global recruitment solutions and extraordinary travel experiences. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools required.

---

## Table of Contents

- [Overview](#overview)
- [Pages & Sections](#pages--sections)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Customisation Guide](#customisation-guide)

---

## Overview

| | |
|---|---|
| **Company** | Rwoyal Edge |
| **Services** | Global Recruitment & Travel |
| **Headquarters** | Accra, Ghana |
| **Reach** | 30+ countries |
| **Clients Served** | 500+ |
| **Satisfaction Rate** | 98% |

---

## Pages & Sections

The site is a single HTML file (`index.html`) that uses a JavaScript page-switching system to show and hide six distinct pages.

### 1. Home
- Full-viewport hero with animated floating cards and CTAs
- **Booking widget** — Flights, Hotels & Airbnb, and Car Rentals (sends requests via WhatsApp)
- **Global Calendar** — Interactive public holiday calendar for 30+ countries
- **Live World Clocks** — 13 timezone groups updating every second
- Core services overview (6 cards)
- Why Choose Us section
- Mission / Vision / Values cards
- Client testimonials (9 cards)
- Infinite-scroll partner logo carousel
- Call-to-action banner

### 2. About
- Company story with background image
- Core values grid (Integrity, Excellence, Global Vision, Innovation)
- Team section *(commented out — ready to restore when team photos are available)*

### 3. Services
- 9 detailed service cards (Recruitment, Travel Planning, Visa Assistance, Career Coaching, Accommodation, Corporate Travel, Consultation, Leisure Packages, Travel Insurance)
- 4-step process workflow
- Video testimonials (YouTube embeds)

### 4. Gallery
- 4-column responsive photo grid
- Click any image to open a fullscreen **lightbox**
- Prev / Next navigation (arrow buttons or keyboard arrows)
- Close with the × button, clicking outside the image, or pressing `Esc`

### 5. Affiliate
- 6 institutional partnership case studies (Education, Construction, Finance, Faith & Community)
- Individual affiliate programme details
- Benefits grid (6 cards)
- 4-step how-it-works process (Sign Up → Get Link → Refer & Earn → Get Paid)

### 6. Contact
- Contact form with success state animation
- Business hours card
- Branded social media links
- Embedded Google Map (Accra, Ghana HQ)

---

## Features

### Booking System
Three-tab booking widget for Flights, Hotels, and Cars. All bookings are sent directly to WhatsApp as pre-formatted messages — no backend required.

### Public Holiday Calendar
Self-contained holiday database covering 30+ countries with no external API:
- Fixed-date holidays
- Computed holidays (e.g. nth Monday of a month)
- Easter (Butcher's algorithm)
- Islamic holidays (Eid al-Fitr, Eid al-Adha, Islamic New Year, Prophet's Birthday)

### Live World Clocks
13 timezone groups with clocks updating every second using the browser's native `Intl.DateTimeFormat` API. Includes day/night indicators for each city.

### Dark / Light Mode
Full dark mode with:
- System preference detection on first visit (`prefers-color-scheme`)
- Preference saved to `localStorage`
- Instant toggle via the moon/sun button in the navbar
- Anti-flash inline script in `<head>` prevents theme flicker on load

### Lightbox Gallery
- Click any gallery image to open fullscreen
- Keyboard navigation: `←` / `→` to browse, `Esc` to close
- Accessible (`aria-label`, `aria-modal`, `role="dialog"`)

### Scroll Reveal Animations
Staggered fade-in and slide-up animations on scroll using the `IntersectionObserver` API — no external animation library needed.

### Partner Logo Carousel
Infinite-loop CSS animation (40 s) that pauses on hover. GPU-accelerated via `will-change: transform`.

### Responsive Design
Fully mobile-friendly with breakpoints at `1200px`, `1024px`, `768px`, and `480px`. Hamburger menu on mobile with outside-click close.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, accessible) |
| Styling | CSS3 — variables, grid, flexbox, animations, dark mode |
| Scripting | Vanilla JavaScript (ES6) |
| Icons | [Lucide](https://lucide.dev/) (via CDN) + Font Awesome 6 (social icons) |
| Fonts | [Nunito](https://fonts.google.com/specimen/Nunito) (Google Fonts, weights 300–900) |
| Images | [Unsplash](https://unsplash.com/) (placeholder — replace with real photos) |
| Hosting | Any static host (GitHub Pages, Netlify, Vercel, cPanel, etc.) |

**No npm, no build step, no framework.** Open `index.html` in a browser and it works.

---

## File Structure

```
rwoyaledge/
├── index.html          # All pages and content
├── style.css           # All styling (includes dark mode)
├── script.js           # All interactivity
├── logo.png            # Company logo
├── README.md           # This file
└── images/
    ├── Around the world.jpg
    ├── Independence Arch.jpg
    ├── Independence Arch 2.jpg
    ├── Independence Arch 3.jpg
    ├── Contact us.jpg
    ├── Partnership.jpg
    ├── Partner with Us.jpg
    ├── our services.jpg
    ├── why choose us.jpg
    ├── Calender-sec.jpg
    └── [partner & team photos]
```

---

## Getting Started

No installation needed. Just open the project folder and serve it.

**Option A — Open directly**
```
Double-click index.html
```

**Option B — Local dev server (recommended)**
```bash
# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Or using Python
python -m http.server 8000
# Then visit http://localhost:8000
```

**Option C — Deploy to static host**

Upload all files to any static hosting provider. The site has no server-side dependencies.

---

## Customisation Guide

### Replace Gallery Photos
Gallery images are placeholders from Unsplash. To add real traveler photos, update the `src` attributes in the `.gallery-grid` section of `index.html`:
```html
<div class="gallery-item">
  <img src="your-photo.jpg" alt="Traveler name / destination"/>
</div>
```

### Restore the Team Section
The team section is commented out in `index.html`. Search for:
```
<!-- TEAM WITH SOCIALS — commented out, restore when ready
```
Remove the comment markers when real team photos and bios are ready.

### Update Booking WhatsApp Number
Search `script.js` for `wa.me` and replace the phone number with the company's WhatsApp number:
```javascript
window.open('https://wa.me/YOUR_NUMBER?text=' + ...)
```

### Change Brand Colours
All colours are CSS variables in `style.css`. Update the `:root` block:
```css
:root {
  --blue:    #0077B6;   /* primary brand colour */
  --blue-lt: #90E0EF;   /* light accent */
  --blue-dk: #005a8e;   /* hover / dark variant */
}
```

### Add or Remove Countries from the Calendar
Country-specific holidays are defined in `script.js` inside the `HOLIDAYS` object. Each country uses its ISO 3166-1 alpha-2 code as the key (e.g. `GH` for Ghana).

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Internet Explorer is not supported.

---

*Built for Rwoyal Edge — Connecting Talent & Destinations Worldwide.*
