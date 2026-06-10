import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState, useEffect } from 'react';

export default function ChatConcierge() {
  const {
    isChatOpen, setIsChatOpen,
    messages, chatInput, setChatInput, handleSendMessage, isTyping, chatEndRef,
  } = useApp();
  const [showBanner, setShowBanner] = useState(true);

  // Auto-dismiss the welcome banner after 8 seconds
  useEffect(() => {
    if (!isChatOpen) {
      const timer = setTimeout(() => setShowBanner(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setShowBanner(true);
    }
  }, [isChatOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[150]">
      {/* Customer Service Welcome Banner */}
      <AnimatePresence>
        {!isChatOpen && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-20 right-0 mb-2 cursor-pointer group"
            onClick={() => { setIsChatOpen(true); setShowBanner(false); }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl border border-brand-dark/5 p-4 pr-5 min-w-[220px]">
              {/* Arrow pointing down */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-brand-dark/5 transform rotate-45" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-brand-dark text-xs font-bold tracking-tight">Need help?</div>
                  <div className="text-brand-dark/40 text-[10px] mt-0.5">Chat with our AI concierge!</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl border border-brand-dark/5 overflow-hidden"
          >
            <div className="bg-brand-dark p-6 pb-8 rounded-b-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold tracking-tight">ATBH Concierge</div>
                    <div className="text-[10px] text-white/40">AI-Powered Assistant</div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-brand-cream/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-dark text-white rounded-br-md'
                      : 'bg-white text-brand-dark shadow-sm rounded-bl-md border border-brand-dark/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-brand-dark/5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-brand-gold/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-brand-gold/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-brand-gold/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-dark/5 flex gap-3 bg-white">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Chat with me..."
                className="flex-1 bg-brand-cream/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all"
              />
              <button type="submit" disabled={!chatInput.trim()} className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center hover:bg-brand-gold transition-all disabled:opacity-30">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="w-16 h-16 bg-brand-dark text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-gold hover:scale-110 transition-all duration-300 group"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
