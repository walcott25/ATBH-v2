import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, GraduationCap, Globe, Building2, Loader2, CheckCircle, AlertCircle, TrendingUp, Users, Repeat, Sparkles } from 'lucide-react';
import AnimatedCounter from '../components/ui/animated-counter';
import AnimatedSection from '../components/animations/animated-section';
import PageHero from '../components/ui/page-hero';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const REASONS = [
  {
    icon: Heart,
    title: 'Community Development',
    description: 'Fund healthcare, clean water, and vocational training programs that uplift families across the Asuogyaman District.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Schools',
    description: 'Support school infrastructure, educational resources, and scholarships for students in need.',
  },
  {
    icon: Globe,
    title: 'Cultural Preservation',
    description: 'Preserve festivals, oral traditions, and historical landmarks that define our heritage.',
  },
  {
    icon: Building2,
    title: 'Tourism Infrastructure',
    description: 'Develop eco-lodges, trails, and visitor facilities that boost sustainable tourism along the Volta River.',
  },
];

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

interface DonorEntry {
  name: string; amount: number; purpose: string; time: string;
}

interface DonationStats {
  totalRaised: number;
  donorCount: number;
  projectsFunded: number;
  recentDonors: DonorEntry[];
}

export default function Donate() {
  const [form, setForm] = useState({ amount: '', name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [stats, setStats] = useState<DonationStats>({
    totalRaised: 0, donorCount: 0, projectsFunded: 0, recentDonors: [],
  });

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/donations/stats');
      if (res.ok) setStats(await res.json());
    } catch { /* silent */ }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setPreset = (val: number) => setForm((prev) => ({ ...prev, amount: String(val) }));

  const handlePaystack = () => {
    const amountVal = parseInt(form.amount, 10);
    if (!amountVal || amountVal < 1) return;

    if (!PAYSTACK_PUBLIC_KEY) {
      setErrorMsg('Paystack is not configured. Please set VITE_PAYSTACK_PUBLIC_KEY in your environment.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    if (!form.email) {
      setErrorMsg('Please enter your email address.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    if (!form.name) {
      setErrorMsg('Please enter your full name.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('processing');

    const reference = `ATBH-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: amountVal * 100,
      currency: 'GHS',
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: 'Donor Name', variable_name: 'donor_name', value: form.name },
          { display_name: 'Message', variable_name: 'message', value: form.message || 'No message' },
        ],
      },
      callback: async () => {
        setStatus('success');
        setForm({ amount: '', name: '', email: '', message: '' });
        fetch('/api/donations/record', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference,
            amount: amountVal,
            currency: 'GHS',
            channel: 'card',
            donorName: form.name,
            donorEmail: form.email,
            purpose: 'general',
            message: form.message || '',
          }),
        }).then(() => fetchStats()).catch(() => {});
        setTimeout(() => setStatus('idle'), 5000);
      },
      onClose: () => {
        setStatus('idle');
      },
    });

    handler.openIframe();
  };

  return (
    <main className="min-h-screen bg-bg">
      <PageHero
        title="Support Asuogyaman"
        description="Your contributions directly fund community-led projects that preserve our culture, improve education, develop tourism infrastructure, and create lasting opportunities for the people of Asuogyaman."
        badge="Donate"
      />

      <div className="mx-auto max-w-5xl px-6 pb-24">
        {/* Donation reason cards */}
        <div className="mb-20 grid gap-5 sm:grid-cols-2">
          {REASONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-surface p-6 hover-lift cursor-pointer"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-fg">{item.title}</h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact stats */}
        <AnimatedSection className="mb-8">
          <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="rounded-xl border border-border bg-surface p-4 md:p-6">
              <TrendingUp className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-medium text-fg">
                GH₵<AnimatedCounter value={stats.totalRaised} suffix="+" />
              </div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Total Raised</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4 md:p-6">
              <Users className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-medium text-fg">
                <AnimatedCounter value={stats.donorCount} suffix="+" />
              </div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Donors</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4 md:p-6">
              <Building2 className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-medium text-fg">
                <AnimatedCounter value={stats.projectsFunded} suffix="" />
              </div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-1">Projects Funded</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Recent Donors */}
        <AnimatedSection className="mb-8">
          <button
            onClick={() => setShowRecent(!showRecent)}
            className="flex items-center justify-between w-full rounded-xl border border-border bg-surface p-4 hover:border-accent/20 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-fg">Recent Supporters</span>
            </div>
            <motion.div animate={{ rotate: showRecent ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </motion.div>
          </button>
          <AnimatePresence>
            {showRecent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-1">
                  {stats.recentDonors.length === 0 ? (
                    <div className="text-center py-6 text-xs text-muted">No donations yet. Be the first!</div>
                  ) : stats.recentDonors.map((donor, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border/60 bg-bg/50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-medium text-accent">
                          {donor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-fg">{donor.name}</p>
                          <p className="text-[9px] text-muted">{donor.purpose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-accent">GH₵{donor.amount}</p>
                        <p className="text-[9px] text-muted">{donor.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedSection>

        {/* Donation form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-xl border border-border bg-surface p-8 md:p-10"
        >
          <h2 className="text-lg font-medium text-fg mb-6">Make a Donation</h2>

          {/* Recurring toggle */}
          <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-accent/5 border border-accent/10">
            <button
              onClick={() => setIsRecurring(!isRecurring)}
              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${isRecurring ? 'bg-accent' : 'bg-border'}`}
            >
              <motion.div
                animate={{ x: isRecurring ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
              />
            </button>
            <div className="flex items-center gap-2">
              <Repeat className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-fg">Make this a monthly donation</span>
              {isRecurring && <Sparkles className="w-3 h-3 text-accent" />}
            </div>
          </div>

          {/* Preset amounts */}
          <div className="flex flex-wrap gap-2 mb-6">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                onClick={() => setPreset(val)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  parseInt(form.amount) === val
                    ? 'bg-accent text-accent-fg border-accent'
                    : 'bg-bg text-muted border-border hover:border-accent/30 hover:text-fg'
                }`}
              >
                GH₵{val}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Amount (GH₵)</label>
              <input
                type="number" placeholder="e.g. 100" value={form.amount} onChange={update('amount')}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Full Name</label>
              <input
                type="text" placeholder="Your name" value={form.name} onChange={update('name')}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Email Address</label>
              <input
                type="email" placeholder="you@example.com" value={form.email} onChange={update('email')}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted">Message (optional)</label>
              <textarea
                rows={3} placeholder="Leave a note..." value={form.message} onChange={update('message')}
                className="w-full resize-none rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted/50 outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
              />
            </div>
          </div>

          <motion.button
            onClick={handlePaystack}
            disabled={status === 'processing' || status === 'success'}
            whileHover={status === 'idle' ? { scale: 1.01 } : {}}
            whileTap={status === 'idle' ? { scale: 0.99 } : {}}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-all hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === 'processing' ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
            ) : status === 'success' ? (
              <><CheckCircle className="h-4 w-4" /> Payment Successful — Thank You!</>
            ) : (
              <><Heart className="h-4 w-4" /> {isRecurring ? 'Start Monthly Donation' : 'Complete Donation'}</>
            )}
          </motion.button>

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-1.5 text-xs text-red-500"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMsg}
            </motion.p>
          )}

          {!PAYSTACK_PUBLIC_KEY && status === 'idle' && (
            <p className="mt-4 text-center text-xs text-muted">
              Payment processing is not yet configured. Set <code className="text-accent bg-accent/5 px-1 rounded">VITE_PAYSTACK_PUBLIC_KEY</code> to enable live donations.
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
