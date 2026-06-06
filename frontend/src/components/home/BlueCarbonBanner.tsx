'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const TAGS = ['Panneaux 550W', 'Batteries LiFePO4', 'Onduleurs Hybrides', '25 ans Garantie', 'SAV Local']

export default function BlueCarbonBanner() {
  const ref   = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ padding: '40px 48px', background: '#f8faf5', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div
          ref={ref}
          className="rsp-flex-col"
          style={{
            display: 'flex', alignItems: 'center', gap: 32,
            background: '#fff', border: '1px solid rgba(30,42,58,.08)',
            borderRadius: 24, padding: '28px 32px',
            boxShadow: '0 2px 12px rgba(0,0,0,.05)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(18px)',
            transition: 'opacity .6s ease, transform .6s ease',
          }}>

          {/* Logo/icône Blue Carbon — pulsation */}
          <div className="icon-pulse" style={{ width: 72, height: 72, flexShrink: 0, background: 'linear-gradient(135deg,#1E2A3A,#2d3f52)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px solid rgba(140,198,63,.15)', boxShadow: '0 4px 16px rgba(30,42,58,.15)' }}>
            🔋
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(140,198,63,.1)', border: '1px solid rgba(140,198,63,.2)', color: '#6FAE2E', fontSize: '.62rem', fontWeight: 700, padding: '3px 10px', borderRadius: 14, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                Partenaire Officiel
              </span>
              <span style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#1E2A3A' }}>
                Blue Carbon — Distributeur Agréé au Cameroun depuis 2016
              </span>
            </div>
            <p style={{ fontSize: '.82rem', color: '#4a5568', lineHeight: 1.7, marginBottom: 14, maxWidth: 580 }}>
              Panneaux monocristallins 550Wc, batteries LiFePO4, onduleurs hybrides. Authenticité et garantie constructeur garanties sur tous les produits SAPRES.
            </p>
            {/* Tags avec animation stagger */}
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="tag-hover"
                  style={{
                    background: '#f0f4e8', color: '#4a8a1a', fontSize: '.64rem', fontWeight: 700,
                    padding: '3px 10px', borderRadius: 14, border: '1px solid rgba(140,198,63,.15)',
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'none' : 'translateY(6px)',
                    transition: `opacity .4s ease ${.3 + i * .08}s, transform .4s ease ${.3 + i * .08}s, background .22s, color .22s, box-shadow .22s`,
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link href="/produits" style={{ textDecoration: 'none', flexShrink: 0, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(12px)', transition: 'opacity .5s ease .5s, transform .5s ease .5s' }}>
            <button className="btn btn-g" style={{ whiteSpace: 'nowrap' }}>Voir les produits →</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
