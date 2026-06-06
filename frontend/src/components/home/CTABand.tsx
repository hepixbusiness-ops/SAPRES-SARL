import Link from 'next/link'

export default function CTABand() {
  return (
    <section className="cta-band" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Orbes décoratifs animés */}
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.06)', top: -80, left: -60, animation: 'drift 10s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.04)', bottom: -40, right: 80, animation: 'drift 13s ease-in-out infinite 2s', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.07)', top: '30%', right: '15%', animation: 'floatSlow 8s ease-in-out infinite 1s', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Badge animé */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.28)', borderRadius: 50, padding: '4px 14px', marginBottom: 20, animation: 'fadeInUp .6s ease both' }}>
          <div className="icon-pulse" style={{ width: 6, height: 6, background: '#fff', borderRadius: '50%' }} />
          <span style={{ fontSize: '.66rem', fontWeight: 700, color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase' }}>Devis 100% Gratuit</span>
        </div>

        <h2 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#fff', lineHeight: 1.15, marginBottom: 14, letterSpacing: '-.01em', animation: 'fadeInUp .6s ease .1s both' }}>
          Prêt à Passer à l&apos;Énergie Solaire ?
        </h2>
        <p style={{ color: 'rgba(255,255,255,.82)', fontSize: '.9rem', lineHeight: 1.75, marginBottom: 30, animation: 'fadeInUp .6s ease .2s both' }}>
          Obtenez une étude technique gratuite et personnalisée. Un ingénieur SAPRES vous contactera sous 24h.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeInUp .6s ease .3s both' }}>
          <Link href="/devis" style={{ textDecoration: 'none' }}>
            <button className="btn btn-white btn-pulse" style={{ fontSize: '.88rem', padding: '13px 28px' }}>
              ☀️ Demander mon devis
            </button>
          </Link>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost" style={{ fontSize: '.88rem', padding: '13px 28px' }}>
              📞 Nous contacter
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
