import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="mt-8 border-t border-black/10 bg-white"
    >
      <div className="mx-auto grid w-full max-w-[86rem] grid-cols-1 gap-8 px-2 py-10 text-sm text-black/65 sm:px-3 md:grid-cols-4 lg:px-4">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-black/55">Contact</h3>
          <p>Pencinema, Agege, Lagos State</p>
          <p className="mt-2">+234 902 285 3233</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-black/55">Support</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-black"><Instagram className="h-4 w-4" />Instagram</a>
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-black"><Twitter className="h-4 w-4" />X</a>
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-black"><Linkedin className="h-4 w-4" />LinkedIn</a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-black/55">Company</h3>
          <div className="space-y-2">
            <a href="#" className="block transition-colors hover:text-black">Send us a Message</a>
            <a href="#" className="block transition-colors hover:text-black">Shop</a>
            <a href="#" className="block transition-colors hover:text-black">FAQ</a>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55">Stay Connected</p>
          <p className="mt-2 text-sm">Follow AHJU for updates and premium networking tips.</p>
          <div className="mt-4 flex items-center gap-3">
            <a href="#" className="rounded-full border border-black/15 p-2 transition-colors hover:bg-black/5"><Instagram className="h-4 w-4 text-black/75" /></a>
            <a href="#" className="rounded-full border border-black/15 p-2 transition-colors hover:bg-black/5"><Twitter className="h-4 w-4 text-black/75" /></a>
            <a href="#" className="rounded-full border border-black/15 p-2 transition-colors hover:bg-black/5"><Linkedin className="h-4 w-4 text-black/75" /></a>
            <a href="#" className="rounded-full border border-black/15 p-2 transition-colors hover:bg-black/5"><MessageCircle className="h-4 w-4 text-black/75" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 py-4 text-center text-xs text-black/55">
        Copyright © 2026 AHJU by BILTA
      </div>
    </motion.footer>
  )
}

export default Footer
