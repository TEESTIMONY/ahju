import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react'

const Footer = () => {
  const socialLinks = {
    instagram: 'https://www.instagram.com/ahju_co',
    twitter: 'https://www.x.com/ahjuco',
    linkedin: 'https://www.linkedin.com/company/ahju-digital-business-cards/',
    whatsapp: 'https://wa.me/+2349022853233',
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="mt-8 border-t border-brand-green/20 bg-white"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
        className="mx-auto grid w-full max-w-[86rem] grid-cols-1 gap-8 px-2 py-10 text-sm text-black/65 sm:px-3 md:grid-cols-4 lg:px-4"
      >
        <motion.div variants={itemVariants} transition={{ duration: 0.35 }}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-slate/70">Contact</h3>
          <p>Pencinema, Agege, Lagos State</p>
          <p className="mt-2">+234 902 285 3233</p>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.35 }}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-slate/70">Support</h3>
          <div className="space-y-2">
            <motion.a whileHover={{ x: 4 }} href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-brand-green"><Instagram className="h-4 w-4" />Instagram</motion.a>
            <motion.a whileHover={{ x: 4 }} href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-brand-green"><Twitter className="h-4 w-4" />X</motion.a>
            <motion.a whileHover={{ x: 4 }} href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-brand-green"><Linkedin className="h-4 w-4" />LinkedIn</motion.a>
            <motion.a whileHover={{ x: 4 }} href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-brand-green"><MessageCircle className="h-4 w-4" />WhatsApp</motion.a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.35 }}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-slate/70">Company</h3>
          <div className="space-y-2">
            <motion.a whileHover={{ x: 4 }} href="#" className="block transition-colors hover:text-brand-green">Send us a Message</motion.a>
            <motion.a whileHover={{ x: 4 }} href="#" className="block transition-colors hover:text-brand-green">Shop</motion.a>
            <motion.a whileHover={{ x: 4 }} href="#" className="block transition-colors hover:text-brand-green">FAQ</motion.a>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} transition={{ duration: 0.35 }} className="rounded-2xl border border-brand-slate/20 bg-brand-green/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate/75">Stay Connected</p>
          <p className="mt-2 text-sm">Follow AHJU for updates and premium networking tips.</p>
          <div className="mt-4 flex items-center gap-3">
            <motion.a whileHover={{ y: -3, scale: 1.05 }} href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-slate/20 p-2 transition-colors hover:bg-brand-green/20"><Instagram className="h-4 w-4 text-brand-slate/80" /></motion.a>
            <motion.a whileHover={{ y: -3, scale: 1.05 }} href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-slate/20 p-2 transition-colors hover:bg-brand-green/20"><Twitter className="h-4 w-4 text-brand-slate/80" /></motion.a>
            <motion.a whileHover={{ y: -3, scale: 1.05 }} href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-slate/20 p-2 transition-colors hover:bg-brand-green/20"><Linkedin className="h-4 w-4 text-brand-slate/80" /></motion.a>
            <motion.a whileHover={{ y: -3, scale: 1.05 }} href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-slate/20 p-2 transition-colors hover:bg-brand-green/20"><MessageCircle className="h-4 w-4 text-brand-slate/80" /></motion.a>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-black/10 py-4 text-center text-xs text-black/55">
        Copyright © 2026 AHJU by BILTA
      </div>
    </motion.footer>
  )
}

export default Footer
