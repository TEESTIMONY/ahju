import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Header = ({ isLoggedIn = false }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-brand-green/25 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[86rem] items-center justify-between px-2 py-4 sm:px-3 lg:px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white shadow-sm shadow-brand-green/35">
            A
          </div>
          <h1 className="text-base font-semibold tracking-tight text-brand-charcoal">AHJU</h1>
        </Link>

        <div className="flex items-center gap-3">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hidden text-sm font-medium text-brand-slate/80 transition-colors hover:text-brand-green sm:inline">
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-green/90"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
