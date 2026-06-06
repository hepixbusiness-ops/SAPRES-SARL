'use client'
import { useEffect, useRef, useState } from 'react'
import { testimonialsApi } from '@/lib/api'
import type { Testimonial } from '@/types'

const MOCK: Testimonial[] = [
  { _id:'1', clientName:'Jean-Pierre Foning', position:'Chef d\'entreprise', company:'Yaoundé', rating:5, testimonial:'SAPRES a transformé notre usine. On économise 2,5M FCFA par mois sur la facture ENEO. L\'équipe est professionnelle et réactive.', featured:true, status:'published', displayOrder:1, createdAt:'' },
  { _id:'2', clientName:'Marie Nkomo', position:'Propriétaire', company:'Douala', rating:5, testimonial:'Installation impeccable en 5 jours. Depuis 6 mois, plus de coupures d\'électricité et nos factures ont chuté de 80%. Je recommande vivement !', featured:true, status:'published', displayOrder:2, createdAt:'' },
  { _id:'3', clientName:'Commune de Bafoussam', position:'Service technique municipal', company:'Bafoussam', rating:5, testimonial:'Les 120 lampadaires solaires fonctionnent parfaitement depuis 2 ans. Zéro facture ENEO pour l\'éclairage public. Excellent rapport qualité-prix.', featured:true, status:'published', displayOrder:3, createdAt:'' },
]

const AVATARS = ['👨‍💼', '👩‍🏠', '🏛️']

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(MOCK)
  const [active, setActive]             = useState(0)
  const wRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    testimonialsApi?.getAll?.({ featured: true, limit: 6 })
      .then((r) => { if (r.data.data?.length >= 2) setTestimonials(r.data.data) })
      .catch(() => {})
  }, [])

  return (
    <section className="sec-g" style={{ padding: '72px 48px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="slabel">Témoignages</span>
          <h2 className="stitle" style={{ marginTop: 8 }}>Ce que Disent <span className="ac">Nos Clients</span></h2>
        </div>

        {/* Slider */}
        <div ref={wRef} className="testi-w" style={{ display: 'flex', gap: 16, overflow: 'hidden' }}>
          {testimonials.map((t, i) => (
            <div key={t._id} className="tc" style={{ opacity: i === active ? 1 : 0.55, transform: i === active ? 'scale(1)' : 'scale(.97)', transition: 'all .3s' }}>
              {/* Étoiles */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <span key={j} style={{ color: '#F59E0B', fontSize: '.9rem' }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: '.84rem', color: '#4a5568', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>
                &ldquo;{t.testimonial}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f0f4e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {t.photo?.secureUrl
                    ? <img src={t.photo.secureUrl} alt={t.clientName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    : AVATARS[i % AVATARS.length]}
                </div>
                <div>
                  <div style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.82rem', fontWeight: 700, color: '#1E2A3A' }}>{t.clientName}</div>
                  <div style={{ fontSize: '.7rem', color: '#718096' }}>{t.position || t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="tdots" style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, background: i === active ? '#8CC63F' : '#d4ddc8', border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  )
}
