import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AtSign,
  BookOpen,
  Facebook,
  Ghost,
  Github,
  Globe,
  Instagram,
  Linkedin,
  MessageCircle,
  MessageSquare,
  Music2,
  Pin,
  Play,
  Send,
  Signal,
  Tv,
  Twitter,
  Youtube,
} from 'lucide-react'

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

const PublicProfile = () => {
  const [searchParams] = useSearchParams()
  const profileId = (searchParams.get('id') || '').trim()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [publicContactForm, setPublicContactForm] = useState({ name: '', email: '', phone: '' })
  const [connectSaved, setConnectSaved] = useState(false)
  const [connectError, setConnectError] = useState('')

  const activeTheme = useMemo(() => {
    const selected = profile?.selected_theme || 'minimal-light'
    return THEME_PRESETS.find((theme) => theme.key === selected) || THEME_PRESETS[0]
  }, [profile])

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        setError('Missing profile id in URL. Example: /r/?id=jabbar')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
        const response = await fetch(`${apiBaseUrl}/api/public/profile/?id=${encodeURIComponent(profileId)}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.detail || 'Profile not found')
        }

        setProfile(data)

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
        setError(err.message || 'Could not load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [profileId])

  const submitPublicContact = async (e) => {
    e.preventDefault()
    if (!publicContactForm.name.trim() || !publicContactForm.email.trim() || !publicContactForm.phone.trim()) return

    if (!profile?.username) return
    setConnectError('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
      const response = await fetch(`${apiBaseUrl}/api/public/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profile.username,
          name: publicContactForm.name.trim(),
          email: publicContactForm.email.trim(),
          phone: publicContactForm.phone.trim(),
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

    setPublicContactForm({ name: '', email: '', phone: '' })
    setConnectSaved(true)
    setTimeout(() => setConnectSaved(false), 1800)
  }

  const trackPublicClick = (linkId) => {
    if (!profile?.username || !linkId) return

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
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
                <img src={profile.hero_image_url} alt="Hero" className="h-36 w-full object-cover sm:h-48" />
              ) : (
                <div className="h-36 w-full bg-brand-slate/10 sm:h-48" />
              )}

              <div className="-mt-9 px-4 pb-5 sm:-mt-10">
                <div className="inline-flex rounded-full border-4" style={{ borderColor: activeTheme.pageBg }}>
                  {profile.profile_image_url ? (
                    <img src={profile.profile_image_url} alt="Profile preview" className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-brand-slate/15 sm:h-20 sm:w-20" />
                  )}
                </div>

                <div className="mt-3 rounded-2xl p-4" style={{ backgroundColor: activeTheme.cardBg }}>
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

                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: activeTheme.mutedText }}>
                        Links
                      </p>

                      {(profile.links || []).map((link) => {
                        const meta = getSocialMeta(link.title, link.url)
                        const Icon = meta.icon

                        return (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => trackPublicClick(link.id)}
                            className="inline-flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white"
                            style={{ backgroundColor: activeTheme.buttonBg }}
                          >
                            <Icon className="h-4 w-4" />
                            {link.title}
                          </a>
                        )
                      })}

                      {(!profile.links || profile.links.length === 0) && (
                        <p className="rounded-xl border border-brand-slate/10 px-3 py-2 text-sm" style={{ color: activeTheme.mutedText }}>
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublicProfile
