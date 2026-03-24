import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GUEST_CART_SESSION_KEY = 'ahju_cart_session'

const formatNaira = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)

const Shop = () => {
  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [flyingIncrements, setFlyingIncrements] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [productsError, setProductsError] = useState('')

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

  const loadProducts = async () => {
    setIsLoadingProducts(true)
    setProductsError('')
    try {
      const response = await fetch(`${apiBaseUrl}/api/products/`)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.detail || 'Could not load products')
      }
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      setProductsError(error.message || 'Could not load products')
      setProducts([])
    } finally {
      setIsLoadingProducts(false)
    }
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
      await loadProducts()
      try {
        await loadCart()
      } catch {
        setCartItems([])
        setCartCount(0)
      }
    }

    initialize()
  }, [])

  const categories = useMemo(() => {
    const mapped = products
      .map((item) => (item.category || '').trim())
      .filter(Boolean)
    return ['All', ...Array.from(new Set(mapped))]
  }, [products])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return products.filter((product) => {
      const productCategory = (product.category || '').trim()
      const categoryMatch = category === 'All' || productCategory === category
      if (!categoryMatch) return false

      if (!query) return true

      return (
        (product.name || '').toLowerCase().includes(query) ||
        productCategory.toLowerCase().includes(query)
      )
    })
  }, [search, category, products])

  const handleAddToCart = async (product, event) => {
    const sourceRect = event.currentTarget.getBoundingClientRect()
    const target = document.getElementById('navbar-cart-button')
    const targetRect = target?.getBoundingClientRect()

    let animationId = null
    if (targetRect) {
      animationId = `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const startX = sourceRect.left + sourceRect.width / 2
      const startY = sourceRect.top + sourceRect.height / 2
      const endX = targetRect.left + targetRect.width / 2
      const endY = targetRect.top + targetRect.height / 2

      setFlyingIncrements((previous) => [
        ...previous,
        { id: animationId, startX, startY, endX, endY, animate: false },
      ])

      requestAnimationFrame(() => {
        setFlyingIncrements((previous) =>
          previous.map((item) => (item.id === animationId ? { ...item, animate: true } : item))
        )
      })
    }

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
          quantity: 1,
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
      // no-op for now; can be surfaced via toast later
    } finally {
      if (animationId) {
        window.setTimeout(() => {
          setFlyingIncrements((previous) => previous.filter((item) => item.id !== animationId))
        }, 520)
      }
    }
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <div className="flex min-h-screen flex-col bg-site text-brand-charcoal">
      <Header showCart cartCount={cartCount} onCartClick={handleCartClick} shopCtaOnly />

      <div className="pointer-events-none fixed inset-0 z-[70]">
        {flyingIncrements.map((item) => {
          const deltaX = item.endX - item.startX
          const deltaY = item.endY - item.startY

          return (
            <span
              key={item.id}
              className="absolute inline-flex h-6 min-w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-green px-1.5 text-[10px] font-semibold text-white shadow-md transition-all duration-500 ease-out"
              style={{
                left: item.startX,
                top: item.startY,
                transform: item.animate
                  ? `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0.55)`
                  : 'translate(-50%, -50%) scale(1)',
                opacity: item.animate ? 0.3 : 1,
              }}
            >
              +1
            </span>
          )
        })}
      </div>

      <main className="shop-page-enter mx-auto w-full max-w-[86rem] flex-1 px-2 pb-16 pt-10 sm:px-3 lg:px-4">
        <div className="mb-6 flex flex-col gap-2 shop-toolbar-pop">
          <h1 className="text-3xl font-semibold tracking-tight">Shop AHJU Products</h1>
          <p className="text-sm text-brand-slate/75">Browse, filter, and search through our smart identity products.</p>
        </div>

        <div className="shop-toolbar-pop mb-6 grid gap-3 rounded-2xl border border-brand-slate/10 bg-white p-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="h-11 w-full rounded-xl border border-brand-slate/20 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand-green/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? 'bg-brand-green text-white'
                    : 'border border-brand-slate/20 bg-white text-brand-slate hover:bg-brand-green/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {isLoadingProducts ? (
          <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-8 text-center text-sm text-brand-slate">
            Loading products...
          </div>
        ) : productsError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
            {productsError}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-8 text-center text-sm text-brand-slate">
            No products found for your current search/filter.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-4 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <article
                key={product.id}
                className="shop-card mx-auto w-full max-w-[20rem] overflow-hidden rounded-2xl border border-brand-slate/10 bg-white"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link to={`/shop/${product.slug}`} className="block">
                  <img src={resolveMediaUrl(product.image_url)} alt={product.name} className="shop-image h-52 w-full object-cover sm:h-72" />
                </Link>
                <div className="space-y-1.5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-slate/60">{product.category}</p>
                  <h2 className="text-base font-semibold text-brand-charcoal sm:text-lg">
                    <Link to={`/shop/${product.slug}`} className="hover:text-brand-green transition-colors">
                      {product.name}
                    </Link>
                  </h2>
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex items-baseline gap-1.5 flex-wrap">
                      <p className="text-base font-semibold text-brand-green sm:text-lg">{formatNaira(product.price)}</p>
                      {product.old_price ? (
                        <p className="whitespace-nowrap text-xs text-brand-slate/60 line-through sm:text-sm">{formatNaira(product.old_price)}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={(event) => handleAddToCart(product, event)}
                      className="group inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#28241E] text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-[#253035] active:scale-95"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Shop