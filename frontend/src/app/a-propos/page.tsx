'use client'
import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABand from '@/components/home/CTABand'
import { partnersApi, certificationsApi } from '@/lib/api'
import type { Partner, Certification } from '@/types'

const TIMELINE = [
  { year:'2014', title:'Fondation de SAPRES SARL', desc:'Création de la société à Yaoundé avec pour mission de démocratiser l\'énergie solaire au Cameroun.' },
  { year:'2016', title:'Partenariat Blue Carbon',   desc:'Signature du contrat de distributeur agréé Blue Carbon, fabricant mondial de panneaux solaires premium.' },
  { year:'2018', title:'100 Projets Réalisés',       desc:'Franchissement du cap des 100 installations solaires avec une présence dans 5 régions du Cameroun.' },
  { year:'2020', title:'Extension Nationale',        desc:'Ouverture de bureaux à Douala et extension dans les régions Nord, Ouest et Littoral.' },
  { year:'2022', title:'1 MW Installé',              desc:'Atteinte d\'un premier mégawatt de capacité solaire installée. Démarrage des projets pompage solaire.' },
  { year:'2024', title:'500 Clients',                desc:'Plus de 500 clients satisfaits, 300 projets livrés, 5 MW de capacité totale installée.' },
]

const TEAM = [
  { initial:'👨‍💼', name:'Jean-Pierre Foning', role:'Directeur Général',         desc:'20 ans d\'expérience en énergie et génie électrique' },
  { initial:'👩‍💻', name:'Marie Nkomo',        role:'Directrice Technique',        desc:'Ingénieure PV certifiée, spécialiste systèmes hybrides' },
  { initial:'👨‍🔧', name:'Alain Tagne',         role:'Chef des Opérations',         desc:'Gestion de plus de 200 projets d\'installation' },
  { initial:'👩‍💼', name:'Carine Mbida',        role:'Directrice Commerciale',      desc:'Développement clients et partenariats institutionnels' },
]

export default function AProposPage() {
  const [partners,       setPartners]       = useState<Partner[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])

  // Module 12 — GET /partners & GET /certifications
  useEffect(() => {
    partnersApi.getAll()
      .then((res) => setPartners(res.data.data || []))
      .catch(() => {})
    certificationsApi.getAll()
      .then((res) => setCertifications(res.data.data || []))
      .catch(() => {})
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ paddingTop:100, paddingBottom:56, padding:'100px 48px 56px', background:'#fff' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <span className="slabel">Notre Histoire</span>
            <h1 className="stitle" style={{ fontSize:'clamp(2rem,4vw,3rem)', marginTop:8 }}>
              À Propos de <span className="ac">SAPRES SARL</span>
            </h1>
            <p className="sdesc">Depuis 2014, nous bâtissons l&apos;avenir énergétique du Cameroun, une installation solaire à la fois.</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="sec-alt" style={{ padding:'56px 48px' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <div className="rsp-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:48 }}>
              <div style={{ background:'#fff', borderRadius:20, padding:32, boxShadow:'0 2px 12px rgba(0,0,0,.06)', border:'1px solid rgba(0,0,0,.07)', borderTop:'3px solid #8CC63F' }}>
                <div style={{ fontSize:'2rem', marginBottom:12 }}>🎯</div>
                <h3 style={{ fontFamily:'Raleway,sans-serif', fontSize:'1.1rem', fontWeight:800, color:'#1E2A3A', marginBottom:8 }}>Notre Mission</h3>
                <p style={{ fontSize:'.87rem', color:'#4a5568', lineHeight:1.78 }}>Rendre l&apos;énergie solaire accessible à tous les Camerounais — des ménages ruraux aux industries — grâce à des solutions fiables, abordables et durables.</p>
              </div>
              <div style={{ background:'#fff', borderRadius:20, padding:32, boxShadow:'0 2px 12px rgba(0,0,0,.06)', border:'1px solid rgba(0,0,0,.07)', borderTop:'3px solid #1E2A3A' }}>
                <div style={{ fontSize:'2rem', marginBottom:12 }}>🔭</div>
                <h3 style={{ fontFamily:'Raleway,sans-serif', fontSize:'1.1rem', fontWeight:800, color:'#1E2A3A', marginBottom:8 }}>Notre Vision</h3>
                <p style={{ fontSize:'.87rem', color:'#4a5568', lineHeight:1.78 }}>Devenir le partenaire de référence de la transition énergétique en Afrique Centrale, en contribuant à un Cameroun 100% alimenté par les énergies renouvelables.</p>
              </div>
            </div>

            {/* Timeline */}
            <span className="slabel">Notre Parcours</span>
            <h2 className="stitle" style={{ marginBottom:28, marginTop:8 }}>10 ans d&apos;<span className="ac">Innovation Solaire</span></h2>
            <div className="tl-wrap">
              {TIMELINE.map((t) => (
                <div key={t.year} className="tl-item">
                  <div style={{ fontSize:'.7rem', fontWeight:700, color:'#8CC63F', marginBottom:2 }}>{t.year}</div>
                  <h4 style={{ fontFamily:'Raleway,sans-serif', fontSize:'.85rem', fontWeight:700, color:'#1E2A3A', marginBottom:2 }}>{t.title}</h4>
                  <p style={{ fontSize:'.76rem', color:'#4a5568', lineHeight:1.54 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="sec" style={{ padding:'56px 48px' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <span className="slabel">L&apos;Équipe</span>
            <h2 className="stitle" style={{ marginTop:8, marginBottom:28 }}>Les <span className="ac">Hommes & Femmes</span> SAPRES</h2>
            <div className="rsp-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
              {TEAM.map(m => (
                <div key={m.name} style={{ background:'#fff', borderRadius:20, padding:'22px 16px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,.06)', border:'1px solid rgba(0,0,0,.07)', transition:'transform .28s,box-shadow .28s', cursor:'default' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-5px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 12px 36px rgba(0,0,0,.11)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow='0 2px 12px rgba(0,0,0,.06)' }}>
                  <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#8CC63F,#6FAE2E)', margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.45rem', boxShadow:'0 4px 14px rgba(140,198,63,.22)' }}>{m.initial}</div>
                  <h4 style={{ fontFamily:'Raleway,sans-serif', fontSize:'.82rem', fontWeight:700, color:'#1E2A3A', marginBottom:2 }}>{m.name}</h4>
                  <div style={{ fontSize:'.66rem', color:'#6FAE2E', fontWeight:700, marginBottom:5 }}>{m.role}</div>
                  <p style={{ fontSize:'.72rem', color:'#4a5568', lineHeight:1.5 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partenaires — GET /partners */}
        {partners.length > 0 && (
          <section className="sec-alt" style={{ padding:'48px 48px' }}>
            <div style={{ maxWidth:1080, margin:'0 auto' }}>
              <span className="slabel">Partenaires</span>
              <h2 className="stitle" style={{ marginTop:8, marginBottom:28 }}>Nos <span className="ac">Partenaires</span></h2>
              <div style={{ display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center' }}>
                {partners.map(p => (
                  <a key={p._id} href={p.website || '#'} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'18px 24px', background:'#fff', borderRadius:16, border:'1px solid rgba(0,0,0,.07)', boxShadow:'0 2px 12px rgba(0,0,0,.05)', textDecoration:'none', minWidth:130, transition:'transform .28s' }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform='translateY(-4px)'}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform=''}>
                    {p.logo?.secureUrl
                      ? <img src={p.logo.secureUrl} alt={p.name} style={{ height:48, objectFit:'contain' }} />
                      : <div style={{ width:48, height:48, background:'#f0f4e8', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem' }}>🤝</div>}
                    <span style={{ fontSize:'.73rem', fontWeight:700, color:'#1E2A3A', textAlign:'center' }}>{p.name}</span>
                    <span style={{ fontSize:'.62rem', color:'#8CC63F', fontWeight:700 }}>{p.type}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications — GET /certifications */}
        {certifications.length > 0 && (
          <section className="sec" style={{ padding:'48px 48px' }}>
            <div style={{ maxWidth:1080, margin:'0 auto' }}>
              <span className="slabel">Qualité & Confiance</span>
              <h2 className="stitle" style={{ marginTop:8, marginBottom:28 }}>Nos <span className="ac">Certifications</span></h2>
              <div className="rsp-grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
                {certifications.map(c => (
                  <div key={c._id} style={{ background:'#fff', borderRadius:16, padding:20, border:'1px solid rgba(0,0,0,.07)', boxShadow:'0 2px 12px rgba(0,0,0,.05)' }}>
                    {c.certificateImage?.secureUrl
                      ? <img src={c.certificateImage.secureUrl} alt={c.name} style={{ width:'100%', height:100, objectFit:'contain', marginBottom:12 }} />
                      : <div style={{ height:60, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', marginBottom:12 }}>🏆</div>}
                    <h4 style={{ fontFamily:'Raleway,sans-serif', fontSize:'.84rem', fontWeight:700, color:'#1E2A3A', marginBottom:4 }}>{c.name}</h4>
                    <p style={{ fontSize:'.72rem', color:'#4a5568', marginBottom:6 }}>{c.issuingOrganization}</p>
                    <span style={{ fontSize:'.62rem', color: c.status === 'active' ? '#6FAE2E' : '#EF4444', fontWeight:700 }}>
                      {c.status === 'active' ? '✓ Valide' : '⚠ Expiré'} · {new Date(c.expiryDate).getFullYear()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blue Carbon */}
        <section className="sec-alt" style={{ padding:'48px 48px' }}>
          <div style={{ maxWidth:1080, margin:'0 auto' }}>
            <div className="rsp-flex-col" style={{ display:'flex', alignItems:'center', gap:28, background:'#1E2A3A', borderRadius:24, padding:'28px 32px', border:'1px solid rgba(140,198,63,.12)' }}>
              <div style={{ width:72, height:72, flexShrink:0, background:'linear-gradient(135deg,#2d3f52,#1E2A3A)', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', border:'2px solid rgba(140,198,63,.2)' }}>🔋</div>
              <div>
                <h3 style={{ fontFamily:'Raleway,sans-serif', fontSize:'1.05rem', fontWeight:800, color:'#fff', marginBottom:6 }}>Partenaire Officiel Blue Carbon depuis 2016</h3>
                <p style={{ fontSize:'.82rem', color:'rgba(255,255,255,.55)', lineHeight:1.7, marginBottom:12 }}>Blue Carbon est l&apos;un des fabricants mondiaux leaders de solutions solaires. En tant que distributeur agréé exclusif au Cameroun, SAPRES garantit l&apos;authenticité, la qualité et la garantie constructeur sur tous ses produits.</p>
                <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                  {['Panneaux 550W','Batteries LiFePO4','Onduleurs Hybrides','25 ans Garantie','SAV Local'].map(tag => (
                    <span key={tag} style={{ background:'rgba(140,198,63,.12)', border:'1px solid rgba(140,198,63,.2)', color:'#a8d960', fontSize:'.64rem', fontWeight:700, padding:'3px 9px', borderRadius:14 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  )
}
