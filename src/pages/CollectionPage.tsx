import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ModeToggle } from '@/components/mode-toggle'
import SketchfabEmbed from '@/components/3d/SketchfabEmbed'
import { cars } from '@/lib/data'

const CategoryBadge = ({ category }: { category: string }) => {
    let colorClass = "bg-gray-500"

    if (category === "Track Weapon" || category === "Track-Only Hypercar") colorClass = "bg-indigo-500"
    if (category === "Road-Legal Hypercar") colorClass = "bg-emerald-500"
    if (category === "One-off") colorClass = "bg-amber-500"

    return (
        <span className="bg-background/20 backdrop-blur-md border border-white/10 text-foreground px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${colorClass}`} />
            {category}
        </span>
    )
}

const CollectionPage = () => {
    const navigate = useNavigate()

    return (
        <div className="relative bg-background min-h-screen overflow-hidden selection:bg-primary/20">
            {/* Background Depth Elements */}
            <div className="absolute inset-0 bg-background pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-gradient-to-br from-indigo-500/5 via-primary/5 to-rose-500/5 blur-[120px] rounded-full opacity-60 dark:opacity-40" />
            </div>

            {/* Navigation Bar */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:p-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="text-muted-foreground hover:text-foreground hover:bg-transparent px-0 gap-2 transition-colors group"
                >
                    <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/50 transition-colors">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">Back to World</span>
                </Button>
                <ModeToggle />
            </div>

            <div className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 relative z-10"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tighter">The Private Collection</h2>
                        <div className="h-1 w-20 bg-primary/50 mx-auto mb-6 rounded-full" />
                        <p className="text-muted-foreground text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
                            A curated selection of automotive masterpieces. <br className="hidden md:block" />
                            Each vehicle represents a pinnacle of its era.
                        </p>

                        <div className="flex items-center justify-center gap-6 text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground/60 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_currentColor]" />
                                <span>Track-only</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>Road-legal</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-50">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span>One-off</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-12 sm:gap-16 relative z-10 w-full">
                        {cars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                                className="flex flex-col items-center"
                            >
                                <Card
                                    className="bg-card/40 backdrop-blur-xl border border-white/10 dark:border-white/5 overflow-hidden cursor-pointer group hover:border-primary/20 transition-all duration-500 w-full max-w-5xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.02)] rounded-[2rem]"
                                    onClick={() => navigate(`/collection/${car.slug}`)}
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-5 h-full min-h-[500px]">
                                        {/* Visual Side */}
                                        <div className="lg:col-span-3 relative overflow-hidden bg-gradient-to-br from-black/5 to-black/20 dark:from-white/[0.02] dark:to-transparent min-h-[300px] lg:min-h-full">
                                            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                                                {/* Overlay for interaction hint */}
                                                <div className="absolute inset-0 z-10 bg-transparent group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors pointer-events-none" />
                                                <SketchfabEmbed
                                                    hideUi={true}
                                                    url={car.sketchfabUrl}
                                                    title={car.name}
                                                    className="pointer-events-none opacity-90 grayscale-[0.2] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                                />
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-6 left-6 z-20">
                                                <CategoryBadge category={car.category} />
                                            </div>
                                        </div>

                                        {/* Info Side */}
                                        <CardContent className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-card/50 to-card/10">
                                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent lg:hidden" />
                                            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

                                            <div className="mb-auto">
                                                <p className="text-primary font-bold mb-2 tracking-[0.2em] uppercase text-xs">{car.year} Edition</p>
                                                <h3 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4 tracking-tighter leading-[0.9]">{car.name}</h3>
                                                <p className="text-muted-foreground text-lg font-light leading-relaxed">{car.tagline}</p>
                                            </div>

                                            <div className="mt-8 space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Engine</p>
                                                        <p className="font-semibold text-foreground text-sm sm:text-base">{car.engine}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Output</p>
                                                        <p className="font-semibold text-foreground text-sm sm:text-base">{car.horsepower}</p>
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-border/40 flex items-center justify-between group/btn">
                                                    <span className="text-sm font-medium text-foreground group-hover/btn:text-primary transition-colors">Explore Model</span>
                                                    <div className="h-10 w-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:border-primary group-hover/btn:text-primary-foreground transition-all duration-300">
                                                        <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionPage
