'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { jobsApi, applicationsApi } from '@/lib/api'
import type { Job } from '@/types'
import toast from 'react-hot-toast'

export default function JobDetailPage() {
  const params   = useParams()
  const slug     = params?.slug as string
  const [job, setJob]       = useState<Job | null>(null)
  const [applying, setApplying] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState('')

  const cvRef        = useRef<HTMLInputElement>(null)
  const idCardRef    = useRef<HTMLInputElement>(null)
  const photoRef     = useRef<HTMLInputElement>(null)
  const diplomasRef  = useRef<HTMLInputElement>(null)
  const coverRef     = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    firstName: '', lastName: '', gender: '', dateOfBirth: '',
    nationality: 'Cameroonian', phone: '', email: '', address: '',
    highestQualification: '', institution: '', graduationYear: '',
    yearsExperience: '', currentEmployer: '',
  })

  useEffect(() => {
    if (!slug) return
    jobsApi.getBySlug(slug)
      .then((res) => setJob(res.data.data))
      .catch(console.error)
  }, [slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cvRef.current?.files?.[0]) { toast.error('Le CV est obligatoire.'); return }
    if (!idCardRef.current?.files?.[0]) { toast.error('La CNI est obligatoire.'); return }
    if (!photoRef.current?.files?.[0]) { toast.error('La photo passeport est obligatoire.'); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('jobId', job!._id)
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('cv', cvRef.current.files[0])
      fd.append('idCard', idCardRef.current.files[0])
      fd.append('passportPhoto', photoRef.current.files[0])
      if (diplomasRef.current?.files) {
        Array.from(diplomasRef.current.files).forEach((f) => fd.append('diplomas[]', f))
      }
      if (coverRef.current?.files?.[0]) {
        fd.append('coverLetter', coverRef.current.files[0])
      }
      const res = await applicationsApi.submit(fd)
      setSuccess(res.data.data.applicationNumber)
      toast.success(`Candidature envoyée ! Réf: ${res.data.data.applicationNumber}`)
    } catch {
      toast.error('Erreur d\'envoi. Réessayez ou contactez-nous.')
    } finally {
      setLoading(false)
    }
  }

  if (!job) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1520', color: '#fff' }}>
        Chargement…
      </div>
      <Footer />
    </>
  )

  if (success) return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1520', padding: 40 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 480 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8 }}>Candidature envoyée !</h2>
          <p style={{ color: '#4a5568', fontSize: '.87rem', lineHeight: 1.7 }}>
            Réf: <strong style={{ color: '#6FAE2E' }}>{success}</strong><br/>
            Vous recevrez un retour sous 72h ouvrées.
          </p>
          <Link href="/recrutement" style={{ textDecoration: 'none' }}>
            <button className="btn btn-g" style={{ marginTop: 20 }}>← Retour aux offres</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main>
        {/* Hero offre */}
        <section className="hero" style={{ minHeight: 260, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="hc" style={{ zIndex: 10 }}>
            <Link href="/recrutement" style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem', textDecoration: 'none', marginBottom: 12, display: 'block' }}>← Retour aux offres</Link>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>{job.department}</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#fff', marginBottom: 13 }}>
              {job.title}
            </h1>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(140,198,63,.15)', color: '#a8d960', fontSize: '.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>📍 {job.location}</span>
              <span style={{ background: 'rgba(140,198,63,.15)', color: '#a8d960', fontSize: '.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>💼 {job.employmentType}</span>
              {job.salaryRange && <span style={{ background: 'rgba(140,198,63,.15)', color: '#a8d960', fontSize: '.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>💰 {job.salaryRange}</span>}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 48px', background: '#F4F6F0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, maxWidth: 1100, margin: '0 auto' }}>
            {/* Détails poste */}
            <div>
              {!applying && (
                <>
                  {[
                    { title: '📋 Description', content: job.description },
                    { title: '✅ Exigences', list: job.requirements },
                    { title: '🎯 Responsabilités', list: job.responsibilities },
                    { title: '🎁 Avantages', list: job.benefits },
                  ].map((s) => s.content || (s.list?.length ?? 0) > 0 ? (
                    <div key={s.title} style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 4px 24px rgba(30,42,58,.06)' }}>
                      <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.95rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 12 }}>{s.title}</h3>
                      {s.content ? (
                        <p style={{ fontSize: '.83rem', color: '#4a5568', lineHeight: 1.75 }}>{s.content}</p>
                      ) : (
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {s.list!.map((item) => (
                            <li key={item} style={{ display: 'flex', gap: 8, fontSize: '.82rem', color: '#4a5568' }}>
                              <span style={{ color: '#8CC63F', flexShrink: 0 }}>✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : null)}
                  <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                    disabled={job.status !== 'open'}
                    onClick={() => setApplying(true)}>
                    {job.status === 'open' ? '📨 Postuler maintenant' : 'Offre clôturée'}
                  </button>
                </>
              )}
            </div>

            {/* Formulaire candidature */}
            {applying && (
              <div className="cf" style={{ gridColumn: '1 / -1' }}>
                <h3>Formulaire de Candidature — {job.title}</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#6FAE2E', marginBottom: 10, borderBottom: '1px solid rgba(140,198,63,.1)', paddingBottom: 6 }}>
                    INFORMATIONS PERSONNELLES
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div className="fg"><label>Prénom *</label><input name="firstName" value={form.firstName} onChange={handleChange} required /></div>
                    <div className="fg"><label>Nom *</label><input name="lastName" value={form.lastName} onChange={handleChange} required /></div>
                    <div className="fg"><label>Sexe</label>
                      <select name="gender" value={form.gender} onChange={handleChange}>
                        <option value="">—</option>
                        <option value="Male">Masculin</option>
                        <option value="Female">Féminin</option>
                      </select>
                    </div>
                    <div className="fg"><label>Date de naissance</label><input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} /></div>
                    <div className="fg"><label>Téléphone *</label><input name="phone" value={form.phone} onChange={handleChange} required /></div>
                    <div className="fg"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
                  </div>
                  <div className="fg"><label>Adresse</label><input name="address" value={form.address} onChange={handleChange} /></div>

                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#6FAE2E', margin: '16px 0 10px', borderBottom: '1px solid rgba(140,198,63,.1)', paddingBottom: 6 }}>
                    FORMATION & EXPÉRIENCE
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div className="fg"><label>Diplôme le plus élevé</label>
                      <select name="highestQualification" value={form.highestQualification} onChange={handleChange}>
                        <option value="">—</option>
                        <option value="BEPC">BEPC</option>
                        <option value="Baccalauréat">Baccalauréat</option>
                        <option value="BTS / DUT">BTS / DUT</option>
                        <option value="Licence">Licence (Bac+3)</option>
                        <option value="Master">Master (Bac+5)</option>
                        <option value="Doctorat">Doctorat</option>
                      </select>
                    </div>
                    <div className="fg"><label>Établissement</label><input name="institution" value={form.institution} onChange={handleChange} /></div>
                    <div className="fg"><label>Année d&apos;obtention</label><input name="graduationYear" type="number" value={form.graduationYear} onChange={handleChange} /></div>
                    <div className="fg"><label>Années d&apos;expérience</label><input name="yearsExperience" type="number" value={form.yearsExperience} onChange={handleChange} /></div>
                  </div>
                  <div className="fg"><label>Employeur actuel</label><input name="currentEmployer" value={form.currentEmployer} onChange={handleChange} placeholder="Si applicable" /></div>

                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#6FAE2E', margin: '16px 0 10px', borderBottom: '1px solid rgba(140,198,63,.1)', paddingBottom: 6 }}>
                    DOCUMENTS REQUIS
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div className="fg"><label>CV * (PDF/Word)</label><input ref={cvRef} type="file" accept=".pdf,.doc,.docx" required /></div>
                    <div className="fg"><label>CNI * (scan/photo)</label><input ref={idCardRef} type="file" accept=".pdf,.jpg,.jpeg,.png" required /></div>
                    <div className="fg"><label>Photo passeport * (JPG/PNG)</label><input ref={photoRef} type="file" accept=".jpg,.jpeg,.png" required /></div>
                    <div className="fg"><label>Diplômes (PDF, multiple)</label><input ref={diplomasRef} type="file" accept=".pdf,.jpg,.jpeg,.png" multiple /></div>
                  </div>
                  <div className="fg"><label>Lettre de motivation (optionnel)</label><input ref={coverRef} type="file" accept=".pdf,.doc,.docx" /></div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button type="button" className="btn btn-ghost" style={{ flex: 1, borderColor: '#d4ddc8', color: '#4a5568', background: '#fff' }} onClick={() => setApplying(false)}>
                      Annuler
                    </button>
                    <button type="submit" className="fsubmit" style={{ flex: 2 }} disabled={loading}>
                      {loading ? '⏳ Envoi en cours…' : '📨 Soumettre ma candidature'}
                    </button>
                  </div>
                  <p className="fn">Votre candidature ne peut pas être modifiée après envoi.</p>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .cf h3 { font-family:'Raleway',sans-serif; font-size:1.05rem; font-weight:800; color:var(--navy); margin-bottom:16px; }
        .fn { text-align:center; color:var(--tl); font-size:.67rem; margin-top:6px; }
        @media(max-width:768px){ [style*="1fr 1.4fr"] { grid-template-columns:1fr !important; } [style*="1fr 1fr"] { grid-template-columns:1fr !important; } }
      `}</style>
    </>
  )
}
