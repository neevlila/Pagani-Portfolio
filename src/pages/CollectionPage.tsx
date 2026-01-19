import { useEffect } from 'react'
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

    // Hide scrollbar on mount, restore on unmount (but keep scrolling enabled)
    useEffect(() => {
        document.documentElement.classList.add('no-scrollbar')
        return () => {
            document.documentElement.classList.remove('no-scrollbar')
        }
    }, [])

    return (
        <div className="relative bg-background min-h-screen selection:bg-primary/20 pb-20">
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
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </div>

            <div className="relative w-full flex flex-col items-center pt-32 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20 relative z-10"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tighter">The Collection</h2>
                        <div className="h-0.5 w-16 bg-primary/50 mx-auto mb-6" />
                        <p className="text-muted-foreground text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
                            The union of Art and Science.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 w-full">
                        {cars.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    className="bg-card/40 backdrop-blur-md border border-border/40 overflow-hidden cursor-pointer group hover:border-primary/30 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-2xl rounded-3xl"
                                    onClick={() => navigate(`/collection/${car.slug}`)}
                                >
                                    {/* Image Container - Aspect Ratio 4:3 */}
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            style={{
                                                objectPosition: car.imagePosition || 'center center',
                                                objectFit: car.imageFit || 'cover'
                                            }}
                                            loading="lazy"
                                        />

                                        <div className="absolute top-4 left-4 z-20">
                                            <CategoryBadge category={car.category} />
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <CardContent className="p-6 md:p-8 flex flex-col flex-grow relative bg-gradient-to-br from-card/50 to-transparent">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-bold">{car.year}</span>
                                                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{car.production}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-card-foreground tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">{car.name}</h3>
                                        </div>

                                        <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-3 mb-6 flex-grow">
                                            {car.tagline}
                                        </p>

                                        <div className="pt-4 border-t border-border/30 flex items-center justify-between mt-auto">
                                            <div className="flex gap-4 text-xs font-medium text-muted-foreground/80">
                                                <span>{car.horsepower}</span>
                                                <span className="w-px h-4 bg-border/50" />
                                                <span>{car.topSpeed}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground group-hover:translate-x-1 transition-transform duration-300">
                                                Explore <ArrowRight className="w-3 h-3 text-primary" />
                                            </div>
                                        </div>
                                    </CardContent>
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
