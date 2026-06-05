import Link from 'next/link'
import RevealWrapper from '@/components/ui/RevealWrapper'

export default function BlueCarbonBanner() {
  return (
    <section className="sec-dk" style={{ padding: '36px 48px' }}>
      <RevealWrapper>
        <div className="bc-banner">
          <div style={{
            width: 80, height: 80, flexShrink: 0,
            background: 'linear-gradient(135deg,#1e3a5f,#0a1e30)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem',
            border: '2px solid rgba(59,130,246,.2)',
          }}>
            🔋
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1.1rem', fontWeight: 800,
              color: '#fff', marginBottom: 5,
            }}>
              Partenaire Officiel Blue Carbon
            </h3>
            <p style={{
              fontSize: '.82rem', color: 'rgba(255,255,255,.55)',
              lineHeight: 1.7, maxWidth: 520,
            }}>
              SAPRES SARL est distributeur agréé Blue Carbon, fabricant de premier plan de panneaux
              solaires, batteries lithium, onduleurs, systèmes LED et solutions d&apos;énergies renouvelables.
            </p>
            <div className="bc-pills" style={{ display: 'flex', gap: 7, marginTop: 12, flexWrap: 'wrap' }}>
              {['Panneaux Blue Carbon', 'Batteries Lithium', 'Onduleurs', 'Éclairage LED', 'Distributeur Agréé'].map((t) => (
                <span key={t} style={{
                  background: 'rgba(59,130,246,.12)',
                  border: '1px solid rgba(59,130,246,.2)',
                  color: '#93c5fd',
                  fontSize: '.66rem', fontWeight: 700,
                  padding: '3px 9px', borderRadius: 14,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Link href="/produits" style={{ flexShrink: 0 }}>
            <button className="btn btn-navy">Voir les produits →</button>
          </Link>
        </div>
      </RevealWrapper>
    </section>
  )
}
