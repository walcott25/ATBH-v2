import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VideoModal() {
  const { isVideoOpen, setIsVideoOpen, activeVideoUrl } = useApp();

  return (
    <AnimatePresence>
      {isVideoOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
            <video key={activeVideoUrl} className="w-full h-full object-contain" autoPlay muted controls playsInline preload="auto">
              <source src={activeVideoUrl} type="video/mp4" />
            </video>
            <button onClick={() => setIsVideoOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white bg-black/20 backdrop-blur p-2 rounded-full"><X className="w-6 h-6" /></button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
