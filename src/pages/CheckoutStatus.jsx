import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CheckoutStatus = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

  const [isChecking, setIsChecking] = useState(true)
  const [statusText, setStatusText] = useState('Verifying payment...')
  const [isSuccess, setIsSuccess] = useState(false)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = (searchParams.get('reference') || '').trim()
      if (!reference) {
        setStatusText('Missing payment reference. Please contact support if you were charged.')
        setIsChecking(false)
        return
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/checkout/verify/?reference=${encodeURIComponent(reference)}`)
        const data = await response.json().catch(() => ({}))
        if (!response.ok) {
          throw new Error(data?.detail || 'Could not verify payment')
        }

        const verified = Boolean(data?.verified)
        setIsSuccess(verified)
        setOrder(data?.order || null)
        setStatusText(
          verified
            ? 'Payment successful! Your order has been confirmed.'
            : 'Payment was not successful. Please try again.'
        )
      } catch (error) {
        setStatusText(error.message || 'Could not verify payment')
        setIsSuccess(false)
      } finally {
        setIsChecking(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col bg-site text-brand-charcoal">
      <Header showCart cartCount={0} onCartClick={() => navigate('/cart')} shopCtaOnly />

      <main className="mx-auto w-full max-w-3xl flex-1 px-3 pb-16 pt-10">
        <div className="rounded-2xl border border-brand-slate/10 bg-white p-6 text-center">
          <h1 className="text-2xl font-semibold">Checkout status</h1>
          <p className={`mt-3 text-sm ${isSuccess ? 'text-green-700' : 'text-brand-slate'}`}>{statusText}</p>

          {order ? (
            <div className="mt-4 rounded-xl border border-brand-slate/10 bg-site px-4 py-3 text-left text-sm">
              <p>
                <span className="font-semibold">Order ID:</span> #{order.id}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.email}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center rounded-full bg-[#28241E] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#253035]"
            >
              Continue shopping
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center rounded-full border border-brand-slate/20 bg-white px-5 py-2.5 text-sm font-medium text-brand-charcoal transition hover:bg-brand-green/10"
            >
              Back to cart
            </Link>
          </div>

          {isChecking ? <p className="mt-4 text-xs text-brand-slate/70">Please wait...</p> : null}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CheckoutStatus