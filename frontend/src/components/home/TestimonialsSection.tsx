'use client'
import { useEffect, useRef, useState } from 'react'
import { testimonialsApi } from '@/lib/api'
import type { Testimonial } from '@/types'
import RevealWrapper from '@/components/ui/RevealWrapper'

const MOCK: Testimonial[] = [
  { _id: '1', clientName: 'Jean-Paul Mbida', position: 'Directeur Général', company: 'ABC Industries Douala', rating: 5, testimonial: 'SAPRES a transformé notre usine. 70% de réduction sur notre facture ENEO dès le premier mois. Installation impeccable, équipe très professionnelle.', featured: true, status: 'published', displayOrder: 1, createdAt: '' },
  { _id: '2', clientName: 'Marie-Claire Foning', position: 'Propriétaire', company: 'Villa Résidentielle, Yaoundé', rating: 5, testimonial: 'Plus de coupures de courant, plus de factures ENEO ! Mon système solaire Blue Carbon fonctionne parfaitement depuis 2 ans. Je recommande vivement.', featured: true, status: 'published', displayOrder: 2, createdAt: '' },
  { _id: '3', clientName: 'Aristide Kamga', position: 'Maire', company: 'Commune de Bafoussam', rating: 5, testimonial: 'Les 120 lampadaires solaires installés par SAPRES ont changé notre ville. Zéro coût d\'entretien et nos routes sont sécurisées 24h/24.', featured: true, status: 'published', displayOrder: 3, createdAt: '' },
  { _id: '4', clientName: 'Dr. Nathalie Essomba', position: 'Directrice', company: 'Clinique Médicale, Douala', rating: 5, testimonial: 'Notre clinique ne peut pas se permettre de pannes. Grâce à SAPRES, nous avons une alimentation solaire 100% fiable. Excellent investissement.', featured: true, status: 'published', displayOrder: 4, createdAt: '' },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(MOCK)
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef(0)

  useEffect(() => {
    testimonialsApi.getAll({ featured: true, limit: 6 })
      .then((res) => {
        if (res.data.data?.length) setTestimonials(res.data.data)
      })
      .catch(() => {}) // fallback silencieux
  }, [])

  const visibleCount = 3
  const maxIndex = Math.max(0, testimonials.length - visibleCount)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [maxIndex])

  const translateX = current * (100 / visibleCount)

  return (
    <section className="sec-dk" style={{ overflow: 'hidden' }}>
      <RevealWrapper><span className="slabel">Témoignages</span></RevealWrapper>
      <RevealWrapper delay={1}>
        <h2 className="stitle dtitle">Ce que disent nos <span className="ac">Clients</span></h2>
      </RevealWrapper>

      <div
        className="testi-w"
        style={{ overflow: 'hidden', position: 'relative', marginTop: 32, touchAction: 'pan-y', scrollSnapType: 'x mandatory' } as React.CSSProperties}
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchStart.current - e.changedTouches[0].clientX
          if (diff > 50 && current < maxIndex) setCurrent(c => c + 1)
          if (diff < -50 && current > 0) setCurrent(c => c - 1)
        }}
      >
        <div
          ref={trackRef}
          className="testi-track"
          style={{
            display: 'flex', gap: 17,
            transition: 'transform .6s cubic-bezier(.4,0,.2,1)',
            transform: `translateX(-${translateX}%)`,
          }}
        >
          {testimonials.map((t) => (
            <div key={t._id} className="tc">
              <div className="stars">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="t-text">"{t.testimonial}"</p>
              <div className="t-aut">
                <div className="tav">
                  {t.photo?.secureUrl
                    ? <img src={t.photo.secureUrl} alt={t.clientName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    : t.clientName.charAt(0).toUpperCase()
                  }
                </div>
                <div>
                  <div className="tname">{t.clientName}</div>
                  <div className="trole">{t.position}{t.company ? ` — ${t.company}` : ''}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="tdots" style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`tdot${i === current ? ' on' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Témoignage ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        .tav { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,var(--g),var(--gd)); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.8rem; color:#fff; flex-shrink:0; overflow:hidden; }
        .tname { font-family:'Raleway',sans-serif; font-weight:700; font-size:.8rem; color:var(--navy); }
        .trole { font-size:.67rem; color:var(--tl); }
        .t-text { font-size:.82rem; color:var(--tm); line-height:1.73; font-style:italic; margin-bottom:14px; }
        .stars  { color:#f59e0b; font-size:.8rem; margin-bottom:8px; }
        .tdot   { width:7px; height:7px; border-radius:50%; background:rgba(140,198,63,.17); cursor:pointer; transition:all .26s; border:none; }
        .tdot.on { background:var(--g); width:20px; border-radius:4px; }
        @media(max-width:768px){
          .testi-track { flex-direction:column !important; transform:none !important; }
          .tc { flex:none !important; width:100% !important; }
          /* Dots toujours visibles sur mobile */
          .tdots { display:flex !important; }
          .tc { flex:0 0 88vw !important; }
          .testi-track { gap:12px !important; }
        }
      `}</style>
    </section>
  )
}
