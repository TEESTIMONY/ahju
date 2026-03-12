import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  AtSign,
  BarChart3,
  BookOpen,
  BookImage,
  Check,
  Copy,
  Contact,
  Facebook,
  Ghost,
  Github,
  Globe,
  ImagePlus,
  Instagram,
  Link as LinkIcon,
  Link2,
  Linkedin,
  LogOut,
  MessageCircle,
  MessageSquare,
  Music2,
  Menu,
  Palette,
  Pin,
  Play,
  Plus,
  Send,
  Signal,
  Tv,
  Trash2,
  Twitter,
  User2,
  X,
  Youtube,
} from 'lucide-react'

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart3 },
  { key: 'links', label: 'Links', icon: LinkIcon },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'contacts', label: 'Contacts', icon: Contact },
  { key: 'lookbook', label: 'Lookbook', icon: BookImage },
]

const emptyChartData = [
  { day: 'Mon', views: 0, clicks: 0, cardTaps: 0 },
  { day: 'Tue', views: 0, clicks: 0, cardTaps: 0 },
  { day: 'Wed', views: 0, clicks: 0, cardTaps: 0 },
  { day: 'Thu', views: 0, clicks: 0, cardTaps: 0 },
  { day: 'Fri', views: 0, clicks: 0, cardTaps: 0 },
  { day: 'Sat', views: 0, clicks: 0, cardTaps: 0 },
  { day: 'Sun', views: 0, clicks: 0, cardTaps: 0 },
]

const dashboardLogo = new URL('../../logo.jpg', import.meta.url).href

const lookbookItems = [
  { name: 'Classic PVC', image: new URL('../../AHJU Classic PVC Card.jpg', import.meta.url).href },
  { name: 'Black Card', image: new URL('../../AHJU Black Card.jpg', import.meta.url).href },
  { name: 'Bamboo Card', image: new URL('../../AHJU Bamboo Card.jpg', import.meta.url).href },
  { name: 'Key Tag', image: new URL('../../AHJU Key Tag.jpg', import.meta.url).href },
]

