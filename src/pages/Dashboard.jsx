import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
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
  Pencil,
  MoreVertical,
} from 'lucide-react'
import {
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
  FaInstagram,
  FaLine,
  FaLinkedin,
  FaMedium,
  FaPinterest,
  FaQuora,
  FaReddit,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaVk,
  FaWeixin,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import { SiFiverr, SiUpwork } from 'react-icons/si'

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart3 },
  { key: 'links', label: 'Links', icon: LinkIcon },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'contacts', label: 'Contacts', icon: Contact },
  { key: 'lookbook', label: 'Lookbook', icon: BookImage },
]

const SOCIAL_PRESET_LINKS = [
  {
    key: 'instagram',
    title: 'Instagram',
    placeholder: 'https://instagram.com/username',
    icon: FaInstagram,
    color: '#E1306C',
  },
  {
    key: 'facebook',
    title: 'Facebook',
    placeholder: 'https://facebook.com/username',
    icon: FaFacebook,
    color: '#1877F2',
  },
  {
    key: 'linkedin',
    title: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/username',
    icon: FaLinkedin,
    color: '#0A66C2',
  },
  {
    key: 'x',
    title: 'X (Twitter)',
    placeholder: 'https://x.com/username',
    icon: FaXTwitter,
    color: '#111827',
  },
  {
    key: 'youtube',
    title: 'YouTube',
    placeholder: 'https://youtube.com/@channel',
    icon: FaYoutube,
    color: '#FF0000',
  },
  {
    key: 'whatsapp',
    title: 'WhatsApp',
    placeholder: 'https://wa.me/234XXXXXXXXXX',
    icon: FaWhatsapp,
    color: '#25D366',
  },
  {
    key: 'telegram',
    title: 'Telegram',
    placeholder: 'https://t.me/username',
    icon: FaTelegram,
    color: '#229ED9',
  },
  {
    key: 'github',
    title: 'GitHub',
    placeholder: 'https://github.com/username',
    icon: FaGithub,
    color: '#24292F',
  },
]

const emptyChartData = [
  { day: 'Mon', views: 0, clicks: 0, leads: 0 },
  { day: 'Tue', views: 0, clicks: 0, leads: 0 },
  { day: 'Wed', views: 0, clicks: 0, leads: 0 },
  { day: 'Thu', views: 0, clicks: 0, leads: 0 },
  { day: 'Fri', views: 0, clicks: 0, leads: 0 },
  { day: 'Sat', views: 0, clicks: 0, leads: 0 },
  { day: 'Sun', views: 0, clicks: 0, leads: 0 },
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

const CONTACT_TAG_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'follow_up', label: 'Follow up' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
  { value: 'lost', label: 'Lost' },
]
const CONTACT_TAG_CYCLE = ['new', 'follow_up', 'lost']

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
    total_leads: 0,
    ctr: 0,
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [links, setLinks] = useState([])
  const [linksLoading, setLinksLoading] = useState(true)
  const [linksSaving, setLinksSaving] = useState(false)
  const [linkActionId, setLinkActionId] = useState(null)
  const [linksError, setLinksError] = useState('')
  const [newLink, setNewLink] = useState({ title: '', url: '' })
  const [editingLinkId, setEditingLinkId] = useState(null)
  const [editingLinkForm, setEditingLinkForm] = useState({ title: '', url: '' })
  const [presetSavingKey, setPresetSavingKey] = useState('')
  const [presetInputs, setPresetInputs] = useState(() =>
    Object.fromEntries(SOCIAL_PRESET_LINKS.map((preset) => [preset.key, ''])),
  )
  const [copiedBioLink, setCopiedBioLink] = useState(false)
  const [contactLeads, setContactLeads] = useState([])
  const [contactsLoading, setContactsLoading] = useState(true)
  const [contactsError, setContactsError] = useState('')
  const [contactSearch, setContactSearch] = useState('')
  const [contactFilterTag, setContactFilterTag] = useState('all')
  const [contactActionId, setContactActionId] = useState(null)
  const [contactNoteDrafts, setContactNoteDrafts] = useState({})
  const [expandedContactNotes, setExpandedContactNotes] = useState({})
  const [openContactMenuId, setOpenContactMenuId] = useState(null)
  const [portfolioItems, setPortfolioItems] = useState([])
  const [portfolioLoading, setPortfolioLoading] = useState(true)
  const [portfolioError, setPortfolioError] = useState('')
  const [portfolioUploadSaving, setPortfolioUploadSaving] = useState(false)
  const [portfolioActionId, setPortfolioActionId] = useState(null)
  const [socialFeedUrl, setSocialFeedUrl] = useState('')
  const [socialFeedTitle, setSocialFeedTitle] = useState('')
  const [socialFeedSaving, setSocialFeedSaving] = useState(false)
  // Backward-compatible lookbook UI state (kept to prevent runtime crashes while portfolio UI is being migrated)
  const [lookbookGallery, setLookbookGallery] = useState(lookbookItems)
  const [socialLink, setSocialLink] = useState('')
  const [socialLoading, setSocialLoading] = useState(false)
  const [importPreviewOpen, setImportPreviewOpen] = useState(false)
  const [importPreviewImages, setImportPreviewImages] = useState([])
  const [selectedImportImages, setSelectedImportImages] = useState([])
  const [importSourceUrl, setImportSourceUrl] = useState('')
  const [importMaxImages, setImportMaxImages] = useState(10)
  const [importSaving, setImportSaving] = useState(false)
  const [appearanceSaving, setAppearanceSaving] = useState(false)
  const [appearanceError, setAppearanceError] = useState('')
  const [appearanceSaved, setAppearanceSaved] = useState(false)
  const [appearanceFileNames, setAppearanceFileNames] = useState({
    profileImage: '',
    heroImage: '',
  })
  const [publicContactForm, setPublicContactForm] = useState({ name: '', email: '', phone: '' })
  const [connectSaved, setConnectSaved] = useState(false)
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false)
  const [usernameDraft, setUsernameDraft] = useState(username)
  const [usernameSaving, setUsernameSaving] = useState(false)
  const [usernameError, setUsernameError] = useState('')
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
  // Leads should reflect actual contacts gained from public profile form submissions.
  const totalLeads = useMemo(() => contactLeads.length || 0, [contactLeads])

  const { socialPreviewLinks, ordinaryPreviewLinks } = useMemo(() => {
    const activeLinks = links.filter((link) => link.active)
    return activeLinks.reduce(
      (acc, link) => {
        const meta = getSocialMeta(link.title, link.url)
        const next = { ...link, meta }
        if (meta.isSocial) acc.socialPreviewLinks.push(next)
        else acc.ordinaryPreviewLinks.push(next)
        return acc
      },
      { socialPreviewLinks: [], ordinaryPreviewLinks: [] },
    )
  }, [links])

  const formatContactDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleString()
  }

  const getContactTagLabel = (tagValue = '') =>
    CONTACT_TAG_OPTIONS.find((option) => option.value === tagValue)?.label || 'New'

  const getNextContactTag = (currentTag = 'new') => {
    const currentIndex = CONTACT_TAG_CYCLE.indexOf(currentTag)
    if (currentIndex === -1) return 'new'
    return CONTACT_TAG_CYCLE[(currentIndex + 1) % CONTACT_TAG_CYCLE.length]
  }

  const getContactTagPillClasses = (tagValue = 'new') => {
    if (tagValue === 'new') return 'bg-sky-100 text-sky-700 font-semibold'
    if (tagValue === 'follow_up') return 'bg-amber-100 text-amber-700 font-semibold'
    if (tagValue === 'lost') return 'bg-slate-100 text-slate-800 font-semibold'
    if (tagValue === 'closed') return 'bg-emerald-100 text-emerald-700'
    if (tagValue === 'contacted') return 'bg-violet-100 text-violet-700'
    return 'bg-brand-green/10 text-brand-green'
  }

  const mapApiContactToUi = (lead) => ({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    source: lead.source,
    tag: lead.tag || 'new',
    note: lead.note || '',
    createdAt: lead.created_at,
    date: formatContactDate(lead.created_at),
  })

  const filteredContactLeads = useMemo(() => {
    const normalizedSearch = contactSearch.trim().toLowerCase()

    return contactLeads.filter((contact) => {
      const tagMatch = contactFilterTag === 'all' || contact.tag === contactFilterTag
      if (!tagMatch) return false

      if (!normalizedSearch) return true
      const haystack = [contact.name, contact.email, contact.phone, contact.note, contact.source]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedSearch)
    })
  }, [contactLeads, contactSearch, contactFilterTag])

  const getImageFileName = (value = '', fallback = 'No file selected') => {
    const trimmed = (value || '').trim()
    if (!trimmed) return fallback

    try {
      if (trimmed.startsWith('blob:')) return 'Local preview image'
      const parsed = new URL(trimmed)
      const rawName = parsed.pathname.split('/').filter(Boolean).pop() || ''
      return decodeURIComponent(rawName) || fallback
    } catch {
      const rawName = trimmed.split('/').filter(Boolean).pop() || trimmed
      return rawName || fallback
    }
  }

  const downloadContactVCard = (contact) => {
    if (!contact?.name) return

    const fileSafeName = (contact.name || 'contact').replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contact.name}`,
      contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : '',
      contact.email ? `EMAIL;TYPE=INTERNET:${contact.email}` : '',
      contact.note ? `NOTE:${contact.note.replace(/\n/g, ' ')}` : '',
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

  const exportContactsCsv = (contactsToExport) => {
    if (!contactsToExport.length) return

    const headers = ['Name', 'Email', 'Phone', 'Tag', 'Note', 'Date', 'Source']
    const escapeCsv = (value = '') => `"${String(value).replace(/"/g, '""')}"`
    const rows = contactsToExport.map((contact) => [
      contact.name || '',
      contact.email || '',
      contact.phone || '',
      getContactTagLabel(contact.tag),
      contact.note || '',
      contact.date || '',
      contact.source || '',
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ahju_contacts.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportContactsVcf = (contactsToExport) => {
    if (!contactsToExport.length) return

    const payload = contactsToExport
      .map((contact) => {
        if (!contact?.name) return ''
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${contact.name}`,
          contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : '',
          contact.email ? `EMAIL;TYPE=INTERNET:${contact.email}` : '',
          contact.note ? `NOTE:${contact.note.replace(/\n/g, ' ')}` : '',
          'END:VCARD',
        ]
          .filter(Boolean)
          .join('\n')
      })
      .filter(Boolean)
      .join('\n\n')

    if (!payload) return

    const blob = new Blob([payload], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ahju_contacts.vcf'
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

  const resolveMediaUrl = (value = '') => {
    const raw = (value || '').trim()
    if (!raw) return ''
    if (/^https?:\/\//i.test(raw) || raw.startsWith('blob:')) return raw

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
    if (raw.startsWith('/')) return `${apiBaseUrl}${raw}`
    return `${apiBaseUrl}/${raw}`
  }

  function getSocialMeta(title = '', url = '') {
    const normalized = `${title} ${url}`.toLowerCase()

    if (normalized.includes('instagram')) return { icon: FaInstagram, color: '#E1306C', isSocial: true }
    if (normalized.includes('facebook')) return { icon: FaFacebook, color: '#1877F2', isSocial: true }
    if (normalized.includes('threads') || normalized.includes('threads.net')) return { icon: AtSign, color: '#111111', isSocial: true }
    if (normalized.includes('snapchat') || normalized.includes('snap.com')) return { icon: FaSnapchat, color: '#FFFC00', isSocial: true }
    if (normalized.includes('whatsapp') || normalized.includes('wa.me')) return { icon: FaWhatsapp, color: '#25D366', isSocial: true }
    if (normalized.includes('telegram') || normalized.includes('t.me')) return { icon: FaTelegram, color: '#229ED9', isSocial: true }
    if (normalized.includes('messenger') || normalized.includes('m.me')) return { icon: FaFacebookMessenger, color: '#0084FF', isSocial: true }
    if (normalized.includes('discord') || normalized.includes('discord.gg')) return { icon: FaDiscord, color: '#5865F2', isSocial: true }
    if (normalized.includes('wechat') || normalized.includes('weixin')) return { icon: FaWeixin, color: '#07C160', isSocial: true }
    if (normalized.includes('signal')) return { icon: Signal, color: '#3A76F0', isSocial: true }
    if (normalized.includes('linkedin')) return { icon: FaLinkedin, color: '#0A66C2', isSocial: true }
    if (normalized.includes('youtube')) return { icon: FaYoutube, color: '#FF0000', isSocial: true }
    if (normalized.includes('twitter') || normalized.includes('x.com')) return { icon: FaXTwitter, color: '#111827', isSocial: true }
    if (normalized.includes('tiktok')) return { icon: FaTiktok, color: '#111827', isSocial: true }
    if (normalized.includes('twitch')) return { icon: FaTwitch, color: '#9146FF', isSocial: true }
    if (normalized.includes('kick')) return { icon: Tv, color: '#53FC18', isSocial: true }
    if (normalized.includes('rumble')) return { icon: Play, color: '#85C742', isSocial: true }
    if (normalized.includes('xing')) return { icon: AtSign, color: '#006567', isSocial: true }
    if (normalized.includes('reddit')) return { icon: FaReddit, color: '#FF4500', isSocial: true }
    if (normalized.includes('pinterest') || normalized.includes('pin.it')) return { icon: FaPinterest, color: '#E60023', isSocial: true }
    if (normalized.includes('quora')) return { icon: FaQuora, color: '#B92B27', isSocial: true }
    if (normalized.includes('medium')) return { icon: FaMedium, color: '#12100E', isSocial: true }
    if (normalized.includes('kuaishou')) return { icon: Play, color: '#FF5E2B', isSocial: true }
    if (normalized.includes('bilibili')) return { icon: Tv, color: '#00A1D6', isSocial: true }
    if (normalized.includes('line.me') || normalized.includes('line ')) return { icon: FaLine, color: '#06C755', isSocial: true }
    if (normalized.includes('vk.com') || normalized.includes('vkontakte') || normalized.includes('vk ')) return { icon: FaVk, color: '#0077FF', isSocial: true }
    if (normalized.includes('github')) return { icon: FaGithub, color: '#24292F', isSocial: true }
    if (normalized.includes('fiverr') || normalized.includes('fiver')) return { icon: SiFiverr, color: '#1DBF73', isSocial: true }
    if (normalized.includes('upwork')) return { icon: SiUpwork, color: '#14A800', isSocial: true }

    return { icon: Globe, color: '#348539', isSocial: false }
  }

  const getValidAccessToken = async () => {
    const accessToken = localStorage.getItem('ahju_access_token')
    const refreshToken = localStorage.getItem('ahju_refresh_token')
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

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
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
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

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

    const loadAnalytics = async () => {
      setAnalyticsLoading(true)
      setLinksLoading(true)
      setContactsLoading(true)
      setPortfolioLoading(true)
      setAnalyticsError('')
      setLinksError('')
      setContactsError('')
      setPortfolioError('')
      try {
        const [summaryRes, timeseriesRes, appearanceRes, linksRes, contactsRes, portfolioRes] = await Promise.all([
          authorizedFetch(`${apiBaseUrl}/api/dashboard/summary/`),
          authorizedFetch(`${apiBaseUrl}/api/dashboard/timeseries/`),
          authorizedFetch(`${apiBaseUrl}/api/users/appearance/`),
          authorizedFetch(`${apiBaseUrl}/api/users/links/`),
          authorizedFetch(`${apiBaseUrl}/api/users/contacts/`),
          authorizedFetch(`${apiBaseUrl}/api/users/portfolio/`),
        ])

        const summaryData = await summaryRes.json()
        const timeseriesData = await timeseriesRes.json()
        const appearanceData = await appearanceRes.json()
        const linksData = await linksRes.json()
        const contactsData = await contactsRes.json()
        const portfolioData = await portfolioRes.json()

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
        if (!portfolioRes.ok) {
          throw new Error(portfolioData?.detail || 'Failed to load portfolio')
        }

        setSummary(summaryData)
        setChartData(
          Array.isArray(timeseriesData?.data)
            ? timeseriesData.data.map((point) => ({
                ...point,
                leads: point?.leads ?? point?.cardTaps ?? 0,
              }))
            : emptyChartData,
        )
        setLinks(Array.isArray(linksData) ? linksData.map(mapApiLinkToUi) : [])
        const mappedContacts = Array.isArray(contactsData) ? contactsData.map(mapApiContactToUi) : []
        setContactLeads(mappedContacts)
        setContactNoteDrafts(
          Object.fromEntries(mappedContacts.map((contact) => [contact.id, contact.note || ''])),
        )
        setPortfolioItems(Array.isArray(portfolioData) ? portfolioData : [])
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
        setPortfolioError(err.message || 'Unable to load portfolio')
        setSummary({ total_views: 0, total_clicks: 0, total_leads: 0, ctr: 0 })
        setChartData(emptyChartData)
        setLinks([])
        setContactLeads([])
        setPortfolioItems([])
      } finally {
        setAnalyticsLoading(false)
        setLinksLoading(false)
        setContactsLoading(false)
        setPortfolioLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  // Keep contacts/leads fresh so new public-profile submissions reflect on dashboard.
  useEffect(() => {
    const accessToken = localStorage.getItem('ahju_access_token')
    const refreshToken = localStorage.getItem('ahju_refresh_token')
    if (!accessToken && !refreshToken) return undefined

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

    const refreshContacts = async () => {
      try {
        const response = await authorizedFetch(`${apiBaseUrl}/api/users/contacts/`)
        if (!response.ok) return

        const contactsData = await response.json().catch(() => [])
        const mappedContacts = Array.isArray(contactsData) ? contactsData.map(mapApiContactToUi) : []
        setContactLeads(mappedContacts)
        setContactNoteDrafts((prev) => {
          const next = { ...prev }
          mappedContacts.forEach((contact) => {
            if (!(contact.id in next)) next[contact.id] = contact.note || ''
          })
          Object.keys(next).forEach((id) => {
            if (!mappedContacts.some((contact) => String(contact.id) === String(id))) {
              delete next[id]
            }
          })
          return next
        })
      } catch {
        // silently ignore background refresh issues
      }
    }

    const intervalId = window.setInterval(refreshContacts, 20000)
    window.addEventListener('focus', refreshContacts)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refreshContacts)
    }
  }, [])

  const addLink = async (e) => {
    e.preventDefault()
    if (!newLink.title.trim() || !newLink.url.trim()) return

    setLinksSaving(true)
    setLinksError('')
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
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

  const getPresetLink = (title = '') =>
    links.find((link) => (link.title || '').trim().toLowerCase() === title.trim().toLowerCase())

  const addPresetLink = async (preset) => {
    const rawValue = (presetInputs[preset.key] || '').trim()
    if (!rawValue) return

    setPresetSavingKey(preset.key)
    setLinksError('')
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/links/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: preset.title,
          url: normalizeLinkUrl(rawValue),
          is_active: true,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        if (data && typeof data === 'object') {
          const firstFieldError = Object.values(data).flat?.()[0]
          throw new Error(firstFieldError || data?.detail || `Could not add ${preset.title} link`)
        }
        throw new Error(data?.detail || `Could not add ${preset.title} link`)
      }

      setLinks((prev) => [mapApiLinkToUi(data), ...prev])
      setPresetInputs((prev) => ({ ...prev, [preset.key]: '' }))
    } catch (err) {
      setLinksError(err.message || `Could not add ${preset.title} link`)
    } finally {
      setPresetSavingKey('')
    }
  }

  const deleteLink = async (id) => {
    const existing = links.find((link) => link.id === id)
    if (!existing) return

    setLinkActionId(id)
    setLinksError('')
    setLinks((prev) => prev.filter((link) => link.id !== id))

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/links/${id}/`, {
        method: 'DELETE',
      })
      if (!response.ok && response.status !== 204) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.detail || 'Could not delete link')
      }
    } catch (err) {
      setLinks((prev) => [existing, ...prev])
      setLinksError(err.message || 'Could not delete link')
    } finally {
      setLinkActionId(null)
    }
  }

  const toggleLink = async (id) => {
    const existing = links.find((link) => link.id === id)
    if (!existing) return

    const nextActive = !existing.active
    setLinkActionId(id)
    setLinksError('')
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, active: nextActive } : link)))

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/links/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: nextActive }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not update link status')
      }

      setLinks((prev) =>
        prev.map((link) =>
          link.id === id
            ? {
                ...link,
                active: data?.is_active ?? nextActive,
              }
            : link,
        ),
      )
    } catch (err) {
      setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, active: existing.active } : link)))
      setLinksError(err.message || 'Could not update link status')
    } finally {
      setLinkActionId(null)
    }
  }

  const startEditingLink = (link) => {
    if (!link?.id) return
    setLinksError('')
    setEditingLinkId(link.id)
    setEditingLinkForm({
      title: link.title || '',
      url: link.url || '',
    })
  }

  const cancelEditingLink = () => {
    setEditingLinkId(null)
    setEditingLinkForm({ title: '', url: '' })
  }

  const saveEditedLink = async (id) => {
    if (!id) return
    const title = editingLinkForm.title.trim()
    const url = normalizeLinkUrl(editingLinkForm.url)
    if (!title || !url) {
      setLinksError('Title and URL are required to update a link')
      return
    }

    setLinkActionId(id)
    setLinksError('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/links/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not update link')
      }

      setLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, ...mapApiLinkToUi(data) } : link)),
      )
      cancelEditingLink()
    } catch (err) {
      setLinksError(err.message || 'Could not update link')
    } finally {
      setLinkActionId(null)
    }
  }

  const copyBioLink = async () => {
    try {
      await navigator.clipboard.writeText(linkInBioUrl)
      setCopiedBioLink(true)
      setTimeout(() => setCopiedBioLink(false), 1800)
    } catch {
      setCopiedBioLink(false)
    }
  }

  const handleLookbookUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    if (files.length > 10) {
      setPortfolioError('You can upload a maximum of 10 images at a time.')
    }

    const filesToUpload = files.slice(0, 10)

    setPortfolioUploadSaving(true)
    if (files.length <= 10) setPortfolioError('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const created = []

      for (const file of filesToUpload) {
        const formData = new FormData()
        formData.append('image', file)

        const response = await authorizedFetch(`${apiBaseUrl}/api/users/portfolio/upload/`, {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.detail || 'Could not upload image to portfolio')
        }
        created.push(data)
      }

      setPortfolioItems((prev) => [...created, ...prev])
    } catch (err) {
      setPortfolioError(err.message || 'Could not upload image to portfolio')
    } finally {
      setPortfolioUploadSaving(false)
      e.target.value = ''
    }
  }

  const importFromSocial = async () => {
    if (!socialLink.trim()) return

    setSocialLoading(true)
    setPortfolioError('')
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const normalizedLink = normalizeLinkUrl(socialLink)
      const maxImages = 10

      const response = await authorizedFetch(`${apiBaseUrl}/api/users/portfolio/import-images/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_url: normalizedLink,
          max_images: maxImages,
          preview_only: true,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not import images from this link')
      }

      const previewImages = Array.isArray(data?.images) ? data.images : []
      if (!previewImages.length) {
        throw new Error('No images found from that URL. Try another page from the same site or one that shows images without login.')
      }

      setImportPreviewImages(previewImages)
      setSelectedImportImages(previewImages.slice(0, maxImages))
      setImportSourceUrl(normalizedLink)
      setImportMaxImages(maxImages)
      setImportPreviewOpen(true)
    } catch (err) {
      setPortfolioError(err.message || 'Could not import images from this link')
    } finally {
      setSocialLoading(false)
    }
  }

  const toggleImportImageSelection = (imageUrl) => {
    setSelectedImportImages((prev) => {
      if (prev.includes(imageUrl)) {
        return prev.filter((url) => url !== imageUrl)
      }
      if (prev.length >= importMaxImages) {
        setPortfolioError(`You can select up to ${importMaxImages} images for this link.`)
        return prev
      }
      setPortfolioError('')
      return [...prev, imageUrl]
    })
  }

  const selectAllImportImages = () => {
    setSelectedImportImages(importPreviewImages.slice(0, importMaxImages))
    setPortfolioError('')
  }

  const deselectAllImportImages = () => {
    setSelectedImportImages([])
    setPortfolioError('')
  }

  const confirmImportSelection = async () => {
    if (!importSourceUrl || !selectedImportImages.length) {
      setPortfolioError('Select at least one image to import.')
      return
    }

    setImportSaving(true)
    setPortfolioError('')
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/portfolio/import-images/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_url: importSourceUrl,
          max_images: importMaxImages,
          selected_images: selectedImportImages,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not import selected images')
      }

      const importedItems = Array.isArray(data?.items) ? data.items : []
      setPortfolioItems((prev) => [...importedItems, ...prev])
      setImportPreviewOpen(false)
      setImportPreviewImages([])
      setSelectedImportImages([])
      setImportSourceUrl('')
      setSocialLink('')
      setSocialFeedTitle('')
    } catch (err) {
      setPortfolioError(err.message || 'Could not import selected images')
    } finally {
      setImportSaving(false)
    }
  }

  const deletePortfolioItem = async (itemId) => {
    if (!itemId) return

    const existing = portfolioItems.find((item) => item.id === itemId)
    if (!existing) return

    setPortfolioActionId(itemId)
    setPortfolioError('')
    setPortfolioItems((prev) => prev.filter((item) => item.id !== itemId))

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/portfolio/${itemId}/`, {
        method: 'DELETE',
      })

      if (!response.ok && response.status !== 204) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.detail || 'Could not delete portfolio item')
      }
    } catch (err) {
      setPortfolioItems((prev) => [existing, ...prev])
      setPortfolioError(err.message || 'Could not delete portfolio item')
    } finally {
      setPortfolioActionId(null)
    }
  }

  const handleAppearanceImageUpload = async (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setAppearanceFileNames((prev) => ({ ...prev, [type]: file.name }))
    setAppearance((prev) => ({ ...prev, [type]: previewUrl }))
    setAppearanceError('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const formData = new FormData()
      formData.append('image', file)
      // Backend expects a "target" field to know whether to update profile or hero.
      // If omitted, backend defaults to "profile".
      formData.append('target', type === 'heroImage' ? 'hero' : 'profile')

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
        tag: 'new',
        note: '',
        createdAt: new Date().toISOString(),
        date: 'Just now',
      },
      ...prev,
    ])

    setPublicContactForm({ name: '', email: '', phone: '' })
    setConnectSaved(true)
    setTimeout(() => setConnectSaved(false), 1800)
  }

  const updateContactTag = async (contactId, nextTag) => {
    const existing = contactLeads.find((contact) => contact.id === contactId)
    if (!existing) return

    setContactActionId(contactId)
    setContactsError('')
    setContactLeads((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, tag: nextTag } : contact)),
    )

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/contacts/${contactId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag: nextTag }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not update contact tag')
      }

      setContactLeads((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, tag: data?.tag || nextTag } : contact,
        ),
      )
    } catch (err) {
      setContactLeads((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, tag: existing.tag || 'new' } : contact,
        ),
      )
      setContactsError(err.message || 'Could not update contact tag')
    } finally {
      setContactActionId(null)
      setExpandedContactNotes((prev) => ({ ...prev, [contactId]: false }))
    }
  }

  const saveContactNote = async (contactId) => {
    const existing = contactLeads.find((contact) => contact.id === contactId)
    if (!existing) return

    const draftNote = contactNoteDrafts[contactId] ?? ''
    if ((existing.note || '') === draftNote) return

    setContactActionId(contactId)
    setContactsError('')
    setContactLeads((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, note: draftNote } : contact)),
    )

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/contacts/${contactId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: draftNote }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not save note')
      }

      setContactLeads((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, note: data?.note ?? draftNote } : contact,
        ),
      )
      setContactNoteDrafts((prev) => ({ ...prev, [contactId]: data?.note ?? draftNote }))
    } catch (err) {
      setContactLeads((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, note: existing.note || '' } : contact,
        ),
      )
      setContactNoteDrafts((prev) => ({ ...prev, [contactId]: existing.note || '' }))
      setContactsError(err.message || 'Could not save note')
    } finally {
      setContactActionId(null)
    }
  }

  const deleteContactLead = async (contactId) => {
    const existing = contactLeads.find((contact) => contact.id === contactId)
    if (!existing) return

    setContactActionId(contactId)
    setContactsError('')
    setContactLeads((prev) => prev.filter((contact) => contact.id !== contactId))

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/contacts/${contactId}/`, {
        method: 'DELETE',
      })

      if (!response.ok && response.status !== 204) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.detail || 'Could not delete contact')
      }

      setContactNoteDrafts((prev) => {
        const next = { ...prev }
        delete next[contactId]
        return next
      })
    } catch (err) {
      setContactLeads((prev) => [existing, ...prev])
      setContactsError(err.message || 'Could not delete contact')
    } finally {
      setContactActionId(null)
    }
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
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
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

  const openUsernameModal = () => {
    setUsernameDraft(username)
    setUsernameError('')
    setIsUsernameModalOpen(true)
  }

  const closeUsernameModal = () => {
    if (usernameSaving) return
    setIsUsernameModalOpen(false)
    setUsernameError('')
  }

  const saveUsername = async () => {
    const trimmed = usernameDraft.trim()
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmed)) {
      setUsernameError('Username must be 3-30 chars and use letters, numbers, or underscores only.')
      return
    }

    setUsernameSaving(true)
    setUsernameError('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
      const response = await authorizedFetch(`${apiBaseUrl}/api/users/set-username/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: trimmed }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not update username')
      }

      localStorage.setItem('ahju_user', JSON.stringify(data.user))
      setIsUsernameModalOpen(false)
    } catch (err) {
      setUsernameError(err.message || 'Could not update username')
    } finally {
      setUsernameSaving(false)
    }
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

        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[86vw] max-w-[320px] flex-col overflow-y-auto rounded-r-2xl border-r border-brand-slate/10 bg-white p-4 shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:max-w-none lg:translate-x-0 lg:rounded-none lg:p-5 lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
            <button
              type="button"
              onClick={openUsernameModal}
              className="flex items-center gap-2 text-sm text-brand-charcoal hover:text-brand-green"
              title="Edit username"
            >
              <User2 className="h-4 w-4 text-brand-slate/70" />
              @{username}
              <Pencil className="h-3.5 w-3.5" />
            </button>
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
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-brand-slate/70">Username</p>
                    <button
                      type="button"
                      onClick={openUsernameModal}
                      className="inline-flex items-center gap-1 rounded-lg border border-brand-slate/20 px-2 py-1 text-xs font-medium text-brand-slate hover:bg-brand-slate/5"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                  </div>
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
                  <p className="text-sm text-brand-slate/70">Leads</p>
                  <p className="mt-1 text-3xl font-bold text-brand-charcoal">{totalLeads}</p>
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
                  <h2 className="text-lg font-semibold text-brand-charcoal">Views, Clicks & Leads (7 days)</h2>
                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-medium text-brand-green">Views</span>
                    <span className="rounded-full bg-brand-slate/10 px-2.5 py-1 text-xs font-medium text-brand-slate">Clicks</span>
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">Leads</span>
                  </div>
                </div>

                <div className="h-56 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                      <Bar dataKey="views" name="Views" fill="#348539" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="clicks" name="Clicks" fill="#28241E" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="leads" name="Leads" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
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

              <div className="rounded-2xl border border-brand-slate/10 bg-white p-3 sm:p-4 md:p-5">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-brand-charcoal">Quick add social links</h3>
                  <p className="text-sm text-brand-slate/70">
                    Pick a platform, paste your profile link once, then toggle it on or off.
                  </p>
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide md:grid md:overflow-visible md:pb-0 md:grid-cols-2 xl:grid-cols-3">
                  {SOCIAL_PRESET_LINKS.map((preset) => {
                    const Icon = preset.icon
                    const existingLink = getPresetLink(preset.title)

                    return (
                      <div key={preset.key} className="min-w-[250px] rounded-xl border border-brand-slate/15 p-2.5 sm:p-3 md:min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-slate/10">
                            <Icon className="h-4 w-4" style={{ color: preset.color }} />
                          </span>
                          <p className="truncate text-sm font-medium text-brand-charcoal sm:text-[15px]">{preset.title}</p>
                        </div>

                        {!existingLink ? (
                          <>
                            <input
                              placeholder={preset.placeholder}
                              value={presetInputs[preset.key] || ''}
                              onChange={(e) =>
                                setPresetInputs((prev) => ({
                                  ...prev,
                                  [preset.key]: e.target.value,
                                }))
                              }
                              className="h-10 w-full min-w-0 rounded-lg border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                            />
                            <button
                              type="button"
                              onClick={() => addPresetLink(preset)}
                              disabled={presetSavingKey === preset.key}
                              className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg bg-brand-green px-3 text-sm font-semibold text-white hover:bg-[#489b2d] disabled:opacity-70"
                            >
                              {presetSavingKey === preset.key ? 'Adding...' : 'Add'}
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="truncate text-xs text-brand-slate/75 sm:text-sm" title={existingLink.url}>
                              {existingLink.url}
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <span
                                className={`text-xs font-medium ${existingLink.active ? 'text-brand-green' : 'text-brand-slate/60'}`}
                              >
                                {existingLink.active ? 'Active' : 'Inactive'}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleLink(existingLink.id)}
                                disabled={linkActionId === existingLink.id}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                  existingLink.active ? 'bg-brand-green' : 'bg-brand-slate/30'
                                } disabled:opacity-60`}
                                aria-label={existingLink.active ? `Deactivate ${preset.title}` : `Activate ${preset.title}`}
                                title={existingLink.active ? `Deactivate ${preset.title}` : `Activate ${preset.title}`}
                              >
                                <span
                                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                                    existingLink.active ? 'translate-x-5' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
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
                {links.map((link) => {
                  const isEditing = editingLinkId === link.id
                  const isBusy = linkActionId === link.id

                  return (
                    <div key={link.id} className="flex min-w-0 flex-col gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex items-start gap-2.5">
                        {(() => {
                          const meta = getSocialMeta(link.title, link.url)
                          const Icon = meta.icon
                          return (
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-slate/10">
                              <Icon className="h-4 w-4" style={{ color: meta.color }} />
                            </span>
                          )
                        })()}

                        <div className="min-w-0 flex-1">
                          {!isEditing ? (
                            <>
                              <p className="font-semibold text-brand-charcoal">{link.title}</p>
                              <p className="truncate text-sm text-brand-slate/70">{link.url}</p>
                            </>
                          ) : (
                            <div className="space-y-2">
                              <input
                                value={editingLinkForm.title}
                                onChange={(e) =>
                                  setEditingLinkForm((prev) => ({ ...prev, title: e.target.value }))
                                }
                                placeholder="Link title"
                                className="h-9 w-full rounded-lg border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                              />
                              <input
                                value={editingLinkForm.url}
                                onChange={(e) =>
                                  setEditingLinkForm((prev) => ({ ...prev, url: e.target.value }))
                                }
                                placeholder="https://your-link.com"
                                className="h-9 w-full rounded-lg border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                        {!isEditing ? (
                          <>
                            <span className="hidden text-sm text-brand-slate/70 sm:inline">{link.clicks} clicks</span>
                            <span className={`hidden text-xs font-medium sm:inline ${link.active ? 'text-brand-green' : 'text-brand-slate/60'}`}>
                              {link.active ? 'Active' : 'Inactive'}
                            </span>
                            <button
                              type="button"
                              onClick={() => startEditingLink(link)}
                              disabled={isBusy}
                              className="text-brand-slate hover:text-brand-charcoal disabled:cursor-not-allowed disabled:opacity-50"
                              title="Edit link"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteLink(link.id)}
                              disabled={isBusy}
                              className="text-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleLink(link.id)}
                              disabled={isBusy}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                link.active ? 'bg-brand-green' : 'bg-brand-slate/30'
                              } disabled:opacity-60`}
                              aria-label={link.active ? 'Deactivate link' : 'Activate link'}
                              title={link.active ? 'Deactivate link' : 'Activate link'}
                            >
                              <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                                  link.active ? 'translate-x-5' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => saveEditedLink(link.id)}
                              disabled={isBusy}
                              className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-green px-3 text-xs font-semibold text-white hover:bg-[#489b2d] disabled:opacity-60"
                            >
                              {isBusy ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditingLink}
                              disabled={isBusy}
                              className="inline-flex h-9 items-center justify-center rounded-lg border border-brand-slate/20 px-3 text-xs font-semibold text-brand-slate hover:bg-brand-slate/5 disabled:opacity-60"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-brand-slate/10 bg-white p-5">
                <h2 className="text-lg font-semibold text-brand-charcoal">Customize profile look</h2>
                <label className="block space-y-1">
                  <span className="text-sm text-brand-slate/70">Profile image file</span>
                  <input
                    value={appearanceFileNames.profileImage || getImageFileName(appearance.profileImage, 'No profile image selected')}
                    readOnly
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
                  <span className="text-sm text-brand-slate/70">Hero image file</span>
                  <input
                    value={appearanceFileNames.heroImage || getImageFileName(appearance.heroImage, 'No hero image selected')}
                    readOnly
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
                            {socialPreviewLinks.length > 0 && (
                              <div className="grid grid-cols-3 gap-2.5">
                                {socialPreviewLinks.map((link) => {
                                  const Icon = link.meta.icon
                                  return (
                                    <button
                                      key={link.id}
                                      type="button"
                                      className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-brand-slate/15"
                                      style={{ backgroundColor: `${activeTheme.buttonBg}18` }}
                                    >
                                      <Icon className="h-4 w-4" style={{ color: link.meta.color }} />
                                    </button>
                                  )
                                })}
                              </div>
                            )}

                            {ordinaryPreviewLinks.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                                  Other links
                                </p>
                                {ordinaryPreviewLinks.map((link) => (
                                  <button
                                    key={link.id}
                                    type="button"
                                    className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-white"
                                    style={{ backgroundColor: activeTheme.buttonBg }}
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      <Globe className="h-4 w-4" />
                                      {link.title}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {socialPreviewLinks.length === 0 && ordinaryPreviewLinks.length === 0 && (
                              <p className="rounded-xl border border-brand-slate/10 px-3 py-2 text-xs" style={{ color: activeTheme.mutedText }}>
                                No links available.
                              </p>
                            )}

                            <div className="rounded-xl border p-3" style={{ borderColor: `${activeTheme.accent}66` }}>
                              <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                                Connect with me
                              </p>
                              <form className="mt-2 space-y-2" onSubmit={submitPublicContact}>
                                <input
                                  placeholder="Your name"
                                  value={publicContactForm.name}
                                  onChange={(e) => setPublicContactForm((prev) => ({ ...prev, name: e.target.value }))}
                                  className="h-9 w-full rounded-lg border px-2 text-xs text-brand-charcoal placeholder:text-brand-slate"
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
                                  className="h-9 w-full rounded-lg border px-2 text-xs text-brand-charcoal placeholder:text-brand-slate"
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
                                  className="h-9 w-full rounded-lg border px-2 text-xs text-brand-charcoal placeholder:text-brand-slate"
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
            <div className="space-y-4 rounded-2xl border border-brand-slate/10 bg-white p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-lg font-semibold text-brand-charcoal">Contacts</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => exportContactsCsv(filteredContactLeads)}
                    disabled={!filteredContactLeads.length}
                    className="inline-flex items-center rounded-lg border border-brand-slate/20 px-3 py-2 text-xs font-semibold text-brand-charcoal hover:bg-brand-slate/5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Export CSV (Excel)
                  </button>
                  <button
                    type="button"
                    onClick={() => exportContactsVcf(filteredContactLeads)}
                    disabled={!filteredContactLeads.length}
                    className="inline-flex items-center rounded-lg border border-brand-slate/20 px-3 py-2 text-xs font-semibold text-brand-charcoal hover:bg-brand-slate/5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Export vCard
                  </button>
                </div>
              </div>

              <div className="grid gap-2 md:grid-cols-[1fr_220px]">
                <input
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search contacts, email, phone, notes..."
                  className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
                <select
                  value={contactFilterTag}
                  onChange={(e) => setContactFilterTag(e.target.value)}
                  className="h-11 rounded-xl border border-brand-slate/20 bg-white px-3 text-sm text-brand-charcoal outline-none focus:border-brand-green/60"
                >
                  <option value="all">All Categories</option>
                  {CONTACT_TAG_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

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
              {!contactsLoading && filteredContactLeads.length === 0 && (
                <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                  No contacts found for this search/filter.
                </div>
              )}

              {!contactsLoading && filteredContactLeads.length > 0 && (
                <div className="space-y-3 md:hidden">
                  {filteredContactLeads.map((contact) => {
                    const isBusy = contactActionId === contact.id
                    const noteValue = contactNoteDrafts[contact.id] ?? ''

                    return (
                      <article key={contact.id} className="rounded-xl border border-brand-slate/10 bg-brand-slate/[0.02] p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-brand-charcoal">{contact.name}</p>
                            <p className="truncate text-xs text-brand-slate/65">{contact.email || 'No email'}</p>
                            <p className="truncate text-xs text-brand-slate/65">{contact.phone || 'No phone'}</p>
                          </div>
                          <span className="rounded-full bg-brand-green/10 px-2 py-1 text-[11px] font-semibold text-brand-green">
                            {getContactTagLabel(contact.tag)}
                          </span>
                        </div>

                        <div className="mt-3 grid gap-2">
                          <label className="space-y-1">
                            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-brand-slate/70">Tag</span>
                            <select
                              value={contact.tag || 'new'}
                              onChange={(e) => updateContactTag(contact.id, e.target.value)}
                              disabled={isBusy}
                              className="h-9 w-full rounded-lg border border-brand-slate/20 bg-white px-2.5 text-xs text-brand-charcoal outline-none focus:border-brand-green/60 disabled:opacity-60"
                            >
                              {CONTACT_TAG_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="space-y-1">
                            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-brand-slate/70">Note</span>
                            <textarea
                              value={noteValue}
                              onChange={(e) =>
                                setContactNoteDrafts((prev) => ({
                                  ...prev,
                                  [contact.id]: e.target.value,
                                }))
                              }
                              onBlur={() => saveContactNote(contact.id)}
                              rows={3}
                              placeholder="Add note..."
                              className="w-full rounded-lg border border-brand-slate/20 px-2.5 py-2 text-xs outline-none focus:border-brand-green/60"
                            />
                          </label>

                          <p className="text-[11px] text-brand-slate/70">{contact.date || '-'}</p>
                        </div>

                        <div className="mt-3 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => deleteContactLead(contact.id)}
                            disabled={isBusy}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}

              {!contactsLoading && filteredContactLeads.length > 0 && (
                <div className="hidden overflow-x-auto rounded-xl border border-brand-slate/10 md:block">
                  <table className="min-w-[900px] w-full text-left text-sm">
                    <thead className="bg-brand-slate/5 text-xs uppercase tracking-[0.08em] text-brand-slate/70">
                      <tr>
                        <th className="px-4 py-3">Contacts</th>
                        <th className="px-4 py-3">Tag</th>
                        <th className="px-4 py-3">Note</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContactLeads.map((contact) => {
                        const isBusy = contactActionId === contact.id
                        const noteValue = contactNoteDrafts[contact.id] ?? ''
                        return (
                          <tr key={contact.id} className="border-t border-brand-slate/10 align-top">
                            <td className="px-4 py-3">
                              <p className="font-semibold text-brand-charcoal">{contact.name}</p>
                              <p className="text-xs text-brand-slate/65">{contact.email || 'No email'}</p>
                              <p className="text-xs text-brand-slate/65">{contact.phone || 'No phone'}</p>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={contact.tag || 'new'}
                                onChange={(e) => updateContactTag(contact.id, e.target.value)}
                                disabled={isBusy}
                                className="h-9 w-full rounded-lg border border-brand-slate/20 bg-white px-2.5 text-xs text-brand-charcoal outline-none focus:border-brand-green/60 disabled:opacity-60"
                              >
                                {CONTACT_TAG_OPTIONS.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <textarea
                                value={noteValue}
                                onChange={(e) =>
                                  setContactNoteDrafts((prev) => ({
                                    ...prev,
                                    [contact.id]: e.target.value,
                                  }))
                                }
                                onBlur={() => saveContactNote(contact.id)}
                                rows={2}
                                placeholder="Add note..."
                                className="w-full rounded-lg border border-brand-slate/20 px-2.5 py-2 text-xs outline-none focus:border-brand-green/60"
                              />
                            </td>
                            <td className="px-4 py-3 text-xs text-brand-slate/70">{contact.date || '-'}</td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => deleteContactLead(contact.id)}
                                disabled={isBusy}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'lookbook' && (
            <div className="space-y-5">
              <div className="grid gap-3 rounded-2xl border border-brand-slate/10 bg-white p-3 sm:p-4 md:grid-cols-2">
                <div className="rounded-xl border border-brand-slate/10 p-3">
                  <p className="text-sm font-semibold text-brand-charcoal">Upload from device</p>
                  <p className="mt-1 text-xs text-brand-slate/70">Add one or multiple images to your portfolio (up to 10 per upload).</p>
                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand-green px-3 py-2 text-sm font-semibold text-white hover:bg-[#489b2d]">
                    <ImagePlus className="h-4 w-4" />
                    {portfolioUploadSaving ? 'Uploading...' : 'Upload images'}
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleLookbookUpload} />
                  </label>
                </div>

                <div className="rounded-xl border border-brand-slate/10 p-3">
                  <p className="text-sm font-semibold text-brand-charcoal">Import from shop/store or social link</p>
                  <p className="mt-1 text-xs text-brand-slate/70">Paste your shop/store or social page URL to preview all detected images, then select up to 10 to import.</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={socialLink}
                      onChange={(e) => setSocialLink(e.target.value)}
                      placeholder="https://yourstore.com/products/... or https://instagram.com/..."
                      className="h-10 min-w-0 w-full flex-1 rounded-lg border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                    />
                    <button
                      type="button"
                      onClick={importFromSocial}
                      disabled={socialLoading}
                      className="inline-flex h-10 w-full items-center justify-center gap-1 rounded-lg border border-brand-slate/20 px-3 text-sm font-medium text-brand-charcoal hover:bg-brand-slate/5 sm:w-auto"
                    >
                      <Link2 className="h-4 w-4" />
                      {socialLoading ? 'Loading...' : 'Preview'}
                    </button>
                  </div>
                </div>
              </div>

              {portfolioError && (
                <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {portfolioError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {portfolioLoading && (
                  <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                    Loading portfolio...
                  </div>
                )}

                {!portfolioLoading && portfolioItems.length === 0 && (
                  <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
                    No portfolio items yet. Upload an image or import a social link.
                  </div>
                )}

                {!portfolioLoading &&
                  portfolioItems.map((item) => (
                  <div key={item.id} className="relative overflow-hidden rounded-2xl border border-brand-slate/10 bg-white">
                    {item.image_url ? (
                      <img
                        src={resolveMediaUrl(item.image_url)}
                        alt={item.title || 'Portfolio'}
                        className="h-44 w-full object-cover"
                      />
                    ) : item.embed_html ? (
                      <div className="h-64 w-full bg-brand-slate/5 p-2" dangerouslySetInnerHTML={{ __html: item.embed_html }} />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-brand-slate/5 px-4 text-center text-xs text-brand-slate/80">
                        Preview unavailable for this link type.
                      </div>
                    )}
                    {item.source_url && (
                      <a
                        href={item.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-2 left-2 right-2 truncate rounded-md bg-black/65 px-2 py-1 text-xs text-white hover:bg-black/75"
                      >
                        {item.source_url}
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => deletePortfolioItem(item.id)}
                      disabled={portfolioActionId === item.id}
                      className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-red-600/90 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {portfolioActionId === item.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {isUsernameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeUsernameModal} aria-label="Close" />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-brand-slate/10 bg-white p-5 shadow-2xl">
            <h3 className="text-lg font-semibold text-brand-charcoal">Edit username</h3>
            <p className="mt-1 text-sm text-brand-slate/70">This updates your public profile link and dashboard username.</p>

            <div className="mt-4">
              <label className="text-xs font-medium text-brand-slate/70">Username</label>
              <input
                value={usernameDraft}
                onChange={(e) => setUsernameDraft(e.target.value)}
                placeholder="e.g. teestimony"
                className="mt-1 h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
              />
              {usernameError && <p className="mt-2 text-sm text-red-600">{usernameError}</p>}
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeUsernameModal}
                className="rounded-xl border border-brand-slate/20 px-3 py-2 text-sm font-medium text-brand-slate hover:bg-brand-slate/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveUsername}
                disabled={usernameSaving}
                className="rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-[#489b2d] disabled:opacity-70"
              >
                {usernameSaving ? 'Saving...' : 'Save username'}
              </button>
            </div>
          </div>
        </div>
      )}

      {importPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setImportPreviewOpen(false)}
            aria-label="Close image selection"
          />

          <div className="relative z-10 w-full max-w-5xl rounded-2xl border border-brand-slate/10 bg-white p-3 shadow-2xl sm:p-4 md:p-5">
            <div className="mb-4 flex items-start justify-between gap-2 sm:gap-3">
              <div>
                <h3 className="text-lg font-semibold text-brand-charcoal">Select images to import</h3>
                <p className="text-sm text-brand-slate/70">
                  Pick the images you want from this link.
                  {' '}
                  {selectedImportImages.length}/{importMaxImages} selected.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={selectAllImportImages}
                    className="rounded-md border border-brand-slate/20 px-2.5 py-1 text-xs font-medium text-brand-charcoal hover:bg-brand-slate/5"
                  >
                    Select all ({Math.min(importPreviewImages.length, importMaxImages)})
                  </button>
                  <button
                    type="button"
                    onClick={deselectAllImportImages}
                    className="rounded-md border border-brand-slate/20 px-2.5 py-1 text-xs font-medium text-brand-charcoal hover:bg-brand-slate/5"
                  >
                    Deselect all
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImportPreviewOpen(false)}
                className="rounded-lg border border-brand-slate/20 p-2 text-brand-slate hover:bg-brand-slate/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[62vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {importPreviewImages.map((imageUrl) => {
                  const isSelected = selectedImportImages.includes(imageUrl)
                  return (
                    <button
                      key={imageUrl}
                      type="button"
                      onClick={() => toggleImportImageSelection(imageUrl)}
                      className={`relative overflow-hidden rounded-xl border ${
                        isSelected ? 'border-brand-green ring-2 ring-brand-green/30' : 'border-brand-slate/15'
                      }`}
                    >
                        <img src={resolveMediaUrl(imageUrl)} alt="Preview" className="h-36 w-full object-cover" />
                      <span
                        className={`absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                          isSelected
                            ? 'border-brand-green bg-brand-green text-white'
                            : 'border-white bg-black/55 text-white'
                        }`}
                      >
                        {isSelected ? <Check className="h-3.5 w-3.5" /> : '+'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setImportPreviewOpen(false)}
                className="rounded-lg border border-brand-slate/20 px-3 py-2 text-sm font-medium text-brand-slate hover:bg-brand-slate/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmImportSelection}
                disabled={!selectedImportImages.length || importSaving}
                className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-[#489b2d] disabled:opacity-60"
              >
                {importSaving ? 'Importing...' : `Import selected (${selectedImportImages.length})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
