'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { contactApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.phone || !form.message) {
      toast.error('Veuillez remplir les champs obligatoires.')
      return
    }
    setLoading(true)
    try {
      await contactApi.submit(form)
      setSent(true)
      toast.success('Message envoyé ! Nous vous contacterons sous 2h.')
    } catch {
      toast.error('Erreur lors de l\'envoi. Réessayez ou contactez-nous via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 260, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Disponible 6j/7</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              <span className="hl">Contactez</span> Notre Équipe
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              Nos ingénieurs vous rappellent sous 2h · Étude technique offerte
            </p>
          </div>
        </section>

        <section className="sec-contact" style={{ padding: '64px 48px', background: '#1E2A3A' }}>
          <div className="rsp-grid-contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 42, maxWidth: 1100, margin: '0 auto' }}>
            {/* Coordonnées */}
            <div>
              <RevealWrapper>
                <span className="slabel">Nos Coordonnées</span>
              </RevealWrapper>
              <RevealWrapper delay={1}>
                <h2 className="stitle dtitle" style={{ marginTop: 8 }}>
                  Nous sommes là <span className="ac">pour vous</span>
                </h2>
              </RevealWrapper>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 24 }}>
                {[
                  { icon: '📍', label: 'Adresse',    value: 'Yaoundé, Cameroun' },
                  { icon: '📞', label: 'Téléphone',  value: '+237 677 000 000' },
                  { icon: '✉️', label: 'Email',      value: 'info@sapres.cm' },
                  { icon: '⏰', label: 'Lun-Ven',    value: '08:00 - 17:00' },
                  { icon: '⏰', label: 'Samedi',     value: '08:00 - 13:00' },
                ].map((c) => (
                  <div key={c.label} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', padding: 11, borderRadius: 10, transition: 'background .18s', cursor: 'default' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                  >
                    <div style={{ width: 38, height: 38, background: 'rgba(140,198,63,.12)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '.78rem', color: '#fff', marginBottom: 2 }}>{c.label}</strong>
                      <span style={{ fontSize: '.73rem', color: 'rgba(255,255,255,.42)' }}>{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA WhatsApp */}
              <div style={{ marginTop: 24, background: 'rgba(37,211,102,.08)', border: '1px solid rgba(37,211,102,.18)', borderRadius: 14, padding: '18px 20px' }}>
                <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', marginBottom: 12 }}>
                  💬 Réponse instantanée via WhatsApp
                </p>
                <button
                  onClick={() => { const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '237677000000'; window.open(`https://wa.me/${num}?text=${encodeURIComponent('Bonjour SAPRES, j\'ai une question !')}`, '_blank') }}
                  style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 50, fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Lato,sans-serif' }}>
                  💬 Ouvrir WhatsApp
                </button>
              </div>
            </div>

            {/* Formulaire */}
            <RevealWrapper delay={2}>
              {sent ? (
                <div style={{ background: '#fff', borderRadius: 20, padding: 32, textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8 }}>
                    Message envoyé !
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '.87rem', lineHeight: 1.7 }}>
                    Merci pour votre message. Un ingénieur SAPRES vous contactera sous 2 heures.
                  </p>
                </div>
              ) : (
                <div className="cf">
                  <h3>Envoyez-nous un Message</h3>
                  <form onSubmit={handleSubmit}>
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
                      <label>Sujet</label>
                      <select name="subject" value={form.subject} onChange={handleChange}>
                        <option value="">— Choisir un sujet —</option>
                        <option value="Installation solaire">Installation solaire</option>
                        <option value="Devis gratuit">Devis gratuit</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Pompage solaire">Pompage solaire</option>
                        <option value="Lampadaires solaires">Lampadaires solaires</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label>Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Décrivez votre projet ou votre question…" rows={4} required />
                    </div>
                    <button type="submit" className="fsubmit" disabled={loading}>
                      {loading ? '⏳ Envoi en cours…' : '📨 Envoyer le message'}
                    </button>
                    <p className="fn">Réponse garantie sous 2h · Lundi au Samedi</p>
                  </form>
                </div>
              )}
            </RevealWrapper>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .cf h3 { font-family:'Raleway',sans-serif; font-size:1.05rem; font-weight:800; color:var(--navy); margin-bottom:16px; }
        .fn { text-align:center; color:var(--tl); font-size:.67rem; margin-top:6px; }
      `}</style>
    </>
  )
}
