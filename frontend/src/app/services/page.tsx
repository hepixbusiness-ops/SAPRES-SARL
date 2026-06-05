'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABand from '@/components/home/CTABand'
import { servicesApi } from '@/lib/api'
import type { Service } from '@/types'

const SERVICE_PANELS = [
  {
    icon: '☀️', label: 'Installation Solaire',
    color: '#8CC63F', rgb: '140,198,63',
    bg: 'linear-gradient(140deg,#040c06,#0a1a0c 25%,#152515 55%,#1E2A3A)',
  },
  {
    icon: '💧', label: 'Pompage Solaire',
    color: '#38bdf8', rgb: '56,189,248',
    bg: 'linear-gradient(140deg,#020c14,#051520 30%,#0a2535 60%,#1a3a4a)',
  },
  {
    icon: '💡', label: 'Lampadaire Solaire',
    color: '#fde047', rgb: '253,224,71',
    bg: 'linear-gradient(140deg,#08080a,#10100a 30%,#181408 60%,#221e05)',
  },
]

/* ── Hook : observe une liste d'éléments et les anime en cascade ── */
function useCascadeReveal(containerRef: React.RefObject<HTMLElement>, selector: string, delay = 80) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const items = Array.from(container.querySelectorAll<HTMLElement>(selector))

    // Initialise l'état masqué
    items.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(22px)'
      el.style.transition = `opacity .5s ${i * delay}ms cubic-bezier(.4,0,.2,1), transform .5s ${i * delay}ms cubic-bezier(.4,0,.2,1)`
    })

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
        obs.disconnect()
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' })

    obs.observe(container)
    return () => obs.disconnect()
  }, [containerRef, selector, delay])
}

