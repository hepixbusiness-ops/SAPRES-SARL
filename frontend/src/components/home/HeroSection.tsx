'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const BENEFITS = [
  { icon: '🏅', title: 'Ingénieurs Certifiés & Expérimentés', desc: 'Chaque installation est réalisée par des spécialistes agréés avec une expertise terrain prouvée au Cameroun.' },
  { icon: '⚡', title: 'Systèmes Solaires Haute Efficacité', desc: 'Nos panneaux délivrent un rendement maximal grâce à une optimisation intelligente adaptée au climat camerounais.' },
  { icon: '🔁', title: 'Solutions Bout-en-Bout', desc: 'De la consultation à la maintenance, nous assurons un support complet sur toute la durée de vie du projet.' },
  { icon: '👍', title: 'Tarification Transparente & Accessible', desc: 'Des devis clairs, sans frais cachés. Solutions adaptées à tous les budgets avec facilités de paiement.' },
]

const HERO_SLIDES = [
  '/projet-station-service.webp',
  '/projet-residentiel-1.webp',
  '/projet-residentiel-2.webp',
]

const CYCLE_STATS = [
  { n: '500+', label: 'Installations réalisées' },
  { n: '5 MW',  label: 'Capacité installée'    },
  { n: '70%',  label: 'Économies sur la facture'},
  { n: '25 ans',label: 'Garantie produits'      },
]

export default function HeroSection() {
  const [slideIdx, setSlideIdx] = useState(0)
  const [statIdx,  setStatIdx]  = useState(0)
  const [animKey,  setAnimKey]  = useState(0)

  // Carrousel background
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Stat cyclique
  useEffect(() => {
    const t = setInterval(() => { setStatIdx(i => (i + 1) % CYCLE_STATS.length); setAnimKey(k => k + 1) }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 110, paddingBottom: 72 }}>

      {/* ── Slides background ── */}
      {HERO_SLIDES.map((src, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: i === slideIdx ? 1 : 0,
            transition: 'opacity 1.2s ease',
            transform: i === slideIdx ? 'scale(1.06)' : 'scale(1)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '1.2s, 8s',
            transitionTimingFunction: 'ease, linear',
            zIndex: 0,
          }}
        />
      ))}

      {/* Overlay sombre dégradé */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.48) 50%,rgba(0,0,0,.68) 100%)', zIndex: 1 }} />

      {/* Dots navigation */}
      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 7, zIndex: 10 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setSlideIdx(i)}
            style={{ width: i === slideIdx ? 22 : 7, height: 7, borderRadius: 4, background: i === slideIdx ? '#8CC63F' : 'rgba(255,255,255,.45)', border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0 }} />
        ))}
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 2, padding: '0 24px' }}>

        {/* Chip + Titre + Sous-titre */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="chip-light anim-in" style={{ marginBottom: 18, background: 'rgba(255,255,255,.15)', borderColor: 'rgba(255,255,255,.3)' }}>
            <div className="chip-dot" />
            <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Partenaire Officiel Blue Carbon
            </span>
          </div>

          <h1 className="anim-in d1" style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(2.1rem,4.5vw,3.7rem)', color: '#fff', lineHeight: 1.08, letterSpacing: '-.02em', marginBottom: 18 }}>
            L&apos;Énergie Propre,<br />
            <span style={{
              background: 'linear-gradient(135deg,#8CC63F,#a8d960,#c8f078,#8CC63F)',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 4s linear infinite',
              display: 'inline-block',
            }}>
              Sans la Complexité.
            </span>
          </h1>

          <p className="anim-in d2" style={{ fontSize: 'clamp(.88rem,1.4vw,1rem)', color: 'rgba(255,255,255,.85)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.78 }}>
            Des systèmes solaires fiables, abordables et durables pour foyers, entreprises et collectivités du Cameroun.
          </p>

          <div className="anim-in d3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <Link href="/devis" style={{ textDecoration: 'none' }}>
              <button className="btn btn-g btn-pulse" style={{ padding: '13px 28px', fontSize: '.88rem' }}>☀️ Devis Gratuit en 24h</button>
            </Link>
            <Link href="/realisations" style={{ textDecoration: 'none' }}>
              <button className="btn btn-ghost" style={{ padding: '13px 28px', fontSize: '.88rem' }}>Voir nos réalisations →</button>
            </Link>
          </div>

          {/* Stat cyclique */}
          <div className="anim-in d4" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '7px 18px', overflow: 'hidden' }}>
            <span key={animKey} style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, color: '#fff', fontSize: '1rem', animation: 'countFadeUp .4s ease both' }}>
              {CYCLE_STATS[statIdx].n}
            </span>
            <span key={`l-${animKey}`} style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.8)', animation: 'countFadeUp .4s ease both .05s' }}>
              {CYCLE_STATS[statIdx].label}
            </span>
          </div>
        </div>

        {/* Bento Grid — cartes glass */}
        <div className="bento-hero">
          <div className="bento-card rv d1" style={{ animation: 'fadeInUp .6s ease .2s both', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.2)', color: '#fff' }}>
            <div className="bc-icon">{BENEFITS[0].icon}</div>
            <h4 style={{ color: '#fff' }}>{BENEFITS[0].title}</h4>
            <p style={{ color: 'rgba(255,255,255,.75)' }}>{BENEFITS[0].desc}</p>
          </div>

          <div className="bento-photo" style={{ gridColumn: 2, gridRow: '1 / 3', background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>☀️</div>
              <div style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff', marginBottom: 6 }}>SAPRES SARL</div>
              <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.6 }}>Partenaire Blue Carbon<br />Cameroun depuis 2014</div>
              <div style={{ marginTop: 16, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                {CYCLE_STATS.slice(0,2).map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#8CC63F' }}>{s.n}</div>
                    <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.6)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bento-card" style={{ animation: 'fadeInUp .6s ease .3s both', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.2)' }}>
            <div className="bc-icon">{BENEFITS[1].icon}</div>
            <h4 style={{ color: '#fff' }}>{BENEFITS[1].title}</h4>
            <p style={{ color: 'rgba(255,255,255,.75)' }}>{BENEFITS[1].desc}</p>
          </div>

          <div className="bento-card" style={{ animation: 'fadeInUp .6s ease .4s both', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.2)' }}>
            <div className="bc-icon">{BENEFITS[2].icon}</div>
            <h4 style={{ color: '#fff' }}>{BENEFITS[2].title}</h4>
            <p style={{ color: 'rgba(255,255,255,.75)' }}>{BENEFITS[2].desc}</p>
          </div>

          <div className="bento-card" style={{ animation: 'fadeInUp .6s ease .5s both', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.2)' }}>
            <div className="bc-icon">{BENEFITS[3].icon}</div>
            <h4 style={{ color: '#fff' }}>{BENEFITS[3].title}</h4>
            <p style={{ color: 'rgba(255,255,255,.75)' }}>{BENEFITS[3].desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
