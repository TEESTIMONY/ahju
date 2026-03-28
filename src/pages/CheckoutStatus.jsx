import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CheckoutStatus = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://homeless-cassandre-delo-ab483b1e.koyeb.app'

  const [status, setStatus] = useState('checking')
  const [message, setMessage] = useState('Verifying your payment...')
  const [details, setDetails] = useState('')

  useEffect(() => {
    const reference = (searchParams.get('reference') || '').trim()

    if (!reference) {
      setStatus('error')
      setMessage('Missing payment reference.')
      setDetails('Please return to checkout and try again.')
      return
    }

    const runVerify = async () => {
      setStatus('checking')
      setMessage('Verifying your payment...')
      setDetails('')

      try {
        const response = await fetch(`${apiBaseUrl}/api/payments/verify/?reference=${encodeURIComponent(reference)}`)
        const data = await response.json().catch(() => ({}))

        if (!response.ok || data?.verified !== true) {
          throw new Error(data?.detail || 'Payment verification failed')
        }

        setStatus('success')
        setMessage('Payment confirmed!')
        setDetails('Your order has been marked as paid successfully.')
      } catch (err) {
        setStatus('error')
        setMessage('Payment not confirmed yet.')
        setDetails(err.message || 'Please wait a moment and try verifying again.')
      }
    }

    runVerify()
  }, [searchParams, apiBaseUrl])

  return (
    <div className="flex min-h-screen flex-col bg-site text-brand-charcoal">
      <Header showCart={false} shopCtaOnly />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-brand-slate/10 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-semibold">Checkout status</h1>
          <p className="mt-4 text-base text-brand-charcoal">{message}</p>
          {details ? <p className="mt-2 text-sm text-brand-slate">{details}</p> : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {status !== 'success' ? (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-[#28241E] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#253035]"
              >
                Verify again
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="rounded-full border border-brand-slate/20 px-5 py-2.5 text-sm font-medium text-brand-charcoal transition hover:border-brand-green/50 hover:text-brand-green"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CheckoutStatus
