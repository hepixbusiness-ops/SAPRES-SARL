'use client'
import { useEffect, useRef, useState } from 'react'

const WHY_ITEMS = [
  { icon: '🔋', title: 'Économies Immédiates',     desc: 'Réduisez votre facture ENEO jusqu\'à 70% dès la première installation.',            pct: 70  },
  { icon: '🌱', title: 'Impact Environnemental',    desc: 'Zéro émission CO₂. Contribuez activement à la lutte contre le changement climatique.', pct: 100 },
  { icon: '🛡️', title: 'Garantie Longue Durée',    desc: '25 ans de garantie sur les panneaux Blue Carbon. Maintenance incluse pendant 2 ans.', pct: 95  },
  { icon: '🔧', title: 'Support Technique 24/7',    desc: 'Nos techniciens sont disponibles 7j/7 pour toute urgence ou question technique.',      pct: 87  },
  { icon: '⚡', title: 'Installation Rapide',        desc: 'De la visite technique à la mise en service en moins de 7 jours ouvrables.',           pct: 82  },
  { icon: '💳', title: 'Financement Facilité',       desc: 'Paiement en plusieurs tranches sans intérêts. Accessible à tous les budgets.',          pct: 78  },
]

const KEY_NUMBERS = [
  { stat: '10+', label: 'ans d\'expérience'  },
  { stat: '10',  label: 'régions couvertes'  },
  { stat: '98%', label: 'clients satisfaits' },
]

export default function WhySection() {
  const ref  = useRef<HTMLDivElement>(null)
  const lRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [lShown, setLShown] = useState(false)

  // Barres de progression — stagger
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true)
        const bars = ref.current?.querySelectorAll<HTMLElement>('[data-width]') || []
        bars.forEach((b, i) => {
          setTimeout(() => { b.style.width = (b.dataset.width || '0') + '%' }, i * 120)
        })
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Chiffres clés — fade in
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLShown(true); obs.disconnect() }
    }, { threshold: 0.15 })
    if (lRef.current) obs.observe(lRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="sec" style={{ padding: '72px 48px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="rsp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>

          {/* Gauche */}
          <div ref={lRef}>
            <span className="slabel">Pourquoi Nous Choisir</span>
            <h2 className="stitle" style={{ marginTop: 8, marginBottom: 16 }}>
              L&apos;Expert Solaire <span className="ac">de Confiance</span> au Cameroun
            </h2>
            <p className="sdesc">
              Depuis 2014, SAPRES SARL accompagne des centaines de ménages, PME et collectivités dans leur transition vers l&apos;autonomie énergétique.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {KEY_NUMBERS.map((s, i) => (
                <div key={s.label}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: lShown ? 1 : 0, transform: lShown ? 'none' : 'translateX(-18px)', transition: `opacity .5s ease ${i * .12}s, transform .5s ease ${i * .12}s` }}>
                  <div style={{ width: 52, height: 52, background: '#f0f4e8', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform .28s, box-shadow .28s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(140,198,63,.22)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '' }}>
                    <span style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#6FAE2E' }}>{s.stat}</span>
                  </div>
                  <span style={{ fontSize: '.84rem', color: '#4a5568' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Droite — barres échelonnées */}
          <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {WHY_ITEMS.map((w, i) => (
              <div key={w.title}
                style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(12px)', transition: `opacity .45s ease ${i * .08}s, transform .45s ease ${i * .08}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1rem', display: 'inline-block', animation: shown ? `floatY ${3 + i * .4}s ease-in-out infinite` : 'none' }}>{w.icon}</span>
                    <span style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.82rem', fontWeight: 700, color: '#1E2A3A' }}>{w.title}</span>
                  </div>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#6FAE2E' }}>{w.pct}%</span>
                </div>
                <div style={{ height: 6, background: '#f0f4e8', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    className="bar-fill"
                    data-width={w.pct}
                    style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg,#8CC63F,#a8d960)', borderRadius: 3, position: 'relative' }}
                  />
                </div>
                <p style={{ fontSize: '.71rem', color: '#718096', marginTop: 4, lineHeight: 1.5 }}>{w.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
