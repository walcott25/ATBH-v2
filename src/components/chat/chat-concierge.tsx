import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState, useRef, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';

const quickReplies = [
  'What attractions are there?',
  'Best places to eat?',
  'How do I donate?',
  'Where can I stay?',
  'Upcoming events?',
];

const easeOut = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: easeOut, staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: 24, scale: 0.92, transition: { duration: 0.25, ease: easeOut } },
};

const messageVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeOut } },
};

function TypingDots() {
  return (
    <div className="flex justify-start">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end gap-2 max-w-[85%]"
      >
        <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
          <Bot className="w-3.5 h-3.5 text-accent" />
        </div>
        <div className="bg-surface border border-border/60 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[10px] text-muted/60 font-medium tracking-wide">Thinking</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: { role: string; text: string } }) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      variants={messageVariants}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mb-1">
          <Bot className="w-3.5 h-3.5 text-accent" />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-accent-fg rounded-br-md shadow-sm shadow-accent/10'
            : 'bg-surface border border-border/60 rounded-bl-md shadow-sm'
        }`}
      >
        {isUser ? (
          <p className="text-accent-fg/90">{msg.text}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-fg prose-headings:text-fg prose-a:text-accent prose-strong:text-fg prose-code:bg-border/50 prose-code:px-1 prose-code:rounded prose-code:text-xs">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mb-1">
          <User className="w-3.5 h-3.5 text-accent" />
        </div>
      )}
    </motion.div>
  );
}

export default function ChatConcierge() {
  const {
    isChatOpen, setIsChatOpen,
    messages, chatInput, setChatInput, handleSendMessage, isTyping, chatEndRef,
  } = useApp();
  const [showBanner, setShowBanner] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (chatInput.trim()) {
        handleSendMessage(e as unknown as React.FormEvent);
      }
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 right-0 z-[150] sm:bottom-6 sm:right-6 w-full sm:w-[400px] sm:max-w-[calc(100vw-48px)]">
      {/* Welcome banner */}
      <AnimatePresence>
        {!isChatOpen && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="absolute bottom-20 right-4 sm:right-0 mb-2 cursor-pointer group z-10"
            onClick={() => { setIsChatOpen(true); setShowBanner(false); }}
          >
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 min-w-[200px]">
              <div className="absolute -bottom-2 right-8 w-3 h-3 bg-white/90 border-r border-b border-white/20 transform rotate-45" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-fg text-xs font-semibold tracking-tight">Need help?</p>
                  <p className="text-muted/60 text-[10px] mt-0.5">Chat with our AI concierge!</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 sm:bottom-20 right-0 w-full sm:w-[400px] h-[85vh] sm:h-[540px] sm:max-h-[calc(100vh-120px)] flex flex-col bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl sm:rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(197,149,74,0.06)' }}
          >
            {/* Header */}
            <div className="relative shrink-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-dark/95 px-5 pt-5 pb-6 sm:rounded-t-3xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-accent" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-brand-dark rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold tracking-tight">ATBH Concierge</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-white/40 font-medium">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Quick replies */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-1">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setChatInput(q);
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      setTimeout(() => handleSendMessage(fakeEvent), 100);
                    }}
                    className="shrink-0 text-[10px] font-medium text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 rounded-full px-3 py-1.5 transition-all whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Gradient fade under quick replies */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-brand-dark/5 to-transparent"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <ChatMessage key={`${i}-${msg.text.slice(0, 20)}`} msg={msg} />
                ))}
              </AnimatePresence>
              {isTyping && <TypingDots />}
              <div ref={chatEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-surface border border-border/60 shadow-lg flex items-center justify-center hover:border-accent/30 transition-all z-10"
                >
                  <ChevronDown className="w-4 h-4 text-muted" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="shrink-0 px-4 py-3 bg-surface/90 backdrop-blur-sm border-t border-border/60">
              <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full bg-bg/60 border border-border/60 rounded-xl px-4 py-2.5 text-sm text-fg placeholder:text-muted/40 outline-none focus:border-accent/30 focus:bg-bg/80 transition-all resize-none max-h-32"
                    style={{ minHeight: '40px' }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center hover:bg-accent/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0 shadow-sm shadow-accent/20"
                >
                  <Send className="w-4 h-4 text-accent-fg" />
                </motion.button>
              </form>
              <p className="text-[9px] text-muted/40 text-center mt-2 tracking-wider">
                Powered by AI &middot; May produce inaccurate information
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 right-4 sm:bottom-0 sm:right-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent text-accent-fg shadow-xl flex items-center justify-center hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-accent/20"
      >
        {isChatOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </motion.button>
    </div>
  );
}
