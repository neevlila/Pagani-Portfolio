"use client"

import { useState, useRef, useMemo, useEffect } from 'react'
// Router installed
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ArrowRight, Gauge, Zap, Settings, Instagram, Twitter, Linkedin, ArrowLeft } from 'lucide-react'
import { ThemeProvider, useTheme } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Car Data
const carData = {
  name: "Pagani Zonda R",
  year: 2009,
  production: "15 units",
  tagline: "The Unrestrained Beast",
  description: "The Pagani Zonda R is a track-only hypercar developed without racing regulations, allowing absolute freedom in design and engineering. Built as a technological laboratory for Pagani Automobili, it features a carbon-titanium monocoque and a naturally aspirated AMG V12. The Zonda R represents the purest expression of performance ever created by the brand.",
  engine: "6.0L AMG V12",
  horsepower: "750 HP",
  topSpeed: "350+ km/h",
  transmission: "6-Speed Sequential",
  drivetrain: "RWD",
  weight: "1,070 kg",
  acceleration: "0-100 km/h in 2.7s"
}

const SketchfabEmbed = ({ className = "rounded-2xl shadow-2xl", hideUi = false }: { className?: string; hideUi?: boolean }) => (
  <div className={`relative h-full w-full overflow-hidden ${className}`}>
    <iframe
      title="Pagani Zonda R"
      className={`absolute left-0 w-full ${hideUi ? 'top-[-100px] h-[calc(100%+200px)]' : 'top-0 h-full'}`}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; fullscreen; xr-spatial-tracking"
      src="https://sketchfab.com/models/6cf8c75a54794fdf895c2d005cbde426/embed?autospin=1&autostart=1&preload=1&dnt=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0"
    />
  </div>
)

