import Link from 'next/link'
import RevealWrapper from '@/components/ui/RevealWrapper'

const SERVICES = [
  { icon: '🏠', title: 'Installation Résidentielle',  desc: 'Systèmes solaires sur mesure pour maisons. Panneaux Blue Carbon 450Wc + batteries LiFePO4 + onduleur hybride.',   tag: 'Dès 1,5M FCFA' },
  { icon: '🏢', title: 'Installation Commerciale',    desc: 'Solutions pour commerces, bureaux et centres commerciaux. Autonomie totale et réduction de facture.',                tag: 'ROI 2-3 ans'   },
  { icon: '🏭', title: 'Solutions Industrielles',     desc: 'Centrales PV de 5 kWc à 1 MWc. Financement disponible jusqu\'à 24 mois.',                                            tag: 'Financement dispo' },
  { icon: '🔧', title: 'Maintenance & Réparation',    desc: 'Contrats de maintenance préventive et corrective. Audits énergétiques annuels.',                                      tag: 'Cameroun entier' },
  { icon: '📊', title: 'Audit Énergétique',           desc: 'Analyse complète de votre consommation. Rapport personnalisé et recommandations chiffrées.',                         tag: '100% Gratuit'  },
  { icon: '🎯', title: 'Conseil Solaire',             desc: 'Accompagnement personnalisé dans le choix et la conception de votre système solaire.',                               tag: 'Sur mesure'    },
  { icon: '⚙️', title: 'Conception Personnalisée',   desc: 'Études techniques et plans sur mesure pour projets spéciaux ou zones isolées.',                                       tag: 'Ingénierie'    },
]

export default function ServicesPreview() {
  return (
    <section className="sec">
      <RevealWrapper>
        <span className="slabel">Nos Services</span>
      </RevealWrapper>
      <RevealWrapper delay={1}>
        <h2 className="stitle">
          Tout ce que Nous <span className="ac">Proposons</span>
        </h2>
      </RevealWrapper>
      <RevealWrapper delay={2}>
        <p className="sdesc">
          De l&apos;installation résidentielle aux projets industriels, SAPRES SARL couvre
          tous vos besoins en énergie solaire au Cameroun.
        </p>
      </RevealWrapper>

      <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24 }}>
        {SERVICES.map((s, i) => (
          <RevealWrapper key={s.title} delay={((i % 3) + 1) as 1|2|3}>
            <div className="card" style={{ padding: '22px 18px' }}>
              <div className="card-ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="tag">{s.tag}</span>
              {i < 3 && (
                <Link href="/devis">
                  <button className="btn btn-g" style={{ marginTop: 12, fontSize: '.75rem', padding: '8px 16px' }}>
                    Devis →
                  </button>
                </Link>
              )}
              <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
          </RevealWrapper>
        ))}
      </div>

      <style>{`
        .card-ico { width:46px; height:46px; background:rgba(140,198,63,.1); border:1px solid rgba(140,198,63,.15); border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; margin-bottom:13px; transition:transform .25s; }
        .card:hover .card-ico { transform:scale(1.1) rotate(-4deg); }
        .card h3 { font-family:'Raleway',sans-serif; font-size:.9rem; font-weight:700; color:var(--navy); margin-bottom:6px; }
        .card p  { font-size:.78rem; color:var(--tm); line-height:1.7; }
        .card-num { position:absolute; top:14px; right:14px; font-family:'Raleway',sans-serif; font-size:1.8rem; font-weight:800; color:rgba(140,198,63,.07); line-height:1; }
        .tag { display:inline-block; margin-top:10px; background:rgba(140,198,63,.08); color:var(--gd); font-size:.65rem; font-weight:700; padding:2px 9px; border-radius:16px; }
      `}</style>
    </section>
  )
}
