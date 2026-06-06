'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const BENEFITS = [
  { icon: '🏅', title: 'Ingénieurs Certifiés & Expérimentés', desc: 'Chaque installation est réalisée par des spécialistes agréés avec une expertise terrain prouvée au Cameroun.' },
  { icon: '⚡', title: 'Systèmes Solaires Haute Efficacité', desc: 'Nos panneaux délivrent un rendement maximal grâce à une optimisation intelligente adaptée au climat camerounais.' },
  { icon: '🔁', title: 'Solutions Bout-en-Bout', desc: 'De la consultation à la maintenance, nous assurons un support complet sur toute la durée de vie du projet.' },
  { icon: '👍', title: 'Tarification Transparente & Accessible', desc: 'Des devis clairs, sans frais cachés. Solutions adaptées à tous les budgets avec facilités de paiement.' },
]

const HERO_PHOTO = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80'

const CYCLE_STATS = [
  { n: '500+', label: 'Installations réalisées' },
  { n: '5 MW',  label: 'Capacité installée'    },
  { n: '70%',  label: 'Économies sur la facture'},
  { n: '25 ans',label: 'Garantie produits'      },
]

export default function HeroSection() {
  const [statIdx, setStatIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStatIdx(i => (i + 1) % CYCLE_STATS.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ background: '#fff', paddingTop: 110, paddingBottom: 72, padding: '110px 24px 72px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* Chip + Titre + Sous-titre */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="chip-light" style={{ marginBottom: 18 }}>
            <div className="chip-dot" />
            <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#6FAE2E', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Partenaire Officiel Blue Carbon
            </span>
          </div>

          <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(2.1rem,4.5vw,3.7rem)', color: '#1E2A3A', lineHeight: 1.08, letterSpacing: '-.02em', marginBottom: 18 }}>
            L&apos;Énergie Propre,<br />
            <span style={{ background: 'linear-gradient(135deg,#8CC63F,#6FAE2E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Sans la Complexité.
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(.88rem,1.4vw,1rem)', color: '#4a5568', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.78 }}>
            Des systèmes solaires fiables, abordables et durables pour foyers, entreprises et collectivités du Cameroun.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
            <Link href="/devis" style={{ textDecoration: 'none' }}>
              <button className="btn btn-g" style={{ padding: '13px 28px', fontSize: '.88rem' }}>☀️ Devis Gratuit en 24h</button>
            </Link>
            <Link href="/realisations" style={{ textDecoration: 'none' }}>
              <button className="btn btn-outline" style={{ padding: '13px 28px', fontSize: '.88rem' }}>Voir nos réalisations →</button>
            </Link>
          </div>

          {/* Stat cyclique */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f8faf5', border: '1px solid rgba(140,198,63,.18)', borderRadius: 50, padding: '7px 18px' }}>
            <span style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, color: '#1E2A3A', fontSize: '1rem', transition: 'all .4s' }}>
              {CYCLE_STATS[statIdx].n}
            </span>
            <span style={{ fontSize: '.76rem', color: '#4a5568' }}>{CYCLE_STATS[statIdx].label}</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="bento-hero">
          <div className="bento-card">
            <div className="bc-icon">{BENEFITS[0].icon}</div>
            <h4>{BENEFITS[0].title}</h4>
            <p>{BENEFITS[0].desc}</p>
          </div>

          {/* Photo centrale — span 2 lignes */}
          <div className="bento-photo" style={{ gridColumn: 2, gridRow: '1 / 3' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_PHOTO} alt="Installation solaire en Afrique" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div className="bento-card">
            <div className="bc-icon">{BENEFITS[1].icon}</div>
            <h4>{BENEFITS[1].title}</h4>
            <p>{BENEFITS[1].desc}</p>
          </div>

          <div className="bento-card">
            <div className="bc-icon">{BENEFITS[2].icon}</div>
            <h4>{BENEFITS[2].title}</h4>
            <p>{BENEFITS[2].desc}</p>
          </div>

          <div className="bento-card">
            <div className="bc-icon">{BENEFITS[3].icon}</div>
            <h4>{BENEFITS[3].title}</h4>
            <p>{BENEFITS[3].desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
