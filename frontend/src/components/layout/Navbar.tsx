'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '/',             label: 'Accueil'      },
  { href: '/services',     label: 'Services'     },
  { href: '/produits',     label: 'Produits'     },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/recrutement',  label: 'Recrutement'  },
  { href: '/contact',      label: 'Contact'      },
]

const DRAWER_LINKS = [
  { href: '/',             label: 'Accueil',      icon: '🏠' },
  { href: '/services',     label: 'Services',     icon: '⚡' },
  { href: '/produits',     label: 'Produits',     icon: '🛍️' },
  { href: '/realisations', label: 'Réalisations', icon: '🏗️' },
  { href: '/recrutement',  label: 'Recrutement',  icon: '👥' },
  { href: '/blog',         label: 'Blog',         icon: '📰' },
  { href: '/calculateur',  label: 'Calculateur',  icon: '☀️' },
  { href: '/a-propos',     label: 'À Propos',     icon: '🏢' },
  { href: '/contact',      label: 'Contact',      icon: '📞' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => { setDrawerOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Overlay mobile */}
      <div className={clsx('nav-ov', drawerOpen && 'show')} onClick={() => setDrawerOpen(false)} />

      {/* Drawer mobile */}
      <div className={clsx('nav-drawer', drawerOpen && 'open')}>
        <div className="dhead">
          <Link href="/" className="logo-w" onClick={() => setDrawerOpen(false)}>
            <Image src="/logo.png" alt="SAPRES" width={34} height={34}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(140,198,63,.22))' }} priority />
            <div className="logo-txt"><div className="brand">SAPRES</div><div className="sub">Énergie Solaire</div></div>
          </Link>
          <button className="dclose" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <nav className="dlinks">
          {DRAWER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={clsx(pathname === l.href && 'active')} onClick={() => setDrawerOpen(false)}>
              <span className="di">{l.icon}</span>{l.label}
            </Link>
          ))}
        </nav>
        <Link href="/devis" onClick={() => setDrawerOpen(false)} style={{ margin: '14px 18px 20px', display: 'block' }}>
          <button className="dcta" style={{ width: '100%' }}>☀️ Devis Gratuit</button>
        </Link>
      </div>

      {/* Navbar pill flottante */}
      <div className="snav-wrap">
        <nav className={clsx('snav', scrolled && 'scrolled')}>
          {/* Logo */}
          <Link href="/" className="logo-w" style={{ textDecoration: 'none' }}>
            <Image src="/logo.png" alt="SAPRES Logo" width={38} height={38}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(140,198,63,.22))' }} priority />
            <div className="logo-txt">
              <div className="brand">SAPRES</div>
              <div className="sub">Énergie Solaire</div>
            </div>
          </Link>

          {/* Liens desktop */}
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={{
                  fontSize: '.76rem', fontWeight: 600,
                  color: pathname === l.href ? '#1E2A3A' : '#4a5568',
                  padding: '6px 11px', borderRadius: 50, textDecoration: 'none',
                  background: pathname === l.href ? 'rgba(140,198,63,.12)' : undefined,
                  transition: 'all .22s', display: 'block',
                }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + panier */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/suivi" title="Suivre commande" style={{ textDecoration: 'none' }}>
              <button style={{ width: 36, height: 36, border: '1.5px solid rgba(0,0,0,.08)', borderRadius: '50%', background: '#fff', cursor: 'pointer', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5568', transition: 'all .22s' }}>📦</button>
            </Link>
            <Link href="/devis" style={{ textDecoration: 'none' }}>
              <button className="nav-cta">Devis Gratuit</button>
            </Link>
          </div>

          {/* Hamburger mobile */}
          <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="Menu">☰</button>
        </nav>
      </div>
    </>
  )
}
