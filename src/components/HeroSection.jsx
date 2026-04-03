import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

const AnimatedMetric = ({ end, suffix = '', duration = 1.6 }) => {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    let frameId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion()
  const smilingGirlImage = new URL('../Asset/smily girl.jpg', import.meta.url).href
  const whyModernImage = new URL('../Asset/why the mdern.jpg', import.meta.url).href
  const howAhjuWorksImage = new URL('../Asset/how ahju works.jpg', import.meta.url).href
  const exploreImage = new URL('../Asset/explore.jpg', import.meta.url).href

  const showcaseImages = [
    {
      src: new URL('../Asset/Untitled design (1).jpg', import.meta.url).href,
      alt: 'AHJU showcase card design one',
    },
    {
      src: new URL('../Asset/Untitled design (2).jpg', import.meta.url).href,
      alt: 'AHJU showcase card design two',
    },
    {
      src: new URL('../Asset/Untitled design (4).jpg', import.meta.url).href,
      alt: 'AHJU showcase card design three',
    },
    {
      src: new URL('../Asset/Untitled design (6).jpg', import.meta.url).href,
      alt: 'AHJU showcase card design four',
    },
    {
      src: new URL('../Asset/Untitled design (7).jpg', import.meta.url).href,
      alt: 'AHJU showcase card design five',
    },
    {
      src: new URL('../Asset/Untitled design (8).jpg', import.meta.url).href,
      alt: 'AHJU showcase card design six',
    },
  ]

  const highlights = [
    {
      title: 'Instant Identity Transfer',
      description:
        'Share your contact, socials, website, even booking links all in one place. It tells people: “This person is organized and intentional.”',
    },
    {
      title: 'Lead Generation',
      description:
        'The card itself communicates confidence. It shows you came prepared and you take yourself seriously.',
    },
    {
      title: 'Customize',
      description:
        'Make it truly yours — add your logo, brand image, and personalize your profile to reflect your style and identity.',
    },
    {
      title: 'Always up-to-date',
      description:
        'Your profile never expires. Log in, update your details anytime, and you’re good to go.',
    },
    {
      title: 'Social Media',
      description:
        'Instagram, WhatsApp, LinkedIn, TikTok — add all your socials so people connect with you instantly.',
    },
    {
      title: 'Lookbook',
      description:
        'Show, don’t just tell. Upload images to showcase your products, services, or creative portfolio and inspire trust at first glance.',
    },
    {
      title: 'No Subscription',
      description:
        'Pay once, own it forever. Your AHJU card + your profile = no recurring charges.',
    },
    {
      title: 'Easy Setup',
      description:
        'Buy an AHJU product, get instant access to your link-in-bio profile, and start sharing right away.',
    },
  ]

  const collection = [
    {
      name: 'AHJU Black PVC Card',
      image: new URL('../../AHJU Black PVC Card.jpg', import.meta.url).href,
      alt: 'Black premium PVC smart card',
    },
    {
      name: 'AHJU Classic PVC Card',
      image: new URL('../../AHJU Classic PVC Card.jpg', import.meta.url).href,
      alt: 'Classic white PVC smart card',
    },
    {
      name: 'AHJU Bamboo Card',
      image: new URL('../../AHJU Bamboo Card.jpg', import.meta.url).href,
      alt: 'Bamboo eco-friendly smart card',
    },
    {
      name: 'AHJU Black Card',
      image: new URL('../../AHJU Black Card.jpg', import.meta.url).href,
      alt: 'Luxury matte black networking card',
    },
    {
      name: 'AHJU Key Tag',
      image: new URL('../../AHJU Key Tag.jpg', import.meta.url).href,
      alt: 'Smart key tag for contact sharing',
    },
    {
      name: 'AHJU Sticker Tag',
      image: new URL('../../AHJU Sticker Tag.jpg', import.meta.url).href,
      alt: 'NFC sticker tag on phone accessory',
    },
  ]

  const whyAhju = [
    'How prepared you look',
    'Whether you seem intentional',
    'Whether you feel like someone worth connecting with',
    'How confidently you carry yourself',
  ]

  const builtFor = [
    {
      title: 'Impression Matters',
      description:
        'People decide your level in seconds. If you look premium, they treat you with more respect and offer better conversations.',
    },
    {
      title: 'Modern Identity Matters',
      description:
        'In fast-paced Nigerian business, nobody wants stress. One tap shows you’re current, intentional, and ready for serious work.',
    },
    {
      title: 'Organized = Trusted',
      description:
        'A clean, instant profile signals structure and credibility. When you look organized, people assume you are reliable.',
    },
    {
      title: 'Communicate Competence',
      description:
        'Your tools reflect your standards. AHJU makes you look prepared, confident, and professional even before you say a word.',
    },
    {
      title: 'AHJU Elevates You',
      description:
        'Paper cards get lost. Introductions get forgotten. But one tap delivers a premium experience that makes people remember you.',
    },
    {
      title: 'The AHJU Advantage',
      description:
        'Premium design meets powerful tech, helping you connect faster, close deals easier, and stand out everywhere.',
    },
  ]

  const audience = ['Executives', 'Founders', 'Consultants', 'Lawyers', 'Realtors', 'Creatives']

  const howItWorks = [
    'Choose your AHJU card',
    'Customize your digital profile',
    'Receive your Business Assistant instantly',
    'Get your physical card delivered',
    'Tap → Share → Impress',
  ]

  const businessAssistantBenefits = [
    'Improve your pitch',
    'Craft smart follow-ups',
    'Handle Nigerian objections',
    'Sell without sounding desperate',
    'Position yourself like a high-value professional',
    'Strengthen your brand voice',
    'Write proposals, bios, DMs, outreach, WhatsApp messages',
    'Make faster, clearer business decisions',
  ]

  const faqs = [
    {
      q: 'What is AHJU?',
      a: 'AHJU is a modern networking solution that uses NFC (tap technology) to help you share your details, social links, website, and offers with just one tap.',
    },
    {
      q: 'How do AHJU products work?',
      a: 'You simply tap your AHJU card, sticker, or keychain on any NFC-enabled phone, and your profile link pops up instantly.',
    },
    {
      q: 'Do I need an app to use AHJU?',
      a: 'No app is needed. Once you buy your card, you’ll set up your AHJU profile, and that’s it.',
    },
    {
      q: 'Can I update my AHJU card?',
      a: 'Yes. You can update your profile anytime without printing a new card.',
    },
    {
      q: 'Do AHJU products require subscription fees?',
      a: 'No hidden charges. You pay once for the product, and your profile stays active.',
    },
  ]

  const stats = [
    { end: 5, suffix: '+', label: 'Year Guarantee' },
    { end: 640, suffix: 'K+', label: 'Total Taps' },
    { end: 30, suffix: '%', label: 'Team Discount' },
    { end: 100, suffix: '%', label: 'Secure' },
  ]

  const sectionReveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: 'easeOut' },
      }

  return (
    <main>
      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 pb-14 pt-16 sm:px-3 lg:px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-slate">
              <Sparkles className="h-3.5 w-3.5" /> AHJU Identity
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
              Your Executive Identity Card That Closes Deals.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-slate/80 sm:text-lg">
              In Nigeria, first impressions open doors. AHJU helps you connect with confidence, clarity, and prestige.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <motion.div whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-[#28241E] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#253035]"
                >
                  Get Your AHJU Card <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.button whileHover={shouldReduceMotion ? {} : { y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className="rounded-full border border-brand-slate/20 bg-white px-6 py-3 text-sm font-medium text-brand-slate transition hover:bg-brand-green/10">
                View Prestige Collection
              </motion.button>
            </div>
          </div>

          <div className="soft-glow relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-black/10 bg-white p-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />

            <div className="grid h-[460px] grid-cols-2 gap-3 overflow-hidden">
              <div className="hero-scroll-up flex flex-col gap-3">
                {[...showcaseImages, ...showcaseImages].map((image, index) => (
                  <img
                    key={`up-${image.src}-${index}`}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    fetchpriority="low"
                    decoding="async"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                ))}
              </div>
              <div className="hero-scroll-down flex flex-col gap-3">
                {[...showcaseImages, ...showcaseImages].map((image, index) => (
                  <img
                    key={`down-${image.src}-${index}`}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    fetchpriority="low"
                    decoding="async"
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <div className="rounded-2xl border border-black/10 bg-white p-7 sm:p-9">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]">
              <img
                src={whyModernImage}
                alt="Professional networking in Nigeria"
                className="h-[420px] w-full object-cover sm:h-[500px]"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
                sizes="(max-width: 1024px) 92vw, 46vw"
              />
            </div>

            <div className="flex flex-col justify-center py-2 sm:py-4">
              <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                Why the Modern Nigerian Professional Needs AHJU
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
                Nigeria is a prestige-first market. People evaluate your presence before you speak.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {whyAhju.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-black/10 bg-black/[0.02] p-3 text-sm text-black/75">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-black" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-slate bg-[#f6f8f3] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-14 w-28 rounded-bl-3xl bg-brand-slate" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-24 rounded-tr-3xl bg-brand-green/25" />

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex -rotate-2 rounded-md bg-brand-green px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                Auto Showcase
              </span>
              <h3 className="mt-3 text-xl font-semibold text-black sm:text-2xl">How AHJU Makes You Unforgettable</h3>
              <p className="mt-2 text-sm text-black/65">For Creatives | Brands | Corporate Professionals</p>

              <div className="relative mt-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-white to-transparent" />

                <div className="h-[250px] overflow-hidden rounded-2xl border-2 border-black/10 bg-white p-1 shadow-[8px_8px_0_rgba(17,17,17,0.08)]">
                  <div className="highlights-auto-track flex flex-col">
                    {[...highlights, ...highlights].map((item, index) => (
                      <article
                        key={`${item.title}-${index}`}
                        className="fancy-card flex h-[242px] flex-col justify-center rounded-xl border border-black/10 bg-gradient-to-b from-white to-black/[0.02] px-4 py-4"
                      >
                        <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white">
                          <CheckCircle2 className="h-4 w-4 text-black/75" />
                        </div>
                        <h4 className="text-sm font-semibold text-black">{item.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-black/65">{item.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>


              <motion.div whileHover={shouldReduceMotion ? {} : { y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}>
                <Link
                  to="/u/sample"
                  className="mt-6 inline-flex rounded-full bg-[#28241E] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#253035]"
                >
                  View Sample Profile Here
                </Link>
              </motion.div>
            </div>

            <div className="rounded-2xl border-2 border-black/10 bg-white p-3 shadow-[8px_8px_0_rgba(17,17,17,0.08)]">
              <img
                src={smilingGirlImage}
                alt="Smiling professional profile showcase"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="h-[360px] w-full rounded-xl object-cover object-[50%_12%] lg:h-[430px]"
              />
              <p className="mt-3 text-sm font-medium text-black/70">Stand out instantly with a polished digital identity.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">Choose the Identity That Matches Your Future</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collection.map((item, index) => (
            <motion.div
              key={item.name}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={shouldReduceMotion ? {} : { duration: 0.35, delay: index * 0.06 }}
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-64"
              />
              <div className="border-t border-black/10 p-4 text-sm font-medium text-black/80">{item.name}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-7 flex justify-center">
          <motion.div whileHover={shouldReduceMotion ? {} : { y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#28241E] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#253035]"
            >
              Get your AHJU NOW <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <div className="built-different-section relative overflow-hidden rounded-3xl border border-brand-slate/20 bg-gradient-to-br from-brand-charcoal to-brand-slate p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid grid-cols-1 gap-7 lg:grid-cols-[1.05fr_1.35fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">
                Premium Positioning
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Built for People Who Move Differently.</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                AHJU was designed for professionals who understand that first impressions and modern identity can open doors before a conversation even begins.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {audience.map((role) => (
                  <span key={role} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">
                    {role}
                  </span>
                ))}
              </div>

              <Link
                to="/register"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green/90"
              >
                Click here <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {builtFor.map((item, index) => (
                <motion.article
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[10px]">
                      {index + 1}
                    </span>
                    Advantage
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">STAND OUT WITH AHJU NFC CARDS</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">How AHJU Works</h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65">
                From setup to real-world networking, AHJU gives you a clear path to sharing your identity in seconds.
              </p>

              <div className="relative mt-5 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] p-2">
                <img
                  src={howAhjuWorksImage}
                  alt="Professional using phone for NFC sharing"
                  loading="lazy"
                  fetchpriority="low"
                  decoding="async"
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="h-56 w-full rounded-xl object-cover"
                />
                <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-black/55 via-black/20 to-transparent p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/80">NFC Experience</p>
                  <p className="mt-1 text-sm font-medium text-white">Tap once. Share instantly. Leave a premium impression.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 sm:p-5">
              <div className="space-y-3">
                {howItWorks.map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-3">
                    <div className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.11em] text-black/45">Step {index + 1}</p>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-black/80">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-slate bg-[#f6f8f3] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-14 w-28 rounded-bl-3xl bg-brand-slate" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-24 rounded-tr-3xl bg-brand-green/25" />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.25fr] lg:items-start">
            <div>
              <span className="inline-flex -rotate-2 rounded-md bg-brand-green px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                AHJU AI Advantage
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-black sm:text-3xl">Explore the AHJU Business Assistant</h2>
              <p className="mt-2 text-sm font-medium text-black/75 sm:text-base">Your Personal Business Strategist — Included with Every Card</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/65 sm:text-base">
                Every AHJU Prestige card comes with your own Business Assistant — a custom GPT built specifically for Nigerians.
              </p>

              <div className="mt-5 rounded-2xl border-2 border-black/10 bg-white p-3 shadow-[8px_8px_0_rgba(17,17,17,0.08)]">
                <img
                  src={exploreImage}
                  alt="Professional planning strategy with digital assistant"
                  loading="lazy"
                  fetchpriority="low"
                  decoding="async"
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="h-52 w-full rounded-xl object-cover"
                />
                <p className="mt-3 text-sm font-medium text-black/70">From cold outreach to closing conversations, AHJU helps you move smarter.</p>
              </div>
            </div>

            <div className="relative">
              <div className="space-y-3">
                {businessAssistantBenefits.map((item, index) => (
                  <article
                    key={item}
                    className={`rounded-xl border-2 border-brand-slate/15 p-3 ${index % 2 === 0 ? 'bg-white' : 'bg-brand-green/10'}`}
                  >
                    <p className="text-sm leading-relaxed text-black/80">{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-8 sm:px-3 lg:px-4">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">Your Questions, Our Answers</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">FAQs about AHJU</h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item rounded-xl border border-black/10 bg-white px-4 py-3">
              <summary className="faq-summary cursor-pointer list-none pr-8 text-sm font-medium text-black sm:text-base">
                {item.q}
              </summary>
              <p className="mt-3 border-t border-black/10 pt-3 text-sm leading-relaxed text-black/65">{item.a}</p>
            </details>
          ))}
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 py-10 sm:px-3 lg:px-4">
        <div className="identity-deserves-section relative overflow-hidden rounded-3xl border border-brand-slate/20 bg-gradient-to-br from-brand-charcoal via-brand-slate to-brand-charcoal px-6 py-10 text-white sm:px-10">
          <div className="pointer-events-none absolute -left-12 top-4 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">
                <Sparkles className="h-3.5 w-3.5" /> Premium Upgrade
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Your Identity Deserves Better.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                Upgrade your networking. Upgrade your presentation. Upgrade your opportunities.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-xs sm:text-sm">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">First impression advantage</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Faster trust</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">More meaningful connections</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm lg:justify-self-end">
              <p className="text-xs uppercase tracking-[0.12em] text-white/70">Ready to stand out?</p>
              <p className="mt-2 text-sm text-white/80">Get your AHJU card and start sharing your premium identity in one tap.</p>
              <Link
                to="/shop"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/90"
              >
                GET YOUR AHJU <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="mx-auto w-full max-w-[86rem] px-2 pb-16 sm:px-3 lg:px-4">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-white p-4 sm:grid-cols-4 sm:p-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-4 text-center"
            >
              <p className="text-2xl font-semibold text-black">
                <AnimatedMetric end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/55">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}

export default HeroSection
