# 🌍 EIBM Gujarat — Premium Interactive Global Trade Platform

EIBM Gujarat is a luxury, corporate, and highly interactive landing page designed for **EIBM Gujarat (Export Import Business Management Institute)**. Built to reflect India's premier export-import training hubs, the platform features state-of-the-art WebGL animations, smooth scroll mechanics, and intuitive data visualizations.

---

## 🌟 Interactive Experience & Features

### 1. 3D WebGL Logistics Globe
- **Interactive Earth**: A fully rendered 3D Earth using **Globe.gl** (WebGL/Three.js) initialized locally with custom dark navy water topology maps.
- **Dynamic Country Polygons**: Outlines and highlights country borders globally on hover, showing glassmorphic opportunity tooltips (ISO codes, import demands, and key items).
- **Apple-Style Details Panel**: Clicking any country focuses the camera and slides open a glassmorphic sidebar detailing flag CDN mappings, recommended products, bilateral FTA treaties, cargo entry ports, and market trends.
- **Logistics Arcs**: Draws cyan dashed paths (shipping lanes) and fast white curves (flight routes) originating from Surat's sourcing hub.
- **Port Ripples**: Places pulsing blue ripple markers on Mundra, Mumbai, Surat, Dubai, Singapore, Los Angeles, Hamburg, Tokyo, and Sydney ports.
- **Inertial Auto-Rotation**: Globe rotates slowly automatically, pausing during drag/zoom/pan interactions and resuming after 5 seconds of inactivity.

### 2. Cinematic Video Hero
- **Clear Background Video**: Loops a fullscreen high-contrast CloudFront video showing cargo vessels and global logistics, completely optimized for legibility.
- **Typography**: Sleek titles in *Instrument Serif* overlaid with call-to-actions (brochure downloads, validated enrollment portals).

### 3. Scroll-Linked TIMELINES & Roadmaps
- **Milestone Timeline**: Re-designed as a responsive 2-column grid layout (preventing overlaps on mobile/tablet viewports) depicting Satish Hirpara's active trading history.
- **Immersive Journey Roadmap**: Connects 12 course checkpoints with an active sky-blue gradient path that draws itself dynamically down the timeline track based on scroll heights.

### 4. Smooth Scroll & Micro-interactions
- **Lenis Physics**: Smooth wheel scrolling with Expo ease-out deceleration.
- **Luxury Pre-loader**: Trades routes map drawing animation with organic counting ticks (0% to 100%) before mask-revealing the page.
- **Dynamic Cursor Tracker**: A trailing inertial ring cursor that expands and glows when hovering over buttons, inputs, and links.
- **Slide Accordions**: Clean accordion elements for the 15-module syllabus and 20 FAQs.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (TypeScript)
- **Bundler/Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4 (Liquid Glass & Glassmorphism systems)
- **WebGL Rendering**: Three.js / Globe.gl
- **Scroll Easing**: Lenis
- **Icons**: Lucide React

---

## 📂 Project Structure

```text
EIBM/
├── public/
│   ├── images/
│   │   ├── earth.jpg           # Earth dark-mode texture map
│   │   ├── countries.geojson   # World country boundary dataset
│   │   ├── ceo.png             # Satish Hirpara's portrait photo
│   │   └── ...                 # Sourcing, port, and logistics images
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Navigation.tsx      # Sticky glass navbar & mobile dropdown
│   │   ├── Hero.tsx            # Cinematic video background & CTA button
│   │   ├── TrustBar.tsx        # Infinite marquee & stats grid
│   │   ├── About.tsx           # Milestones timeline with scroll drawing
│   │   ├── WhyChoose.tsx       # 8 grid features glass cards
│   │   ├── Journey.tsx         # 12-step course pathway roadmap
│   │   ├── Curriculum.tsx      # 15 accordion syllabus modules
│   │   ├── PracticalExposure.tsx# Port logistics and CHA simulations
│   │   ├── LogisticsGlobe.tsx  # WebGL 3D Globe with details panel
│   │   ├── SuccessStories.tsx  # Reviews & exponential stat counters
│   │   ├── FAQ.tsx             # 20 accordions FAQ layout
│   │   ├── Contact.tsx         # surat/Ahmedabad campuses info & maps
│   │   ├── Footer.tsx          # Stripe footer & newsletter subscription
│   │   ├── Loader.tsx          # Luxury trade pre-loader screen
│   │   └── CustomCursor.tsx    # Trailing ring mouse tracker
│   ├── App.tsx                 # App layout wrapper initializing Lenis
│   ├── index.css               # Tailwind theme setup & glassmorphism directives
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Kaushaltiwari27/EIBM.git
   cd EIBM
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### Production Bundling
Compile and minify the project:
```bash
npm run build
```
The optimized bundle will be generated under `/dist` in **~500ms**.
