'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABand from '@/components/home/CTABand'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { projectsApi } from '@/lib/api'
import type { Project, ProjectStats } from '@/types'

const CATS_FILTER = ['Tous', 'Industriel', 'Résidentiel', 'Commercial', 'Éclairage Public', 'Pompage Solaire']
const THUMB_BG = [
  'linear-gradient(135deg,#0d1a0f,#1e3a20,#2d5a2a)',
  'linear-gradient(135deg,#0a1525,#1a2d4a,#203560)',
  'linear-gradient(135deg,#1a0d28,#2a1a40,#3a2055)',
  'linear-gradient(135deg,#1a1a05,#2a2805)',
]

export default function RealisationsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [stats,    setStats]    = useState<ProjectStats | null>(null)
  const [cat,      setCat]      = useState('Tous')
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    setLoading(true)
    projectsApi.getAll({ status: 'published', limit: 20, category: cat === 'Tous' ? undefined : cat })
      .then((res) => setProjects(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
    projectsApi.getStats().then((res) => setStats(res.data.data)).catch(() => {})
  }, [cat])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 300, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="orb orb1" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Portfolio</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              Nos <span className="hl">Réalisations</span>
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              {stats ? `${stats.totalProjects}+ projets réalisés · ${stats.totalInstalledCapacity} installés` : 'Installations résidentielles, industrielles et publiques à travers tout le Cameroun.'}
            </p>
          </div>
        </section>

        {/* Stats rapides */}
        {stats && (
          <section className="sec-gr">
            <div className="rsp-grid-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0 }}>
              {[
                { n: stats.totalProjects,          suffix: '+',    label: 'Projets Réalisés'      },
                { n: stats.industrialProjects,      suffix: '',     label: 'Industriels'            },
                { n: stats.residentialProjects,     suffix: '',     label: 'Résidentiels'           },
                { n: stats.commercialProjects,      suffix: '',     label: 'Commerciaux'            },
                { n: stats.totalInstalledCapacity,  suffix: '',     label: 'Capacité Totale'        },
              ].map((s, i) => (
                <div key={i} className="stat">
                  <div className="n" style={{ fontFamily: 'Raleway,sans-serif', fontSize: '2.4rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                    {typeof s.n === 'number' ? s.n : s.n}{s.suffix}
                  </div>
                  <div className="l" style={{ fontSize: '.77rem', color: 'rgba(255,255,255,.66)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="sec">
          <RevealWrapper><span className="slabel">Portfolio</span></RevealWrapper>
          <RevealWrapper delay={1}><h2 className="stitle">Projets qui <span className="ac">Parlent d&apos;Eux-Mêmes</span></h2></RevealWrapper>

          {/* Filtres */}
          <div className="filter-row" style={{ display: 'flex', gap: 6, margin: '24px 0', flexWrap: 'wrap' }}>
            {CATS_FILTER.map((c) => (
              <button key={c} className={`fb${cat === c ? ' on' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          {loading ? (
            <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(30,42,58,.09)', height: 280 }} />
              ))}
            </div>
          ) : (
            <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {projects.map((p, i) => (
                <RevealWrapper key={p._id} delay={((i % 3) + 1) as 1|2|3}>
                  <Link href={`/realisations/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="proj-card">
                      <div style={{ height: 180, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', background: THUMB_BG[i % 4] }}>
                        {p.featuredImage?.secureUrl
                          ? <img src={p.featuredImage.secureUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                          : ['🏠', '🏭', '🏙️', '💡', '💧'][i % 5]}
                        <div className="proj-ov" />
                        <span className="proj-lbl">{p.projectCategory}</span>
                      </div>
                      <div style={{ padding: 17 }}>
                        <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.87rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 5 }}>{p.title}</h3>
                        <p style={{ fontSize: '.77rem', color: '#4a5568', lineHeight: 1.65, marginBottom: 10 }}>{p.shortDescription}</p>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                          {p.capacity && <span style={{ background: 'rgba(140,198,63,.08)', color: '#6FAE2E', fontSize: '.63rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{p.capacity}</span>}
                          {p.client?.location && <span style={{ background: 'rgba(140,198,63,.08)', color: '#6FAE2E', fontSize: '.63rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>{p.client.location}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealWrapper>
              ))}
            </div>
          )}
        </section>

        <CTABand />
      </main>
      <Footer />
      <style>{`
        .proj-card { border-radius:var(--rl); overflow:hidden; box-shadow:var(--sh); background:#fff; transition:transform .3s,box-shadow .3s; }
        .proj-card:hover { transform:translateY(-8px); box-shadow:0 24px 52px rgba(30,42,58,.15); }
        .proj-ov { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.46)); opacity:0; transition:opacity .27s; }
        .proj-card:hover .proj-ov { opacity:1; }
        .proj-lbl { position:absolute; top:10px; left:10px; background:var(--g); color:#fff; font-size:.62rem; font-weight:700; padding:3px 9px; border-radius:15px; z-index:1; }
      `}</style>
    </>
  )
}
