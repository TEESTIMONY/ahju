import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  Globe,
  Link2,
  Play,
  Signal,
  Tv,
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

const PROFILE_CACHE_TTL_MS = 60_000

const getProfileCacheKey = (profileId = '') => `ahju_public_profile_cache_${(profileId || '').toLowerCase()}`

const readCachedProfile = (profileId = '') => {
  const key = getProfileCacheKey(profileId)
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.data || !parsed?.ts) return null
    if (Date.now() - parsed.ts > PROFILE_CACHE_TTL_MS) return null
    return parsed.data
  } catch {
    return null
  }
}

const writeCachedProfile = (profileId = '', data = null) => {
  if (!profileId || !data) return
  try {
    sessionStorage.setItem(
      getProfileCacheKey(profileId),
      JSON.stringify({ ts: Date.now(), data }),
    )
  } catch {
    // Ignore cache write issues.
  }
}

const THEME_PRESETS = [
  {
    key: 'minimal-light',
    pageBg: '#f6f8f3',
    cardBg: '#ffffff',
    textColor: '#223136',
    mutedText: '#5f7076',
    buttonBg: '#28241E',
    accent: '#348539',
  },
  {
    key: 'dark-pro',
    pageBg: '#101619',
    cardBg: '#1b2428',
    textColor: '#f4f7f8',
    mutedText: '#b6c2c7',
    buttonBg: '#348539',
    accent: '#7ed35f',
  },
  {
    key: 'sand-gold',
    pageBg: '#f3eee5',
    cardBg: '#fffaf1',
    textColor: '#3f2f1f',
    mutedText: '#78644d',
    buttonBg: '#946c34',
    accent: '#c7974a',
  },
  {
    key: 'sunset-glow',
    pageBg: '#fff1ea',
    cardBg: '#ffffff',
    textColor: '#40261d',
    mutedText: '#7b5044',
    buttonBg: '#e86f3f',
    accent: '#ff9f66',
  },
  {
    key: 'ocean-breeze',
    pageBg: '#e9f7fa',
    cardBg: '#ffffff',
    textColor: '#16343d',
    mutedText: '#4f7077',
    buttonBg: '#1c7f96',
    accent: '#45bcd7',
  },
  {
    key: 'royal-violet',
    pageBg: '#f2efff',
    cardBg: '#ffffff',
    textColor: '#2e2350',
    mutedText: '#655a88',
    buttonBg: '#5a46b2',
    accent: '#8b77e8',
  },
  {
    key: 'forest-luxe',
    pageBg: '#edf5ef',
    cardBg: '#ffffff',
    textColor: '#1f3427',
    mutedText: '#587061',
    buttonBg: '#2f6f44',
    accent: '#61a47a',
  },
]

const getSocialMeta = (title = '', url = '') => {
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

const PublicProfile = () => {
  const [searchParams] = useSearchParams()
  const profileId = (searchParams.get('id') || '').trim()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [publicContactForm, setPublicContactForm] = useState({ name: '', email: '', phone: '', whereWeMet: '' })
  const [connectSaved, setConnectSaved] = useState(false)
  const [connectError, setConnectError] = useState('')
  const [profileTab, setProfileTab] = useState('contact')
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState('')

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

  const resolveMediaUrl = (value = '') => {
    const raw = (value || '').trim()
    if (!raw) return ''
    if (/^https?:\/\//i.test(raw) || raw.startsWith('blob:')) return raw
    if (raw.startsWith('/')) return `${apiBaseUrl}${raw}`
    return `${apiBaseUrl}/${raw}`
  }

  const activeTheme = useMemo(() => {
    const selected = profile?.selected_theme || 'minimal-light'
    return THEME_PRESETS.find((theme) => theme.key === selected) || THEME_PRESETS[0]
  }, [profile])

  const { socialLinks, ordinaryLinks } = useMemo(() => {
    const links = Array.isArray(profile?.links) ? profile.links : []
    return links.reduce(
      (acc, link) => {
        const meta = getSocialMeta(link.title, link.url)
        const next = { ...link, meta }
        if (meta.isSocial) acc.socialLinks.push(next)
        else acc.ordinaryLinks.push(next)
        return acc
      },
      { socialLinks: [], ordinaryLinks: [] },
    )
  }, [profile])

  const portfolioItems = useMemo(() => {
    const items = Array.isArray(profile?.portfolio) ? profile.portfolio : []
    return items.filter((item) => item?.image_url || item?.embed_html)
  }, [profile])

  const activePortfolioItem = portfolioItems[portfolioIndex] || null
  const portfolioTitleBadge = useMemo(() => {
    const raw = (activePortfolioItem?.title || '').trim()
    if (!raw) return ''
    // Hide the default backend label used for imports.
    if (raw.toLowerCase() === 'imported from source') return ''
    return raw
  }, [activePortfolioItem?.title])

  useEffect(() => {
    setPortfolioIndex(0)
  }, [profile?.username, portfolioItems.length])

  useEffect(() => {
    setProfileTab('contact')
  }, [profile?.username])

  useEffect(() => {
    setLightboxImage('')
  }, [profile?.username])

  const goToNextPortfolio = () => {
    if (!portfolioItems.length) return
    setPortfolioIndex((prev) => (prev + 1) % portfolioItems.length)
  }

  const goToPrevPortfolio = () => {
    if (!portfolioItems.length) return
    setPortfolioIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
  }

  useEffect(() => {
    if (portfolioItems.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setPortfolioIndex((prev) => (prev + 1) % portfolioItems.length)
    }, 3500)

    return () => window.clearInterval(intervalId)
  }, [portfolioItems.length])

  useEffect(() => {
    const controller = new AbortController()

    const fetchProfile = async () => {
      if (!profileId) {
        setError('Missing profile id in URL. Example: /r/?id=jabbar')
        setLoading(false)
        return
      }

      const cachedProfile = readCachedProfile(profileId)
      if (cachedProfile) {
        setProfile(cachedProfile)
        setLoading(false)
      } else {
        setLoading(true)
      }
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/api/public/profile/?id=${encodeURIComponent(profileId)}`, {
          signal: controller.signal,
          cache: 'force-cache',
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.detail || 'Profile not found')
        }

        setProfile(data)
        writeCachedProfile(profileId, data)

        const trackedViewKey = `ahju_view_tracked_${data.username}`
        const hasTrackedView = sessionStorage.getItem(trackedViewKey)

        if (!hasTrackedView) {
          fetch(`${apiBaseUrl}/api/public/track/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: data.username,
              event_type: 'view',
            }),
          }).catch(() => {})

          sessionStorage.setItem(trackedViewKey, '1')
        }
      } catch (err) {
        if (err?.name === 'AbortError') return
        setError(err.message || 'Could not load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
    return () => {
      controller.abort()
    }
  }, [profileId])

  const submitPublicContact = async (e) => {
    e.preventDefault()
    if (!publicContactForm.name.trim() || !publicContactForm.email.trim() || !publicContactForm.phone.trim()) return

    if (!profile?.username) return
    setConnectError('')

    try {
      const response = await fetch(`${apiBaseUrl}/api/public/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profile.username,
          name: publicContactForm.name.trim(),
          email: publicContactForm.email.trim(),
          phone: publicContactForm.phone.trim(),
          where_we_met: publicContactForm.whereWeMet.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setConnectError(data?.detail || 'Could not submit details. Please try again.')
        setTimeout(() => setConnectError(''), 2200)
        return
      }
    } catch {
      setConnectError('Could not submit details. Please try again.')
      setTimeout(() => setConnectError(''), 2200)
      return
    }

    setPublicContactForm({ name: '', email: '', phone: '', whereWeMet: '' })
    setConnectSaved(true)
    setTimeout(() => setConnectSaved(false), 1800)
  }

  const trackPublicClick = (linkId) => {
    if (!profile?.username || !linkId) return

    fetch(`${apiBaseUrl}/api/public/track/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: profile.username,
        event_type: 'click',
        link_id: linkId,
      }),
    }).catch(() => {})
  }

  return (
    <div className="min-h-screen bg-site px-0 py-0">
      {(connectSaved || connectError) && (
        <div className="pointer-events-none fixed left-1/2 top-4 z-50 w-[92%] max-w-md -translate-x-1/2">
          <div
            className={`rounded-lg px-4 py-2 text-center text-sm font-semibold text-white shadow-lg ${
              connectSaved ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {connectSaved ? 'Submitted ✅' : connectError}
          </div>
        </div>
      )}

      <div className="w-full sm:mx-auto sm:max-w-[2500px] sm:px-6 sm:py-0">
        <div className="w-full sm:flex sm:justify-center">
          {loading && (
            <div className="rounded-2xl border border-brand-slate/10 bg-white px-4 py-3 text-sm text-brand-slate">
              Loading profile...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          {!loading && !error && profile && (
            <div
              className="w-full overflow-hidden rounded-none border-0 shadow-none sm:w-[45%] sm:max-w-none sm:border sm:border-brand-slate/10 sm:shadow-xl"
              style={{ backgroundColor: activeTheme.pageBg }}
            >
              <div className="h-screen overflow-y-auto scrollbar-hide sm:h-screen">
              {profile.hero_image_url ? (
                <img
                  src={resolveMediaUrl(profile.hero_image_url)}
                  alt="Hero"
                  className="h-36 w-full object-cover sm:h-48"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              ) : (
                <div className="h-36 w-full bg-brand-slate/10 sm:h-48" />
              )}

              <div className="-mt-9 px-2 pb-5 sm:-mt-10">
                <div className="inline-flex rounded-full border-4" style={{ borderColor: activeTheme.pageBg }}>
                  {profile.profile_image_url ? (
                    <img
                      src={resolveMediaUrl(profile.profile_image_url)}
                      alt="Profile preview"
                      className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-brand-slate/15 sm:h-20 sm:w-20" />
                  )}
                </div>

                <div className="mt-3 rounded-2xl p-3" style={{ backgroundColor: activeTheme.cardBg }}>
                    <h1
                      className="text-xl font-semibold"
                      style={{
                        color: profile.name_color || '#223136',
                        fontFamily: profile.name_font || 'Inter, sans-serif',
                      }}
                    >
                      {profile.display_name || `@${profile.username}`}
                    </h1>

                    <p className="mt-1 text-sm" style={{ color: activeTheme.mutedText }}>
                      {profile.short_bio || ''}
                    </p>

                    <div className="mt-2 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                        Links
                      </p>

                      {socialLinks.length > 0 && (
                        <div className="grid grid-cols-3 gap-1">
                          {socialLinks.map((link) => {
                            const Icon = link.meta.icon
                            return (
                              <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackPublicClick(link.id)}
                                title={link.title}
                                className="group inline-flex min-h-24 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 py-2 transition-transform duration-200 hover:-translate-y-0.5"
                                style={{
                                  borderColor: `${link.meta.color}40`,
                                  background: `linear-gradient(160deg, ${link.meta.color}18 0%, ${activeTheme.cardBg} 75%)`,
                                  boxShadow: `0 8px 18px ${link.meta.color}26`,
                                }}
                              >
                                <Icon
                                  className="h-12 w-12 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-200 group-hover:scale-110"
                                  style={{ color: link.meta.color }}
                                />
                                <span
                                  className="max-w-full truncate text-[10px] font-semibold leading-none"
                                  style={{ color: activeTheme.mutedText }}
                                >
                                  {link.title}
                                </span>
                              </a>
                            )
                          })}
                        </div>
                      )}

                      {ordinaryLinks.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                            Other links
                          </p>
                          {ordinaryLinks.map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => trackPublicClick(link.id)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-white"
                              style={{ backgroundColor: activeTheme.buttonBg }}
                            >
                              <Globe className="h-4 w-4" />
                              {link.title}
                            </a>
                          ))}
                        </div>
                      )}

                      {socialLinks.length === 0 && ordinaryLinks.length === 0 && (
                        <p className="rounded-xl border border-brand-slate/10 px-3 py-2 text-sm" style={{ color: activeTheme.mutedText }}>
                          No links available.
                        </p>
                      )}

                      <div className="rounded-xl border p-3" style={{ borderColor: `${activeTheme.accent}66` }}>
                        <div className="mb-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setProfileTab('contact')}
                            className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition"
                            style={{
                              color: profileTab === 'contact' ? '#ffffff' : activeTheme.textColor,
                              backgroundColor:
                                profileTab === 'contact' ? activeTheme.buttonBg : activeTheme.cardBg,
                              borderColor:
                                profileTab === 'contact'
                                  ? activeTheme.buttonBg
                                  : `${activeTheme.textColor}40`,
                            }}
                          >
                            Contact form
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileTab('lookbook')}
                            className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition"
                            style={{
                              color: profileTab === 'lookbook' ? '#ffffff' : activeTheme.textColor,
                              backgroundColor:
                                profileTab === 'lookbook' ? activeTheme.buttonBg : activeTheme.cardBg,
                              borderColor:
                                profileTab === 'lookbook'
                                  ? activeTheme.buttonBg
                                  : `${activeTheme.textColor}40`,
                            }}
                          >
                            Lookbook
                          </button>
                        </div>

                        {profileTab === 'contact' ? (
                          <>
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
                              <input
                                placeholder="Where we met"
                                value={publicContactForm.whereWeMet}
                                onChange={(e) => setPublicContactForm((prev) => ({ ...prev, whereWeMet: e.target.value }))}
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
                            </form>
                          </>
                        ) : (
                          <div className="mt-1">
                            {activePortfolioItem ? (
                              <div className="relative overflow-hidden rounded-2xl border border-brand-slate/15" style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.14)' }}>
                                {activePortfolioItem.image_url ? (
                                  <button
                                    type="button"
                                    onClick={() => setLightboxImage(resolveMediaUrl(activePortfolioItem.image_url))}
                                    className="block w-full"
                                    aria-label="Open image preview"
                                  >
                                    <img
                                      src={resolveMediaUrl(activePortfolioItem.image_url)}
                                      alt={portfolioTitleBadge || 'Lookbook image'}
                                      className="h-56 w-full cursor-zoom-in object-cover sm:h-64"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </button>
                                ) : (
                                  <div
                                    className="h-56 w-full bg-brand-slate/5 sm:h-64"
                                    dangerouslySetInnerHTML={{ __html: activePortfolioItem.embed_html }}
                                  />
                                )}

                                {portfolioTitleBadge && (
                                  <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">
                                    {portfolioTitleBadge}
                                  </div>
                                )}

                                {activePortfolioItem.source_url && (
                                  <a
                                    href={activePortfolioItem.source_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute bottom-2 left-2 inline-flex max-w-[85%] items-center gap-1 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur hover:bg-black/80"
                                  >
                                    <Link2 className="h-3.5 w-3.5" />
                                    <span className="truncate">Open link</span>
                                  </a>
                                )}

                                {portfolioItems.length > 1 && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={goToPrevPortfolio}
                                      className="absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-md hover:bg-black/70"
                                      aria-label="Previous lookbook image"
                                    >
                                      <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={goToNextPortfolio}
                                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-md hover:bg-black/70"
                                      aria-label="Next lookbook image"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </button>

                                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/45 px-2 py-1">
                                      {portfolioItems.map((item, idx) => (
                                        <button
                                          key={`${item.image_url || item.source_url || 'item'}-${idx}`}
                                          type="button"
                                          onClick={() => setPortfolioIndex(idx)}
                                          className={`h-1.5 rounded-full transition-all ${idx === portfolioIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                                          aria-label={`Go to lookbook image ${idx + 1}`}
                                        />
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            ) : (
                              <p className="rounded-xl border border-brand-slate/10 px-3 py-3 text-sm" style={{ color: activeTheme.mutedText }}>
                                No lookbook images available.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/75"
            onClick={() => setLightboxImage('')}
            aria-label="Close image preview"
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl">
            <button
              type="button"
              onClick={() => setLightboxImage('')}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Close"
            >
              ×
            </button>
            <img src={lightboxImage} alt="Lookbook preview" className="max-h-[90vh] w-full object-contain bg-black" />
          </div>
        </div>
      )}
    </div>
  )
}

export default PublicProfile
