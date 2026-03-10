import React, { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BarChart3,
  BookImage,
  Check,
  Copy,
  Contact,
  ImagePlus,
  Link as LinkIcon,
  Link2,
  LogOut,
  Menu,
  Palette,
  Plus,
  Trash2,
  User2,
  X,
} from 'lucide-react'

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart3 },
  { key: 'links', label: 'Links', icon: LinkIcon },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'contacts', label: 'Contacts', icon: Contact },
  { key: 'lookbook', label: 'Lookbook', icon: BookImage },
]

const chartData = [
  { day: 'Mon', views: 120, clicks: 28 },
  { day: 'Tue', views: 160, clicks: 40 },
  { day: 'Wed', views: 210, clicks: 58 },
  { day: 'Thu', views: 185, clicks: 51 },
  { day: 'Fri', views: 260, clicks: 76 },
  { day: 'Sat', views: 290, clicks: 89 },
  { day: 'Sun', views: 240, clicks: 71 },
]

const dashboardLogo = new URL('../../logo.jpg', import.meta.url).href

const initialLinks = [
  { id: 1, title: 'Instagram', url: 'https://instagram.com/ahju', clicks: 120, active: true },
  { id: 2, title: 'Portfolio', url: 'https://ahju.me/portfolio', clicks: 78, active: true },
]

const initialContacts = [
  { id: 1, name: 'Aisha Bello', email: 'aisha@email.com', phone: '+2348012345678', source: 'Card Tap', date: 'Today' },
  { id: 2, name: 'Tunde A.', email: 'tunde@email.com', phone: '+2348098765432', source: 'Profile Link', date: 'Yesterday' },
  { id: 3, name: 'Miriam O.', email: 'miriam@email.com', phone: '+2348122222222', source: 'QR Scan', date: '2 days ago' },
]

const lookbookItems = [
  { name: 'Classic PVC', image: new URL('../../AHJU Classic PVC Card.jpg', import.meta.url).href },
  { name: 'Black Card', image: new URL('../../AHJU Black Card.jpg', import.meta.url).href },
  { name: 'Bamboo Card', image: new URL('../../AHJU Bamboo Card.jpg', import.meta.url).href },
  { name: 'Key Tag', image: new URL('../../AHJU Key Tag.jpg', import.meta.url).href },
]

const linkInBioUrl = 'https://ahju.me/ahju'
const username = 'ahju'

const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Playfair Display', value: '"Playfair Display", serif' },
]

