import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { TrendingUp, Users, MousePointer, Target } from 'lucide-react'

const AnalyticsPanel = () => {
  // Mock data
  const visitData = [
    { name: 'Mon', visits: 120, clicks: 45 },
    { name: 'Tue', visits: 98, clicks: 52 },
    { name: 'Wed', visits: 156, clicks: 78 },
    { name: 'Thu', visits: 134, clicks: 67 },
    { name: 'Fri', visits: 189, clicks: 95 },
    { name: 'Sat', visits: 201, clicks: 102 },
    { name: 'Sun', visits: 167, clicks: 89 }
  ]

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#00FF99' },
    { name: 'Desktop', value: 30, color: '#00C4FF' },
    { name: 'Tablet', value: 5, color: '#EDEDED' }
  ]

  const topLinks = [
    { title: 'Portfolio', clicks: 156, url: 'https://...' },
    { title: 'Twitter', clicks: 89, url: 'https://...' },
    { title: 'Discord', clicks: 67, url: 'https://...' },
    { title: 'Blog', clicks: 45, url: 'https://...' }
  ]

  const statsCards = [
    {
      title: 'Total Visits',
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Total Clicks',
      value: '567',
      change: '+8.3%',
      icon: MousePointer,
      color: 'text-secondary'
    },
    {
      title: 'CTR',
      value: '45.9%',
      change: '+2.1%',
      icon: Target,
      color: 'text-primary'
    },
    {
      title: 'Top Link',
      value: 'Portfolio',
      change: '156 clicks',
      icon: TrendingUp,
      color: 'text-secondary'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between md:mt-0 mt-12">
        <div>
          <h2 className="text-2xl font-heading font-bold text-light">Analytics</h2>
          <p className="text-white/60">Track your profile performance</p>
        </div>
        <div className="text-sm text-white/60">
          Last 7 days
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="glass rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-current/20 ${stat.color}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-light">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visit Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-semibold text-light mb-6">Visit Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#ffffff60" />
                <YAxis stroke="#ffffff60" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#00FF99"
                  strokeWidth={3}
                  dot={{ fill: '#00FF99', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-semibold text-light mb-6">Traffic Sources</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid #ffffff20',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {deviceData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-white/80">{item.name}</span>
                <span className="text-sm font-semibold text-light">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="glass rounded-xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-semibold text-light mb-6">Top Performing Links</h3>
        <div className="space-y-4">
          {topLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className="flex items-center justify-between p-4 glass rounded-lg border border-white/5 hover:border-primary/30 transition-colors"
            >
              <div>
                <h4 className="font-medium text-light">{link.title}</h4>
                <p className="text-sm text-white/60">{link.url}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{link.clicks}</p>
                <p className="text-xs text-white/60">clicks</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsPanel
