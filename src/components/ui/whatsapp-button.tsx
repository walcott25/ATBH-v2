import { motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'

const PHONE_NUMBER = '233593770853'
const MESSAGE = 'Hello! I would like to know more about Asuogyaman tourism.'

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-24 right-6 z-[9999] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  )
}
