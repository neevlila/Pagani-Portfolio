import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ArrowRight, Zap, Gauge, Settings, Instagram, Twitter, Linkedin } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import LiquidBackground from '@/components/3d/LiquidBackground'

const HomePage = () => {
    const { theme } = useTheme()
    const navigate = useNavigate()

    return (
        <div className="relative bg-background text-foreground transition-colors duration-300">
            {/* Hero Section */}
            <div className="absolute top-4 right-4 z-50 mix-blend-difference">
                <ModeToggle />
            </div>

            <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 opacity-40 dark:opacity-100 transition-opacity duration-500">
                    <Canvas camera={{ position: [0, 0, 30], fov: 35 }}>
                        <ambientLight intensity={0.3} />
                        <spotLight position={[20, 20, 20]} intensity={2} />
                        <LiquidBackground theme={theme} />
                    </Canvas>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="mb-6 md:mb-8"
                        >
                            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tight leading-[1.2] py-2 px-4">
                                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/70 pb-2 drop-shadow-sm">
                                    Pagani Automobili
                                </span>
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 pb-2 drop-shadow-sm">
                                    Art Meets Engineering
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mb-10"
                        >
                            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4 drop-shadow-sm">
                                Founded in Modena, Italy, Pagani Automobili creates handcrafted hypercars
                                that blur the line between mechanical engineering and functional art.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 mb-10">
                                <div className="text-center group cursor-default">
                                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">3</div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.2em] uppercase">Model Families</div>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-border/50"></div>
                                <div className="text-center group cursor-default">
                                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">100+</div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.2em] uppercase">Cars Produced</div>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-border/50"></div>
                                <div className="text-center group cursor-default">
                                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">25+</div>
                                    <div className="text-[10px] md:text-xs text-muted-foreground tracking-[0.2em] uppercase">Years of Art</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Button
                                    size="lg"
                                    onClick={() => navigate('/collection')}
                                    className="bg-foreground text-background hover:bg-foreground/90 px-10 py-7 text-lg font-medium rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                                >
                                    Enter the Garage
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => window.open('https://www.pagani.com/', '_blank')}
                                    className="px-10 py-7 text-lg font-medium rounded-full border-foreground/20 hover:bg-foreground/5 transition-all duration-300 bg-transparent backdrop-blur-sm"
                                >
                                    Discover the Brand
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section - Only show on larger screens or scroll */}
            <div className="relative z-10 py-20 px-4 bg-background border-t border-border/40">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Engineering Without Compromise</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                            Every Pagani is designed as a unique work of art, engineered beyond regulation.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                className="bg-card border border-border/50 rounded-2xl p-10 hover:bg-accent/50 transition-all duration-500 group shadow-lg hover:shadow-xl dark:shadow-none"
                            >
                                <div className="mb-6 inline-block p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-card-foreground mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 bg-background border-t border-border py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-muted-foreground text-sm tracking-wide">
                            © Pagani Automobili S.p.A. — Modena, Italy
                        </div>
                        <div className="flex gap-8">
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

export default HomePage
