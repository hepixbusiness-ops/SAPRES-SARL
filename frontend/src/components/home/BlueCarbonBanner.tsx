import Link from 'next/link'

export default function BlueCarbonBanner() {
  return (
    <section style={{ padding: '40px 48px', background: '#f8faf5', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="rsp-flex-col" style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#fff', border: '1px solid rgba(30,42,58,.08)', borderRadius: 24, padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
          {/* Logo/icône Blue Carbon */}
          <div style={{ width: 72, height: 72, flexShrink: 0, background: 'linear-gradient(135deg,#1E2A3A,#2d3f52)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px solid rgba(140,198,63,.15)', boxShadow: '0 4px 16px rgba(30,42,58,.15)' }}>
            🔋
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(140,198,63,.1)', border: '1px solid rgba(140,198,63,.2)', color: '#6FAE2E', fontSize: '.62rem', fontWeight: 700, padding: '3px 10px', borderRadius: 14, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                Partenaire Officiel
              </span>
              <span style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#1E2A3A' }}>
                Blue Carbon — Distributeur Agréé au Cameroun depuis 2016
              </span>
            </div>
            <p style={{ fontSize: '.82rem', color: '#4a5568', lineHeight: 1.7, marginBottom: 14, maxWidth: 580 }}>
              Panneaux monocristallins 550Wc, batteries LiFePO4, onduleurs hybrides. Authenticité et garantie constructeur garanties sur tous les produits SAPRES.
            </p>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {['Panneaux 550W', 'Batteries LiFePO4', 'Onduleurs Hybrides', '25 ans Garantie', 'SAV Local'].map((tag) => (
                <span key={tag} style={{ background: '#f0f4e8', color: '#4a8a1a', fontSize: '.64rem', fontWeight: 700, padding: '3px 10px', borderRadius: 14, border: '1px solid rgba(140,198,63,.15)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link href="/produits" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <button className="btn btn-g" style={{ whiteSpace: 'nowrap' }}>Voir les produits →</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
