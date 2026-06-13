import { useEffect, useRef, useState } from 'react'
import { X, Maximize2, Minimize2, Loader } from 'lucide-react'
import { Viewer } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'

interface VirtualTourProps {
  panorama: string
  attractionName: string
  onClose: () => void
}

export default function VirtualTour({ panorama, attractionName, onClose }: VirtualTourProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const viewerInstance = useRef<Viewer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!viewerRef.current) return

    let viewer: Viewer

    const initViewer = async () => {
      try {
        viewer = new Viewer({
          container: viewerRef.current!,
          panorama,
          loadingImg: '/Images/download.jfif',
          defaultZoomLvl: 50,
          minZoomLvl: 10,
          maxZoomLvl: 100,
          moveSpeed: 1,
          navbar: [
            'zoomOut',
            'zoomIn',
            'moveUp',
            'moveDown',
            'moveLeft',
            'moveRight',
            'autorotate',
            'download',
            'fullscreen',
          ],
          mousewheel: true,
          touchmoveTwoFingers: true,
          autorotateSpeed: 1.5,
          autorotateDelay: 2000,
          caption: attractionName,
        })

        viewerInstance.current = viewer

        viewer.addEventListener('ready', () => {
          setLoading(false)
        })

        viewer.addEventListener('load-error', () => {
          setLoading(false)
          setError(true)
        })
      } catch (err) {
        console.error('Failed to initialize 360° viewer:', err)
        setLoading(false)
        setError(true)
      }
    }

    initViewer()

    return () => {
      if (viewer) {
        try {
          viewer.destroy()
        } catch (e) {
          // ignore destroy errors
        }
      }
      viewerInstance.current = null
    }
  }, [panorama, attractionName])

  const toggleFullscreen = () => {
    if (!viewerRef.current) return
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  return (
    <div className="fixed inset-0 z-[500] bg-black flex flex-col">
      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-white/80 text-xs font-medium uppercase tracking-[0.15em]">
            360° Virtual Tour
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
            aria-label="Close virtual tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading / Error states */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
          <Loader className="w-8 h-8 text-brand-gold animate-spin mb-4" />
          <p className="text-white/50 text-xs uppercase tracking-[0.2em]">Loading 360° view...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mb-4">
            <span className="text-2xl">🌄</span>
          </div>
          <p className="text-white/70 text-sm mb-2">Unable to load 360° view</p>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6">The panorama image could not be loaded</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-5 py-2.5 rounded-full border border-white/10 transition-all"
          >
            <X className="w-3.5 h-3.5" /> Close
          </button>
        </div>
      )}

      {/* Instructions overlay - fades out */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full">
          <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-medium">
            Drag to look around &bull; Scroll to zoom
          </p>
        </div>
      </div>

      {/* Viewer container */}
      <div
        ref={viewerRef}
        className="flex-1 w-full relative"
        style={{ minHeight: 0 }}
      />
    </div>
  )
}
