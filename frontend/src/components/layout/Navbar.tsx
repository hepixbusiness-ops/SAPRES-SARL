'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '/',             label: 'Accueil'     },
  { href: '/services',     label: 'Services'    },
  { href: '/produits',     label: 'Produits'    },
  { href: '/realisations', label: 'Réalisations'},
  { href: '/recrutement',  label: 'Recrutement' },
  { href: '/contact',      label: 'Contact'     },
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
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Fermer le drawer lors de la navigation
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  // Bloquer le scroll quand drawer ouvert
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={clsx('nav-ov', drawerOpen && 'show')}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer mobile */}
      <div className={clsx('nav-drawer', drawerOpen && 'open')}>
        <div className="dhead">
          <Link href="/" className="logo-w">
            <Image src="/logo.png" alt="SAPRES Logo" width={34} height={34} style={{ objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(140,198,63,.22))' }} priority />
            <div className="logo-txt">
              <div className="brand">SAPRES</div>
              <div className="sub">Énergie Solaire</div>
            </div>
          </Link>
          <button className="dclose" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>
        <nav className="dlinks">
          {DRAWER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(pathname === l.href && 'active')}
            >
              <span className="di">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="dcta" onClick={() => setDrawerOpen(false)}>
          <Link href="/devis" style={{ color: '#fff', textDecoration: 'none' }}>
            ☀️ Devis Gratuit
          </Link>
        </button>
      </div>

      {/* Navbar principale */}
      <nav className="snav">
        <Link href="/" className="logo-w" style={{ textDecoration: 'none' }}>
          <Image src="/logo.png" alt="SAPRES Logo" width={40} height={40} style={{ objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(140,198,63,.25))' }} priority />
          <div className="logo-txt">
            <div className="brand">SAPRES</div>
            <div className="sub">Énergie Solaire</div>
          </div>
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontSize: '.76rem',
                  fontWeight: 500,
                  color: pathname === l.href ? '#1E2A3A' : '#4a5568',
                  padding: '5px 10px',
                  borderRadius: 7,
                  textDecoration: 'none',
                  background: pathname === l.href ? 'rgba(140,198,63,.12)' : undefined,
                  transition: 'all .28s',
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/devis">
          <button className="nav-cta">☀️ Devis Gratuit</button>
        </Link>

        <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="Menu">
          ☰
        </button>
      </nav>
    </>
  )
}

