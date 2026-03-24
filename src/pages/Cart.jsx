import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GUEST_CART_SESSION_KEY = 'ahju_cart_session'

const formatNaira = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)

const Cart = () => {
  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

  const [items, setItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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
    setIsLoading(true)
    setError('')
    try {
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

      setItems(Array.isArray(data?.items) ? data.items : [])
      setCartCount(Number(data?.count) || 0)
    } catch (err) {
      setError(err.message || 'Could not load cart')
      setItems([])
      setCartCount(0)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const updateItemQuantity = async (item, nextQuantity) => {
    const sessionKey = getOrCreateGuestSession()
    const response = await fetch(`${apiBaseUrl}/api/cart/items/${item.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        quantity: nextQuantity,
        session_key: sessionKey,
      }),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data?.detail || 'Could not update quantity')
    }

    setItems(Array.isArray(data?.items) ? data.items : [])
    setCartCount(Number(data?.count) || 0)
  }

  const removeItem = async (item) => {
    const sessionKey = getOrCreateGuestSession()
    const response = await fetch(
      `${apiBaseUrl}/api/cart/items/${item.id}/?session_key=${encodeURIComponent(sessionKey)}`,
      {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
        },
      }
    )

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data?.detail || 'Could not remove item')
    }

    setItems(Array.isArray(data?.items) ? data.items : [])
    setCartCount(Number(data?.count) || 0)
  }

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + Number(item?.product?.price || 0) * Number(item?.quantity || 0), 0),
    [items]
  )

  return (
    <div className="flex min-h-screen flex-col bg-site text-brand-charcoal">
      <Header showCart cartCount={cartCount} onCartClick={() => navigate('/cart')} shopCtaOnly />

      <main className="mx-auto w-full max-w-[86rem] flex-1 px-2 pb-16 pt-8 sm:px-3 lg:px-4">
        <div className="mb-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-slate transition hover:text-brand-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </button>

          <h1 className="text-xl font-semibold sm:text-2xl">Your Cart</h1>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-8 text-center text-sm text-brand-slate">
            Loading cart...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
            {error}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-10 text-center">
            <p className="text-sm text-brand-slate">Your cart is empty.</p>
            <Link
              to="/shop"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#28241E] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#253035]"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-3">
              {items.map((item) => {
                const product = item?.product || {}
                const quantity = Number(item?.quantity || 1)
                const itemTotal = Number(product?.price || 0) * quantity

                return (
                  <article
                    key={item.id}
                    className="flex items-start gap-2 rounded-2xl border border-brand-slate/10 bg-white p-2.5 sm:items-center sm:gap-3 sm:p-3"
                  >
                    <img
                      src={resolveMediaUrl(product.image_url)}
                      alt={product.name}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                    />

                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-semibold text-brand-charcoal sm:text-base">{product.name}</h2>
                      <p className="text-xs text-brand-slate/65">{product.category}</p>

                      <div className="mt-1 flex items-center justify-start gap-1.5 sm:block">
                        <p className="text-sm font-semibold text-brand-green">{formatNaira(itemTotal)}</p>

                        <div className="inline-flex items-center rounded-full border border-brand-slate/20 bg-white sm:hidden">
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item, Math.max(1, quantity - 1))}
                            className="inline-flex h-7 w-7 items-center justify-center text-brand-charcoal transition hover:bg-brand-green/10"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-xs font-semibold text-brand-charcoal">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item, quantity + 1)}
                            className="inline-flex h-7 w-7 items-center justify-center text-brand-charcoal transition hover:bg-brand-green/10"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ml-auto flex items-center gap-2 self-start sm:self-auto">
                      <div className="hidden items-center rounded-full border border-brand-slate/20 bg-white sm:inline-flex">
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item, Math.max(1, quantity - 1))}
                          className="inline-flex h-8 w-8 items-center justify-center text-brand-charcoal transition hover:bg-brand-green/10"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-xs font-semibold text-brand-charcoal">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item, quantity + 1)}
                          className="inline-flex h-8 w-8 items-center justify-center text-brand-charcoal transition hover:bg-brand-green/10"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100 sm:h-8 sm:w-8"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            <aside className="h-fit rounded-2xl border border-brand-slate/10 bg-white p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-slate/70">Summary</h2>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-brand-slate">Items</span>
                <span className="font-medium">{cartCount}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-brand-green">{formatNaira(subtotal)}</span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-[#28241E] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#253035]"
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Cart
