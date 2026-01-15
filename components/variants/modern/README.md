# Modern Variant

A sleek, modern variant for a **single-location insurance agency**, emphasizing clean design, trust, and user engagement.

## Overview

Optimized for a single location, this variant focuses on clarity, modern aesthetics, and conversion-friendly layout without unnecessary clutter.

## Design Philosophy

- **Single-Location Focused**: Highlights your agency without distractions
- **Modern & Professional**: Minimalist, trustworthy, and clean design
- **Conversion-Oriented**: Key CTAs integrated naturally
- **Mobile-First**: Fully responsive across all devices
- **Theme-Aware**: All colors and fonts driven by CSS variables

## Component Features

### Layout Components

#### Header
- Sticky navigation
- Only **agency logo displayed**
- Mobile-friendly hamburger menu

#### Footer
- Multi-column layout with **agency info** only
- Social media icons
- Dynamic copyright year

### Home Page Components

#### HeroSection
- Full-width hero with image or video background
- Customizable overlay opacity
- Title, subtitle, and description
- Decorative bottom wave transition

#### IntroSection
- Two-column layout (image + content)
- Tagline badge
- Multiple content paragraphs
- Configurable image aspect ratio

#### OurServicesSection
- Create static data for services
- Grid or card layout for services offered
- Icon-based design
- Hover effects for interactivity

#### Testimonials
- Full-page slider for all testimonials
- Navigation arrows or swipe for next testimonial
- Author name and title

#### FAQSection
- Shows top 5 FAQs from database
- Clean card-based design

#### ContactForm
- Prominent form with fields: **Name, Email, Phone, Subject, Message**
- Integrated click-to-call/email optional
- Mobile-friendly and accessible

### Our Team Page
- Dedicated `/team` page
- Clean card layout for team members
- Static data (image, title, profession, description)
- Responsive grid layout for multiple members
- Each card includes:
  - **Image** (avatar/photo)
  - **Name/Title**
  - **Profession/Role**
  - **Short description**

### Blog Page (New Feature)
- Dedicated `/blog` page
- Fetches **topics and posts via API**
- Simple card-based UI for each blog post
- Each card includes:
  - **Topic Name**
  - **Image**
  - **Short Description**
- Fully responsive and consistent with site theme
- Minimal client-side JS for rendering

## CSS Variables Used
- `--color-primary`, `--color-primary-foreground`
- `--color-accent`, `--color-accent-foreground`
- `--color-background`, `--color-background-alt`
- `--color-text-primary`, `--color-text-body`, `--color-text-muted`
- `--font-heading`, `--font-body`
- `--heading-weight`, `--body-weight`
- `--navbar-bg-color`, `--navbar-text-color`
- `--intro-section-aspect-ratio`

## URL Structure
- `/` - Home
- `/services` - Services
- `/team` - Our Team page
- `/contact` - Contact form
- `/location` - Single location page
- `/blog` - Blog page with topic-based cards

## Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari iOS 12+
- Chrome Android (latest)

## Accessibility & Performance
- Semantic HTML5 and ARIA labels
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Server-side rendering for all data fetching
- Minimal client-side JS for slider, blog card rendering, and mobile menu
- Optimized images for performance

## Testing Checklist
- [ ] Header displays logo correctly
- [ ] Footer shows only agency info and social icons
- [ ] HeroSection displays image/video correctly
- [ ] IntroSection content renders properly
- [ ] OurServicesSection shows all services
- [ ] Testimonials slider works and navigates correctly
- [ ] FAQSection displays correctly without extra buttons
- [ ] ContactForm shows Name, Email, Phone, Subject, Message fields and works
- [ ] Blog Page displays topics with cards correctly (name, image, description)
- [ ] All CSS variables applied
