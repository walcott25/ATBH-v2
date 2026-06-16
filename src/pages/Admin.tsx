import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  DollarSign, Users, Eye, TrendingUp, TrendingDown, RefreshCw,
  Loader2, UserPlus, Building2, Activity, Clock, ArrowRight,
  Calendar, Target, Wallet, Shield, LayoutDashboard, ChevronRight,
  Bell, BellRing, Send, EyeOff, Trash2, Megaphone, Plus,
} from 'lucide-react';
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

const CURRENCY = 'GH₵';

interface Analytics {
  donations: {
    totalRaised: number;
    donorCount: number;
    donationCount: number;
    monthlyRaised: number;
    monthlyDonations: number;
    monthlyDonors: number;
    monthlyGoal: number;
    prevMonthRaised: number;
    byDay: { day: string; total: number; count: number }[];
    byPurpose: { purpose: string; total: number; count: number }[];
    recentDonations: { donor_name: string; donor_email: string; amount: number; purpose: string; created_at: string }[];
  };
  traffic: {
    visitsToday: number;
    visitsThisWeek: number;
    totalVisits: number;
    topPages: { path: string; count: number }[];
    visitsByDay: { day: string; count: number }[];
  };
  health: {
    groqConfigured: boolean;
    paystackConfigured: boolean;
    webhookConfigured: boolean;
  };
}

const CHART_COLORS = ['#C5954A', '#D4A95A', '#E3BD6A', '#F2D17A', '#A67B3A', '#8B6528', '#70501A', '#5A3D10'];
const PIE_COLORS = ['#C5954A', '#D4A95A', '#E3BD6A', '#8B6528', '#70501A', '#A67B3A'];

function num(value: number | string | undefined): number {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(n as number) ? 0 : (n as number);
}

function fmt(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString();
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-border/60 rounded-md ${className}`} />;
}

function TrendBadge({ current, previous }: { current: number; previous: number }) {
  if (!previous) return null;
  const pct = ((current - previous) / previous) * 100;
  const up = pct >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium ${up ? 'text-emerald-500' : 'text-red-500'}`}>
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

type NotificationType = 'info' | 'warning' | 'success' | 'emergency'

interface NotificationForm {
  title: string
  message: string
  type: NotificationType
  link: string
  linkText: string
  active: boolean
}

const TEMPLATES: { id: string; name: string; form: NotificationForm }[] = [
  {
    id: 'maintenance',
    name: 'Scheduled Maintenance',
    form: { title: 'Scheduled Maintenance', message: 'The site will be under maintenance on [date] from [time] to [time]. Some features may be unavailable.', type: 'warning', link: '', linkText: '', active: true },
  },
  {
    id: 'event',
    name: 'Upcoming Event',
    form: { title: 'Upcoming Event', message: 'Join us for [event name] on [date] at [venue]. Everyone is welcome!', type: 'info', link: '', linkText: 'Learn more', active: true },
  },
  {
    id: 'announcement',
    name: 'Special Announcement',
    form: { title: 'Announcement', message: '[Your announcement message here]', type: 'success', link: '', linkText: '', active: true },
  },
  {
    id: 'emergency',
    name: 'Emergency Alert',
    form: { title: 'Emergency Alert', message: '[Emergency message here]', type: 'emergency', link: '', linkText: '', active: true },
  },
  {
    id: 'promotion',
    name: 'Promotion / Offer',
    form: { title: 'Special Offer', message: '[Offer details here]. Valid until [date].', type: 'success', link: '/donate', linkText: 'Donate now', active: true },
  },
]

