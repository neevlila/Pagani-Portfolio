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
    thumbnailImage
}: SketchfabEmbedProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inView = useInView(containerRef, { margin: "200px" }) // Preload when close

    // Combined visibility state: Parent control AND viewport visibility
    // If using thumbnail, we always render the image (cheap)
    const shouldRenderIframe = !useThumbnail && isVisible && inView

    // Extract ID for thumbnail
    // URL format: https://sketchfab.com/models/[ID]/embed...
    const modelId = url.split('/models/')[1]?.split('/')[0]
    const thumbnailUrl = thumbnailImage || (modelId ? `https://img.sketchfab.com/i/${modelId}/max.jpg` : null)

    return (
        <div ref={containerRef} className={`relative h-full w-full overflow-hidden bg-transparent ${className}`}>
            {useThumbnail && thumbnailUrl ? (
                <div className="absolute inset-0 bg-black/5">
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-opacity duration-500"
                        loading="lazy"
                    />
                    {/* Optional play button overlay if needed, but for background use keep clean */}
                </div>
            ) : shouldRenderIframe ? (
                <iframe
                    title={title}
                    className={`absolute left-0 w-full ${hideUi ? 'top-[-100px] h-[calc(100%+200px)]' : 'top-0 h-full'}`}
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    src={url}
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                    {/* Placeholder or nothing */}
                </div>
            )}
        </div>
    )
}

export default SketchfabEmbed
