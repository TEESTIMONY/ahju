import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GUEST_CART_SESSION_KEY = 'ahju_cart_session'

const formatNaira = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)

const COUNTRY_OPTIONS = [
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'United Kingdom',
  'United States',
  'Canada',
  'United Arab Emirates',
]

const Checkout = () => {
  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

  const [items, setItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    shippingCountry: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    billingSameAsShipping: true,
    billingCountry: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
  })

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
        throw new Error(data?.detail || 'Could not load checkout cart')
      }

      setItems(Array.isArray(data?.items) ? data.items : [])
      setCartCount(Number(data?.count) || 0)
    } catch (err) {
      setError(err.message || 'Could not load checkout cart')
      setItems([])
      setCartCount(0)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + Number(item?.product?.price || 0) * Number(item?.quantity || 0), 0),
    [items]
  )

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const initializeCheckout = async () => {
      setIsSubmitting(true)
      setSubmitError('')
      try {
        const sessionKey = getOrCreateGuestSession()
        const callbackUrl = `${window.location.origin}/checkout/status`

        const response = await fetch(`${apiBaseUrl}/api/payments/initialize/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            email: formData.email,
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            shipping_country: formData.shippingCountry,
            shipping_address: formData.shippingAddress,
            shipping_city: formData.shippingCity,
            shipping_postal_code: formData.shippingPostalCode,
            billing_same_as_shipping: formData.billingSameAsShipping,
            billing_country: formData.billingCountry,
            billing_address: formData.billingAddress,
            billing_city: formData.billingCity,
            billing_postal_code: formData.billingPostalCode,
            session_key: sessionKey,
            callback_url: callbackUrl,
          }),
        })

        const data = await response.json().catch(() => ({}))
        if (!response.ok) {
          throw new Error(data?.detail || 'Could not initialize payment')
        }

        const authorizationUrl = (data?.authorization_url || '').trim()
        if (!authorizationUrl) {
          throw new Error('Payment gateway did not return authorization URL')
        }

        window.location.href = authorizationUrl
      } catch (err) {
        setSubmitError(err.message || 'Could not initialize payment')
      } finally {
        setIsSubmitting(false)
      }
    }

    initializeCheckout()
  }

  return (
    <div className="flex min-h-screen flex-col bg-site text-brand-charcoal">
      <Header showCart cartCount={cartCount} onCartClick={() => navigate('/cart')} shopCtaOnly />

      <main className="mx-auto w-full max-w-[86rem] flex-1 px-2 pb-16 pt-8 sm:px-3 lg:px-4">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-slate transition hover:text-brand-green"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to cart
          </button>

          <h1 className="text-xl font-semibold sm:text-2xl">Checkout</h1>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-8 text-center text-sm text-brand-slate">
            Loading checkout...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">{error}</div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-brand-slate/10 bg-white px-4 py-10 text-center text-sm text-brand-slate">
            Your cart is empty. Add items before checking out.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-brand-slate/10 bg-white p-4 sm:p-5">
              <section className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-slate/70">Buyer details</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Full name"
                    className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                </div>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Phone number"
                  className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
              </section>

              <section className="space-y-3 border-t border-brand-slate/10 pt-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-slate/70">Shopping address</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleInputChange}
                    required
                    className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {COUNTRY_OPTIONS.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <input
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                    className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                  />
                </div>
                <input
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Address"
                  className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
                <input
                  name="shippingPostalCode"
                  value={formData.shippingPostalCode}
                  onChange={handleInputChange}
                  required
                  placeholder="Postal code"
                  className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                />
              </section>

              <section className="space-y-3 border-t border-brand-slate/10 pt-4">
                <label className="inline-flex items-center gap-2 text-sm text-brand-charcoal">
                  <input
                    type="checkbox"
                    name="billingSameAsShipping"
                    checked={formData.billingSameAsShipping}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-brand-slate/30 text-brand-green focus:ring-brand-green"
                  />
                  Billing address is same as shopping
                </label>

                {!formData.billingSameAsShipping ? (
                  <div className="space-y-3">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-slate/70">Billing address</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <select
                        name="billingCountry"
                        value={formData.billingCountry}
                        onChange={handleInputChange}
                        required={!formData.billingSameAsShipping}
                        className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {COUNTRY_OPTIONS.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      <input
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        required={!formData.billingSameAsShipping}
                        placeholder="City"
                        className="h-11 rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                      />
                    </div>
                    <input
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      required={!formData.billingSameAsShipping}
                      placeholder="Address"
                      className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                    />
                    <input
                      name="billingPostalCode"
                      value={formData.billingPostalCode}
                      onChange={handleInputChange}
                      required={!formData.billingSameAsShipping}
                      placeholder="Postal code"
                      className="h-11 w-full rounded-xl border border-brand-slate/20 px-3 text-sm outline-none focus:border-brand-green/60"
                    />
                  </div>
                ) : null}
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#28241E] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#253035]"
              >
                {isSubmitting ? 'Redirecting to Paystack...' : 'Continue to payment'}
              </button>

              {submitError ? <p className="text-sm text-red-700">{submitError}</p> : null}
            </form>

            <aside className="h-fit rounded-2xl border border-brand-slate/10 bg-white p-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-slate/70">Order summary</h2>
              <div className="mt-3 max-h-64 space-y-2 overflow-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-2 text-sm">
                    <p className="text-brand-charcoal">
                      {item?.product?.name} <span className="text-brand-slate/70">x{item?.quantity}</span>
                    </p>
                    <p className="font-medium text-brand-charcoal">
                      {formatNaira(Number(item?.product?.price || 0) * Number(item?.quantity || 0))}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t border-brand-slate/10 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-slate">Items</span>
                  <span className="font-medium">{cartCount}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-brand-green">{formatNaira(subtotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Checkout