export default function Admin() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [notifTab, setNotifTab] = useState<'templates' | 'history'>('templates')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [notifForm, setNotifForm] = useState<NotificationForm>({ title: '', message: '', type: 'info', link: '', linkText: '', active: true })
  const [sending, setSending] = useState(false)

  const activeNotification = useQuery(api.notifications.getActive)
  const notificationHistory = useQuery(api.notifications.list)
  const publishNotification = useMutation(api.notifications.publish)
  const deactivateNotification = useMutation(api.notifications.deactivate)
  const deleteNotification = useMutation(api.notifications.remove)

  const [authenticated, setAuthenticated] = useState(() => {
    try { return sessionStorage.getItem('atbh_admin_auth') === '1' } catch { return false }
  })
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (loginUser === 'Admin' && loginPass === 'Asuda@1970') {
      setAuthenticated(true)
      try { sessionStorage.setItem('atbh_admin_auth', '1') } catch {}
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    try { sessionStorage.removeItem('atbh_admin_auth') } catch {}
  }

  const fetchAnalytics = useCallback(async () => {
    try {
      setError(false);
      const res = await fetch('/api/admin/analytics');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastUpdated(new Date());
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [fetchAnalytics]);

  const loadTemplate = (id: string) => {
    const tpl = TEMPLATES.find(t => t.id === id)
    if (tpl) {
      setSelectedTemplate(id)
      setNotifForm({ ...tpl.form })
    }
  }

  const handlePublish = async () => {
    if (!notifForm.title.trim() || !notifForm.message.trim()) return
    setSending(true)
    try {
      await publishNotification({
        title: notifForm.title.trim(),
        message: notifForm.message.trim(),
        type: notifForm.type,
        link: notifForm.link.trim() || undefined,
        linkText: notifForm.linkText.trim() || undefined,
        active: notifForm.active,
      })
      setSelectedTemplate(null)
      setNotifForm({ title: '', message: '', type: 'info', link: '', linkText: '', active: true })
    } catch (e) {
      console.error('Failed to publish notification', e)
    } finally {
      setSending(false)
    }
  }

  const d = data?.donations;
  const t = data?.traffic;
  const h = data?.health;
  const prevMonth = d?.prevMonthRaised || 0;

  const statCards = [
    {
      title: 'Total Raised',
      value: `${CURRENCY}${fmt(num(d?.totalRaised))}`,
      icon: DollarSign,
      trend: <TrendBadge current={num(d?.monthlyRaised)} previous={prevMonth} />,
    },
    {
      title: 'Donors',
      value: fmt(num(d?.donorCount)),
      icon: Users,
      trend: <span className="text-[10px] text-muted">{fmt(num(d?.monthlyDonors))} this month</span>,
    },
    {
      title: 'Donations',
      value: fmt(num(d?.donationCount)),
      icon: Wallet,
      trend: <span className="text-[10px] text-muted">{fmt(num(d?.monthlyDonations))} this month</span>,
    },
    {
      title: 'Visits Today',
      value: fmt(num(t?.visitsToday)),
      icon: Eye,
      trend: <span className="text-[10px] text-muted">{fmt(num(t?.visitsThisWeek))} this week</span>,
    },
    {
      title: 'Total Visits',
      value: fmt(num(t?.totalVisits)),
      icon: Activity,
      trend: null,
    },
    {
      title: 'Monthly Goal',
      value: `${CURRENCY}${fmt(num(d?.monthlyGoal))}`,
      icon: Target,
      trend: (
        <div className="flex items-center gap-1.5">
          <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (num(d?.monthlyRaised) / num(d?.monthlyGoal)) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-muted">
            {((num(d?.monthlyRaised) / num(d?.monthlyGoal)) * 100).toFixed(0)}%
          </span>
        </div>
      ),
    },
  ];

  const chartData = d?.byDay?.slice(-14).map((r) => ({
    name: r.day ? new Date(r.day + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
    amount: r.total,
    count: r.count,
  })) || [];

  const trendData = d?.byDay?.slice(-30).map((r) => ({
    name: r.day ? new Date(r.day + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
    amount: r.total,
  })) || [];

  const purposeData = d?.byPurpose?.map((r) => ({
    name: r.purpose || 'General',
    value: num(r.total),
    count: r.count,
  })) || [];

  const monthlyPct = num(d?.monthlyGoal) ? Math.min(100, (num(d?.monthlyRaised) / num(d?.monthlyGoal)) * 100) : 0;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-surface border border-border rounded-sm p-8"
          >
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-lg font-semibold text-fg">Admin Login</h1>
              <p className="text-xs text-muted mt-1">Asuogyaman Tourism Hub</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1.5">Username</label>
                <input
                  value={loginUser}
                  onChange={e => setLoginUser(e.target.value)}
                  className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2.5 text-sm text-fg focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1.5">Password</label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2.5 text-sm text-fg focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="Enter password"
                />
              </div>

              {loginError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {loginError}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full bg-accent text-accent-fg py-2.5 text-sm font-medium rounded-sm hover:bg-accent/90 transition-all"
              >
                Sign In
              </button>
            </form>

            <p className="text-[10px] text-muted/50 text-center mt-6">
              Authorized personnel only
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface border border-border rounded-md p-5">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-7 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Skeleton className="h-72 rounded-md" />
            <Skeleton className="h-72 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-semibold text-fg mb-2">Unable to load data</h1>
          <p className="text-muted text-sm mb-6">Check your connection and try again.</p>
          <button
            onClick={fetchAnalytics}
            className="inline-flex items-center gap-2 bg-accent text-accent-fg px-6 py-3 text-sm font-medium rounded-xl hover:bg-accent/90 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[10px] text-muted font-medium tracking-wider uppercase mb-4">
          <LayoutDashboard className="w-3 h-3" />
          <span>Admin</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-fg">Dashboard</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-semibold text-fg tracking-tight"
            >
              Dashboard
            </motion.h1>
            {lastUpdated && (
              <p className="text-[10px] text-muted mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last updated {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-muted border border-border rounded-sm hover:border-red-300 hover:text-red-600 transition-all duration-300"
            >
              Logout
            </button>
            <button
              onClick={fetchAnalytics}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-muted border border-border rounded-sm hover:border-accent/30 hover:text-fg transition-all duration-300"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group bg-surface border border-border rounded-sm p-4 md:p-5 hover:border-accent/25 hover:shadow-[0_0_20px_-8px_rgba(197,149,74,0.15)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-1.5">
                <card.icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-300" />
                {card.trend}
              </div>
              <div className="text-xl md:text-2xl font-semibold text-fg tracking-tight">{card.value}</div>
              <div className="text-[10px] text-muted mt-0.5">{card.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Health Status */}
        {h && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-sm p-5 mb-8 hover:border-accent/15 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-semibold text-fg">System Health</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Groq AI', ok: h.groqConfigured },
                { label: 'Paystack', ok: h.paystackConfigured },
                { label: 'Webhook', ok: h.webhookConfigured },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-bg/60 border border-border/60 rounded-sm p-3.5 hover:border-accent/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${s.ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] text-muted">{s.label}</span>
                  </div>
                  <div className="text-xs font-medium text-fg">{s.ok ? 'Connected' : 'Not Configured'}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Monthly Progress */}
        {num(d?.monthlyGoal) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-sm p-5 mb-8 hover:border-accent/15 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-semibold text-fg">Monthly Progress</h2>
              </div>
              <span className="text-xs text-muted">
                {CURRENCY}{fmt(num(d?.monthlyRaised))} / {CURRENCY}{fmt(num(d?.monthlyGoal))}
              </span>
            </div>
            <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${monthlyPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-muted">{monthlyPct.toFixed(0)}% of monthly goal</span>
              <span className="text-[10px] text-muted">
                {CURRENCY}{fmt(Math.max(0, num(d?.monthlyGoal) - num(d?.monthlyRaised)))} remaining
              </span>
            </div>
          </motion.div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart — Trend */}
          {trendData.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-sm p-5 hover:border-accent/15 transition-colors duration-300"
            >
              <h2 className="text-sm font-semibold text-fg mb-4">Donation Trend (30 Days)</h2>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C5954A" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#C5954A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#737373' }} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 11, fill: '#737373' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '6px', border: '1px solid #E5E5E5', fontSize: '12px' }}
                    formatter={(value: number) => [`${CURRENCY}${value}`, 'Amount']}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#C5954A" strokeWidth={2} fill="url(#trendGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Bar Chart — Daily Donations */}
          {chartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-sm p-5 hover:border-accent/15 transition-colors duration-300"
            >
              <h2 className="text-sm font-semibold text-fg mb-4">Daily Donations (14 Days)</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#737373' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#737373' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '6px', border: '1px solid #E5E5E5', fontSize: '12px' }}
                    formatter={(value: number) => [`${CURRENCY}${value}`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="#C5954A" radius={[3, 3, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Donut Chart — By Purpose */}
          {purposeData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-sm p-5 hover:border-accent/15 transition-colors duration-300"
            >
              <h2 className="text-sm font-semibold text-fg mb-4">Donations by Purpose</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={purposeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {purposeData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '6px', border: '1px solid #E5E5E5', fontSize: '12px' }}
                    formatter={(value: number) => [`${CURRENCY}${value}`, 'Amount']}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', color: '#737373' }}
                    formatter={(value: string) => <span className="text-muted">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Line Chart — Donation Count Trend */}
          {chartData.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-sm p-5 hover:border-accent/15 transition-colors duration-300"
            >
              <h2 className="text-sm font-semibold text-fg mb-4">Daily Donation Count</h2>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#737373' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#737373' }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '6px', border: '1px solid #E5E5E5', fontSize: '12px' }}
                    formatter={(value: number) => [value, 'Donations']}
                  />
                  <Line type="monotone" dataKey="count" stroke="#D4A95A" strokeWidth={2} dot={{ r: 3, fill: '#D4A95A' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        {/* Recent Donations */}
        {d?.recentDonations && d.recentDonations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-sm p-5 hover:border-accent/15 transition-colors duration-300"
          >
            <h2 className="text-sm font-semibold text-fg mb-4">Recent Donations</h2>
            <div className="space-y-0">
              {d.recentDonations.slice(0, 8).map((item, i) => (
                <div key={i} className="flex items-start justify-between py-2.5 border-b border-border last:border-b-0">
                  <div className="min-w-0">
                    <p className="text-sm text-fg truncate">{item.donor_name || 'Anonymous'}</p>
                    <p className="text-[10px] text-muted truncate">{item.purpose}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-medium text-fg">{CURRENCY}{item.amount}</p>
                    <p className="text-[10px] text-muted">
                      {item.created_at ? new Date(item.created_at + 'Z').toLocaleDateString() : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notifications Management */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-border rounded-sm p-5 mt-8 hover:border-accent/15 transition-colors duration-300"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <Bell className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-semibold text-fg">Site Notifications</h2>
            {activeNotification && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                <BellRing className="w-3 h-3" /> Active
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-5 border-b border-border">
            <button
              onClick={() => setNotifTab('templates')}
              className={`pb-2.5 text-xs font-medium border-b-2 transition-colors ${notifTab === 'templates' ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'}`}
            >
              <Megaphone className="w-3 h-3 inline mr-1" /> Templates & Compose
            </button>
            <button
              onClick={() => setNotifTab('history')}
              className={`pb-2.5 text-xs font-medium border-b-2 transition-colors ${notifTab === 'history' ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'}`}
            >
              <Clock className="w-3 h-3 inline mr-1" /> History
            </button>
          </div>

          {notifTab === 'templates' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Templates + Form */}
              <div className="space-y-4">
                <p className="text-[10px] text-muted uppercase tracking-wider font-medium mb-2">Choose a template</p>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES.map(tpl => (
                    <button
                      key={tpl.id}
                      onClick={() => loadTemplate(tpl.id)}
                      className={`text-left p-3 rounded-sm border text-xs transition-all ${
                        selectedTemplate === tpl.id
                          ? 'border-accent bg-accent/5 text-fg'
                          : 'border-border bg-bg/40 text-muted hover:border-accent/30 hover:text-fg'
                      }`}
                    >
                      <div className="font-medium mb-0.5">{tpl.name}</div>
                      <div className="text-[10px] opacity-60">{tpl.form.type}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1">Title</label>
                    <input
                      value={notifForm.title}
                      onChange={e => setNotifForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2 text-xs text-fg focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Notification title"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1">Message</label>
                    <textarea
                      value={notifForm.message}
                      onChange={e => setNotifForm(p => ({ ...p, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2 text-xs text-fg focus:outline-none focus:border-accent/50 transition-colors resize-none"
                      placeholder="Notification message"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1">Type</label>
                      <select
                        value={notifForm.type}
                        onChange={e => setNotifForm(p => ({ ...p, type: e.target.value as NotificationType }))}
                        className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2 text-xs text-fg focus:outline-none focus:border-accent/50 transition-colors"
                      >
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="success">Success</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1">Active</label>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setNotifForm(p => ({ ...p, active: !p.active }))}
                          className={`relative w-9 h-5 rounded-full transition-colors ${notifForm.active ? 'bg-accent' : 'bg-border'}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifForm.active ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                        </button>
                        <span className="text-xs text-muted">{notifForm.active ? 'Publish now' : 'Save as draft'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1">Link (optional)</label>
                      <input
                        value={notifForm.link}
                        onChange={e => setNotifForm(p => ({ ...p, link: e.target.value }))}
                        className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2 text-xs text-fg focus:outline-none focus:border-accent/50 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-muted font-medium uppercase tracking-wider block mb-1">Link text</label>
                      <input
                        value={notifForm.linkText}
                        onChange={e => setNotifForm(p => ({ ...p, linkText: e.target.value }))}
                        className="w-full bg-bg/60 border border-border rounded-sm px-3 py-2 text-xs text-fg focus:outline-none focus:border-accent/50 transition-colors"
                        placeholder="Learn more"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handlePublish}
                    disabled={sending || !notifForm.title.trim() || !notifForm.message.trim()}
                    className="inline-flex items-center gap-1.5 bg-accent text-accent-fg px-4 py-2 text-xs font-medium rounded-sm hover:bg-accent/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                    {sending ? 'Publishing...' : notifForm.active ? 'Publish Notification' : 'Save Draft'}
                  </button>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="bg-bg/40 border border-border rounded-sm p-4">
                <p className="text-[10px] text-muted uppercase tracking-wider font-medium mb-3">Preview</p>
                {notifForm.title || notifForm.message ? (
                  <div className={`rounded-sm px-4 py-3 border text-xs ${
                    notifForm.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                    notifForm.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                    notifForm.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                    'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className="text-base leading-none shrink-0 mt-0.5">
                        {notifForm.type === 'warning' ? '⚠️' : notifForm.type === 'success' ? '✅' : notifForm.type === 'emergency' ? '🚨' : 'ℹ️'}
                      </span>
                      <div>
                        <p className="font-medium">{notifForm.title}</p>
                        <p className="mt-0.5 opacity-90">{notifForm.message}</p>
                        {notifForm.link && (
                          <a href="#" className="inline-flex items-center gap-1 mt-1.5 font-medium hover:underline">
                            {notifForm.linkText || 'Learn more'} <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted/50 italic">Select a template or fill in the fields to see a preview</p>
                )}
              </div>
            </div>
          )}

          {notifTab === 'history' && (
            <div>
              {notificationHistory && notificationHistory.length > 0 ? (
                <div className="space-y-2">
                  {notificationHistory.map(n => (
                    <div key={n._id} className="flex items-start justify-between py-3 border-b border-border last:border-b-0">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${n.active ? 'bg-emerald-500' : 'bg-border'}`} />
                          <span className="text-xs font-medium text-fg">{n.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${
                            n.type === 'info' ? 'bg-blue-100 text-blue-700' :
                            n.type === 'warning' ? 'bg-amber-100 text-amber-700' :
                            n.type === 'success' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>{n.type}</span>
                        </div>
                        <p className="text-xs text-muted mt-0.5 truncate max-w-md">{n.message}</p>
                        <p className="text-[10px] text-muted/50 mt-0.5">
                          {new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-4">
                        {n.active ? (
                          <button
                            onClick={async () => { try { await deactivateNotification({ id: n._id }) } catch {} }}
                            className="p-1.5 rounded-md text-muted hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                            title="Deactivate"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                        ) : null}
                        <button
                          onClick={async () => { try { await deleteNotification({ id: n._id }) } catch {} }}
                          className="p-1.5 rounded-md text-muted hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-8 h-8 text-muted/30 mx-auto mb-2" />
                  <p className="text-xs text-muted/50">No notifications sent yet</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
