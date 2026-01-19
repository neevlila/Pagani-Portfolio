import React, { useRef } from 'react'
import { useInView } from 'framer-motion'

interface SketchfabEmbedProps {
    className?: string
    hideUi?: boolean
    url?: string
    title?: string
    isVisible?: boolean // Control from parent
    useThumbnail?: boolean
    thumbnailImage?: string
}

const SketchfabEmbed = ({
    className = "rounded-2xl shadow-2xl",
    hideUi = false,
    url = "https://sketchfab.com/models/6cf8c75a54794fdf895c2d005cbde426/embed?autospin=1&autostart=1&preload=1&dnt=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
    title = "Pagani Model",
    isVisible = true,
    useThumbnail = false,
    thumbnailImage,
    iframeScale = 1
}: SketchfabEmbedProps & { iframeScale?: number }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inView = useInView(containerRef, { margin: "200px" })
    const [isMobile, setIsMobile] = React.useState(false)
    const [shouldLoad, setShouldLoad] = React.useState(false)

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    React.useEffect(() => {
        if (isVisible && inView && !useThumbnail) {
            setShouldLoad(true)
        }
    }, [isVisible, inView, useThumbnail])

    // Process URL for mobile
    const getOptimizedUrl = (originalUrl: string) => {
        let newUrl = originalUrl
        if (isMobile) {
            // Mobile optimization: Keeping autostart enabled as per request
            newUrl = newUrl.replace('preload=1', 'preload=0') // Keep preloading lazy for data saving, but allow autostart
        }
        return newUrl
    }

    const modelId = url.split('/models/')[1]?.split('/')[0]
    const thumbnailUrl = thumbnailImage || (modelId ? `https://img.sketchfab.com/i/${modelId}/max.jpg` : null)

    return (
        <div ref={containerRef} className={`relative h-full w-full overflow-hidden bg-transparent ${className}`}>
            {/* Thumbnail View */}
            {(useThumbnail && thumbnailUrl) || (!shouldLoad && thumbnailUrl) ? (
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5">
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-opacity duration-500"
                        loading="lazy"
                    />
                </div>
            ) : null}

            {/* Iframe View */}
            {shouldLoad && !useThumbnail && (
                <iframe
                    title={title}
                    className={`absolute left-0 w-full transition-opacity duration-1000 ${hideUi ? 'top-[-30%] h-[160%]' : 'top-0 h-full'}`}
                    style={{
                        transform: iframeScale !== 1 ? `scale(${iframeScale})` : 'none',
                        transformOrigin: 'center center'
                    }}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    src={getOptimizedUrl(url)}
                    loading="lazy"
                />
            )}
        </div>
    )
}

export default SketchfabEmbed
