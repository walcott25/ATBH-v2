import React from 'react';

export default function RainbowBordersButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rainbow-border group relative bg-brand-gold text-brand-dark px-12 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-gold/30 active:scale-95"
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </button>
  );
}
