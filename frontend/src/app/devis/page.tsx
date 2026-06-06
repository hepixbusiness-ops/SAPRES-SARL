'use client'
import { useState, useRef } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { quotesApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function DevisPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', location: '',
    projectType: '', propertyType: '',
    budgetRange: '', monthlyBill: '', usageDescription: '', requirements: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.phone || !form.projectType) {
      toast.error('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      // Fichiers optionnels
      if (fileRef.current?.files) {
        Array.from(fileRef.current.files).forEach((f) => fd.append('attachments[]', f))
      }
      const res = await quotesApi.submit(fd)
      setSuccess(res.data.data.quoteNumber)
      toast.success(`Demande envoyée ! Réf: ${res.data.data.quoteNumber}`)
    } catch {
      toast.error('Erreur d\'envoi. Contactez-nous via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1520', padding: '40px 20px' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, textAlign: 'center', maxWidth: 480 }}>
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>☀️</div>
            <h2 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8 }}>
              Demande de Devis Envoyée !
            </h2>
            <p style={{ color: '#4a5568', fontSize: '.87rem', lineHeight: 1.7, marginBottom: 16 }}>
              Votre référence : <strong style={{ color: '#6FAE2E' }}>{success}</strong>
            </p>
            <p style={{ color: '#718096', fontSize: '.82rem', lineHeight: 1.7 }}>
              Un ingénieur SAPRES vous contactera sous <strong>24 heures</strong> pour discuter de votre projet et planifier une visite technique gratuite.
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 260, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>100% Gratuit</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              Devis <span className="hl">Gratuit</span> en 24h
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              Remplissez ce formulaire et recevez une étude technique personnalisée sans engagement.
            </p>
          </div>
        </section>

        <section style={{ padding: '64px 48px', background: '#F4F6F0' }}>
          {/* Indicateur étapes */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: s <= step ? 'linear-gradient(135deg,#8CC63F,#6FAE2E)' : '#d4ddc8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.8rem', fontWeight: 700,
                  color: s <= step ? '#fff' : '#718096',
                  boxShadow: s === step ? '0 4px 14px rgba(140,198,63,.36)' : 'none',
                  transition: 'all .3s',
                }}>
                  {s}
                </div>
                {s < 3 && <div style={{ width: 40, height: 2, background: step > s ? '#8CC63F' : '#d4ddc8', borderRadius: 1 }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="cf">
              {/* Étape 1 — Informations personnelles */}
              {step === 1 && (
                <>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 6 }}>
                    👤 Vos Informations
                  </h3>
                  <p style={{ fontSize: '.8rem', color: '#718096', marginBottom: 20 }}>Étape 1 sur 3 — Coordonnées personnelles</p>

                  <div className="rsp-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div className="fg">
                      <label>Nom complet *</label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jean Dupont" required />
                    </div>
                    <div className="fg">
                      <label>Téléphone *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="677 123 456" required />
                    </div>
                  </div>
                  <div className="fg">
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="vous@email.com" />
                  </div>
                  <div className="fg">
                    <label>Localisation *</label>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Yaoundé, Bastos" required />
                  </div>

                  <button type="button" className="fsubmit" onClick={() => {
                    if (!form.fullName || !form.phone || !form.location) { toast.error('Veuillez remplir les champs obligatoires.'); return }
                    setStep(2)
                  }}>
                    Suivant →
                  </button>
                </>
              )}

              {/* Étape 2 — Projet */}
              {step === 2 && (
                <>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 6 }}>
                    ☀️ Votre Projet Solaire
                  </h3>
                  <p style={{ fontSize: '.8rem', color: '#718096', marginBottom: 20 }}>Étape 2 sur 3 — Détails du projet</p>

                  <div className="fg">
                    <label>Type de projet *</label>
                    <select name="projectType" value={form.projectType} onChange={handleChange} required>
                      <option value="">— Choisir —</option>
                      <option value="Residential Solar Installation">Installation Solaire Résidentielle</option>
                      <option value="Commercial Solar Installation">Installation Solaire Commerciale</option>
                      <option value="Industrial Solar Installation">Centrale Solaire Industrielle</option>
                      <option value="Solar Street Lighting">Lampadaires Solaires</option>
                      <option value="Solar Water Pumping">Pompage Solaire</option>
                      <option value="Solar Maintenance">Maintenance Solaire</option>
                      <option value="Energy Audit">Audit Énergétique</option>
                    </select>
                  </div>

                  <div className="fg">
                    <label>Type de propriété</label>
                    <select name="propertyType" value={form.propertyType} onChange={handleChange}>
                      <option value="">— Choisir —</option>
                      <option value="House">Maison individuelle</option>
                      <option value="Apartment">Appartement</option>
                      <option value="Office">Bureau / Commerce</option>
                      <option value="Factory">Usine / Entrepôt</option>
                      <option value="Farm">Exploitation agricole</option>
                      <option value="Other">Autre</option>
                    </select>
                  </div>

                  <div className="rsp-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div className="fg">
                      <label>Budget estimé</label>
                      <select name="budgetRange" value={form.budgetRange} onChange={handleChange}>
                        <option value="">— Choisir —</option>
                        <option value="500000 - 1000000">500K - 1M FCFA</option>
                        <option value="1000000 - 3000000">1M - 3M FCFA</option>
                        <option value="3000000 - 10000000">3M - 10M FCFA</option>
                        <option value="+10000000">Plus de 10M FCFA</option>
                        <option value="Non défini">Non défini</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label>Facture ENEO mensuelle (FCFA)</label>
                      <input name="monthlyBill" type="number" value={form.monthlyBill} onChange={handleChange} placeholder="Ex: 50000" />
                    </div>
                  </div>

                  <div className="fg">
                    <label>Appareils à alimenter</label>
                    <input name="usageDescription" value={form.usageDescription} onChange={handleChange} placeholder="TVs, frigos, climatiseurs, etc." />
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" className="btn btn-ghost" style={{ flex: 1, borderColor: '#d4ddc8', color: '#4a5568', background: '#fff' }} onClick={() => setStep(1)}>
                      ← Retour
                    </button>
                    <button type="button" className="fsubmit" style={{ flex: 2 }} onClick={() => {
                      if (!form.projectType) { toast.error('Veuillez choisir le type de projet.'); return }
                      setStep(3)
                    }}>
                      Suivant →
                    </button>
                  </div>
                </>
              )}

              {/* Étape 3 — Détails supplémentaires */}
              {step === 3 && (
                <>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 6 }}>
                    📎 Informations Complémentaires
                  </h3>
                  <p style={{ fontSize: '.8rem', color: '#718096', marginBottom: 20 }}>Étape 3 sur 3 — Précisions et documents</p>

                  <div className="fg">
                    <label>Besoins spécifiques ou questions</label>
                    <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4} placeholder="Décrivez vos besoins, contraintes ou questions particulières…" />
                  </div>

                  <div className="fg">
                    <label>Pièces jointes (optionnel)</label>
                    <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                    <small style={{ color: '#718096', fontSize: '.7rem' }}>Plans, photos, factures ENEO… Max 10Mo par fichier.</small>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" className="btn btn-ghost" style={{ flex: 1, borderColor: '#d4ddc8', color: '#4a5568', background: '#fff' }} onClick={() => setStep(2)}>
                      ← Retour
                    </button>
                    <button type="submit" className="fsubmit" style={{ flex: 2 }} disabled={loading}>
                      {loading ? '⏳ Envoi en cours…' : '☀️ Envoyer ma demande de devis'}
                    </button>
                  </div>
                  <p className="fn">Sans engagement · Devis gratuit sous 24h · Étude technique offerte</p>
                </>
              )}
            </div>
          </form>
        </section>
      </main>
      <Footer />

      <style>{`
        .cf h3 { font-family:'Raleway',sans-serif; font-size:1.05rem; font-weight:800; color:var(--navy); margin-bottom:16px; }
        .fn { text-align:center; color:var(--tl); font-size:.67rem; margin-top:6px; }
        @media(max-width:768px){
          [style*="1fr 1fr"][style*="gap:10"] { grid-template-columns:1fr !important; }
        }
      `}</style>
    </>
  )
}
