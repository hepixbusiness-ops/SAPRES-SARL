'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABand from '@/components/home/CTABand'
import RevealWrapper from '@/components/ui/RevealWrapper'

const TIMELINE = [
  { year: '2014', title: 'Fondation de SAPRES SARL', desc: 'Création de la société à Yaoundé avec pour mission de démocratiser l\'énergie solaire au Cameroun.' },
  { year: '2016', title: 'Partenariat Blue Carbon', desc: 'Signature du contrat de distributeur agréé Blue Carbon, fabricant mondial de panneaux solaires premium.' },
  { year: '2018', title: '100 Projets Réalisés', desc: 'Franchissement du cap des 100 installations solaires avec une présence dans 5 régions du Cameroun.' },
  { year: '2020', title: 'Extension Nationale', desc: 'Ouverture de bureaux à Douala et extension dans les régions Nord, Ouest et Littoral.' },
  { year: '2022', title: '1 MW Installé', desc: 'Atteinte d\'un premier mégawatt de capacité solaire installée. Démarrage des projets pompage solaire.' },
  { year: '2024', title: '500 Clients', desc: 'Plus de 500 clients satisfaits, 300 projets livrés, 5 MW de capacité totale installée.' },
]

const TEAM = [
  { initial: '👨‍💼', name: 'Jean-Pierre Foning',  role: 'Directeur Général',          desc: '20 ans d\'expérience en énergie et génie électrique' },
  { initial: '👩‍💻', name: 'Marie Nkomo',         role: 'Directrice Technique',         desc: 'Ingénieure PV certifiée, spécialiste systèmes hybrides' },
  { initial: '👨‍🔧', name: 'Alain Tagne',          role: 'Chef des Opérations',          desc: 'Gestion de plus de 200 projets d\'installation' },
  { initial: '👩‍💼', name: 'Carine Mbida',         role: 'Directrice Commerciale',       desc: 'Développement clients et partenariats institutionnels' },
]

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 320, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="orb orb1" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Notre Histoire</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              À Propos de <span className="hl">SAPRES SARL</span>
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75, maxWidth: 480 }}>
              Depuis 2014, nous bâtissons l&apos;avenir énergétique du Cameroun, une installation solaire à la fois.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="sec">
          <div className="rsp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
            <RevealWrapper>
              <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 4px 24px rgba(30,42,58,.09)', borderTop: '3px solid #8CC63F' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>🎯</div>
                <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8 }}>Notre Mission</h3>
                <p style={{ fontSize: '.87rem', color: '#4a5568', lineHeight: 1.78 }}>
                  Rendre l&apos;énergie solaire accessible à tous les Camerounais — des ménages ruraux aux
                  industries — grâce à des solutions fiables, abordables et durables.
                </p>
              </div>
            </RevealWrapper>
            <RevealWrapper delay={2}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 4px 24px rgba(30,42,58,.09)', borderTop: '3px solid #1E2A3A' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔭</div>
                <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8 }}>Notre Vision</h3>
                <p style={{ fontSize: '.87rem', color: '#4a5568', lineHeight: 1.78 }}>
                  Devenir le partenaire de référence de la transition énergétique en Afrique Centrale,
                  en contribuant à un Cameroun 100% alimenté par les énergies renouvelables.
                </p>
              </div>
            </RevealWrapper>
          </div>

          {/* Timeline */}
          <RevealWrapper><span className="slabel">Notre Parcours</span></RevealWrapper>
          <RevealWrapper delay={1}><h2 className="stitle" style={{ marginBottom: 32 }}>10 ans d&apos;<span className="ac">Innovation Solaire</span></h2></RevealWrapper>

          <div className="tl-wrap">
            {TIMELINE.map((t, i) => (
              <RevealWrapper key={t.year} delay={((i % 3) + 1) as 1|2|3}>
                <div className="tl-item">
                  <div className="tl-year">{t.year}</div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </section>

        {/* Équipe */}
        <section className="sec-dk">
          <RevealWrapper><span className="slabel">L&apos;Équipe</span></RevealWrapper>
          <RevealWrapper delay={1}><h2 className="stitle dtitle" style={{ marginTop: 8 }}>Les <span className="ac">Hommes & Femmes</span> SAPRES</h2></RevealWrapper>
          <RevealWrapper delay={2}><p className="sdesc ddesc">Une équipe d&apos;ingénieurs et de techniciens certifiés, passionnés par l&apos;énergie solaire.</p></RevealWrapper>

          <div className="rsp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 24 }}>
            {TEAM.map((m, i) => (
              <RevealWrapper key={m.name} delay={((i % 4) + 1) as 1|2|3|4}>
                <div style={{ background: '#fff', borderRadius: 20, padding: '20px 15px', textAlign: 'center', boxShadow: '0 4px 24px rgba(30,42,58,.09)', transition: 'transform .29s,box-shadow .29s', border: '1px solid rgba(140,198,63,.05)', cursor: 'default' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(30,42,58,.11)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(30,42,58,.09)' }}
                >
                  <div style={{ width: 55, height: 55, borderRadius: '50%', background: 'linear-gradient(135deg,#8CC63F,#6FAE2E)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.45rem', boxShadow: '0 5px 18px rgba(140,198,63,.22)' }}>
                    {m.initial}
                  </div>
                  <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.82rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 2 }}>{m.name}</h4>
                  <div style={{ fontSize: '.66rem', color: '#6FAE2E', fontWeight: 700, marginBottom: 5 }}>{m.role}</div>
                  <p style={{ fontSize: '.72rem', color: '#4a5568', lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </section>

        {/* Partenariat Blue Carbon */}
        <section className="sec">
          <div className="rsp-flex-col" style={{ background: 'linear-gradient(135deg,#1E2A3A,#162a40,#0a1e30)', border: '1px solid rgba(59,130,246,.18)', borderRadius: 22, padding: 36, display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ width: 80, height: 80, flexShrink: 0, background: 'linear-gradient(135deg,#1e3a5f,#0a1e30)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', border: '2px solid rgba(59,130,246,.2)' }}>
              🔋
            </div>
            <div>
              <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 5 }}>Partenaire Officiel Blue Carbon depuis 2016</h3>
              <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>
                Blue Carbon est l&apos;un des fabricants mondiaux leaders de solutions solaires.
                En tant que distributeur agréé exclusif au Cameroun, SAPRES garantit
                l&apos;authenticité, la qualité et la garantie constructeur sur tous ses produits.
              </p>
              <div style={{ display: 'flex', gap: 7, marginTop: 12, flexWrap: 'wrap' }}>
                {['Panneaux 550W', 'Batteries LiFePO4', 'Onduleurs Hybrides', '25 ans Garantie', 'SAV Local'].map((p) => (
                  <span key={p} style={{ background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.2)', color: '#93c5fd', fontSize: '.66rem', fontWeight: 700, padding: '3px 9px', borderRadius: 14 }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />

      <style>{`
        .tl-wrap { position:relative; padding-left:28px; }
        .tl-wrap::before { content:''; position:absolute; left:8px; top:0; bottom:0; width:2px; background:linear-gradient(180deg,var(--g),rgba(140,198,63,.05)); }
        .tl-item { position:relative; margin-bottom:20px; }
        .tl-item::before { content:''; position:absolute; left:-21px; top:5px; width:11px; height:11px; background:var(--g); border-radius:50%; border:2px solid #fff; box-shadow:0 0 0 3px rgba(140,198,63,.17); }
        .tl-year { font-size:.7rem; font-weight:700; color:var(--g); margin-bottom:2px; }
        .tl-item h4 { font-family:'Raleway',sans-serif; font-size:.85rem; font-weight:700; color:var(--navy); margin-bottom:2px; }
        .tl-item p  { font-size:.76rem; color:var(--tm); line-height:1.54; }
      `}</style>
    </>
  )
}
