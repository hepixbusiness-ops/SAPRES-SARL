import Link from 'next/link'

const SERVICES_LIST = [
  { icon: '🔋', title: 'Stockage d\'Énergie', desc: 'Batteries qui stockent l\'énergie pour la nuit, réduisent les pics de consommation et assurent un backup fiable.' },
  { icon: '🏢', title: 'Systèmes Solaires Commerciaux', desc: 'Installations haute performance pour grands bâtiments, usines et espaces commerciaux.' },
  { icon: '🌐', title: 'Installation de Panneaux Solaires', desc: 'Systèmes sur-mesure conçus pour maximiser la capture solaire, l\'efficacité et la durabilité.' },
  { icon: '💧', title: 'Système de Pompage Solaire', desc: 'Alimentation de forages et systèmes d\'irrigation agricole grâce à l\'énergie solaire, sans groupe électrogène.' },
]

const PHOTO1 = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80'
const PHOTO2 = 'https://images.unsplash.com/photo-1611365892117-bede7a956882?auto=format&fit=crop&w=600&q=80'

export default function ServicesPreview() {
  return (
    <section className="sec-alt" style={{ padding: '72px 48px' }}>
      <div className="svc-split">
        {/* Colonne gauche — Titre + CTA + Photos */}
        <div>
          <span className="slabel">Services</span>
          <h2 className="stitle" style={{ marginTop: 8, marginBottom: 16 }}>
            Des Services d&apos;Énergie Renouvelable pour un Avenir Plus Vert
          </h2>
          <p className="sdesc" style={{ marginBottom: 24 }}>
            De l&apos;installation résidentielle aux centrales industrielles, SAPRES couvre tous vos besoins en énergie solaire avec expertise et garantie.
          </p>
          <Link href="/services" style={{ textDecoration: 'none' }}>
            <button className="btn btn-dark" style={{ marginBottom: 32 }}>Voir tous les services →</button>
          </Link>

          {/* 2 photos empilées */}
          <div className="svc-photos">
            <div className="svc-photo-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTO1} alt="Technicien installation solaire" />
            </div>
            <div className="svc-photo-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTO2} alt="Panneaux solaires installés" />
            </div>
          </div>
        </div>

        {/* Colonne droite — Liste des services */}
        <div className="svc-list">
          {SERVICES_LIST.map((svc) => (
            <Link key={svc.title} href="/services" style={{ textDecoration: 'none' }}>
              <div className="svc-item">
                <div className="svc-item-ico">{svc.icon}</div>
                <div className="svc-item-txt">
                  <h4>{svc.title}</h4>
                  <p>{svc.desc}</p>
                </div>
                <div className="svc-item-arrow">↗</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
