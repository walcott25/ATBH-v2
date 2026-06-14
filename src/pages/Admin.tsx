import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useUser } from '@clerk/react';
import { Link, Navigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  DollarSign, Users, Eye, TrendingUp, TrendingDown, RefreshCw,
  Loader2, UserPlus, Building2, Activity, Clock, ArrowRight,
  Calendar, Target, Wallet, Shield,
} from 'lucide-react';

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
  clerk: {
    totalUsers: number;
    newUsersThisMonth: number;
    totalOrganizations: number;
    activeSessions: number;
    recentSignUps: { id: string; email: string; created_at: string }[];
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

function AccessDenied() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h1 className="text-2xl font-semibold text-fg mb-2">Access Denied</h1>
        <p className="text-muted text-sm mb-6">You do not have permission to view this page.</p>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default function Admin() {
  const { isLoaded, isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

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

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  if (!isAdmin) return <AccessDenied />;

  const d = data?.donations;
  const c = data?.clerk;
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
      title: 'Users',
      value: fmt(num(c?.totalUsers)),
      icon: UserPlus,
      trend: <TrendBadge current={num(c?.newUsersThisMonth)} previous={Math.max(1, num(c?.totalUsers) - num(c?.newUsersThisMonth))} />,
    },
    {
      title: 'New Users (Month)',
      value: fmt(num(c?.newUsersThisMonth)),
      icon: TrendingUp,
      trend: null,
    },
    {
      title: 'Active Sessions',
      value: fmt(num(c?.activeSessions)),
      icon: Activity,
      trend: null,
    },
    {
      title: 'Organizations',
      value: fmt(num(c?.totalOrganizations)),
      icon: Building2,
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
          <button
            onClick={fetchAnalytics}
            className="inline-flex items-center gap-1.5 text-[10px] font-medium text-muted hover:text-fg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
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
              className="bg-surface border border-border rounded-md p-4 md:p-5 hover:border-accent/20 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-1.5">
                <card.icon className="w-4 h-4 text-muted" />
                {card.trend}
              </div>
              <div className="text-xl md:text-2xl font-semibold text-fg tracking-tight">{card.value}</div>
              <div className="text-[10px] text-muted mt-0.5">{card.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Live Clerk Analytics */}
        {c && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-md p-5 mb-8"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-semibold text-fg">Clerk Analytics</h2>
                <span className="flex items-center gap-1 text-[9px] text-emerald-500 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Users', value: fmt(num(c.totalUsers)), icon: UserPlus },
                { label: 'New This Month', value: fmt(num(c.newUsersThisMonth)), icon: TrendingUp },
                { label: 'Active Sessions', value: fmt(num(c.activeSessions)), icon: Activity },
                { label: 'Organizations', value: fmt(num(c.totalOrganizations)), icon: Building2 },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-bg/60 border border-border/60 rounded-md p-3.5"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <s.icon className="w-3 h-3 text-muted" />
                    <span className="text-[10px] text-muted">{s.label}</span>
                  </div>
                  <div className="text-lg font-semibold text-fg">{s.value}</div>
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
            className="bg-surface border border-border rounded-md p-5 mb-8"
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
                className="h-full bg-accent rounded-full"
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
              className="bg-surface border border-border rounded-md p-5"
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
              className="bg-surface border border-border rounded-md p-5"
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
              className="bg-surface border border-border rounded-md p-5"
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
              className="bg-surface border border-border rounded-md p-5"
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

        {/* Recent Activity — two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          {d?.recentDonations && d.recentDonations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-md p-5"
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

          {/* Recent Sign-Ups */}
          {c?.recentSignUps && c.recentSignUps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-md p-5"
            >
              <h2 className="text-sm font-semibold text-fg mb-4">Recent Sign-Ups</h2>
              <div className="space-y-0">
                {c.recentSignUps.slice(0, 8).map((item, i) => (
                  <div key={item.id} className="flex items-start justify-between py-2.5 border-b border-border last:border-b-0">
                    <div className="min-w-0">
                      <p className="text-sm text-fg truncate">{item.email}</p>
                      <p className="text-[10px] text-muted">{item.id.slice(0, 12)}...</p>
                    </div>
                    <span className="text-[10px] text-muted shrink-0 ml-4">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