export default function ServicesPage() {
  const [services, setServices]     = useState<Service[]>([])
  const [activePanel, setActivePanel] = useState(0)
  const gridRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    servicesApi.getAll({ status: 'published' })
      .then(res => setServices(res.data.data || []))
      .catch(console.error)
  }, [])

  /* Cascade sur les cards de services au scroll */
  useCascadeReveal(gridRef as React.RefObject<HTMLElement>, '.svc-card', 90)

  return (
    <>
      <Navbar />
      <main>

        {/* ─── Hero Services avec onglets ─── */}
        <div style={{ background: '#0d1520' }}>

          {/* Onglets de navigation — scroll horizontal sur mobile */}
          <div className="svc-tabs" style={{
            display: 'flex', gap: 6, padding: '12px 18px',
            background: '#0d1520', borderBottom: '1px solid rgba(140,198,63,.07)',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            {SERVICE_PANELS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => setActivePanel(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                  background: activePanel === i ? `rgba(${p.rgb},.14)` : 'transparent',
                  border: activePanel === i ? `1px solid rgba(${p.rgb},.24)` : '1px solid transparent',
                  color: activePanel === i ? '#fff' : 'rgba(255,255,255,.36)',
                  padding: '8px 16px', borderRadius: 24,
                  cursor: 'pointer', fontSize: '.8rem', fontWeight: 600,
                  fontFamily: 'Lato, sans-serif',
                  transition: 'all .26s',
                }}
              >
                <span>{p.icon}</span><span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Panneau héro actif */}
          <section className="hero" style={{
            background: SERVICE_PANELS[activePanel].bg,
            minHeight: 360, padding: '60px 48px',
            transition: 'background .6s',
          }}>
            <div className="hero-floor" />
            <div className="hc" style={{ zIndex: 10, position: 'relative' }}>
              <div className="chip" style={{ background: 'rgba(140,198,63,.1)', borderColor: 'rgba(140,198,63,.24)' }}>
                <div className="chip-dot" />
                <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  {activePanel === 0 ? 'Résidentiel & Industriel' : activePanel === 1 ? 'Eau Potable Solaire' : 'Éclairage Public Solaire'}
                </span>
              </div>

              <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.7rem,3vw,2.4rem)', color: '#fff', marginBottom: 13 }}>
                {activePanel === 0 && <>Installation <span className="hl">Solaire</span><br />Clé-en-Main</>}
                {activePanel === 1 && <>Pompage <span style={{ background:'linear-gradient(135deg,#38bdf8,#7dd3fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Solaire</span><br />pour Tous</>}
                {activePanel === 2 && <>Lampadaires <span style={{ background:'linear-gradient(135deg,#fde047,#f59e0b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Solaires</span><br />Intelligents</>}
              </h1>

              <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75, marginBottom: 24 }}>
                {activePanel === 0 && "Panneaux Blue Carbon 450Wc, batteries LiFePO4, onduleur hybride. De la maison à l'usine."}
                {activePanel === 1 && "Adduction d'eau potable par énergie solaire pour villages et zones rurales."}
                {activePanel === 2 && "LED 60W, panneau intégré, capteur crépusculaire. Pour communes, mairies et collectivités."}
              </p>

              <div className="hbtns" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                <Link href="/devis"><button className="btn btn-g">☀️ Devis Gratuit</button></Link>
                <Link href="/contact"><button className="btn btn-ghost">📞 Nous contacter</button></Link>
              </div>

              {/* Stats mini */}
              <div className="hstats" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {activePanel === 0 && <>
                  <Stat n="70" s="%" l="Économies ENEO" c="#8CC63F"/>
                  <Sep/>
                  <Stat n="25" s=" ans" l="Garantie" c="#8CC63F"/>
                  <Sep/>
                  <Stat n="500" s="+" l="Installations" c="#8CC63F"/>
                </>}
                {activePanel === 1 && <>
                  <Stat n="200" s="+" l="Ménages desservis" c="#38bdf8"/>
                  <Sep/>
                  <Stat n="4" s=" kW" l="Pompes max" c="#38bdf8"/>
                </>}
                {activePanel === 2 && <>
                  <Stat n="0" s=" FCFA" l="Facture ENEO" c="#fde047"/>
                  <Sep/>
                  <Stat n="10" s=" ans" l="Durée LED" c="#fde047"/>
                </>}
              </div>
            </div>
          </section>
        </div>

        {/* ─── Grille de tous les services ─── */}
        <section className="sec">
          <span className="slabel">Nos Services</span>
          <h2 className="stitle" style={{ marginBottom: 8 }}>
            Tout ce que Nous <span className="ac">Proposons</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.42)', fontSize: '.88rem', marginBottom: 28 }}>
            Des solutions solaires complètes pour chaque besoin.
          </p>

          {/* ref pour déclencher la cascade au scroll */}
          <div ref={gridRef} className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {(services.length > 0 ? services : FALLBACK_SERVICES).map((s, i) => (
              <ServiceCard key={'_id' in s ? s._id : i} service={s} index={i} />
            ))}
          </div>
        </section>

        {/* ─── Section Processus ─── */}
        <ProcessSection />

        <CTABand />
      </main>
      <Footer />

      <style>{`
        .svc-tabs::-webkit-scrollbar { display:none; }

        /* Card service — style de base (pas de hover-only pour les animations) */
        .svc-card {
          background: linear-gradient(145deg,#0d1f14,#1a2e1e);
          border: 1px solid rgba(140,198,63,.12);
          border-radius: 16px;
          padding: 24px 20px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
          /* Transition de la card elle-même */
          transition: border-color .3s, box-shadow .3s, transform .3s;
          will-change: transform;
        }

        /* ── Barre de progression interne — activée au scroll (pas au hover) ── */
        .svc-bar-track {
          height: 3px;
          background: rgba(140,198,63,.12);
          border-radius: 2px;
          margin-top: 14px;
          overflow: hidden;
        }
        .svc-bar-fill {
          height: 100%;
          background: linear-gradient(90deg,#8CC63F,#a8d960);
          border-radius: 2px;
          width: 0%;
          transition: width 1s cubic-bezier(.4,0,.2,1);
        }
        .svc-bar-fill.active { width: var(--bar-w, 75%); }

        /* ── Hover : seulement élévation (pas d'animation invisible) ── */
        @media (hover:hover) {
          .svc-card:hover {
            border-color: rgba(140,198,63,.35);
            box-shadow: 0 12px 36px rgba(140,198,63,.14);
            transform: translateY(-4px);
          }
        }

        /* ── Active (tactile) ── */
        .svc-card:active { transform: scale(.97); }

        /* ── Numéro décoratif ── */
        .svc-num {
          position: absolute; top: 14px; right: 16px;
          font-family: 'Raleway',sans-serif; font-weight: 800;
          font-size: 2.4rem; color: rgba(140,198,63,.07);
          line-height: 1; pointer-events: none;
          transition: color .3s;
        }

        /* Mobile : grille → 1 col */
        @media(max-width:768px){
          .svc-card-grid { grid-template-columns: 1fr !important; gap: 13px !important; }
        }
        @media(max-width:480px){
          .svc-card { padding: 18px 14px !important; }
        }

        /* ── Section processus ── */
        .proc-step {
          display: flex; gap: 18px; align-items: flex-start;
          opacity: 0; transform: translateX(-16px);
          transition: opacity .5s, transform .5s;
        }
        .proc-step.visible { opacity: 1; transform: none; }
        .proc-num {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg,#8CC63F,#6FAE2E);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: .9rem; color: #fff;
          flex-shrink: 0; box-shadow: 0 4px 14px rgba(140,198,63,.32);
        }
      `}</style>
    </>
  )
}

/* ── Composant card service ── */
function ServiceCard({ service, index }: { service: Service | typeof FALLBACK_SERVICES[0]; index: number }) {
  const barRef    = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const pct       = 60 + (index % 4) * 10   // barre entre 60 % et 90 %

  /* Barre de progression déclenchée au scroll */
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { bar.classList.add('active'); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(bar)
    return () => obs.disconnect()
  }, [])

  const title = 'title' in service ? service.title : (service as { name: string }).name
  const desc  = 'shortDescription' in service ? service.shortDescription : ''
  const tag   = 'tag' in (service as object) ? (service as { tag: string }).tag : 'Service'
  const icon  = 'icon' in (service as object) ? (service as { icon: string }).icon : '⚡'
  const slug  = 'slug' in service ? service.slug : '#'

  return (
    <Link href={`/services/${slug}`} style={{ textDecoration: 'none' }}>
      <div ref={cardRef} className="svc-card">
        <span className="svc-num">{String(index + 1).padStart(2, '0')}</span>

        {/* Icône */}
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: 'rgba(140,198,63,.1)', border: '1px solid rgba(140,198,63,.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', marginBottom: 14,
        }}>
          {icon}
        </div>

        <h3 style={{
          fontFamily: 'Raleway,sans-serif', fontWeight: 700,
          fontSize: '.96rem', color: '#fff', marginBottom: 8, lineHeight: 1.3,
        }}>{title}</h3>

        <p style={{
          fontSize: '.78rem', color: 'rgba(255,255,255,.44)', lineHeight: 1.65,
          marginBottom: 12,
        }}>{desc}</p>

        {/* Tag */}
        <span style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: 20,
          background: 'rgba(140,198,63,.1)', border: '1px solid rgba(140,198,63,.2)',
          color: '#a8d960', fontSize: '.68rem', fontWeight: 700,
          letterSpacing: '.06em', textTransform: 'uppercase',
        }}>{tag}</span>

        {/* Barre de progression animée au scroll */}
        <div className="svc-bar-track">
          <div
            ref={barRef}
            className="svc-bar-fill"
            style={{ '--bar-w': `${pct}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </Link>
  )
}

/* ── Section processus avec cascade ── */
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const steps = Array.from(container.querySelectorAll<HTMLElement>('.proc-step'))
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        steps.forEach((s, i) => setTimeout(() => s.classList.add('visible'), i * 120))
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  const steps = [
    { n: '01', title: 'Consultation',       desc: 'Échange sur vos besoins énergétiques et analyse de site.' },
    { n: '02', title: 'Étude Technique',    desc: 'Dimensionnement sur mesure par nos ingénieurs certifiés.' },
    { n: '03', title: 'Proposition Devis',  desc: 'Devis détaillé avec retour sur investissement chiffré.' },
    { n: '04', title: 'Installation',       desc: 'Pose par nos techniciens qualifiés en 1 à 5 jours.' },
    { n: '05', title: 'Mise en Service',    desc: 'Tests complets, formation et remise des garanties.' },
    { n: '06', title: 'Suivi & Maintenance',desc: 'Contrat de maintenance et support technique disponible.' },
  ]

  return (
    <section className="sec-dk">
      <span className="slabel">Comment ça marche</span>
      <h2 className="stitle" style={{ marginBottom: 32 }}>
        Notre <span className="ac">Processus</span> en 6 Étapes
      </h2>
      <div ref={ref} className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
        {steps.map((s, i) => (
          <div key={i} className="proc-step" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="proc-num">{s.n}</div>
            <div>
              <div style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '.92rem', color: '#fff', marginBottom: 5 }}>
                {s.title}
              </div>
              <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.42)', lineHeight: 1.6 }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Mini composants stat ── */
function Stat({ n, s, l, c }: { n: string; s: string; l: string; c: string }) {
  return (
    <div className="hs">
      <div className="n" style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.65rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
        {n}<em style={{ fontStyle: 'normal', color: c, fontSize: '1rem' }}>{s}</em>
      </div>
      <div style={{ fontSize: '.67rem', color: 'rgba(255,255,255,.42)', marginTop: 2 }}>{l}</div>
    </div>
  )
}
function Sep() {
  return <div className="hs-sep" style={{ width: 1, background: 'rgba(255,255,255,.1)', alignSelf: 'stretch' }} />
}

const FALLBACK_SERVICES = [
  { _id: '1', icon: '🏠', title: 'Installation Résidentielle', slug: 'installation-residentielle', shortDescription: 'Systèmes solaires sur mesure pour maisons. Panneaux Blue Carbon 450Wc + batteries LiFePO4 + onduleur hybride.', tag: 'Dès 1,5M FCFA' },
  { _id: '2', icon: '🏢', title: 'Installation Commerciale',   slug: 'installation-commerciale',   shortDescription: 'Solutions pour commerces, bureaux et centres commerciaux. Autonomie totale et réduction de facture.',       tag: 'ROI 2-3 ans' },
  { _id: '3', icon: '🏭', title: 'Solutions Industrielles',    slug: 'solutions-industrielles',    shortDescription: "Centrales PV de 5 kWc à 1 MWc. Financement disponible jusqu'à 24 mois.",                                 tag: 'Financement dispo' },
  { _id: '4', icon: '🔧', title: 'Maintenance & Réparation',   slug: 'maintenance-reparation',     shortDescription: 'Contrats de maintenance préventive et corrective. Audits énergétiques annuels.',                          tag: 'Cameroun entier' },
  { _id: '5', icon: '📊', title: 'Audit Énergétique',          slug: 'audit-energetique',          shortDescription: 'Analyse complète de votre consommation. Rapport personnalisé et recommandations chiffrées.',              tag: '100% Gratuit' },
  { _id: '6', icon: '🎯', title: 'Conseil Solaire',            slug: 'conseil-solaire',            shortDescription: 'Accompagnement personnalisé dans le choix et la conception de votre système solaire.',                   tag: 'Sur mesure' },
  { _id: '7', icon: '⚙️', title: 'Conception Personnalisée',  slug: 'conception-personnalisee',   shortDescription: 'Études techniques et plans sur mesure pour projets spéciaux ou zones isolées.',                          tag: 'Ingénierie' },
]
