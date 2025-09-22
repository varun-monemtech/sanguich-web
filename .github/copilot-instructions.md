# Copilot Instructions for Sanguich Site

## Project Overview
- **Framework:** Next.js (TypeScript)
- **Styling:** Tailwind CSS, SCSS modules
- **Build/Run:**
  - Install: `yarn install`
  - Develop: `yarn dev`
  - Production: `yarn start`
- **Major Directories:**
  - `app/` — Next.js app directory, split into `(new)` and `(old)` for migration/legacy code
  - `components/` — Reusable UI components, organized by feature (e.g., `Footer/`, `Header/`, `Form/`)
  - `context/` — React context providers for global state
  - `SANITY/`, `WP/` — Integrations with Sanity and WordPress (custom blocks, sections)
  - `animations/` — Animation logic and styles
  - `public/` — Static assets

## Key Patterns & Conventions
- **Component Organization:**
  - Feature-based folders (e.g., `ACF/`, `Background/`, `Form/`)
  - New components in `components/new/` and `app/(new)/_components/`
- **Legacy vs. Modern:**
  - Migration in progress: prefer `app/(new)/` and `components/new/` for new work
  - Legacy code in `app/(old)/` and older component folders
- **Styling:**
  - Use Tailwind for utility classes, SCSS for custom styles
  - Global styles in `app/(new)/global.css` and `style.scss`
- **Context Usage:**
  - Shared state via `context/StoreContext.js` and `context/NaviContext/`
- **External Integrations:**
  - Sanity: custom blocks in `SANITY/Custom/`, sections in `SANITY/SanitySection/`
  - WordPress: ACF blocks in `WP/ACF/`

## Developer Workflows
- **Build/Run:** Use yarn commands above
- **Debugging:**
  - Check both `app/(new)/` and `app/(old)/` for page logic
  - Component props often passed deeply; trace via feature folders
- **Adding Features:**
  - Prefer new folders for new features/components
  - Follow feature-based organization
- **Testing:** No explicit test setup found; manual testing via dev server

## Examples
- **Footer Component:** `components/Footer/index.tsx`
- **Global Styles:** `app/(new)/global.css`, `app/(new)/style.scss`
- **Context Provider:** `context/StoreContext.js`
- **Sanity Block:** `SANITY/Custom/SanityContent/`

## Tips for AI Agents
- Always check both legacy and new folders for relevant code
- Use feature-based organization for new components
- Reference global context for shared state
- Document any new conventions in this file for future agents

---
For questions or unclear patterns, ask for clarification or examples from maintainers.
