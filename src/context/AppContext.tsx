import React, { createContext, useContext, useState, useRef } from 'react';
import { askConcierge } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface AppContextType {
  isChatOpen: boolean;
  setIsChatOpen: (v: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (v: boolean) => void;
  isVideoOpen: boolean;
  setIsVideoOpen: (v: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (v: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (v: boolean) => void;
  isTyping: boolean;
  chatInput: string;
  setChatInput: (v: string) => void;
  messages: Message[];
  setMessages: (v: Message[] | ((prev: Message[]) => Message[])) => void;
  activeVideoUrl: string;
  handleSendMessage: (e: React.FormEvent) => Promise<void>;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: '👋 Hey there! I\'m the ATBH Concierge — your friendly AI guide. Chat with me about anything at all! Ask about Asuogyaman attractions, dining, stay, how to donate and support the community, or just have a conversation. I\'m here for you!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const activeVideoUrl = '/Images/dodi vid.mp4';

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    const aiResponse = await askConcierge(userMsg, messages);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <AppContext.Provider value={{
      isChatOpen, setIsChatOpen,
      isBookingOpen, setIsBookingOpen,
      isVideoOpen, setIsVideoOpen,
      isMenuOpen, setIsMenuOpen,
      isTermsOpen, setIsTermsOpen,
      isPrivacyOpen, setIsPrivacyOpen,
      isTyping, chatInput, setChatInput,
      messages, setMessages,
      activeVideoUrl, handleSendMessage, chatEndRef,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