const THEME_PRESETS = [
  {
    key: 'minimal-light',
    name: 'Minimal Light',
    pageBg: '#f6f8f3',
    cardBg: '#ffffff',
    textColor: '#223136',
    mutedText: '#5f7076',
    buttonBg: '#2f3b40',
    accent: '#54b435',
  },
  {
    key: 'dark-pro',
    name: 'Dark Pro',
    pageBg: '#101619',
    cardBg: '#1b2428',
    textColor: '#f4f7f8',
    mutedText: '#b6c2c7',
    buttonBg: '#54b435',
    accent: '#7ed35f',
  },
  {
    key: 'sand-gold',
    name: 'Sand & Gold',
    pageBg: '#f3eee5',
    cardBg: '#fffaf1',
    textColor: '#3f2f1f',
    mutedText: '#78644d',
    buttonBg: '#946c34',
    accent: '#c7974a',
  },
  {
    key: 'sunset-glow',
    name: 'Sunset Glow',
    pageBg: '#fff1ea',
    cardBg: '#ffffff',
    textColor: '#40261d',
    mutedText: '#7b5044',
    buttonBg: '#e86f3f',
    accent: '#ff9f66',
  },
  {
    key: 'ocean-breeze',
    name: 'Ocean Breeze',
    pageBg: '#e9f7fa',
    cardBg: '#ffffff',
    textColor: '#16343d',
    mutedText: '#4f7077',
    buttonBg: '#1c7f96',
    accent: '#45bcd7',
  },
  {
    key: 'royal-violet',
    name: 'Royal Violet',
    pageBg: '#f2efff',
    cardBg: '#ffffff',
    textColor: '#2e2350',
    mutedText: '#655a88',
    buttonBg: '#5a46b2',
    accent: '#8b77e8',
  },
  {
    key: 'forest-luxe',
    name: 'Forest Luxe',
    pageBg: '#edf5ef',
    cardBg: '#ffffff',
    textColor: '#1f3427',
    mutedText: '#587061',
    buttonBg: '#2f6f44',
    accent: '#61a47a',
  },
]

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [links, setLinks] = useState(initialLinks)
  const [newLink, setNewLink] = useState({ title: '', url: '' })
  const [copiedBioLink, setCopiedBioLink] = useState(false)
  const [contactLeads, setContactLeads] = useState(initialContacts)
  const [lookbookGallery, setLookbookGallery] = useState(lookbookItems)
  const [socialLink, setSocialLink] = useState('')
  const [socialLoading, setSocialLoading] = useState(false)
  const [appearanceSaved, setAppearanceSaved] = useState(false)
  const [publicContactForm, setPublicContactForm] = useState({ name: '', email: '', phone: '' })
  const [connectSaved, setConnectSaved] = useState(false)
  const [appearance, setAppearance] = useState({
    selectedTheme: 'minimal-light',
    profileImage: dashboardLogo,
    heroImage: new URL('../../signup_sample.png', import.meta.url).href,
    displayName: 'AHJU User',
    shortBio: 'Digital Identity. One Tap.',
    nameFont: 'Inter, sans-serif',
    nameColor: '#223136',
  })

  const activeTheme =
    THEME_PRESETS.find((theme) => theme.key === appearance.selectedTheme) || THEME_PRESETS[0]

  const totalViews = useMemo(
    () => chartData.reduce((acc, item) => acc + item.views, 0),
    [],
  )
  const totalClicks = useMemo(
    () => chartData.reduce((acc, item) => acc + item.clicks, 0),
    [],
  )

  const addLink = (e) => {
    e.preventDefault()
    if (!newLink.title.trim() || !newLink.url.trim()) return
    setLinks((prev) => [
      { id: Date.now(), title: newLink.title, url: newLink.url, clicks: 0, active: true },
      ...prev,
    ])
    setNewLink({ title: '', url: '' })
  }

  const deleteLink = (id) => setLinks((prev) => prev.filter((link) => link.id !== id))
  const toggleLink = (id) =>
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, active: !link.active } : link)),
    )

  const copyBioLink = async () => {
    try {
      await navigator.clipboard.writeText(linkInBioUrl)
      setCopiedBioLink(true)
      setTimeout(() => setCopiedBioLink(false), 1800)
    } catch {
      setCopiedBioLink(false)
    }
  }

  const handleLookbookUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const uploadedItems = files.map((file) => ({
      name: file.name.replace(/\.[^/.]+$/, ''),
      image: URL.createObjectURL(file),
    }))

    setLookbookGallery((prev) => [...uploadedItems, ...prev])
    e.target.value = ''
  }

  const importFromSocial = () => {
    if (!socialLink.trim()) return

    setSocialLoading(true)
    setTimeout(() => {
      const mockedSocialImages = [
        { name: 'Social Post 1', image: new URL('../../AHJU Black Card.jpg', import.meta.url).href },
        { name: 'Social Post 2', image: new URL('../../AHJU Bamboo Card.jpg', import.meta.url).href },
        { name: 'Social Post 3', image: new URL('../../AHJU Classic PVC Card.jpg', import.meta.url).href },
        { name: 'Social Post 4', image: new URL('../../AHJU Key Tag.jpg', import.meta.url).href },
      ]

      setLookbookGallery((prev) => [...mockedSocialImages, ...prev])
      setSocialLoading(false)
    }, 800)
  }

  const handleAppearanceImageUpload = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    setAppearance((prev) => ({ ...prev, [type]: imageUrl }))
    e.target.value = ''
  }

  const submitPublicContact = (e) => {
    e.preventDefault()
    if (!publicContactForm.name.trim() || !publicContactForm.email.trim() || !publicContactForm.phone.trim()) return

    setContactLeads((prev) => [
      {
        id: Date.now(),
        name: publicContactForm.name.trim(),
        email: publicContactForm.email.trim(),
        phone: publicContactForm.phone.trim(),
        source: 'Profile Connect Form',
        date: 'Just now',
      },
      ...prev,
    ])

    setPublicContactForm({ name: '', email: '', phone: '' })
    setConnectSaved(true)
    setTimeout(() => setConnectSaved(false), 1800)
  }

  const saveAppearanceSettings = () => {
    setAppearanceSaved(true)
    setTimeout(() => setAppearanceSaved(false), 1800)
  }

  return (
    <div className="dashboard-page min-h-screen bg-site">
      <div className="grid min-h-screen w-full lg:grid-cols-[300px_1fr]">
        {isSidebarOpen && (
          <button
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[86vw] max-w-[320px] flex-col overflow-y-auto rounded-r-2xl border-r border-brand-slate/10 bg-white p-4 shadow-2xl transition-transform duration-300 lg:static lg:min-h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:rounded-none lg:p-5 lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-brand-slate/10 bg-brand-green/5 p-3">
            <img src={dashboardLogo} alt="AHJU" className="h-10 w-10 rounded-md object-cover" />
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-brand-slate/60">Workspace</p>
              <p className="font-semibold text-brand-charcoal">AHJU Dashboard</p>
            </div>
            <button
              className="ml-auto rounded-md p-1 text-brand-slate/70 hover:bg-brand-slate/10 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key)
                    setIsSidebarOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-green text-white shadow-[0_10px_18px_rgba(84,180,53,0.28)]'
                      : 'text-brand-slate hover:bg-brand-green/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-8 space-y-2 rounded-xl border border-brand-slate/10 bg-white p-3 lg:mt-auto">
            <p className="text-xs uppercase tracking-[0.12em] text-brand-slate/55">Account</p>
            <div className="flex items-center gap-2 text-sm text-brand-charcoal">
              <User2 className="h-4 w-4 text-brand-slate/70" />
              testi@example.com
            </div>
            <button className="mt-2 inline-flex items-center gap-2 text-sm text-brand-slate/75 hover:text-red-500">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <main className="min-w-0 overflow-x-hidden px-3 py-4 sm:px-4 md:px-7 md:py-6 lg:px-10">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-brand-slate/10 bg-white px-3 py-2.5 lg:hidden">
            <div className="flex items-center gap-2">
              <img src={dashboardLogo} alt="AHJU" className="h-6 w-6 rounded object-cover" />
              <p className="text-sm font-semibold text-brand-charcoal">AHJU Dashboard</p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-slate/15 bg-brand-green/5 px-2.5 py-1.5 text-sm font-medium text-brand-charcoal"
            >
              <Menu className="h-4 w-4" />
              Menu
            </button>
          </div>

          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <h1 className="mt-1 text-2xl font-bold text-brand-charcoal sm:mt-2 sm:text-3xl">{TABS.find((t) => t.key === activeTab)?.label}</h1>
              <p className="text-brand-slate/75">Manage your profile, links, and engagement in one place.</p>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-brand-slate/10 bg-white p-4 md:p-5">
                  <p className="text-sm text-brand-slate/70">Username</p>
                  <p className="mt-1 text-2xl font-bold text-brand-charcoal">@{username}</p>
                </div>
                <div className="rounded-2xl border border-brand-slate/10 bg-white p-4 md:p-5">
                  <p className="text-sm text-brand-slate/70">Link in Bio</p>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-brand-slate/10 bg-white px-3 py-2.5">
                    <p className="truncate text-sm text-brand-slate">{linkInBioUrl}</p>
                    <button
                      type="button"
                      onClick={copyBioLink}
                      className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-slate/15 text-brand-slate hover:bg-brand-slate/10"
                      aria-label="Copy Link in Bio"
                      title={copiedBioLink ? 'Copied!' : 'Copy link'}
                    >
                      {copiedBioLink ? <Check className="h-4 w-4 text-brand-green" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide md:grid md:overflow-visible md:pb-0 md:gap-4 md:grid-cols-3">
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">Total Views</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">{totalViews}</p>
                </div>
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">Total Clicks</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">{totalClicks}</p>
                </div>
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">CTR</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">
                    {((totalClicks / totalViews) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-slate/10 bg-white p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-brand-charcoal">Views & Clicks (7 days)</h2>
                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-medium text-brand-green">Views</span>
                    <span className="rounded-full bg-brand-slate/10 px-2.5 py-1 text-xs font-medium text-brand-slate">Clicks</span>
                  </div>
                </div>

                <div className="h-56 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e6eaec" />
                      <XAxis
                        dataKey="day"
                        stroke="#7b8b90"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10 }}
                        angle={-25}
                        textAnchor="end"
                        height={46}
                      />
                      <YAxis
                        stroke="#7b8b90"
                        tickLine={false}
                        axisLine={false}
                        width={44}
                        tick={{ fontSize: 12 }}
                        dx={-6}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '12px',
                          border: '1px solid #d9dee0',
                          backgroundColor: '#ffffff',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Line
                        type="monotone"
                        dataKey="views"
                        name="Views"
                        stroke="#54b435"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        name="Clicks"
                        stroke="#2f3b40"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 rounded-2xl border border-brand-slate/10 bg-white px-3 py-2.5">
                <p className="truncate text-sm text-brand-slate">{linkInBioUrl}</p>
                <button
                  type="button"
                  onClick={copyBioLink}
                  className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-slate/15 text-brand-slate hover:bg-brand-slate/10"
                  aria-label="Copy Link in Bio"
                  title={copiedBioLink ? 'Copied!' : 'Copy link'}
                >
                  {copiedBioLink ? <Check className="h-4 w-4 text-brand-green" /> : <Copy className="h-4 w-4" />}
                </button>
                </div>

              <form onSubmit={addLink} className="grid gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4 md:grid-cols-[1fr_1fr_auto] md:p-5">
                <input
                  placeholder="Link title"
                  value={newLink.title}
                  onChange={(e) => setNewLink((prev) => ({ ...prev, title: e.target.value }))}
                  className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
                <input
                  placeholder="https://your-link.com"
                  value={newLink.url}
                  onChange={(e) => setNewLink((prev) => ({ ...prev, url: e.target.value }))}
                  className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 font-semibold text-white hover:bg-[#489b2d]">
                  <Plus className="h-4 w-4" /> Add Link
                </button>
              </form>

              <div className="space-y-3">
                {links.map((link) => (
                  <div key={link.id} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-charcoal">{link.title}</p>
                      <p className="truncate text-sm text-brand-slate/70">{link.url}</p>
                    </div>
                    <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                      <span className="hidden text-sm text-brand-slate/70 sm:inline">{link.clicks} clicks</span>
                      <span className={`hidden text-xs font-medium sm:inline ${link.active ? 'text-brand-green' : 'text-brand-slate/60'}`}>
                        {link.active ? 'Active' : 'Inactive'}
                      </span>
                      <button onClick={() => deleteLink(link.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLink(link.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          link.active ? 'bg-brand-green' : 'bg-brand-slate/30'
                        }`}
                        aria-label={link.active ? 'Deactivate link' : 'Activate link'}
                        title={link.active ? 'Deactivate link' : 'Activate link'}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                            link.active ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-brand-slate/10 bg-white p-5">
                <h2 className="text-lg font-semibold text-brand-charcoal">Customize profile look</h2>
                <label className="block space-y-1">
                  <span className="text-sm text-brand-slate/70">Profile image URL</span>
                  <input
                    value={appearance.profileImage}
                    onChange={(e) => setAppearance((prev) => ({ ...prev, profileImage: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-brand-slate/20 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-slate/5">
                    Upload profile image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAppearanceImageUpload(e, 'profileImage')}
                    />
                  </label>
                </label>
                <label className="block space-y-1">
                  <span className="text-sm text-brand-slate/70">Hero image URL</span>
                  <input
                    value={appearance.heroImage}
                    onChange={(e) => setAppearance((prev) => ({ ...prev, heroImage: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-brand-slate/20 px-3 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-slate/5">
                    Upload hero image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleAppearanceImageUpload(e, 'heroImage')}
                    />
                  </label>
                </label>
                <label className="block space-y-1">
                  <span className="text-sm text-brand-slate/70">Name</span>
                  <input
                    value={appearance.displayName}
                    onChange={(e) => setAppearance((prev) => ({ ...prev, displayName: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                </label>
                <label className="block space-y-1">
                  <span className="text-sm text-brand-slate/70">Short bio</span>
                  <input
                    value={appearance.shortBio}
                    onChange={(e) => setAppearance((prev) => ({ ...prev, shortBio: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block space-y-1">
                    <span className="text-sm text-brand-slate/70">Name font</span>
                    <select
                      value={appearance.nameFont}
                      onChange={(e) => setAppearance((prev) => ({ ...prev, nameFont: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value}>{font.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block space-y-1">
                    <span className="text-sm text-brand-slate/70">Name font color</span>
                    <input
                      type="color"
                      value={appearance.nameColor}
                      onChange={(e) => setAppearance((prev) => ({ ...prev, nameColor: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-brand-slate/20 p-1"
                    />
                  </label>
                </div>

                <div className="space-y-2 pt-1">
                  <p className="text-sm font-medium text-brand-charcoal">Theme</p>
                  <p className="text-xs text-brand-slate/70">Pick a full theme for how your profile appears when link is opened.</p>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {THEME_PRESETS.map((theme) => (
                      <button
                        key={theme.key}
                        type="button"
                        onClick={() => setAppearance((prev) => ({ ...prev, selectedTheme: theme.key }))}
                        className={`rounded-xl border p-2 text-left transition ${appearance.selectedTheme === theme.key ? 'border-brand-green ring-2 ring-brand-green/30' : 'border-brand-slate/15 hover:border-brand-slate/30'}`}
                        style={{ backgroundColor: theme.cardBg }}
                      >
                        <p className="text-xs font-semibold" style={{ color: theme.textColor }}>{theme.name}</p>
                        <div className="mt-2 flex gap-1">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.pageBg }} />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.buttonBg }} />
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={saveAppearanceSettings}
                    className="w-full rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#489b2d]"
                  >
                    Save appearance
                  </button>
                  {appearanceSaved && (
                    <p className="mt-2 text-center text-xs font-medium text-brand-green">Appearance saved ✅</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-slate/10 bg-white p-5">
                <h2 className="mb-4 text-lg font-semibold text-brand-charcoal">Live preview</h2>
                <div className="mx-auto w-full max-w-[330px] rounded-[2rem] bg-[#161c20] p-2.5 shadow-2xl">
                  <div className="relative overflow-hidden rounded-[1.6rem]" style={{ backgroundColor: activeTheme.pageBg }}>
                    <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/30" />
                    <div className="h-[620px] overflow-y-auto scrollbar-hide">
                      <img src={appearance.heroImage} alt="Hero" className="h-36 w-full object-cover" />
                      <div className="-mt-9 px-4 pb-5">
                        <div className="inline-flex rounded-full border-4" style={{ borderColor: activeTheme.pageBg }}>
                          <img
                            src={appearance.profileImage}
                            alt="Profile preview"
                            className="h-16 w-16 rounded-full object-cover"
                          />
                        </div>

                        <div className="mt-3 rounded-2xl p-4" style={{ backgroundColor: activeTheme.cardBg }}>
                          <h3
                            className="text-lg font-semibold"
                            style={{ color: appearance.nameColor, fontFamily: appearance.nameFont }}
                          >
                            {appearance.displayName}
                          </h3>
                          <p className="mt-1 text-sm" style={{ color: activeTheme.mutedText }}>
                            {appearance.shortBio}
                          </p>

                          <div className="mt-4 space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                              Links
                            </p>
                            {links.filter((link) => link.active).map((link) => (
                              <button
                                key={link.id}
                                type="button"
                                className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-white"
                                style={{ backgroundColor: activeTheme.buttonBg }}
                              >
                                {link.title}
                              </button>
                            ))}

                            <div className="rounded-xl border p-3" style={{ borderColor: `${activeTheme.accent}66` }}>
                              <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                                Connect with me
                              </p>
                              <form className="mt-2 space-y-2" onSubmit={submitPublicContact}>
                                <input
                                  placeholder="Your name"
                                  value={publicContactForm.name}
                                  onChange={(e) => setPublicContactForm((prev) => ({ ...prev, name: e.target.value }))}
                                  className="h-9 w-full rounded-lg border px-2 text-xs"
                                  style={{ borderColor: `${activeTheme.accent}55` }}
                                />
                                <input
                                  placeholder="Email"
                                  type="email"
                                  value={publicContactForm.email}
                                  onChange={(e) => setPublicContactForm((prev) => ({ ...prev, email: e.target.value }))}
                                  className="h-9 w-full rounded-lg border px-2 text-xs"
                                  style={{ borderColor: `${activeTheme.accent}55` }}
                                />
                                <input
                                  placeholder="Phone number"
                                  value={publicContactForm.phone}
                                  onChange={(e) => setPublicContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                                  className="h-9 w-full rounded-lg border px-2 text-xs"
                                  style={{ borderColor: `${activeTheme.accent}55` }}
                                />
                                <button
                                  type="submit"
                                  className="w-full rounded-lg px-3 py-2 text-xs font-semibold text-white"
                                  style={{ backgroundColor: activeTheme.buttonBg }}
                                >
                                  Send details
                                </button>
                                {connectSaved && (
                                  <p className="text-center text-[11px] font-medium" style={{ color: activeTheme.textColor }}>
                                    Saved to Contacts ✅
                                  </p>
                                )}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-3 rounded-2xl border border-brand-slate/10 bg-white p-5">
              <h2 className="text-lg font-semibold text-brand-charcoal">Recent contacts</h2>
              {contactLeads.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between rounded-xl border border-brand-slate/10 p-4">
                  <div>
                    <p className="font-medium text-brand-charcoal">{contact.name}</p>
                    <p className="text-sm text-brand-slate/70">{contact.source}</p>
                    {contact.email && <p className="text-xs text-brand-slate/60">{contact.email}</p>}
                    {contact.phone && <p className="text-xs text-brand-slate/60">{contact.phone}</p>}
                  </div>
                  <span className="text-sm text-brand-slate/60">{contact.date}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'lookbook' && (
            <div className="space-y-5">
              <div className="grid gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4 md:grid-cols-2">
                <div className="rounded-xl border border-brand-slate/10 p-3">
                  <p className="text-sm font-semibold text-brand-charcoal">Upload from device</p>
                  <p className="mt-1 text-xs text-brand-slate/70">Add one or multiple images to your lookbook.</p>
                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-green px-3 py-2 text-sm font-semibold text-white hover:bg-[#489b2d]">
                    <ImagePlus className="h-4 w-4" />
                    Upload images
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleLookbookUpload} />
                  </label>
                </div>

                <div className="rounded-xl border border-brand-slate/10 p-3">
                  <p className="text-sm font-semibold text-brand-charcoal">Import from social link</p>
                  <p className="mt-1 text-xs text-brand-slate/70">Frontend demo: paste your page URL to preview pulled images.</p>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={socialLink}
                      onChange={(e) => setSocialLink(e.target.value)}
                      placeholder="https://instagram.com/yourpage"
                      className="h-10 min-w-0 flex-1 rounded-lg border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                    />
                    <button
                      type="button"
                      onClick={importFromSocial}
                      className="inline-flex h-10 items-center gap-1 rounded-lg border border-brand-slate/20 px-3 text-sm font-medium text-brand-charcoal hover:bg-brand-slate/5"
                    >
                      <Link2 className="h-4 w-4" />
                      {socialLoading ? 'Loading...' : 'Import'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {lookbookGallery.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="overflow-hidden rounded-2xl border border-brand-slate/10 bg-white">
                    <img src={item.image} alt={item.name} className="h-44 w-full object-cover" />
                    <div className="p-4">
                      <p className="font-semibold text-brand-charcoal">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