// 3D Background Component
const LiquidBackground = ({ theme }: { theme: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Vector3(0, 0, 0) },
    uColor2: { value: new THREE.Vector3(0, 0, 0) },
  }), [])

  // Target colors based on theme
  const isDark = theme === 'dark'
  // Dark mode: Deep Blue/Black | Light mode: Soft Platinum/Grey
  const targetColor1 = isDark ? new THREE.Vector3(0.005, 0.005, 0.01) : new THREE.Vector3(0.92, 0.92, 0.94)
  const targetColor2 = isDark ? new THREE.Vector3(0.02, 0.02, 0.05) : new THREE.Vector3(0.96, 0.96, 0.98)

  useFrame((state) => {
    const { clock, mouse } = state
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = clock.getElapsedTime()
      material.uniforms.uMouse.value.lerp(mouse, 0.05)

      // Smoothly transition colors
      material.uniforms.uColor1.value.lerp(targetColor1, 0.05)
      material.uniforms.uColor2.value.lerp(targetColor2, 0.05)
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; 
          uniform vec3 uColor1; uniform vec3 uColor2;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            gl_FragColor = vec4(mix(uColor1, uColor2, color), 1.0);
          }
        `}
      />
    </mesh>
  )
}

// 3D Car Model Placeholder
const CarModel = ({ scale = 1, autoRotate = false }: { scale?: number; autoRotate?: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[4, 1.2, 2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[3.5, 0.8, 1.8]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} />
        </mesh>
      </mesh>
    </Float>
  )
}

// Home Page with Full Sections - Enhanced
const HomePage = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()

  return (
    <div className="relative bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <div className="absolute top-4 right-4 z-50 mix-blend-difference">
        <ModeToggle />
      </div>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-100 transition-opacity duration-500">
          <Canvas camera={{ position: [0, 0, 30], fov: 35 }}>
            <ambientLight intensity={0.3} />
            <spotLight position={[20, 20, 20]} intensity={2} />
            <LiquidBackground theme={theme} />
          </Canvas>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold mb-5 tracking-tight leading-[1.1] mix-blend-difference dark:mix-blend-normal overflow-visible py-2">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/70">
                  Pagani Automobili
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 mt-1">
                  Art Meets Engineering
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-8"
            >
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 mix-blend-difference dark:mix-blend-normal">
                Founded in Modena, Italy, Pagani Automobili creates handcrafted hypercars
                that blur the line between mechanical engineering and functional art.
                Each creation is built in limited numbers, without compromise.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-foreground">3</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase mt-1">Model Families</div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-border/50"></div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-foreground">100+</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase mt-1">Cars Produced</div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-border/50"></div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-foreground">25+ Years</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase mt-1">Craftsmanship</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => navigate('/collection')}
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Enter the Garage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://www.pagani.com/', '_blank')}
                className="px-8 py-6 text-base font-medium rounded-full border-foreground/20 hover:bg-foreground/5 transition-all duration-300 bg-transparent backdrop-blur-sm"
              >
                Discover the Brand
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-12 md:py-20 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Engineering Without Compromise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every Pagani is designed as a unique work of art, engineered beyond regulation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Bespoke Engineering", desc: "Each Pagani is handcrafted using advanced composite materials, aerospace technologies, and obsessive attention to detail." },
              { icon: Gauge, title: "Limited Production", desc: "Pagani produces hypercars in extremely limited numbers, ensuring exclusivity and individuality for every owner." },
              { icon: Settings, title: "Italian Craftsmanship", desc: "Designed and built in Modena, Italy, every Pagani blends traditional artisan skills with cutting-edge engineering." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-card border border-border/50 rounded-2xl p-8 hover:bg-accent/50 transition-all duration-300 group shadow-lg"
              >
                <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-background border-t border-border py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-muted-foreground text-sm">
              © Pagani Automobili S.p.A. — Modena, Italy
            </div>
            <div className="flex gap-6">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/paganiautomobili" },
                { Icon: Twitter, href: "https://x.com/PaganiAuto/" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/paganiautomobili/" }
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Garage Grid Section
const GarageSection = () => {
  const navigate = useNavigate()

  return (
    <div className="relative bg-background min-h-screen overflow-hidden">
      {/* Background Depth Elements */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-br from-indigo-500/5 via-primary/5 to-rose-500/5 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="absolute top-4 left-4 z-50 flex items-center gap-4 w-full pr-8 justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-foreground hover:bg-foreground/5 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
        <ModeToggle />
      </div>
      <div className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">The Collection</h2>
            <p className="text-muted-foreground text-xl font-light mb-6">Each Pagani is a singular vision</p>
            <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
              <span>Track-only</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>Road-legal</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>Limited series</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center relative z-10"
          >
            <Card
              className="bg-card/80 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer group hover:scale-[1.01] transition-all duration-500 w-full max-w-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] rounded-2xl"
              onClick={() => navigate('/collection/zonda-r')}
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-b from-black/5 to-black/20 dark:from-white/5 dark:to-transparent">
                <div className="absolute inset-0 flex items-center justify-center">
                  <SketchfabEmbed hideUi={true} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none" />
              </div>
              <CardContent className="p-8 md:p-10 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium text-primary mb-2 tracking-widest uppercase">{carData.year} Edition</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-card-foreground mb-3 tracking-tight leading-none">{carData.name}</h3>
                    <p className="text-muted-foreground text-lg font-light max-w-md">{carData.tagline}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 shadow-sm">
                    <ArrowRight className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Model Detail Page with Scroll Sections
const ModelDetailPage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Framer Motion transforms can be used if we had standard 3D elements here
  // But we use Sketchfab embed which is an iframe

  return (
    <div ref={containerRef} className="relative bg-background">
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/collection')}
          className="bg-background/50 backdrop-blur-sm hover:bg-background/80 text-foreground gap-2 border border-border/50 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Fixed Background */}
      <div className="fixed inset-0 z-0 opacity-100">
        <SketchfabEmbed className="rounded-none shadow-none" hideUi={true} />
      </div>

      {/* Spacer for 3D View - Full Screen */}
      <div className="relative z-10 h-screen pointer-events-none" />

      {/* Section 2: Details */}
      <div className="relative z-10 min-h-screen flex items-center p-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-card-foreground">Heritage & Specifications</h2>
              </div>

              <div className="space-y-4 text-card-foreground/90">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Year</span>
                      <span className="font-semibold">{carData.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Production</span>
                      <span className="font-semibold">{carData.production}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Engine</span>
                      <span className="font-semibold">{carData.engine}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Power</span>
                      <span className="font-semibold">{carData.horsepower}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Top Speed</span>
                      <span className="font-semibold">{carData.topSpeed}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Transmission</span>
                      <span className="font-semibold">{carData.transmission}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Drivetrain</span>
                      <span className="font-semibold">{carData.drivetrain}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-semibold">{carData.weight}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">Acceleration</span>
                  <span className="font-semibold">{carData.acceleration}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-4">
                  {carData.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
const PaganiShowcase = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pagani-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<GarageSection />} />
          <Route path="/collection/:slug" element={<ModelDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default PaganiShowcase
