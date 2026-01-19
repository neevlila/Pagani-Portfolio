import { useRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import SketchfabEmbed from '@/components/3d/SketchfabEmbed'
import { cars } from '@/lib/data'

const ModelDetailPage = () => {
    const { slug } = useParams()
    const containerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const car = cars.find(c => c.slug === slug)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const { scrollY } = useScroll()
    const [isModelVisible, setIsModelVisible] = useState(true)

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Hide model when details section covers most of it (scrolled past hero)
        const transitionPoint = window.innerHeight * 0.57
        if (latest > transitionPoint && isModelVisible) {
            setIsModelVisible(false)
        } else if (latest < transitionPoint && !isModelVisible) {
            setIsModelVisible(true)
        }
    })

    // Fade out the hero text as we scroll down
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    // Redirect if car not found
    useEffect(() => {
        if (!car) {
            navigate('/collection')
        }
    }, [car, navigate])

    // Initial Scroll Position: 43% down (so details cover bottom 43%, revealing 57% hero)
    // User can scroll UP to see full hero.
    useEffect(() => {
        const handleInitialScroll = () => {
            const targetScroll = window.innerHeight * 0.43
            window.scrollTo({
                top: targetScroll,
                behavior: 'instant'
            })
        }

        const timer = setTimeout(handleInitialScroll, 50)
        return () => clearTimeout(timer)
    }, [slug])

    if (!car) return null

    return (
        <div ref={containerRef} className="relative bg-background overflow-x-hidden min-h-[200vh]">
            {/* Navigation */}
            <div className="fixed top-6 left-6 z-50 flex items-center gap-4 pointer-events-none">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/collection')}
                    className="pointer-events-auto hover:bg-background/40 hover:backdrop-blur-md text-foreground gap-2 border border-foreground/20 rounded-full px-6 transition-all hover:pl-4 group shadow-lg"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Collection
                </Button>
            </div>

            <div className="fixed top-6 right-6 z-50">
                <ModeToggle />
            </div>

            {/* Fixed Background 3D Model (Full Screen) */}
            <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
                <div className="absolute inset-0 bg-background/5 z-10 sm:hidden" /> {/* Mobile overlay protection */}

                {/* Corner Vignettes to hide Sketchfab UI */}
                <div className="absolute top-0 left-0 w-96 h-40 bg-background/0 z-20 pointer-events-auto" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-background/0 z-20 pointer-events-auto" />

                <div className="pointer-events-auto w-full h-full"> {/* Interactive wrapper for Sketchfab */}
                    <SketchfabEmbed
                        className="rounded-none shadow-none z-0"
                        hideUi={true}
                        url={car.sketchfabUrl}
                        title={car.name}
                        isVisible={isModelVisible}
                        iframeScale={1}
                        useThumbnail={false}
                    />
                </div>

                {/* Gradient overlays for readability */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-40 md:h-64 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-10" />

                {/* Hero Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 md:pb-20">
                    <motion.div
                        style={{ opacity: heroOpacity, y: heroY }}
                        className="text-center px-4"
                    >
                        <p className="text-muted-foreground font-medium tracking-[0.3em] uppercase mb-4 text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] dark:drop-shadow-none">
                            {car.year} / {car.production}
                        </p>
                        <h1 className="text-5xl md:text-8xl font-bold text-foreground tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-2">
                            {car.name}
                        </h1>
                        <p className="text-foreground/90 text-xl font-light tracking-wide max-w-xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] dark:drop-shadow-lg">
                            {car.tagline}
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: heroOpacity }}
                        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce hidden md:flex"
                    >
                        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-foreground to-transparent" />
                    </motion.div>
                </div>
            </div>

            {/* Spacer for 3D View - Full Screen */}
            <div className="relative z-10 h-[100vh] pointer-events-none" />

            {/* Section 2: Details */}
            <div className="relative z-20 bg-background border-t border-border/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="grid gap-16"
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-border pb-8 gap-4">
                                <h2 className="text-4xl font-bold text-foreground">Heritage & Specifications</h2>
                                <span className="font-mono text-muted-foreground">REF: {car.slug.toUpperCase()}</span>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Engine & Power</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-muted-foreground">Engine</span>
                                                <span className="font-medium text-foreground text-lg">{car.engine}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-muted-foreground">Horsepower</span>
                                                <span className="font-medium text-foreground text-lg">{car.horsepower}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-muted-foreground">Transmission</span>
                                                <span className="font-medium text-foreground text-lg">{car.transmission}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Performance</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-muted-foreground">Top Speed</span>
                                                <span className="font-medium text-foreground text-lg">{car.topSpeed}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-muted-foreground">0-100 km/h</span>
                                                <span className="font-medium text-foreground text-lg">{car.acceleration}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b border-border/50">
                                                <span className="text-muted-foreground">Weight</span>
                                                <span className="font-medium text-foreground text-lg">{car.weight}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Legacy</h4>
                                        <p className="text-lg leading-relaxed text-muted-foreground font-light">
                                            {car.description}
                                        </p>
                                    </div>

                                    <div className="bg-muted/30 p-8 rounded-xl border border-border/50">
                                        <h4 className="text-base font-bold text-foreground mb-4">The Art of Engineering</h4>
                                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                            {car.name} is a testament to Horacio Pagani's philosophy that art and science can walk hand in hand. Every component is machined from solid aluminum or crafted from carbon fiber.
                                        </p>
                                        <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                                            <span className="uppercase tracking-wider">Uncompromised Design</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelDetailPage
