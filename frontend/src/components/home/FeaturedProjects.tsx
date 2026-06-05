'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { projectsApi } from '@/lib/api'
import type { Project } from '@/types'
import RevealWrapper from '@/components/ui/RevealWrapper'

const THUMB_BG = [
  'linear-gradient(135deg,#0d1a0f,#1e3a20,#2d5a2a)',
  'linear-gradient(135deg,#0a1525,#1a2d4a,#203560)',
  'linear-gradient(135deg,#1a0d28,#2a1a40,#3a2055)',
]

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    projectsApi.getFeatured()
      .then((res) => setProjects(res.data.data || []))
      .catch(console.error)
  }, [])

  const displayed = projects.length > 0 ? projects.slice(0, 3) : MOCK_PROJECTS

  return (
    <section className="sec">
      <RevealWrapper><span className="slabel">Nos Réalisations</span></RevealWrapper>
      <RevealWrapper delay={1}>
        <h2 className="stitle">Projets qui <span className="ac">Parlent d&apos;Eux-Mêmes</span></h2>
      </RevealWrapper>
      <RevealWrapper delay={2}>
        <p className="sdesc">
          Découvrez quelques-uns de nos projets réalisés à travers le Cameroun,
          des installations résidentielles aux centrales industrielles.
        </p>
      </RevealWrapper>

      <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24 }}>
        {displayed.map((p, i) => (
          <RevealWrapper key={p._id || i} delay={((i % 3) + 1) as 1|2|3}>
            <Link href={`/realisations/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="proj-card">
                <div className="proj-thumb" style={{ background: THUMB_BG[i % 3], height: 165, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.1rem', position: 'relative' }}>
                  {p.featuredImage?.secureUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.featuredImage.secureUrl} alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  ) : (
                    ['🏠', '🏭', '🏙️'][i % 3]
                  )}
                  <div className="proj-ov" />
                  <span className="proj-lbl">{p.projectCategory || 'Solaire'}</span>
                </div>
                <div className="proj-info" style={{ padding: 17 }}>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.87rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 5 }}>{p.title}</h3>
                  <p style={{ fontSize: '.77rem', color: '#4a5568', lineHeight: 1.65 }}>{p.shortDescription}</p>
                  <div className="proj-meta" style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                    {p.capacity && <span>{p.capacity}</span>}
                    {p.client?.location && <span>{p.client.location}</span>}
                    {p.duration && <span>{p.duration}</span>}
                  </div>
                </div>
              </div>
            </Link>
          </RevealWrapper>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link href="/realisations">
          <button className="btn btn-g">Voir toutes les réalisations →</button>
        </Link>
      </div>

      <style>{`
        .proj-card { border-radius:var(--rl); overflow:hidden; box-shadow:var(--sh); background:#fff; transition:transform .3s,box-shadow .3s; }
        .proj-card:hover { transform:translateY(-8px); box-shadow:0 24px 52px rgba(30,42,58,.15); }
        .proj-thumb { position:relative; }
        .proj-ov { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.46)); opacity:0; transition:opacity .27s; }
        .proj-card:hover .proj-ov { opacity:1; }
        .proj-lbl { position:absolute; top:10px; left:10px; background:var(--g); color:#fff; font-size:.62rem; font-weight:700; padding:3px 9px; border-radius:15px; }
        .proj-meta span { background:rgba(140,198,63,.08); color:var(--gd); font-size:.63rem; font-weight:700; padding:2px 8px; border-radius:10px; }
      `}</style>
    </section>
  )
}

const MOCK_PROJECTS: Project[] = [
  {
    _id: '1', title: '50kW Installation Industrielle ABC Factory',
    slug: '50kw-installation-industrielle', shortDescription: 'Centrale PV complète pour usine de production.',
    projectCategory: 'Industriel', projectType: 'Installation', capacity: '50 kW',
    client: { name: 'ABC Factory', industry: 'Manufacturing', location: 'Douala' },
    description: '', duration: '30 jours', technologiesUsed: [], projectChallenges: [], projectSolutions: [], projectResults: [],
    featured: true, status: 'published', displayOrder: 1, createdAt: '', updatedAt: '',
  },
  {
    _id: '2', title: 'Électrification Solaire — 80 Foyers, Village Nkolbisson',
    slug: 'electrification-village-nkolbisson', shortDescription: 'Système solaire communautaire pour village rural.',
    projectCategory: 'Résidentiel', projectType: 'Electrification', capacity: '15 kW',
    client: { name: 'Mairie de Nkolbisson', industry: 'Public', location: 'Yaoundé' },
    description: '', duration: '45 jours', technologiesUsed: [], projectChallenges: [], projectSolutions: [], projectResults: [],
    featured: true, status: 'published', displayOrder: 2, createdAt: '', updatedAt: '',
  },
  {
    _id: '3', title: '120 Lampadaires Solaires — Commune de Bafoussam',
    slug: 'lampadaires-bafoussam', shortDescription: 'Éclairage public solaire pour les principaux axes de la ville.',
    projectCategory: 'Éclairage Public', projectType: 'Lampadaires', capacity: '60W/unité',
    client: { name: 'Mairie de Bafoussam', industry: 'Collectivité', location: 'Bafoussam' },
    description: '', duration: '60 jours', technologiesUsed: [], projectChallenges: [], projectSolutions: [], projectResults: [],
    featured: true, status: 'published', displayOrder: 3, createdAt: '', updatedAt: '',
  },
]
