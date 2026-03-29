import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GUEST_CART_SESSION_KEY = 'ahju_cart_session'

const formatNaira = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

  const [product, setProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem('ahju_access_token')
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  }

  const getOrCreateGuestSession = () => {
    const existing = (localStorage.getItem(GUEST_CART_SESSION_KEY) || '').trim()
    if (existing) return existing

    const generated =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem(GUEST_CART_SESSION_KEY, generated)
    return generated
  }

  const resolveMediaUrl = (value = '') => {
    const raw = (value || '').trim()
    if (!raw) return ''
    if (/^https?:\/\//i.test(raw) || raw.startsWith('blob:')) return raw
    if (raw.startsWith('/')) return `${apiBaseUrl}${raw}`
    return `${apiBaseUrl}/${raw}`
  }

  const loadCart = async () => {
    const sessionKey = getOrCreateGuestSession()
    const response = await fetch(`${apiBaseUrl}/api/cart/?session_key=${encodeURIComponent(sessionKey)}`, {
      headers: {
        ...getAuthHeaders(),
      },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data?.detail || 'Could not load cart')
    }

    setCartItems(Array.isArray(data?.items) ? data.items : [])
    setCartCount(Number(data?.count) || 0)
  }

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${apiBaseUrl}/api/products/`)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.detail || 'Could not load product')
        }

        const items = Array.isArray(data) ? data : []
        const found = items.find((item) => item.slug === slug)
        if (!found) {
          throw new Error('Product not found')
        }

        setProduct(found)
        await loadCart()
      } catch (err) {
        setError(err.message || 'Could not load product')
      } finally {
        setIsLoading(false)
      }
    }

    initialize()
  }, [slug])

  useEffect(() => {
    setActiveImageIndex(0)
  }, [product?.id])

  const productDescription = useMemo(() => {
    if (!product) return ''
    return (product.description || '').trim() || 'Premium AHJU smart product designed to elevate your sharing and digital identity experience.'
  }, [product])

  const productGallery = useMemo(() => {
    if (!product) return []

    const galleryFromApi = Array.isArray(product.gallery_images)
      ? product.gallery_images.map((item) => resolveMediaUrl(item)).filter(Boolean)
      : []

    const candidates = galleryFromApi.length > 0 ? galleryFromApi : [resolveMediaUrl(product.image_url)]

    const seen = new Set()
    return candidates
      .filter(Boolean)
      .filter((url) => {
        if (seen.has(url)) return false
        seen.add(url)
        return true
      })
      .map((url, index) => ({
        url,
        alt: `${product.name} image ${index + 1}`,
      }))
  }, [product])

  const activeGalleryImage = productGallery[activeImageIndex] || productGallery[0] || null

  const goToPreviousImage = () => {
    if (productGallery.length <= 1) return
    setActiveImageIndex((prev) => (prev === 0 ? productGallery.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    if (productGallery.length <= 1) return
    setActiveImageIndex((prev) => (prev + 1) % productGallery.length)
  }

  useEffect(() => {
    if (productGallery.length <= 1) return undefined

    const timer = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % productGallery.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [productGallery.length])

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return
    setIsAddingToCart(true)

    try {
      const sessionKey = getOrCreateGuestSession()
      const response = await fetch(`${apiBaseUrl}/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
          session_key: sessionKey,
        }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not add to cart')
      }

      setCartItems(Array.isArray(data?.items) ? data.items : [])
      setCartCount(Number(data?.count) || 0)
    } catch {
      // no-op for now
    } finally {
      setIsAddingToCart(false)
    }
  }

  const increaseQuantity = () => {
    setQuantity((previous) => Math.min(previous + 1, 99))
  }

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(previous - 1, 1))
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const detailBody = useMemo(() => {
    if (isLoading) {
      return (
        <div className="rounded-2xl border border-brand-slate/10 bg-white px-4 py-10 text-center text-sm text-brand-slate">
          Loading product details...
        </div>
      )
    }

    if (error || !product) {
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center">
          <p className="text-sm text-red-700">{error || 'Product not found'}</p>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#28241E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#253035]"
          >
            Back to shop
          </Link>
        </div>
      )
    }

    return (
      <div className="grid gap-5 rounded-2xl border border-brand-slate/10 bg-white p-4 md:grid-cols-2 md:gap-8 md:p-6">
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-2xl border border-brand-slate/10 bg-white">
            {activeGalleryImage ? (
              <img
                src={activeGalleryImage.url}
                alt={activeGalleryImage.alt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full min-h-[320px] w-full object-cover"
              />
            ) : null}

            {productGallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  className="absolute left-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            ) : null}
          </div>

          {productGallery.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {productGallery.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-xl border transition ${
                    activeImageIndex === index
                      ? 'border-brand-green ring-2 ring-brand-green/30'
                      : 'border-brand-slate/15 hover:border-brand-green/35'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-slate/60">{product.category}</p>
          <h1 className="text-2xl font-semibold text-brand-charcoal sm:text-3xl">{product.name}</h1>

          <div className="flex items-end gap-2">
            <p className="text-2xl font-semibold text-brand-green">{formatNaira(product.price)}</p>
            {product.old_price ? (
              <p className="text-sm text-brand-slate/60 line-through">{formatNaira(product.old_price)}</p>
            ) : null}
          </div>

          <p className="whitespace-pre-line text-sm leading-relaxed text-brand-slate/75">{productDescription}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-full border border-brand-slate/20 bg-white">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="inline-flex h-10 w-10 items-center justify-center text-base font-semibold text-brand-charcoal transition hover:bg-brand-green/10"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="min-w-10 text-center text-sm font-semibold text-brand-charcoal">{quantity}</span>
              <button
                type="button"
                onClick={increaseQuantity}
                className="inline-flex h-10 w-10 items-center justify-center text-base font-semibold text-brand-charcoal transition hover:bg-brand-green/10"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="inline-flex items-center gap-2 rounded-full bg-[#28241E] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#253035] disabled:opacity-70"
            >
              <ShoppingCart className="h-4 w-4" />
              {isAddingToCart ? 'Adding...' : 'Add to cart'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 rounded-full border border-brand-slate/20 bg-white px-5 py-2.5 text-sm font-medium text-brand-charcoal transition hover:bg-brand-green/10"
            >
              Get now
            </button>
          </div>
        </div>
      </div>
    )
  }, [
    isLoading,
    error,
    product,
    isAddingToCart,
    activeGalleryImage,
    activeImageIndex,
    productGallery,
    productDescription,
  ])

  return (
    <div className="flex min-h-screen flex-col bg-site text-brand-charcoal">
      <Header showCart cartCount={cartCount} onCartClick={handleCartClick} shopCtaOnly />

      <main className="mx-auto w-full max-w-[86rem] flex-1 px-2 pb-16 pt-8 sm:px-3 lg:px-4">
        <div className="mb-5">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-slate transition hover:text-brand-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </button>
        </div>

        {detailBody}
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetail
