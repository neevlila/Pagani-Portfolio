# Pagani Automobili - Digital Showroom

![Pagani Automobili](https://ibb.co/GvTdwZZ0)

A premium, immersive digital showroom built for Pagani Automobili, designed to showcase the artistry and engineering of their hypercars. This project combines high-performance 3D visualization, fluid animations, and a bespoke design system to create a luxury web experience.

## ✨ Features

- **Immersive 3D Experience**: Integrated Sketchfab models for hyper-realistic, interactive car previews.
- **Dynamic Routing**: Dedicated pages for the Home, Collection (Garage), and individual Model Details.
- **Fluid Animations**: Powered by `Framer Motion` for smooth transitions and scroll-based effects.
- **Premium Design System**: 
  - Custom Tailwind CSS v4 styling.
  - "Outfit" typography for a modern, elegant look.
  - Dark/Light mode support with distinct visual identities.
- **Scalable Architecture**: Centralized data management allows for easy addition of new models.
- **Responsive**: Fully optimized for desktops, tablets, and mobile devices.

## 🏎️ The Collection

The showroom currently features a curated selection of Pagani's finest:

### **Track-Only**
- **Pagani Zonda R**: The Unrestrained Beast (2009)
- **Pagani Huayra R**: Pure Mechanical Fury (2021)

### **Road-Legal (Modern)**
- **Pagani Huayra**: Art Shaped by the Wind (2011)
- **Pagani Utopia**: The Return to Pure Driving (2023)

### **Legacy Road Cars**
- **Pagani Zonda S 7.3**: The Evolution of a Legend (2002)
- **Pagani Zonda F**: Tribute to a Master (2005)

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide Icons, Google Fonts (Outfit)
- **Animation**: Framer Motion
- **3D Visualization**: React Three Fiber, Drei, Sketchfab Embeds
- **Routing**: React Router DOM v6
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neevlila/Pagani-Portfolio.git
   cd pagani-showroom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/
│   ├── 3d/                 # 3D visuals (SketchfabEmbed, LiquidBackground)
│   ├── ui/                 # Reusable UI components (Button, Card)
│   ├── mode-toggle.tsx     # Dark/Light theme switcher
│   └── theme-provider.tsx  # Context for theme management
├── lib/
│   ├── data.ts             # Centralized car database
│   └── utils.ts            # Helper functions
├── pages/
│   ├── HomePage.tsx        # Brand intro & hero section
│   ├── CollectionPage.tsx  # Grid view of all models
│   └── ModelDetailPage.tsx # Deep dive 3D view for each car
├── App.tsx                 # Main router configuration
└── index.css               # Global styles & Tailwind config
```

## 🎨 Design Philosophy

This project strictly adheres to Pagani's philosophy of "Art & Science":
- **Restraint**: Minimalist UI that lets the cars speak for themselves.
- **Craftsmanship**: Pixel-perfect spacing, typography, and interaction design.
- **Emotion**: Using depth, shadows, and motion to evoke the feeling of entering a private garage.

---

**Disclaimer**: This is an educational project and tribute to Pagani Automobili. All trademarks, logos, and car designs belong to distinct owners.
