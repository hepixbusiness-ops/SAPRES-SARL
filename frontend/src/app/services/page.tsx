'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABand from '@/components/home/CTABand'
import { servicesApi } from '@/lib/api'
import type { Service } from '@/types'

const SERVICE_TABS = [
  { icon: '☀️', label: 'Installation Solaire', color: '#8CC63F', desc: 'Résidentiel & Industriel', detail: 'Panneaux Blue Carbon 450Wc, batteries LiFePO4, onduleur hybride. De la maison à l\'usine.', photo: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80', stats: [{ n:'70%', l:'Économies ENEO' }, { n:'25 ans', l:'Garantie' }, { n:'500+', l:'Installations' }] },
  { icon: '💧', label: 'Pompage Solaire',       color: '#38bdf8', desc: 'Eau Potable Solaire',      detail: 'Adduction d\'eau potable par énergie solaire pour villages et zones rurales.',          photo: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=1200&q=80', stats: [{ n:'200+', l:'Ménages desservis' }, { n:'4 kW', l:'Pompes max' }] },
  { icon: '💡', label: 'Lampadaire Solaire',    color: '#F59E0B', desc: 'Éclairage Public Solaire', detail: 'LED 60W, panneau intégré, capteur crépusculaire. Pour communes, mairies et collectivités.',photo: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80', stats: [{ n:'0 FCFA', l:'Facture ENEO' }, { n:'10 ans', l:'Durée LED' }] },
]

function useCascadeReveal(containerRef: React.RefObject<HTMLElement>, selector: string, delay = 80) {
  useEffect(() => {
    const container = containerRef.current; if (!container) return
    const items = Array.from(container.querySelectorAll<HTMLElement>(selector))
    items.forEach((el, i) => { el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition=`opacity .5s ${i*delay}ms ease,transform .5s ${i*delay}ms ease` })
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { items.forEach(el=>{el.style.opacity='1';el.style.transform='none'}); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(container); return () => obs.disconnect()
  }, [containerRef, selector, delay])
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [activeTab, setActiveTab] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => { servicesApi.getAll({ status: 'published' }).then(res => setServices(res.data.data || [])).catch(console.error) }, [])
  useCascadeReveal(gridRef as React.RefObject<HTMLElement>, '.svc-card', 90)

  const tab = SERVICE_TABS[activeTab]

  return (
    <>
      <Navbar />
      <main>
        <section style={{ paddingTop: 74, background: '#fff' }}>
          {/* Onglets */}
          <div style={{ borderBottom: '1px solid rgba(0,0,0,.07)', padding: '0 48px', display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none', background: '#fff', position: 'sticky', top: 74, zIndex: 50 }}>
            {SERVICE_TABS.map((t, i) => (
              <button key={t.label} onClick={() => setActiveTab(i)} style={{ display:'flex', alignItems:'center', gap:7, padding:'14px 18px', fontFamily:'Lato,sans-serif', fontSize:'.8rem', fontWeight:700, color: activeTab===i ? t.color : '#718096', background:'none', border:'none', borderBottom: activeTab===i ? `2px solid ${t.color}` : '2px solid transparent', cursor:'pointer', whiteSpace:'nowrap', transition:'all .2s', marginBottom:-1 }}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Hero photo */}
          <div style={{ position:'relative', height:400, overflow:'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tab.photo} alt={tab.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.28) 55%,transparent 100%)' }} />
            <div style={{ position:'absolute', top:'50%', left:64, transform:'translateY(-50%)', zIndex:10, maxWidth:520 }}>
              <span style={{ background:'rgba(255,255,255,.14)', border:'1px solid rgba(255,255,255,.28)', color:'#fff', fontSize:'.65rem', fontWeight:700, padding:'4px 12px', borderRadius:50, letterSpacing:'.1em', textTransform:'uppercase', display:'inline-block', marginBottom:12 }}>{tab.desc}</span>
              <h1 style={{ fontFamily:'Raleway,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.6rem)', color:'#fff', marginBottom:12, lineHeight:1.15 }}>{tab.label}</h1>
              <p style={{ fontSize:'.9rem', color:'rgba(255,255,255,.72)', lineHeight:1.75, marginBottom:20 }}>{tab.detail}</p>
              <div style={{ display:'flex', gap:24, marginBottom:22, flexWrap:'wrap' }}>
                {tab.stats.map(s => (
                  <div key={s.l}><div style={{ fontFamily:'Raleway,sans-serif', fontWeight:800, fontSize:'1.25rem', color:'#fff' }}>{s.n}</div><div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.55)' }}>{s.l}</div></div>
                ))}
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <Link href="/devis"><button className="btn btn-g">☀️ Devis Gratuit</button></Link>
                <Link href="/contact"><button className="btn btn-ghost">📞 Contact</button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* Grille des services */}
        <section className="sec" style={{ padding:'64px 48px' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <span className="slabel">Nos Services</span>
            <h2 className="stitle" style={{ marginBottom:32, marginTop:8 }}>Tout ce que Nous <span className="ac">Proposons</span></h2>
            <div ref={gridRef} className="rsp-grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
              {(services.length > 0 ? services : SERVICE_TABS).map((item: Service | typeof SERVICE_TABS[0], i) => {
                const isService = 'name' in item
                return (
                  <div key={i} className="svc-card card" style={{ cursor:'default' }}>
                    <div style={{ fontSize:'1.6rem', marginBottom:12 }}>{isService ? (item as Service).icon || '⚡' : (item as typeof SERVICE_TABS[0]).icon}</div>
                    <h3 style={{ fontFamily:'Raleway,sans-serif', fontSize:'.9rem', fontWeight:700, color:'#1E2A3A', marginBottom:6 }}>
                      {isService ? (item as Service).name : (item as typeof SERVICE_TABS[0]).label}
                    </h3>
                    <p style={{ fontSize:'.78rem', color:'#4a5568', lineHeight:1.65 }}>
                      {isService ? (item as Service).shortDescription : (item as typeof SERVICE_TABS[0]).detail}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  )
}
