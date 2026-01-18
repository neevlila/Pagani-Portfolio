# 3D Car Showcase - Pagani Huayra

A stunning React component showcase featuring a high-performance 3D car visualization with interactive animations, built with modern technologies.

## Features

- ✨ **Interactive 3D Visualization** - React Three Fiber with Drei for 3D rendering
- 🎬 **Smooth Animations** - Framer Motion for fluid UI animations
- 🎨 **Tailwind CSS v4** - Modern utility-first styling
- 📱 **Fully Responsive** - Mobile-friendly design
- ♿ **Accessible UI Components** - Built with Radix UI primitives
- ⚡ **High Performance** - Optimized for smooth 60fps animations

## Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Three Fiber** - 3D graphics with Three.js
- **Drei** - Helpful abstractions for React Three Fiber
- **Framer Motion** - Animation library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Radix UI** - Headless UI primitives
- **CVA** - Component variant architecture

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── button.tsx        # Reusable button component
│       └── card.tsx          # Card layout components
├── lib/
│   └── utils.ts             # Utility functions (cn for class merging)
├── App.tsx                   # Main application component
├── index.css                 # Tailwind CSS with theme variables
└── main.tsx                  # React entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Component Overview

### Pages

#### 1. **HomePage** - Hero Landing Page
- Full-screen hero section with liquid shader background
- Animated title with gradient text
- Performance metrics display
- Call-to-action buttons
- Features showcase section
- Responsive design for all screen sizes

#### 2. **GarageSection** - Car Collection Gallery
- Grid layout for car models
- 3D car preview in each card
- Interactive hover effects
- Click to view details

#### 3. **ModelDetailPage** - Interactive Detail View
- Fixed 3D canvas with camera animation
- Scroll-triggered transformations
- Detailed specifications table
- Professional layout

### UI Components

#### Button Component
- Multiple variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Size options: `default`, `sm`, `lg`, `icon`
- Supports asChild pattern with Radix UI
- Full keyboard navigation support

#### Card Component
- Card container with styling
- CardHeader - Header section
- CardTitle - Title text
- CardDescription - Subtitle text
- CardAction - Action area
- CardContent - Main content
- CardFooter - Footer area

### Styling

#### Tailwind CSS v4 Configuration

The project uses Tailwind CSS v4 with custom theme variables:

**Colors** (defined in CSS variables):
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--border`, `--input`, `--ring`
- Chart colors: `--chart-1` through `--chart-5`
- Sidebar colors for dashboard layouts

**Theme Variants:**
- Light mode (`:root`)
- Dark mode (`.dark` class)

#### OKLch Color Space
The theme uses the modern OKLch color space for better perceptual color accuracy.

## Usage Examples

### Adding a New Page

```typescript
const NewPage = ({ onNavigate }: { onNavigate: () => void }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Button onClick={onNavigate}>Navigate</Button>
    </div>
  )
}
```

### Using the Card Component

```typescript
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>Content here</CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### Creating Animations

```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

### 3D Elements with React Three Fiber

```typescript
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

<Canvas camera={{ position: [0, 0, 8] }}>
  <ambientLight intensity={0.5} />
  <Float>
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  </Float>
</Canvas>
```

## Customization

### Modifying Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary: oklch(0.205 0 0);  /* Change primary color */
  --background: oklch(1 0 0);   /* Change background */
  /* ... other colors */
}
```

### Adapting for Your Project

1. **Replace car data:** Update the `carData` object in `App.tsx`
2. **Customize theme:** Modify `tailwind.config.ts` for your brand colors
3. **Update 3D model:** Replace `CarModel` component with your own 3D geometry
4. **Add pages:** Create new page components following the HomePage pattern

## Performance Optimizations

- **Lazy component rendering** with React.memo
- **3D canvas optimization** using Drei helpers
- **CSS containment** for better paint performance
- **Efficient animations** with GPU acceleration
- **Tailwind CSS purging** in production

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Troubleshooting

### 3D Canvas not rendering
- Ensure WebGL is enabled in your browser
- Check browser console for Three.js errors
- Verify GPU hardware acceleration is enabled

### Animations not smooth
- Check performance in DevTools
- Reduce animation complexity
- Profile with Chrome DevTools Performance tab

### Tailwind styles not applying
- Ensure `src/index.css` is imported in `main.tsx`
- Run `npm run build` to verify production output
- Check that content paths in `tailwind.config.ts` are correct

## Development Tips

1. **Hot Module Replacement (HMR):** Vite provides instant feedback on changes
2. **TypeScript Strict Mode:** Enables better type checking and IDE support
3. **Path Aliases:** Use `@/` for cleaner imports (configured in `vite.config.ts`)
4. **DevTools:** React DevTools and Three.js DevTools recommended

## Production Deployment

```bash
npm run build
```

The `dist/` folder contains the optimized production build ready for deployment.

### Deploy to:
- Vercel: `vercel deploy`
- Netlify: Drag and drop `dist/` folder
- GitHub Pages: Configure GitHub Actions
- AWS S3 + CloudFront

## License

MIT License - feel free to use in your projects

## Resources

- [React Documentation](https://react.dev)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review component implementation in `src/components/`
3. Verify all dependencies are correctly installed

---

Built with ❤️ using React, Three.js, and Tailwind CSS
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
