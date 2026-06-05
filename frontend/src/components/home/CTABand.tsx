import Link from 'next/link'

export default function CTABand() {
  return (
    <section className="cta-band">
      <h2 style={{
        fontFamily: 'Raleway, sans-serif',
        fontSize: '2rem', fontWeight: 800,
        color: '#fff', marginBottom: 8,
        position: 'relative',
      }}>
        Passez au Solaire Aujourd&apos;hui
      </h2>
      <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.88rem', marginBottom: 24, position: 'relative' }}>
        Devis gratuit sous 24h · Étude technique offerte · Installation clé-en-main
      </p>
      <div className="cta-btns" style={{ display: 'flex', gap: 10, justifyContent: 'center', position: 'relative', flexWrap: 'wrap' }}>
        <Link href="/devis">
          <button className="btn-white">☀️ Devis Gratuit</button>
        </Link>
        <Link href="/contact">
          <button className="btn btn-ghost" style={{ background: 'rgba(255,255,255,.15)' }}>
            📞 Nous Contacter
          </button>
        </Link>
      </div>

      {/* Fond décoratif points */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='3' fill='rgba(255,255,255,.04)'/%3E%3C/svg%3E\")",
        pointerEvents: 'none',
      }} />

      <style>{`
        @media(max-width:768px){
          .cta-btns { flex-direction:column !important; align-items:center !important; }
          .cta-btns a { width:100%; max-width:300px; }
          .cta-btns .btn,.cta-btns .btn-white { width:100%; justify-content:center; }
        }
      `}</style>
    </section>
  )
}
