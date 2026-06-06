'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABand from '@/components/home/CTABand'
import { projectsApi } from '@/lib/api'
import type { Project, ProjectStats } from '@/types'

const CATS = ['Tous','Industriel','Résidentiel','Commercial','Éclairage Public','Pompage Solaire']
const PROJ_PHOTOS = [
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=700&q=80',
]

export default function RealisationsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [stats,    setStats]    = useState<ProjectStats | null>(null)
  const [cat,      setCat]      = useState('Tous')
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    setLoading(true)
    projectsApi.getAll({ status:'published', limit:20, category: cat==='Tous' ? undefined : cat })
      .then(res => setProjects(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
    projectsApi.getStats().then(res => setStats(res.data.data)).catch(() => {})
  }, [cat])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="page-hero" style={{ paddingTop: 100, paddingBottom: 56, padding:'100px 48px 56px', background:'#fff' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <span className="slabel">Portfolio</span>
            <h1 className="stitle" style={{ fontSize:'clamp(2rem,4vw,3rem)', marginTop:8 }}>
              Nos <span className="ac">Réalisations</span>
            </h1>
            <p className="sdesc">
              {stats ? `${stats.totalProjects}+ projets réalisés · ${stats.totalInstalledCapacity} installés` : 'Installations résidentielles, industrielles et publiques à travers tout le Cameroun.'}
            </p>
          </div>
        </section>

        {/* Stats */}
        {stats && (
          <section style={{ background:'#f8faf5', borderTop:'1px solid rgba(0,0,0,.06)', borderBottom:'1px solid rgba(0,0,0,.06)' }}>
            <div className="rsp-grid-stats" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:0, maxWidth:1080, margin:'0 auto' }}>
              {[
                { n:stats.totalProjects,         s:'+', l:'Projets Réalisés'   },
                { n:stats.industrialProjects,     s:'',  l:'Industriels'         },
                { n:stats.residentialProjects,    s:'',  l:'Résidentiels'        },
                { n:stats.commercialProjects,     s:'',  l:'Commerciaux'         },
                { n:stats.totalInstalledCapacity, s:'',  l:'Capacité Totale'     },
              ].map((s,i) => (
                <div key={i} className="stat-light">
                  <div className="n">{s.n}{s.s}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Grille */}
        <section className="sec" style={{ padding:'56px 48px' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <div className="filter-row" style={{ display:'flex', gap:6, marginBottom:28, flexWrap:'wrap' }}>
              {CATS.map(c => <button key={c} className={`fb${cat===c?' on':''}`} onClick={() => setCat(c)}>{c}</button>)}
            </div>

            <div className="rsp-grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
              {(loading ? Array.from({length:6}).map((_,i) => ({ _id:String(i) } as Project)) : projects).map((p, i) => {
                if (loading) return <div key={i} style={{ background:'#f8f8f8', borderRadius:20, height:280, opacity:.5 }} />
                const photo = p.featuredImage?.secureUrl || PROJ_PHOTOS[i % PROJ_PHOTOS.length]
                return (
                  <Link key={p._id} href={`/realisations/${p.slug}`} style={{ textDecoration:'none' }}>
                    <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,.07)', border:'1px solid rgba(0,0,0,.07)', transition:'transform .3s,box-shadow .3s' }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-6px)';(e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(0,0,0,.12)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='';(e.currentTarget as HTMLElement).style.boxShadow='0 2px 12px rgba(0,0,0,.07)'}}>
                      <div style={{ position:'relative', height:190, overflow:'hidden' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        <span style={{ position:'absolute', top:10, left:10, background:'#8CC63F', color:'#fff', fontSize:'.62rem', fontWeight:700, padding:'3px 9px', borderRadius:14 }}>{p.projectCategory}</span>
                      </div>
                      <div style={{ padding:17 }}>
                        <h3 style={{ fontFamily:'Raleway,sans-serif', fontSize:'.87rem', fontWeight:700, color:'#1E2A3A', marginBottom:5 }}>{p.title}</h3>
                        <p style={{ fontSize:'.77rem', color:'#4a5568', lineHeight:1.65, marginBottom:10 }}>{p.shortDescription}</p>
                        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                          {p.capacity && <span style={{ background:'#f0f4e8', color:'#6FAE2E', fontSize:'.63rem', fontWeight:700, padding:'2px 8px', borderRadius:10 }}>{p.capacity}</span>}
                          {p.client?.location && <span style={{ background:'#f0f4e8', color:'#6FAE2E', fontSize:'.63rem', fontWeight:700, padding:'2px 8px', borderRadius:10 }}>{p.client.location}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
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
