'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { jobsApi } from '@/lib/api'
import type { Job } from '@/types'

const MOCK_JOBS: Job[] = [
  { _id: '1', title: 'Technicien Installation Solaire', slug: 'technicien-installation-solaire', department: 'Technique', employmentType: 'CDI', location: 'Yaoundé', salaryRange: '200 000 - 350 000 FCFA', experienceLevel: 'Intermédiaire', description: '', requirements: ['2 ans d\'expérience', 'Connaissance systèmes solaires', 'Permis B'], responsibilities: [], benefits: ['Assurance maladie', 'Transport'], numberOfPositions: 3, applicationDeadline: '2026-08-31', status: 'open', featured: true, createdAt: '', updatedAt: '' },
  { _id: '2', title: 'Commercial Terrain', slug: 'commercial-terrain', department: 'Commercial', employmentType: 'CDI', location: 'Douala', salaryRange: '150 000 + commissions', experienceLevel: 'Junior', description: '', requirements: ['Bac+2 minimum', 'Expérience vente'], responsibilities: [], benefits: ['Commission', 'Véhicule'], numberOfPositions: 5, applicationDeadline: '2026-09-15', status: 'open', featured: true, createdAt: '', updatedAt: '' },
  { _id: '3', title: 'Ingénieur Électrique', slug: 'ingenieur-electrique', department: 'Technique', employmentType: 'CDI', location: 'Yaoundé', salaryRange: '400 000 - 600 000 FCFA', experienceLevel: 'Senior', description: '', requirements: ['Bac+5 Génie Électrique', '5 ans expérience solaire'], responsibilities: [], benefits: ['Assurance', 'Bonus annuel'], numberOfPositions: 1, applicationDeadline: '2026-07-31', status: 'open', featured: false, createdAt: '', updatedAt: '' },
]

export default function RecrutementPage() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    jobsApi.getAll({ status: 'open' })
      .then((res) => { if (res.data.data?.length) setJobs(res.data.data) })
      .catch(() => {})
  }, [])

  const departments = ['all', ...Array.from(new Set(jobs.map((j) => j.department)))]
  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.department === filter)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 300, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="orb orb1" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Rejoignez l&apos;équipe</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              Carrières chez <span className="hl">SAPRES SARL</span>
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              Rejoignez le leader de l&apos;énergie solaire au Cameroun. Construisez l&apos;avenir énergétique avec nous.
            </p>
          </div>
        </section>

        <section className="sec">
          <RevealWrapper><span className="slabel">{filtered.length} Poste{filtered.length > 1 ? 's' : ''} ouvert{filtered.length > 1 ? 's' : ''}</span></RevealWrapper>
          <RevealWrapper delay={1}>
            <h2 className="stitle">Nos <span className="ac">Offres d&apos;Emploi</span></h2>
          </RevealWrapper>

          {/* Filtres */}
          <div className="filter-row" style={{ display: 'flex', gap: 6, margin: '24px 0', flexWrap: 'wrap' }}>
            {departments.map((d) => (
              <button key={d} className={`fb${filter === d ? ' on' : ''}`} onClick={() => setFilter(d)}>
                {d === 'all' ? 'Tous les postes' : d}
              </button>
            ))}
          </div>

          {/* Liste des offres */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((job, i) => (
              <RevealWrapper key={job._id} delay={((i % 3) + 1) as 1|2|3}>
                <div className="job-card">
                  <div className="job-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div className="job-title">{job.title}</div>
                      <div className="job-meta" style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
                        <span>📍 {job.location}</span>
                        <span>💼 {job.employmentType}</span>
                        <span>🎯 {job.experienceLevel}</span>
                        {job.salaryRange && <span>💰 {job.salaryRange}</span>}
                      </div>
                    </div>
                    <span className={`job-badge${job.numberOfPositions > 2 ? ' urgent' : ''}`}>
                      {job.numberOfPositions > 2 ? 'Urgent' : `${job.numberOfPositions} poste${job.numberOfPositions > 1 ? 's' : ''}`}
                    </span>
                  </div>

                  {job.requirements?.length > 0 && (
                    <div className="job-tags" style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                      {job.requirements.slice(0, 3).map((r) => (
                        <span key={r} className="job-tag">{r}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <span style={{ fontSize: '.72rem', color: '#718096' }}>
                      🗓 Clôture : {new Date(job.applicationDeadline).toLocaleDateString('fr-FR')}
                    </span>
                    <Link href={`/recrutement/${job.slug}`}>
                      <button className="job-apply" style={{ padding: '9px 24px', minWidth: 160 }}>
                        {job.status === 'open' ? 'Postuler →' : 'Voir l\'offre'}
                      </button>
                    </Link>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#718096' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>😔</div>
              <p>Aucune offre disponible pour ce département.</p>
            </div>
          )}
        </section>

        {/* Candidature spontanée */}
        <section className="sec-dk" style={{ textAlign: 'center' }}>
          <span className="slabel">Candidature Spontanée</span>
          <h2 className="stitle dtitle" style={{ marginTop: 8 }}>
            Votre profil ne correspond pas <span className="ac">exactement ?</span>
          </h2>
          <p className="sdesc ddesc" style={{ margin: '0 auto 24px' }}>
            Envoyez-nous votre CV et votre lettre de motivation. Nous gardons les profils intéressants
            dans notre base de données pour de futures opportunités.
          </p>
          <Link href="/recrutement/candidature-spontanee">
            <button className="btn btn-g">📨 Envoyer ma candidature spontanée</button>
          </Link>
        </section>
      </main>
      <Footer />

      <style>{`
        .job-title { font-family:'Raleway',sans-serif; font-size:.9rem; font-weight:700; color:var(--navy); }
        .job-badge { background:rgba(140,198,63,.1); color:var(--gd); font-size:.62rem; font-weight:700; padding:3px 9px; border-radius:14px; border:1px solid rgba(140,198,63,.18); white-space:nowrap; }
        .job-badge.urgent { background:rgba(239,68,68,.08); color:#dc2626; border-color:rgba(239,68,68,.15); }
        .job-meta span { font-size:.7rem; color:var(--tl); display:flex; align-items:center; gap:3px; }
        .job-tags { display:flex; gap:5px; flex-wrap:wrap; }
        .job-tag { background:var(--cream); color:var(--tm); font-size:.64rem; font-weight:600; padding:2px 8px; border-radius:8px; }
        .job-apply { background:linear-gradient(135deg,var(--g),var(--gd)); color:#fff; border:none; padding:9px; border-radius:50px; font-size:.77rem; font-weight:700; cursor:pointer; font-family:'Lato',sans-serif; transition:all .28s; }
        .job-apply:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(140,198,63,.36); }
      `}</style>
    </>
  )
}
