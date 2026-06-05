'use client'
import { useEffect, useRef } from 'react'
import RevealWrapper from '@/components/ui/RevealWrapper'

const WHY_ITEMS = [
  { icon: '🏆', title: 'Partenaire Blue Carbon Certifié',   desc: 'Distributeur officiel agréé. Produits authentiques avec garantie fabricant.', pct: 100 },
  { icon: '⚡', title: 'Installation Rapide & Propre',      desc: 'Équipe technique certifiée. Installation en 1 à 3 jours selon la taille du projet.', pct: 95 },
  { icon: '🔒', title: 'Garantie 25 ans Panneaux',          desc: 'Garantie constructeur sur tous les panneaux Blue Carbon. SAV local réactif.', pct: 98 },
  { icon: '💰', title: 'Financement jusqu\'à 24 mois',       desc: 'Facilités de paiement pour particuliers et entreprises. Sans frais cachés.', pct: 85 },
  { icon: '🌍', title: 'Couverture Nationale',              desc: 'Présent dans les 10 régions du Cameroun. Douala, Yaoundé et villes secondaires.', pct: 90 },
  { icon: '📞', title: 'Support 24h/7j',                   desc: 'Assistance technique disponible à tout moment. Intervention sous 48h.', pct: 92 },
]

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)

  // Déclenche l'animation des barres quand la section entre dans le viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('[data-width]').forEach((bar) => {
            bar.style.width = bar.dataset.width || '0%'
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="sec-dk">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr',
        gap: 42,
        alignItems: 'start',
      }}>
        {/* Colonne gauche — texte */}
        <div>
          <RevealWrapper>
            <span className="slabel">Pourquoi SAPRES ?</span>
          </RevealWrapper>
          <RevealWrapper delay={1}>
            <h2 className="stitle dtitle" style={{ marginTop: 8 }}>
              La Référence Solaire <span className="ac">au Cameroun</span>
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={2}>
            <p className="sdesc ddesc" style={{ marginBottom: 32 }}>
              Depuis plus de 10 ans, SAPRES SARL accompagne particuliers, entreprises et
              collectivités dans leur transition énergétique solaire.
            </p>
          </RevealWrapper>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {WHY_ITEMS.map((item, i) => (
              <RevealWrapper key={item.title} delay={((i % 3) + 1) as 1|2|3}>
                <div className="why-item">
                  <div className="why-ico">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    {/* Barre de progression */}
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.65rem', color: 'rgba(255,255,255,.38)', marginBottom: 3 }}>
                        <span>Performance</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div style={{ height: 3, background: 'rgba(140,198,63,.1)', borderRadius: 2, overflow: 'hidden' }}>
                        <div
                          data-width={`${item.pct}%`}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg,#8CC63F,#a8d960)',
                            borderRadius: 2,
                            width: '0%',
                            transition: 'width 1.2s cubic-bezier(.4,0,.2,1)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Colonne droite — Trophy 3D card */}
        <RevealWrapper delay={2}>
          <div style={{ perspective: 700, display: 'flex', justifyContent: 'center', padding: 14 }}>
            <div style={{
              transformStyle: 'preserve-3d',
              animation: 'trS 14s ease-in-out infinite',
            }}>
              <div style={{
                width: 265,
                background: 'linear-gradient(135deg,rgba(30,42,58,.96),rgba(13,21,32,.98))',
                border: '1px solid rgba(140,198,63,.18)',
                borderRadius: 22,
                padding: '30px 22px',
                textAlign: 'center',
                boxShadow: '0 36px 70px rgba(0,0,0,.36)',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: 11 }}>☀️</div>
                <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.98rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  Partenaire Blue Carbon
                </h3>
                <p style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.38)' }}>
                  Distributeur Agréé Officiel — Cameroun
                </p>

                <div className="eline" style={{ margin: '14px 0' }} />

                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', marginTop: 13 }}>
                  {['Panneaux 550W', 'LiFePO4', 'Onduleur Hybride', '25 ans Garantie'].map((p) => (
                    <span key={p} style={{
                      background: 'rgba(140,198,63,.12)',
                      border: '1px solid rgba(140,198,63,.17)',
                      color: '#a8d960',
                      fontSize: '.65rem', fontWeight: 700,
                      padding: '3px 9px', borderRadius: 15,
                    }}>
                      {p}
                    </span>
                  ))}
                </div>

                <div style={{
                  marginTop: 20,
                  background: 'rgba(140,198,63,.08)',
                  border: '1px solid rgba(140,198,63,.15)',
                  borderRadius: 12,
                  padding: '12px 16px',
                }}>
                  <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>Économies estimées</div>
                  <div style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#8CC63F' }}>
                    70%
                  </div>
                  <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)' }}>sur votre facture ENEO</div>
                </div>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>

      <style>{`
        @keyframes trS {
          0%,100% { transform:rotateY(-13deg) rotateX(5deg) }
          50%      { transform:rotateY(13deg) rotateX(-4deg) }
        }
        .why-item { display:flex; gap:12px; padding:12px; border-radius:11px; border:1px solid rgba(255,255,255,.04); transition:all .28s; }
        .why-item:hover { background:rgba(140,198,63,.07); transform:translateX(6px); border-color:rgba(140,198,63,.18); }
        .why-ico { width:44px; height:44px; border-radius:10px; background:rgba(140,198,63,.12); border:1px solid rgba(140,198,63,.16); display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0; }
        .why-item h4 { font-family:'Raleway',sans-serif; font-size:.85rem; font-weight:700; color:#fff; margin-bottom:2px; }
        .why-item p  { font-size:.77rem; color:rgba(255,255,255,.44); line-height:1.6; }
        @media(max-width:768px){
          [style*="1fr 1.3fr"] { grid-template-columns:1fr !important; }
          /* Trophy 3D card : visible sur mobile, juste plus petite */
          [style*="perspective:700"] { display:flex !important; }
          [style*="width:265"] { width:220px !important; }
        }
      `}</style>
    </section>
  )
}
