import React from 'react'

interface SketchfabEmbedProps {
    className?: string
    hideUi?: boolean
}

const SketchfabEmbed = ({ className = "rounded-2xl shadow-2xl", hideUi = false }: SketchfabEmbedProps) => (
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

export default SketchfabEmbed
