# Forma Pilates Luxury

A modern, multilingual luxury Pilates studio website built with React, TypeScript, and Tailwind CSS.

## Features

- Fully responsive design optimized for all screen sizes
- Multilingual support (English & French) via i18n
- Smooth scroll animations and parallax effects
- Booking modal for class reservations
- Sections: Hero, About, Services, Benefits, Schedule, Pricing, Gallery, Instructors, Testimonials, FAQ, Contact
- SEO optimized with sitemap and robots.txt
- Accessible UI components powered by shadcn/ui

## Tech Stack

- **Vite** — fast build tool and dev server
- **React** — UI library
- **TypeScript** — type-safe JavaScript
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — accessible component library
- **i18next** — internationalization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```sh
# Clone the repository
git clone https://github.com/Olaya240/forma-pilates-luxury.git

# Navigate to the project directory
cd forma-pilates-luxury

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   └── ui/          # shadcn/ui base components
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization config and locale files
├── lib/             # Utility functions
└── pages/           # Page-level components
```

## Deployment

Build the project for production:

```sh
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static hosting service such as Vercel, Netlify, or GitHub Pages.