const PUBLIC_PROFILE_BASE_URL = 'https://app.myahju.com/r/'

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
    buttonBg: '#28241E',
    accent: '#348539',
  },
  {
    key: 'dark-pro',
    name: 'Dark Pro',
    pageBg: '#101619',
    cardBg: '#1b2428',
    textColor: '#f4f7f8',
    mutedText: '#b6c2c7',
    buttonBg: '#348539',
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

let refreshPromise = null

const Dashboard = () => {
  const navigate = useNavigate()
  const savedUserRaw = localStorage.getItem('ahju_user')
  const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null
  const username = savedUser?.username || 'user'
  const userEmail = savedUser?.email || 'No email'
  const linkInBioUrl = `${PUBLIC_PROFILE_BASE_URL}?id=${encodeURIComponent(username)}`

  const [activeTab, setActiveTab] = useState('overview')
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [analyticsError, setAnalyticsError] = useState('')
  const [chartData, setChartData] = useState(emptyChartData)
  const [summary, setSummary] = useState({
    total_views: 0,
    total_clicks: 0,
    total_card_taps: 0,
    ctr: 0,
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [links, setLinks] = useState([])
  const [linksLoading, setLinksLoading] = useState(true)
  const [linksSaving, setLinksSaving] = useState(false)
  const [linksError, setLinksError] = useState('')
  const [newLink, setNewLink] = useState({ title: '', url: '' })
  const [copiedBioLink, setCopiedBioLink] = useState(false)
  const [contactLeads, setContactLeads] = useState([])
  const [contactsLoading, setContactsLoading] = useState(true)
  const [contactsError, setContactsError] = useState('')
  const [lookbookGallery, setLookbookGallery] = useState(lookbookItems)
  const [socialLink, setSocialLink] = useState('')
  const [socialLoading, setSocialLoading] = useState(false)
  const [appearanceSaving, setAppearanceSaving] = useState(false)
  const [appearanceError, setAppearanceError] = useState('')
  const [appearanceSaved, setAppearanceSaved] = useState(false)
  const [publicContactForm, setPublicContactForm] = useState({ name: '', email: '', phone: '' })
  const [connectSaved, setConnectSaved] = useState(false)
  const [appearance, setAppearance] = useState({
    selectedTheme: 'minimal-light',
    profileImage: '',
    heroImage: '',
    displayName: savedUser?.username ? `@${savedUser.username}` : '',
    shortBio: '',
    nameFont: 'Inter, sans-serif',
    nameColor: '#223136',
  })

  const activeTheme =
    THEME_PRESETS.find((theme) => theme.key === appearance.selectedTheme) || THEME_PRESETS[0]

  const totalViews = useMemo(() => summary.total_views || 0, [summary])
  const totalClicks = useMemo(() => summary.total_clicks || 0, [summary])
  const totalCardTaps = useMemo(() => summary.total_card_taps || 0, [summary])

  const formatContactDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleString()
  }

  const downloadContactVCard = (contact) => {
    if (!contact?.name || !contact?.phone) return

    const fileSafeName = (contact.name || 'contact').replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contact.name}`,
      contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : '',
      contact.email ? `EMAIL;TYPE=INTERNET:${contact.email}` : '',
      'END:VCARD',
    ]
      .filter(Boolean)
      .join('\n')

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileSafeName || 'contact'}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const mapApiLinkToUi = (link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    clicks: link.clicks || 0,
    active: link.is_active ?? true,
  })

  const normalizeLinkUrl = (value = '') => {
    const trimmed = value.trim()
    if (!trimmed) return ''
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return `https://${trimmed}`
  }

  const getSocialMeta = (title = '', url = '') => {
    const normalized = `${title} ${url}`.toLowerCase()

    if (normalized.includes('instagram')) return { icon: Instagram, color: '#E1306C' }
    if (normalized.includes('facebook')) return { icon: Facebook, color: '#1877F2' }
    if (normalized.includes('threads') || normalized.includes('threads.net')) return { icon: AtSign, color: '#111111' }
    if (normalized.includes('snapchat') || normalized.includes('snap.com')) return { icon: Ghost, color: '#FFFC00' }
    if (normalized.includes('whatsapp') || normalized.includes('wa.me')) return { icon: MessageCircle, color: '#25D366' }
    if (normalized.includes('telegram') || normalized.includes('t.me')) return { icon: Send, color: '#229ED9' }
    if (normalized.includes('messenger') || normalized.includes('m.me')) return { icon: MessageSquare, color: '#0084FF' }
    if (normalized.includes('discord') || normalized.includes('discord.gg')) return { icon: MessageSquare, color: '#5865F2' }
    if (normalized.includes('wechat') || normalized.includes('weixin')) return { icon: MessageCircle, color: '#07C160' }
    if (normalized.includes('signal')) return { icon: Signal, color: '#3A76F0' }
    if (normalized.includes('linkedin')) return { icon: Linkedin, color: '#0A66C2' }
    if (normalized.includes('youtube')) return { icon: Youtube, color: '#FF0000' }
    if (normalized.includes('twitter') || normalized.includes('x.com')) return { icon: Twitter, color: '#111827' }
    if (normalized.includes('tiktok')) return { icon: Music2, color: '#111827' }
    if (normalized.includes('twitch')) return { icon: Tv, color: '#9146FF' }
    if (normalized.includes('kick')) return { icon: Tv, color: '#53FC18' }
    if (normalized.includes('rumble')) return { icon: Play, color: '#85C742' }
    if (normalized.includes('xing')) return { icon: AtSign, color: '#006567' }
    if (normalized.includes('reddit')) return { icon: MessageSquare, color: '#FF4500' }
    if (normalized.includes('pinterest') || normalized.includes('pin.it')) return { icon: Pin, color: '#E60023' }
    if (normalized.includes('quora')) return { icon: BookOpen, color: '#B92B27' }
    if (normalized.includes('medium')) return { icon: BookOpen, color: '#12100E' }
    if (normalized.includes('kuaishou')) return { icon: Play, color: '#FF5E2B' }
    if (normalized.includes('bilibili')) return { icon: Tv, color: '#00A1D6' }
    if (normalized.includes('line.me') || normalized.includes('line ')) return { icon: MessageCircle, color: '#06C755' }
    if (normalized.includes('vk.com') || normalized.includes('vkontakte') || normalized.includes('vk ')) return { icon: MessageSquare, color: '#0077FF' }
    if (normalized.includes('github')) return { icon: Github, color: '#24292F' }

    return { icon: Globe, color: '#348539' }
  }

  const getValidAccessToken = async () => {
    const accessToken = localStorage.getItem('ahju_access_token')
    const refreshToken = localStorage.getItem('ahju_refresh_token')
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

    if (!accessToken && !refreshToken) return null
    if (accessToken) return accessToken

    try {
      const refreshRes = await fetch(`${apiBaseUrl}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      })
      const refreshData = await refreshRes.json()
      if (!refreshRes.ok || !refreshData?.access) return null

      localStorage.setItem('ahju_access_token', refreshData.access)
      return refreshData.access
    } catch {
      return null
    }
  }

  const authorizedFetch = async (url, options = {}) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
    const token = await getValidAccessToken()
    if (!token) throw new Error('Session expired. Please log in again.')

    const withAuth = {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    }

    let response = await fetch(url, withAuth)
    if (response.status !== 401) return response

    const refreshToken = localStorage.getItem('ahju_refresh_token')
    if (!refreshToken) {
      localStorage.removeItem('ahju_access_token')
      localStorage.removeItem('ahju_refresh_token')
      localStorage.removeItem('ahju_user')
      throw new Error('Session expired. Please log in again.')
    }

    if (!refreshPromise) {
      refreshPromise = fetch(`${apiBaseUrl}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      })
        .then(async (res) => {
          const data = await res.json()
          if (!res.ok || !data?.access) return null
          return data.access
        })
        .finally(() => {
          refreshPromise = null
        })
    }

    const newAccessToken = await refreshPromise
    if (!newAccessToken) {
      localStorage.removeItem('ahju_access_token')
      localStorage.removeItem('ahju_refresh_token')
      localStorage.removeItem('ahju_user')
      throw new Error('Session expired. Please log in again.')
    }

    localStorage.setItem('ahju_access_token', newAccessToken)
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
      },
    })

    return response
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('ahju_access_token')
    const refreshToken = localStorage.getItem('ahju_refresh_token')
    if (!accessToken && !refreshToken) {
      setAnalyticsLoading(false)
      setLinksLoading(false)
      setAnalyticsError('Authentication required')
      return
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

    const loadAnalytics = async () => {
      setAnalyticsLoading(true)
      setLinksLoading(true)
      setContactsLoading(true)
      setAnalyticsError('')
      setLinksError('')
      setContactsError('')
      try {
        const [summaryRes, timeseriesRes, appearanceRes, linksRes, contactsRes] = await Promise.all([
          authorizedFetch(`${apiBaseUrl}/api/dashboard/summary/`),
          authorizedFetch(`${apiBaseUrl}/api/dashboard/timeseries/`),
          authorizedFetch(`${apiBaseUrl}/api/users/appearance/`),
          authorizedFetch(`${apiBaseUrl}/api/users/links/`),
          authorizedFetch(`${apiBaseUrl}/api/users/contacts/`),
        ])

        const summaryData = await summaryRes.json()
        const timeseriesData = await timeseriesRes.json()
        const appearanceData = await appearanceRes.json()
        const linksData = await linksRes.json()
        const contactsData = await contactsRes.json()

        if (!summaryRes.ok) {
          throw new Error(summaryData?.detail || 'Failed to load dashboard summary')
        }
        if (!timeseriesRes.ok) {
          throw new Error(timeseriesData?.detail || 'Failed to load dashboard chart data')
        }
        if (!appearanceRes.ok) {
          throw new Error(appearanceData?.detail || 'Failed to load appearance')
        }
        if (!linksRes.ok) {
          throw new Error(linksData?.detail || 'Failed to load links')
        }
        if (!contactsRes.ok) {
          throw new Error(contactsData?.detail || 'Failed to load contacts')
        }

        setSummary(summaryData)
        setChartData(Array.isArray(timeseriesData?.data) ? timeseriesData.data : emptyChartData)
        setLinks(Array.isArray(linksData) ? linksData.map(mapApiLinkToUi) : [])
        setContactLeads(
          Array.isArray(contactsData)
            ? contactsData.map((lead) => ({
                id: lead.id,
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                source: lead.source,
                date: formatContactDate(lead.created_at),
              }))
            : [],
        )
        setAppearance((prev) => ({
          ...prev,
          displayName: appearanceData.display_name ?? '',
          shortBio: appearanceData.short_bio ?? '',
          profileImage: appearanceData.profile_image_url ?? '',
          heroImage: appearanceData.hero_image_url ?? '',
          selectedTheme: appearanceData.selected_theme || 'minimal-light',
          nameFont: appearanceData.name_font || 'Inter, sans-serif',
          nameColor: appearanceData.name_color || '#223136',
        }))
      } catch (err) {
        setAnalyticsError(err.message || 'Unable to load analytics')
        setLinksError(err.message || 'Unable to load links')
        setContactsError(err.message || 'Unable to load contacts')
        setSummary({ total_views: 0, total_clicks: 0, total_card_taps: 0, ctr: 0 })
        setChartData(emptyChartData)
        setLinks([])
        setContactLeads([])
      } finally {
        setAnalyticsLoading(false)
        setLinksLoading(false)
        setContactsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const addLink = async (e) => {
    e.preventDefault()
    if (!newLink.title.trim() || !newLink.url.trim()) return

    setLinksSaving(true)
    setLinksError('')
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/links/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newLink.title.trim(),
          url: normalizeLinkUrl(newLink.url),
          is_active: true,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        if (data && typeof data === 'object') {
          const firstFieldError = Object.values(data).flat?.()[0]
          throw new Error(firstFieldError || data?.detail || 'Could not add link')
        }
        throw new Error(data?.detail || 'Could not add link')
      }

      setLinks((prev) => [mapApiLinkToUi(data), ...prev])
      setNewLink({ title: '', url: '' })
    } catch (err) {
      setLinksError(err.message || 'Could not add link')
    } finally {
      setLinksSaving(false)
    }
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

  const handleAppearanceImageUpload = async (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setAppearance((prev) => ({ ...prev, [type]: previewUrl }))
    setAppearanceError('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
      const formData = new FormData()
      formData.append('image', file)

      const response = await authorizedFetch(`${apiBaseUrl}/api/users/appearance/`, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!response.ok || !data?.url) {
        throw new Error(data?.detail || 'Image upload failed')
      }

      setAppearance((prev) => ({ ...prev, [type]: data.url }))
    } catch (err) {
      setAppearanceError(err.message || 'Image upload failed')
    } finally {
      e.target.value = ''
    }
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

  const saveAppearanceSettings = async () => {
    const accessToken = localStorage.getItem('ahju_access_token')
    const refreshToken = localStorage.getItem('ahju_refresh_token')
    if (!accessToken && !refreshToken) {
      setAppearanceError('Authentication required')
      return
    }

    setAppearanceSaving(true)
    setAppearanceError('')
    setAppearanceSaved(false)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
      const payload = {
        display_name: appearance.displayName,
        short_bio: appearance.shortBio,
        selected_theme: appearance.selectedTheme,
        name_font: appearance.nameFont,
        name_color: appearance.nameColor,
      }

      // Only persist real URLs to backend URLField values.
      // Local blob/object URLs are for in-browser preview only.
      if (!appearance.profileImage || /^https?:\/\//i.test(appearance.profileImage)) {
        payload.profile_image_url = appearance.profileImage
      }
      if (!appearance.heroImage || /^https?:\/\//i.test(appearance.heroImage)) {
        payload.hero_image_url = appearance.heroImage
      }

      const response = await authorizedFetch(`${apiBaseUrl}/api/users/appearance/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        if (data && typeof data === 'object') {
          const firstFieldError = Object.values(data).flat?.()[0]
          throw new Error(firstFieldError || data?.detail || 'Could not save appearance')
        }
        throw new Error(data?.detail || 'Could not save appearance')
      }

      setAppearanceSaved(true)
      setTimeout(() => setAppearanceSaved(false), 1800)
    } catch (err) {
      setAppearanceError(err.message || 'Could not save appearance')
    } finally {
      setAppearanceSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('ahju_access_token')
    localStorage.removeItem('ahju_refresh_token')
    localStorage.removeItem('ahju_user')
    navigate('/login')
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
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-left"
              aria-label="Go to home page"
            >
              <img src={dashboardLogo} alt="AHJU" className="h-10 w-10 rounded-md object-cover" />
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-slate/60">Workspace</p>
                <p className="font-semibold text-brand-charcoal">AHJU Dashboard</p>
              </div>
            </button>
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
              @{username}
            </div>
            <p className="text-xs text-brand-slate/65 pl-6">{userEmail}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 inline-flex items-center gap-2 text-sm text-brand-slate/75 hover:text-red-500"
            >
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

              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide md:grid md:overflow-visible md:pb-0 md:gap-4 md:grid-cols-4">
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">Total Views</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">{totalViews}</p>
                </div>
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">Total Clicks</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">{totalClicks}</p>
                </div>
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">Card Taps</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">{totalCardTaps}</p>
                </div>
                <div className="min-w-[170px] rounded-2xl border border-brand-slate/10 bg-white p-4 md:min-w-0 md:p-5">
                  <p className="text-sm text-brand-slate/70">CTR</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">
                    {summary.ctr?.toFixed ? summary.ctr.toFixed(1) : Number(summary.ctr || 0).toFixed(1)}%
                  </p>
                </div>
              </div>

              {analyticsError && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {analyticsError}
                </div>
              )}

              <div className="rounded-2xl border border-brand-slate/10 bg-white p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-brand-charcoal">Views & Clicks (7 days)</h2>
                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-medium text-brand-green">Views</span>
                    <span className="rounded-full bg-brand-slate/10 px-2.5 py-1 text-xs font-medium text-brand-slate">Clicks</span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">Card Taps</span>
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
                        stroke="#348539"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        name="Clicks"
                        stroke="#28241E"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cardTaps"
                        name="Card Taps"
                        stroke="#3b82f6"
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
                <button
                  disabled={linksSaving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 font-semibold text-white hover:bg-[#489b2d] disabled:opacity-70"
                >
                  <Plus className="h-4 w-4" /> {linksSaving ? 'Adding...' : 'Add Link'}
                </button>
              </form>

              {linksError && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {linksError}
                </div>
              )}

              <div className="space-y-3">
                {linksLoading && (
                  <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                    Loading links...
                  </div>
                )}
                {!linksLoading && links.length === 0 && (
                  <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                    No links yet. Add your first link above.
                  </div>
                )}
                {links.map((link) => (
                  <div key={link.id} className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4">
                    <div className="min-w-0 flex items-center gap-2.5">
                      {(() => {
                        const meta = getSocialMeta(link.title, link.url)
                        const Icon = meta.icon
                        return (
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-slate/10">
                            <Icon className="h-4 w-4" style={{ color: meta.color }} />
                          </span>
                        )
                      })()}
                      <div className="min-w-0">
                        <p className="font-semibold text-brand-charcoal">{link.title}</p>
                        <p className="truncate text-sm text-brand-slate/70">{link.url}</p>
                      </div>
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
                      className="h-11 w-full rounded-xl border border-brand-slate/20 bg-white px-3 text-sm text-brand-charcoal outline-none focus:border-brand-green/60 dark:bg-white dark:text-brand-charcoal"
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value} style={{ color: '#223136', backgroundColor: '#ffffff' }}>
                          {font.label}
                        </option>
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
                    disabled={appearanceSaving}
                    className="w-full rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#489b2d] disabled:opacity-70"
                  >
                    {appearanceSaving ? 'Saving...' : 'Save appearance'}
                  </button>
                  {appearanceSaved && (
                    <p className="mt-2 text-center text-xs font-medium text-brand-green">Appearance saved ✅</p>
                  )}
                  {appearanceError && (
                    <p className="mt-2 text-center text-xs font-medium text-red-600">{appearanceError}</p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-brand-slate/10 bg-white p-5">
                <h2 className="mb-4 text-lg font-semibold text-brand-charcoal">Live preview</h2>
                <div className="mx-auto w-full max-w-[330px] rounded-[2rem] bg-[#161c20] p-2.5 shadow-2xl">
                  <div className="relative overflow-hidden rounded-[1.6rem]" style={{ backgroundColor: activeTheme.pageBg }}>
                    <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/30" />
                    <div className="h-[620px] overflow-y-auto scrollbar-hide">
                      {appearance.heroImage ? (
                        <img src={appearance.heroImage} alt="Hero" className="h-36 w-full object-cover" />
                      ) : (
                        <div className="h-36 w-full bg-brand-slate/10" />
                      )}
                      <div className="-mt-9 px-4 pb-5">
                        <div className="inline-flex rounded-full border-4" style={{ borderColor: activeTheme.pageBg }}>
                          {appearance.profileImage ? (
                            <img
                              src={appearance.profileImage}
                              alt="Profile preview"
                              className="h-16 w-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-brand-slate/15" />
                          )}
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
                                <span className="inline-flex items-center gap-2">
                                  {(() => {
                                    const meta = getSocialMeta(link.title, link.url)
                                    const Icon = meta.icon
                                    return <Icon className="h-4 w-4" />
                                  })()}
                                  {link.title}
                                </span>
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
                                  className="h-9 w-full rounded-lg border px-2 text-xs text-brand-charcoal placeholder:text-brand-slate/70"
                                  style={{
                                    borderColor: `${activeTheme.accent}55`,
                                    color: activeTheme.textColor,
                                    backgroundColor: activeTheme.cardBg,
                                  }}
                                />
                                <input
                                  placeholder="Email"
                                  type="email"
                                  value={publicContactForm.email}
                                  onChange={(e) => setPublicContactForm((prev) => ({ ...prev, email: e.target.value }))}
                                  className="h-9 w-full rounded-lg border px-2 text-xs text-brand-charcoal placeholder:text-brand-slate/70"
                                  style={{
                                    borderColor: `${activeTheme.accent}55`,
                                    color: activeTheme.textColor,
                                    backgroundColor: activeTheme.cardBg,
                                  }}
                                />
                                <input
                                  placeholder="Phone number"
                                  value={publicContactForm.phone}
                                  onChange={(e) => setPublicContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                                  className="h-9 w-full rounded-lg border px-2 text-xs text-brand-charcoal placeholder:text-brand-slate/70"
                                  style={{
                                    borderColor: `${activeTheme.accent}55`,
                                    color: activeTheme.textColor,
                                    backgroundColor: activeTheme.cardBg,
                                  }}
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
              {contactsError && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {contactsError}
                </div>
              )}
              {contactsLoading && (
                <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                  Loading contacts...
                </div>
              )}
              {!contactsLoading && contactLeads.length === 0 && (
                <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                  No contacts yet from your public profile form.
                </div>
              )}
              {!contactsLoading &&
                contactLeads.map((contact) => (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => downloadContactVCard(contact)}
                    className="flex w-full items-center justify-between rounded-xl border border-brand-slate/10 p-4 text-left transition hover:border-brand-green/40 hover:bg-brand-green/5"
                    title="Save to phone contacts"
                  >
                    <div>
                      <p className="font-medium text-brand-charcoal">{contact.name}</p>
                      <p className="text-sm text-brand-slate/70">{contact.source}</p>
                      {contact.email && <p className="text-xs text-brand-slate/60">{contact.email}</p>}
                      {contact.phone && <p className="text-xs text-brand-slate/60">{contact.phone}</p>}
                      <p className="mt-1 text-[11px] font-medium text-brand-green">Tap to save contact</p>
                    </div>
                    <span className="text-sm text-brand-slate/60">{contact.date}</span>
                  </button>
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
