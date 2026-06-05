'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { formatPrice } from '@/lib/cart'

interface CalcResult {
  systemSize: number
  estimatedCost: number
  monthlySavings: number
  annualSavings: number
  paybackYears: number
  co2Saved: number
}

export default function CalculateurPage() {
  const [form, setForm] = useState({
    monthlyBill: '',
    propertyType: 'house',
    region: 'centre',
    gridHours: '8',
  })
  const [result, setResult] = useState<CalcResult | null>(null)

  const calculate = () => {
    const bill = parseFloat(form.monthlyBill) || 0
    if (bill < 5000) return

    // Calcul simplifié
    const kWhPerMonth = bill / 100 // approximation XAF → kWh
    const systemKW    = Math.ceil(kWhPerMonth / 120 * 1.3) // 1.3 facteur sécurité
    const baseCost    = systemKW * 450000 // ~450 000 FCFA/kWc installation
    const savings     = bill * 0.70
    const payback     = baseCost / (savings * 12)

    setResult({
      systemSize:    systemKW,
      estimatedCost: baseCost,
      monthlySavings: savings,
      annualSavings:  savings * 12,
      paybackYears:   Math.round(payback * 10) / 10,
      co2Saved:       Math.round(systemKW * 1.2 * 12),
    })
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 260, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Outil Gratuit</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              Calculateur <span className="hl">Solaire</span>
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              Estimez vos économies et le dimensionnement de votre installation solaire.
            </p>
          </div>
        </section>

        <section className="sec-dk" style={{ padding: '64px 48px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 32 }}>
            {/* Formulaire calculateur */}
            <div style={{ background: '#1E2A3A', borderRadius: 22, padding: 36, boxShadow: '0 10px 40px rgba(0,0,0,.22)' }}>
              <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                Calculez vos Économies
              </h3>
              <p style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.5)', marginBottom: 20 }}>
                Entrez votre facture ENEO mensuelle et obtenez une estimation personnalisée.
              </p>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.55)', marginBottom: 5, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                  Facture ENEO mensuelle (FCFA) *
                </label>
                <input
                  type="number"
                  value={form.monthlyBill}
                  onChange={(e) => setForm({ ...form, monthlyBill: e.target.value })}
                  placeholder="Ex: 50000"
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 9, color: '#fff', fontFamily: 'Lato,sans-serif', fontSize: '.84rem', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.55)', marginBottom: 5, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                  Type de propriété
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 9, color: '#fff', fontFamily: 'Lato,sans-serif', fontSize: '.84rem', outline: 'none' }}
                >
                  <option value="house" style={{ background: '#1E2A3A' }}>Maison résidentielle</option>
                  <option value="commercial" style={{ background: '#1E2A3A' }}>Local commercial</option>
                  <option value="industrial" style={{ background: '#1E2A3A' }}>Industriel / Usine</option>
                  <option value="other" style={{ background: '#1E2A3A' }}>Autre</option>
                </select>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.55)', marginBottom: 5, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                  Région
                </label>
                <select
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 9, color: '#fff', fontFamily: 'Lato,sans-serif', fontSize: '.84rem', outline: 'none' }}
                >
                  <option value="centre" style={{ background: '#1E2A3A' }}>Centre (Yaoundé)</option>
                  <option value="littoral" style={{ background: '#1E2A3A' }}>Littoral (Douala)</option>
                  <option value="ouest" style={{ background: '#1E2A3A' }}>Ouest</option>
                  <option value="nord" style={{ background: '#1E2A3A' }}>Nord / Extrême-Nord</option>
                  <option value="other" style={{ background: '#1E2A3A' }}>Autre région</option>
                </select>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.55)', marginBottom: 5, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                  Heures de coupure par jour (approx.)
                </label>
                <select
                  value={form.gridHours}
                  onChange={(e) => setForm({ ...form, gridHours: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 9, color: '#fff', fontFamily: 'Lato,sans-serif', fontSize: '.84rem', outline: 'none' }}
                >
                  <option value="2" style={{ background: '#1E2A3A' }}>2-4h (Peu de coupures)</option>
                  <option value="8" style={{ background: '#1E2A3A' }}>6-10h (Coupures régulières)</option>
                  <option value="16" style={{ background: '#1E2A3A' }}>12h+ (Coupures fréquentes)</option>
                </select>
              </div>

              <button
                onClick={calculate}
                style={{ width: '100%', background: 'linear-gradient(135deg,#8CC63F,#6FAE2E)', color: '#fff', border: 'none', padding: 12, borderRadius: 50, fontSize: '.87rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Lato,sans-serif', marginTop: 4, boxShadow: '0 5px 18px rgba(140,198,63,.3)', transition: 'all .28s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 9px 24px rgba(140,198,63,.44)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 5px 18px rgba(140,198,63,.3)' }}
              >
                ☀️ Calculer mes économies
              </button>
            </div>

            {/* Résultats */}
            {result && (
              <div style={{ background: 'rgba(140,198,63,.1)', border: '1px solid rgba(140,198,63,.2)', borderRadius: 22, padding: 32 }}>
                <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
                  📊 Votre Estimation Personnalisée
                </h4>

                {[
                  { label: 'Taille système recommandée', value: `${result.systemSize} kWc`, highlight: true },
                  { label: 'Coût d\'installation estimé', value: formatPrice(result.estimatedCost) },
                  { label: 'Économies mensuelles', value: formatPrice(result.monthlySavings), highlight: true },
                  { label: 'Économies annuelles',   value: formatPrice(result.annualSavings) },
                  { label: 'Retour sur investissement', value: `${result.paybackYears} ans` },
                  { label: 'CO₂ évité / an', value: `${result.co2Saved} kg`, last: true },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: row.last ? 'none' : '1px solid rgba(140,198,63,.1)', fontSize: '.82rem' }}>
                    <span style={{ color: 'rgba(255,255,255,.6)' }}>{row.label}</span>
                    <span style={{ color: row.highlight ? '#a8d960' : '#fff', fontWeight: 700 }}>{row.value}</span>
                  </div>
                ))}

                <div style={{ marginTop: 20, padding: '14px', background: 'rgba(140,198,63,.15)', borderRadius: 12, textAlign: 'center' }}>
                  <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.6)', marginBottom: 10 }}>
                    Ces estimations sont indicatives. Obtenez une étude technique précise et gratuite.
                  </p>
                  <Link href="/devis">
                    <button style={{ background: 'linear-gradient(135deg,#8CC63F,#6FAE2E)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 50, fontSize: '.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Lato,sans-serif' }}>
                      ☀️ Devis Gratuit
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media(max-width:768px){
          [style*="1fr 1fr"] { grid-template-columns:1fr !important; }
        }
      `}</style>
    </>
  )
}
