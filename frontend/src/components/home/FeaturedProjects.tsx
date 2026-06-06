'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { projectsApi } from '@/lib/api'
import type { Project } from '@/types'

const PROJ_PHOTOS = [
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
]

const MOCK_PROJECTS: Project[] = [
  { _id:'1', title:'Installation d\'un Système Solaire Haute Performance pour Économies Durables.', slug:'50kw-installation-industrielle', shortDescription:'Centrale PV complète pour usine de production.', projectCategory:'Installation Résidentielle', projectType:'Installation', capacity:'50 kW', client:{ name:'ABC Factory', industry:'Manufacturing', location:'Résidence Mballa — Yaoundé' }, description:'', duration:'30 jours', technologiesUsed:[], projectChallenges:[], projectSolutions:[], projectResults:[], featured:true, status:'published', displayOrder:1, createdAt:'', updatedAt:'' },
  { _id:'2', title:'Électrification Solaire Communautaire — 80 Foyers Village Nkolbisson', slug:'electrification-village-nkolbisson', shortDescription:'Système solaire communautaire pour village rural.', projectCategory:'Résidentiel', projectType:'Electrification', capacity:'15 kW', client:{ name:'Mairie de Nkolbisson', industry:'Public', location:'Yaoundé' }, description:'', duration:'45 jours', technologiesUsed:[], projectChallenges:[], projectSolutions:[], projectResults:[], featured:true, status:'published', displayOrder:2, createdAt:'', updatedAt:'' },
  { _id:'3', title:'120 Lampadaires Solaires — Commune de Bafoussam', slug:'lampadaires-bafoussam', shortDescription:'Éclairage public solaire pour les principaux axes.', projectCategory:'Éclairage Public', projectType:'Lampadaires', capacity:'60W/unité', client:{ name:'Mairie de Bafoussam', industry:'Collectivité', location:'Bafoussam' }, description:'', duration:'60 jours', technologiesUsed:[], projectChallenges:[], projectSolutions:[], projectResults:[], featured:true, status:'published', displayOrder:3, createdAt:'', updatedAt:'' },
]

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [active,   setActive]   = useState(0)
  const [fadeKey,  setFadeKey]  = useState(0)

  useEffect(() => {
    projectsApi.getFeatured()
      .then((res) => { if ((res.data.data || []).length >= 2) setProjects(res.data.data) })
      .catch(() => {})
  }, [])

  // Auto-avance
  useEffect(() => {
    const t = setInterval(() => {
      setActive(i => (i + 1) % projects.length)
      setFadeKey(k => k + 1)
    }, 5000)
    return () => clearInterval(t)
  }, [projects.length])

  const goTo = (i: number) => { setActive(i); setFadeKey(k => k + 1) }

  const proj  = projects[active]
  const photo = proj.featuredImage?.secureUrl || PROJ_PHOTOS[active % PROJ_PHOTOS.length]

  return (
    <section className="sec-alt" style={{ padding: '72px 48px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span className="slabel">Nos Réalisations</span>
            <h2 className="stitle" style={{ marginTop: 8 }}>Projets qui <span className="ac">Parlent d&apos;Eux-Mêmes</span></h2>
          </div>
          <Link href="/realisations" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline">Voir tous →</button>
          </Link>
        </div>

        {/* Slide principal — Ken Burns + cross-fade */}
        <div style={{ borderRadius: 28, overflow: 'hidden', position: 'relative', height: 420, boxShadow: '0 12px 48px rgba(0,0,0,.14)' }}>
          {/* Breadcrumb */}
          <div style={{ position: 'absolute', top: 18, left: 22, zIndex: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '4px 12px', fontSize: '.66rem', fontWeight: 700, color: '#fff' }}>
              Nos Réalisations
            </span>
            <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.66rem' }}>/</span>
            <span key={`cat-${fadeKey}`} style={{ background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 50, padding: '4px 12px', fontSize: '.66rem', fontWeight: 700, color: '#fff', animation: 'crossFadeIn .5s ease both' }}>
              {proj.projectCategory}
            </span>
          </div>

          {/* Photo — Ken Burns */}
          <div className="ken-burns-wrap" style={{ position: 'absolute', inset: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={fadeKey}
              src={photo}
              alt={proj.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'crossFadeIn .6s ease both' }}
            />
          </div>

          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.22) 55%, transparent 100%)', zIndex: 1 }} />

          {/* Contenu texte — animate on slide change */}
          <div key={`txt-${fadeKey}`} style={{ position: 'absolute', bottom: 28, left: 28, right: 100, zIndex: 10, animation: 'fadeInUp .5s ease .1s both' }}>
            <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.55)', marginBottom: 8 }}>
              📍 {proj.client?.location}
            </div>
            <h3 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', color: '#fff', marginBottom: 8, lineHeight: 1.2, maxWidth: 520 }}>
              {proj.title}
            </h3>
            {proj.capacity && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(140,198,63,.2)', border: '1px solid rgba(140,198,63,.35)', borderRadius: 50, padding: '3px 12px', marginBottom: 14 }}>
                <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960' }}>⚡ {proj.capacity}</span>
              </div>
            )}
            <br />
            <Link href={`/realisations/${proj.slug}`} style={{ textDecoration: 'none' }}>
              <button className="btn btn-white" style={{ fontSize: '.78rem', marginTop: 8 }}>Voir le projet →</button>
            </Link>
          </div>

          {/* Dots navigation */}
          <div style={{ position: 'absolute', bottom: 28, right: 28, display: 'flex', gap: 6, zIndex: 10 }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, background: i === active ? '#8CC63F' : 'rgba(255,255,255,.4)', border: 'none', cursor: 'pointer', transition: 'all .3s', padding: 0 }} />
            ))}
          </div>
        </div>

        {/* Miniatures avec hover */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${projects.length},1fr)`, gap: 10, marginTop: 12 }}>
          {projects.map((p, i) => {
            const th = p.featuredImage?.secureUrl || PROJ_PHOTOS[i % PROJ_PHOTOS.length]
            return (
              <button key={p._id} onClick={() => goTo(i)}
                style={{ background: 'none', border: i === active ? '2.5px solid #8CC63F' : '2.5px solid transparent', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', padding: 0, transition: 'border-color .22s, opacity .22s, transform .22s', opacity: i === active ? 1 : 0.55, transform: i === active ? 'scale(1.02)' : 'scale(1)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={th} alt={p.title} style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block', transition: 'transform .4s' }} />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
