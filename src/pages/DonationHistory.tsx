import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Search, Calendar, CreditCard, ArrowRight, ExternalLink, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdinkraBg from '../components/ui/adinkra-bg';

interface DonationRecord {
  id: number;
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  donor_name: string;
  donor_email: string;
  purpose: string;
  message: string;
  status: string;
  paid_at: string;
  created_at: string;
}

export default function DonationHistory() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [searchedEmail, setSearchedEmail] = useState('');
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchHistory = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch(`/api/donations/history?email=${encodeURIComponent(email.trim())}`);
      const data = await res.json();
      setDonations(data.donations || []);
      setSearchedEmail(email.trim());
    } catch {
      setDonations([]);
    }
    setSearched(true);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistory();
  };

  const getTotalDonated = () => donations.reduce((sum, d) => sum + d.amount, 0);
  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return dateStr; }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <AdinkraBg variant="gye-nyame" opacity={0.03} color="#c8a96e">
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-brand-gold" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Your Impact</span>
              <span className="w-10 h-[2px] bg-brand-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark leading-[0.9] tracking-tighter mb-6">
              Donation<br />
              <span className="italic text-brand-gold">History</span>
            </h1>
            <p className="text-brand-dark/50 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Look up your past donations by entering the email address you used when donating.
            </p>
          </motion.div>
        </div>
      </section>
      </AdinkraBg>

      {/* Search Section */}
      <section className="px-6 pb-24 -mt-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl shadow-brand-dark/5 border border-brand-dark/5 p-8 md:p-10"
          >
            {/* Email Search */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-dark/[0.02] border border-brand-dark/10 rounded-2xl py-4 px-5 text-brand-dark placeholder:text-brand-dark/20 outline-none focus:border-brand-gold/50 transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={!email.trim() || loading}
                className="bg-brand-gold text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] transition-all hover:bg-brand-gold/90 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-brand-gold/20"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Search
              </button>
            </form>

            {/* Results */}
            {loading && (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-4" />
                <p className="text-brand-dark/40 text-sm">Looking up your donations...</p>
              </div>
            )}

            {!loading && searched && donations.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-brand-gold/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-brand-gold/40" />
                </div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">No donations found</h3>
                <p className="text-brand-dark/40 text-sm max-w-sm mx-auto mb-8">
                  We couldn't find any donations for <span className="text-brand-dark font-medium">{searchedEmail}</span>. If you've donated before, please check the email address or{' '}
                  <button onClick={() => navigate('/donate')} className="text-brand-gold hover:underline font-medium inline">make your first donation</button>.
                </p>
              </motion.div>
            )}

            {!loading && searched && donations.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Summary */}
                <div className="flex items-center justify-between mb-8 p-5 bg-brand-gold/[0.04] rounded-2xl border border-brand-gold/10">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-dark/30 mb-1">Total Donated</div>
                    <div className="text-2xl md:text-3xl font-serif text-brand-gold">GH₵{getTotalDonated().toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-dark/30 mb-1">Donations</div>
                    <div className="text-2xl md:text-3xl font-serif text-brand-dark">{donations.length}</div>
                  </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                  {donations.map((donation, i) => (
                    <motion.div
                      key={donation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-5 rounded-2xl border border-brand-dark/5 hover:border-brand-gold/20 hover:shadow-lg hover:shadow-brand-gold/5 transition-all duration-300 bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg font-serif text-brand-dark font-semibold">GH₵{donation.amount.toLocaleString()}</span>
                            <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white bg-green-500/90 px-2 py-0.5 rounded-full">
                              {donation.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-brand-dark/40">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(donation.created_at)}
                            </span>
                            <span className="flex items-center gap-1 capitalize">
                              <CreditCard className="w-3 h-3" />
                              {donation.channel}
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              Verified
                            </span>
                          </div>
                          <div className="mt-2 font-mono text-[9px] text-brand-dark/20 truncate">
                            Ref: {donation.reference}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <div className="w-12 h-12 rounded-full bg-brand-gold/5 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-brand-gold/60" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            {!searched && !loading && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-brand-gold/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-brand-gold/40" />
                </div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">See Your Impact</h3>
                <p className="text-brand-dark/40 text-sm max-w-sm mx-auto mb-8">
                  Enter the email you used when donating to see your complete donation history.
                </p>
                <button
                  onClick={() => navigate('/donate')}
                  className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-gold/90 shadow-lg shadow-brand-gold/20"
                >
                  <Heart className="w-4 h-4" />
                  Make a Donation
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
