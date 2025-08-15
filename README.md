# PrintaRex Frontend

A responsive landing page for the PrintaRex POD (Print on Demand) platform built with React, TypeScript, Vite, and Material UI.

## Features

- **Responsive Design**: Mobile-first approach with Material UI components
- **Modern UI**: Clean, airy design with smooth animations and hover effects
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized with Vite build system
- **Docker Ready**: Containerized deployment with Nginx

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material UI (MUI) v5
- **Routing**: React Router DOM
- **Styling**: Emotion (CSS-in-JS)
- **Container**: Docker + Nginx

## Project Structure

```
src/
├── app/
│   └── App.tsx              # Main app with routing
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Footer with links
│   └── PlaceholderPage.tsx  # Placeholder for unimplemented routes
├── pages/
│   └── Landing.tsx          # Main landing page
├── styles/
│   └── globals.css          # Global styles and resets
└── main.tsx                 # App entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Docker Deployment

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   Navigate to `http://localhost:5173`

3. **Stop the containers:**
   ```bash
   docker-compose down
   ```

## Available Routes

- `/` - Landing page (implemented)
- `/app/catalog` - Product catalog (placeholder)
- `/app/designer` - Product designer (placeholder)
- `/pricing` - Pricing information (placeholder)
- `/support` - Support center (placeholder)
- `/legal/terms` - Terms of service (placeholder)
- `/legal/privacy` - Privacy policy (placeholder)
- `/contact` - Contact information (placeholder)

## Features Implemented

### Header Navigation
- PrintaRex logo with inline SVG
- Sticky navigation with subtle border
- Mobile-responsive drawer menu
- Navigation to Catalog, Pricing, and Support

### Hero Section
- Large headline: "Create and sell custom products"
- Feature points with check icons
- Primary CTA: "Start customizing"
- Secondary CTA: "Browse catalog"
- GIF demonstration area for T-shirts and hoodies

### Product Teaser Grid
- "Popular to customize" section
- Product cards with hover effects
- Customize buttons linking to designer

### Footer
- Copyright information
- Legal links (Terms, Privacy, Contact)

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus rings for all interactive elements
- Alt text for all images and GIFs
- Minimum 44px tap targets for mobile

## Performance Optimizations

- Lazy loading of components
- Optimized Material UI bundle
- Gzip compression in production
- Static asset caching
- Source maps for debugging

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure accessibility compliance
5. Submit a pull request

## License

This project is proprietary to PrintaRex.

## Support

For support and questions, please contact the development team.

