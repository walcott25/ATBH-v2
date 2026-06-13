import { motion } from 'motion/react';
import { useUser } from '@clerk/react';
import { Link, Navigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, Users, Eye, TrendingUp } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', donations: 4200, views: 1200 },
  { name: 'Feb', donations: 3800, views: 980 },
  { name: 'Mar', donations: 5100, views: 1400 },
  { name: 'Apr', donations: 4600, views: 1100 },
  { name: 'May', donations: 5900, views: 1600 },
  { name: 'Jun', donations: 5300, views: 1350 },
];

const recentActivity = [
  { action: 'New donation of GH₵500 received', time: '2 minutes ago', user: 'Kwame A.' },
  { action: 'New user account created', time: '15 minutes ago', user: 'Esi M.' },
  { action: 'Page view spike detected on /attractions', time: '1 hour ago', user: 'System' },
  { action: 'Donation goal updated to GH₵10,000', time: '3 hours ago', user: 'Admin' },
  { action: 'New business listing submitted', time: '5 hours ago', user: 'Yaw O.' },
];

const statCards = [
  { title: 'Total Donations', value: 'GH₵ 28,900', icon: DollarSign },
  { title: 'Active Users', value: '1,426', icon: Users },
  { title: 'Page Views', value: '7,630', icon: Eye },
  { title: 'Revenue', value: 'GH₵ 28,900', icon: TrendingUp },
];

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

  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  if (!isAdmin) return <AccessDenied />;

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-fg mb-8"
        >
          Admin Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-surface border border-border rounded-md p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <card.icon className="w-5 h-5 text-muted" />
              </div>
              <div className="text-xl font-semibold text-fg">{card.value}</div>
              <div className="text-xs text-muted">{card.title}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-border rounded-md p-5 mb-8"
        >
          <h2 className="text-sm font-semibold text-fg mb-4">Monthly Overview</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#737373' }} />
              <YAxis tick={{ fontSize: 12, fill: '#737373' }} />
              <Tooltip
                contentStyle={{ borderRadius: '6px', border: '1px solid #E5E5E5', fontSize: '13px' }}
              />
              <Bar dataKey="donations" fill="#C5954A" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-border rounded-md p-5"
        >
          <h2 className="text-sm font-semibold text-fg mb-4">Recent Activity</h2>
          <div className="space-y-0">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start justify-between py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm text-fg">{item.action}</p>
                  <p className="text-xs text-muted mt-0.5">{item.user}</p>
                </div>
                <span className="text-xs text-muted shrink-0 ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
