import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Check, Shield, CreditCard, Smartphone, Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref?: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string; status: string; transaction?: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

const DONATION_PRESETS = [
  { amount: 50, label: 'GH₵50' },
  { amount: 100, label: 'GH₵100' },
  { amount: 200, label: 'GH₵200' },
  { amount: 500, label: 'GH₵500' },
  { amount: 1000, label: 'GH₵1,000' },
  { amount: 5000, label: 'GH₵5,000' },
];

const DONATION_REASONS = [
  { value: 'tourism', label: 'Tourism Development' },
  { value: 'community', label: 'Community Projects' },
  { value: 'culture', label: 'Culture & Heritage' },
  { value: 'education', label: 'Education & Schools' },
  { value: 'general', label: 'General Support' },
];

const SMILING_IMAGES = [
  '/Images/smiling-community-1.jpg',
  '/Images/smiling-community-2.jpg',
  '/Images/smiling-community-3.jpg',
  '/Images/smiling-community-4.jpg',
];

export default function Donate() {
  const navigate = useNavigate();
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reason, setReason] = useState('general');
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [txnDetails, setTxnDetails] = useState<{
    reference: string;
    amount: number;
    currency: string;
    channel: string;
    paidAt?: string;
  } | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideInterval = 5000; // 5-second transitions

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SMILING_IMAGES.length);
    }, slideInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setCurrentSlide(slideIndex), 300);
    return () => clearTimeout(timeout);
  }, [slideIndex]);

  useEffect(() => {
    if (document.getElementById('paystack-inline-js')) {
      setPaystackLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.id = 'paystack-inline-js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    script.onerror = () => setError('Failed to load payment gateway.');
    document.head.appendChild(script);
    scriptRef.current = script;
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  const getAmount = (): number => {
    if (selectedPreset) return selectedPreset;
    const parsed = parseInt(customAmount, 10);
    return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
  };

  const handleDonate = () => {
    const amount = getAmount();
    if (amount < 5) { setError('Minimum donation is GH₵5'); return; }
    if (!email) { setError('Please enter your email address'); return; }
    if (!name) { setError('Please enter your name'); return; }
    if (!paystackLoaded || !window.PaystackPop) { setError('Payment gateway loading...'); return; }

    setError('');
    setProcessing(true);

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setError('Payment gateway not configured.');
      setProcessing(false);
      return;
    }

    const ref = 'DONATE-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);

    try {
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount: amount * 100,
        currency: 'GHS',
        ref,
        metadata: {
          custom_fields: [
            { display_name: 'Donor Name', variable_name: 'donor_name', value: name },
            { display_name: 'Donation Purpose', variable_name: 'donation_reason', value: reason },
            { display_name: 'Message', variable_name: 'donation_message', value: message || 'N/A' },
          ],
        },
        callback: async (response) => {
          setProcessing(false);
          setVerifying(true);

          try {
            const verifyRes = await fetch('/api/paystack/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ reference: response.reference }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.verified) {
              // Record the donation
              await fetch('/api/donations/record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: verifyData.transaction.reference,
                  amount: verifyData.transaction.amount,
                  currency: verifyData.transaction.currency,
                  channel: verifyData.transaction.channel,
                  donorName: name,
                  donorEmail: email,
                  purpose: reason,
                  message,
                  paidAt: verifyData.transaction.paidAt,
                }),
              });

              setTxnDetails({
                reference: verifyData.transaction.reference,
                amount: verifyData.transaction.amount,
                currency: verifyData.transaction.currency,
                channel: verifyData.transaction.channel,
                paidAt: verifyData.transaction.paidAt,
              });
              setSuccess(true);
            } else {
              setError(verifyData.error || 'Verification failed. Ref: ' + response.reference);
            }
          } catch {
            setTxnDetails({ reference: response.reference, amount: getAmount(), currency: 'GHS', channel: 'card' });
            setSuccess(true);
          }
          setVerifying(false);
        },
        onClose: () => {
          setProcessing(false);
          setError('Payment window was closed.');
        },
      });
      handler.openIframe();
    } catch {
      setProcessing(false);
      setError('An error occurred. Please try again.');
    }
  };

  const handlePresetClick = (amount: number) => {
    setSelectedPreset(selectedPreset === amount ? null : amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value.replace(/[^0-9]/g, ''));
    setSelectedPreset(null);
  };

  const resetForm = () => {
    setSuccess(false); setTxnDetails(null);
    setCustomAmount(''); setSelectedPreset(null);
    setEmail(''); setName(''); setMessage(''); setReason('general'); setError('');
  };

  // Success Screen
  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 via-transparent to-transparent" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative z-10 text-center max-w-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-28 h-28 rounded-full bg-brand-gold/10 mx-auto mb-8 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 animate-ping opacity-30" />
            <div className="w-20 h-20 rounded-full bg-brand-gold flex items-center justify-center">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4 tracking-tight">Thank You!</h1>
          <p className="text-brand-dark/60 text-lg leading-relaxed mb-8">
            Your generous donation of <span className="text-brand-gold font-bold">GH₵{txnDetails?.amount.toLocaleString()}</span> will make a real difference.
          </p>
          {txnDetails && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="bg-brand-gold/5 border border-brand-gold/10 rounded-2xl p-5 mb-10 text-left"
            >
              <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-dark/30 mb-4">Transaction Details</div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-dark/40">Reference</span>
                  <span className="text-brand-dark/70 font-mono text-[11px]">{txnDetails.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dark/40">Amount</span>
                  <span className="text-brand-gold font-bold">GH₵{txnDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dark/40">Channel</span>
                  <span className="text-brand-dark/70 capitalize">{txnDetails.channel}</span>
                </div>
                {txnDetails.paidAt && (
                  <div className="flex justify-between">
                    <span className="text-brand-dark/40">Date</span>
                    <span className="text-brand-dark/70">{new Date(txnDetails.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/')} className="bg-brand-dark/5 hover:bg-brand-dark/10 text-brand-dark border border-brand-dark/10 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all">
              Return Home
            </button>
            <button onClick={resetForm} className="bg-brand-gold text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-gold/90">
              Donate Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Verifying Screen
  if (verifying) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full border-2 border-brand-gold/30 border-t-brand-gold mx-auto mb-8"
          />
          <h2 className="text-2xl font-serif text-brand-dark mb-3">Verifying Your Payment</h2>
          <p className="text-brand-dark/40 text-sm">Please wait while we confirm your transaction...</p>
        </motion.div>
      </div>
    );
  }

  // Main Page
  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero with Crossfading Smiling People */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        {SMILING_IMAGES.map((img, i) => (
          <motion.div
            key={img}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: currentSlide === i ? 1 : 0, scale: currentSlide === i ? 1 : 1.1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ zIndex: currentSlide === i ? 1 : 0 }}
          >
            <img src={img} alt="Community" className="w-full h-full object-cover" />
          </motion.div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-[2]" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12 md:pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-brand-gold/60" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Make a Difference</span>
              <span className="w-10 h-[2px] bg-brand-gold/60" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-dark leading-[0.9] tracking-tighter mb-5">
              Support Our<br />
              <span className="italic text-brand-gold">Community</span>
            </h1>
            <p className="text-brand-dark/50 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
              Every contribution helps preserve our cultural heritage, develop tourism,
              and create opportunities for communities along the Volta River.
            </p>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SMILING_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentSlide === i ? 'bg-brand-gold w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="relative px-6 pb-24 -mt-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl shadow-brand-dark/5 border border-brand-dark/5 p-8 md:p-12"
          >
            {/* Amount Selection */}
            <div className="mb-8">
              <h3 className="text-brand-dark text-[10px] uppercase tracking-[0.25em] font-bold mb-4">Choose Amount</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {DONATION_PRESETS.map((preset) => (
                  <button
                    key={preset.amount}
                    onClick={() => handlePresetClick(preset.amount)}
                    className={`py-3.5 px-3 rounded-2xl text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 border ${
                      selectedPreset === preset.amount
                        ? 'bg-brand-gold text-white border-brand-gold shadow-lg shadow-brand-gold/20'
                        : 'bg-brand-dark/[0.02] text-brand-dark/60 border-brand-dark/10 hover:border-brand-gold/40 hover:text-brand-dark'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-dark/30 text-sm font-bold">GH₵</span>
                <input
                  type="text" inputMode="numeric" placeholder="Custom amount"
                  value={customAmount} onChange={handleCustomAmountChange}
                  className="w-full bg-brand-dark/[0.02] border border-brand-dark/10 rounded-2xl py-4 pl-14 pr-5 text-brand-dark text-lg placeholder:text-brand-dark/20 outline-none focus:border-brand-gold/50 transition-all"
                />
              </div>
              {getAmount() > 0 && (
                <div className="mt-3 text-brand-dark/40 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Donating <span className="text-brand-gold font-bold">GH₵{getAmount().toLocaleString()}</span></span>
                </div>
              )}
            </div>

            {/* Personal Info */}
            <div className="space-y-5 mb-8">
              <h3 className="text-brand-dark text-[10px] uppercase tracking-[0.25em] font-bold mb-3">Your Details</h3>
              <div>
                <label className="block text-brand-dark/40 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">Full Name</label>
                <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-dark/[0.02] border border-brand-dark/10 rounded-2xl py-4 px-5 text-brand-dark placeholder:text-brand-dark/20 outline-none focus:border-brand-gold/50 transition-all" />
              </div>
              <div>
                <label className="block text-brand-dark/40 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">Email Address</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-dark/[0.02] border border-brand-dark/10 rounded-2xl py-4 px-5 text-brand-dark placeholder:text-brand-dark/20 outline-none focus:border-brand-gold/50 transition-all" />
              </div>
              <div>
                <label className="block text-brand-dark/40 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">Purpose</label>
                <div className="relative">
                  <select value={reason} onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-brand-dark/[0.02] border border-brand-dark/10 rounded-2xl py-4 px-5 text-brand-dark outline-none focus:border-brand-gold/50 transition-all appearance-none cursor-pointer"
                  >
                    {DONATION_REASONS.map((r) => (
                      <option key={r.value} value={r.value} className="text-brand-dark">{r.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/30 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-brand-dark/40 text-[9px] uppercase tracking-[0.2em] font-bold mb-1.5">Message <span className="text-brand-dark/20">(Optional)</span></label>
                <textarea placeholder="Leave a message..." value={message} onChange={(e) => setMessage(e.target.value)} rows={2}
                  className="w-full bg-brand-dark/[0.02] border border-brand-dark/10 rounded-2xl py-4 px-5 text-brand-dark placeholder:text-brand-dark/20 outline-none focus:border-brand-gold/50 transition-all resize-none" />
              </div>
            </div>

            {/* Payment info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-brand-gold/[0.04] rounded-2xl border border-brand-gold/10">
              <Smartphone className="w-5 h-5 text-brand-gold shrink-0" />
              <div className="text-brand-dark/40 text-xs leading-relaxed">
                Secure via <span className="text-brand-dark/70">Paystack</span> — Mobile Money, Cards & Bank
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              onClick={handleDonate}
              disabled={processing || !paystackLoaded || getAmount() <= 0}
              className="w-full bg-brand-gold text-white py-5 rounded-2xl text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 hover:bg-brand-gold/90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-brand-gold flex items-center justify-center gap-3 shadow-xl shadow-brand-gold/20"
            >
              {processing ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : !paystackLoaded ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading...</>
              ) : getAmount() <= 0 ? (
                'Select an Amount'
              ) : (
                <><Heart className="w-4 h-4" /> Donate GH₵{getAmount().toLocaleString()}</>
              )}
            </button>

            {/* Security */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-brand-dark/20 text-[9px] uppercase tracking-[0.2em] font-bold">
              <Shield className="w-2.5 h-2.5" /> Secured by Paystack
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
