'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const TYPING_WORDS = ['Ciel', 'Soleil', 'Cameroun', 'Futur']

/* ─── 3 états de l'animation ─── */
const ENERGY_STATES = [
  {
    id: 'sky',
    label: '⚡ Énergie du Ciel',
    color: '#f5c31a',
    labelColor: '#f5c31a',
  },
  {
    id: 'nature',
    label: '🌿 Énergie de la Nature',
    color: '#4ade80',
    labelColor: '#4ade80',
  },
  {
    id: 'sun',
    label: '☀️ Énergie du Soleil',
    color: '#fb923c',
    labelColor: '#fb923c',
  },
]

export default function HeroSection() {
  const [wordIndex, setWordIndex]           = useState(0)
  const [displayed, setDisplayed]           = useState('Ciel')
  const [isDeleting, setIsDeleting]         = useState(false)
  const statsRef                            = useRef<HTMLDivElement>(null)
  const [countersStarted, setCountersStarted] = useState(false)
  const [energyState, setEnergyState]       = useState(0)  // 0 | 1 | 2
  const [visible, setVisible]               = useState(true) // fade control

  /* Typing effect */
  useEffect(() => {
    const word = TYPING_WORDS[wordIndex]
    let t: ReturnType<typeof setTimeout>
    if (!isDeleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 120)
    else if (!isDeleting && displayed.length === word.length)
      t = setTimeout(() => setIsDeleting(true), 1800)
    else if (isDeleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 70)
    else {
      setIsDeleting(false)
      setWordIndex(i => (i + 1) % TYPING_WORDS.length)
    }
    return () => clearTimeout(t)
  }, [displayed, isDeleting, wordIndex])

  /* Compteurs au scroll */
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !countersStarted) {
        setCountersStarted(true)
        document.querySelectorAll<HTMLElement>('.cnt').forEach(el => {
          const to = parseInt(el.dataset.to || '0', 10)
          let cur = 0
          const step = Math.ceil(to / 50)
          const iv = setInterval(() => {
            cur = Math.min(cur + step, to)
            el.textContent = String(cur)
            if (cur >= to) clearInterval(iv)
          }, 30)
        })
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [countersStarted])

  /* Cycle des 3 états — chaque état dure 3 s avec fade-out/fade-in */
  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setEnergyState(s => (s + 1) % 3)
        setVisible(true)
      }, 500) // 0.5 s de fade-out avant de changer
    }, 3500)
    return () => clearInterval(cycle)
  }, [])

  const state = ENERGY_STATES[energyState]

  return (
    <section className="hero">
      <div className="hero-floor" />
      <div className="orb orb1" />
      <div className="orb orb2" />

      {/* Animation énergie cyclique */}
      <EnergyCycleStage stateIndex={energyState} visible={visible} />

      {/* Contenu hero */}
      <div className="hc" style={{ position: 'relative', zIndex: 10, maxWidth: 510 }}>
        <div className="chip">
          <div className="chip-dot" />
          <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            N°1 Énergie Solaire · Partenaire Blue Carbon
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Raleway, sans-serif', fontWeight: 800,
          fontSize: 'clamp(1.9rem,3.3vw,3.2rem)', lineHeight: 1.08,
          color: '#fff', marginBottom: 13,
        }}>
          L&apos;Énergie qui<br />vient du{' '}
          <span style={{
            background: 'linear-gradient(135deg,#8CC63F,#a8d960)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {displayed}
            <span style={{ opacity: 0.7, animation: 'blink 1s step-end infinite' }}>|</span>
          </span>
        </h1>

        <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75, marginBottom: 24 }}>
          SAPRES SARL — installations résidentielles, industrielles et publiques.
          Solutions complètes : panneaux, batteries, lampadaires, pompes solaires.
          Partenaire officiel Blue Carbon.
        </p>

        <div className="hbtns" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          <Link href="/devis">
            <button className="btn btn-g">☀️ Devis Gratuit</button>
          </Link>
          <Link href="/calculateur">
            <button className="btn btn-ghost">📊 Calculer mes économies</button>
          </Link>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="hstats" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { to: 500, suffix: '+', label: 'Clients satisfaits' },
            { to: 300, suffix: '+', label: 'Projets livrés' },
            { to: 5,   suffix: ' MW', label: 'Capacité installée' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: i < 2 ? 0 : 0 }}>
              {i > 0 && <div className="hs-sep" style={{ width: 1, background: 'rgba(255,255,255,.1)', alignSelf: 'stretch', marginRight: 20 }} />}
              <div className="hs">
                <div className="n" style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.65rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                  <span className="cnt" data-to={s.to}>0</span>
                  <em style={{ fontStyle: 'normal', color: '#8CC63F', fontSize: '1rem' }}>{s.suffix}</em>
                </div>
                <div className="l" style={{ fontSize: '.67rem', color: 'rgba(255,255,255,.42)', marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }

        /* Label état énergie */
        .energy-label {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px;
          border-radius: 50px;
          font-size: .72rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          font-family: 'Lato', sans-serif;
          border: 1px solid currentColor;
          transition: opacity .5s, transform .5s;
          transform-origin: left center;
        }
        .energy-label.hidden { opacity: 0; transform: translateY(-6px) scale(.95); }
        .energy-label.shown  { opacity: 1; transform: translateY(0) scale(1); }

        /* Transition du stage */
        .sky-stage { transition: opacity .5s, transform .5s; transform-origin: center center; }
        .sky-stage.hidden { opacity:0; transform: scale(.94) translateY(-50%); }
        .sky-stage.shown  { opacity:1; transform: scale(1) translateY(-50%); }

        /* Mobile : sky-stage sous le texte */
        @media(max-width:768px){
          .sky-stage {
            position: relative !important;
            right: auto !important; top: auto !important;
            transform: none !important;
            width: 100% !important; height: 210px !important;
            margin: 22px auto 0 !important;
            display: flex !important; justify-content: center !important;
          }
          .sky-stage svg { width: 280px !important; height: 210px !important; }
          .sky-stage.hidden { opacity:0; transform: scale(.94) !important; }
          .sky-stage.shown  { opacity:1; transform: scale(1) !important; }
          .hbtns { flex-direction: column !important; }
          .hbtns .btn { width:100% !important; justify-content:center !important; }
          .hc h1 { font-size:1.78rem !important; }
          .hs-sep { display:none !important; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════
   COMPOSANT : animation à 3 états
══════════════════════════════════════════════════════════════ */
function EnergyCycleStage({ stateIndex, visible }: { stateIndex: number; visible: boolean }) {
  const cls = `sky-stage ${visible ? 'shown' : 'hidden'}`
  const labelStyle: React.CSSProperties = {
    position: 'absolute', top: 12, right: 0,
    color: ENERGY_STATES[stateIndex].labelColor,
    background: `${ENERGY_STATES[stateIndex].labelColor}18`,
    borderColor: `${ENERGY_STATES[stateIndex].labelColor}44`,
  }

  return (
    <div className={cls} style={{
      position: 'absolute', right: '3%', top: '50%',
      transform: 'translateY(-50%)',
      width: 420, height: 370,
      pointerEvents: 'none',
    }}>
      {/* Label de l'état actuel */}
      <div
        className={`energy-label ${visible ? 'shown' : 'hidden'}`}
        style={labelStyle}
      >
        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
        {ENERGY_STATES[stateIndex].label}
      </div>

      {stateIndex === 0 && <SkyEnergy />}
      {stateIndex === 1 && <NatureEnergy />}
      {stateIndex === 2 && <SunEnergy />}
    </div>
  )
}

/* ─── État 1 : Énergie du Ciel (animation originale) ─── */
function SkyEnergy() {
  return (
    <svg viewBox="0 0 420 370" width="420" height="370" style={{ overflow: 'visible', marginTop: 28 }}>
      <defs>
        <radialGradient id="sg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe97a"/>
          <stop offset="60%" stopColor="#f5c31a"/>
          <stop offset="100%" stopColor="#d4880a"/>
        </radialGradient>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="bolt1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(245,195,26,0)"/>
          <stop offset="40%"  stopColor="rgba(245,195,26,.82)"/>
          <stop offset="68%"  stopColor="#8CC63F"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>

      {/* Anneaux rotatifs */}
      <circle cx="210" cy="50" r="72" fill="none" stroke="rgba(245,195,26,.1)" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" from="0 210 50" to="360 210 50" dur="18s" repeatCount="indefinite"/>
      </circle>
      <circle cx="210" cy="185" r="135" fill="none" stroke="rgba(140,198,63,.07)" strokeWidth="1">
        <animateTransform attributeName="transform" type="rotate" from="0 210 185" to="360 210 185" dur="22s" repeatCount="indefinite"/>
      </circle>

      {/* Soleil */}
      <circle cx="210" cy="50" r="31" fill="url(#sg1)" filter="url(#glow1)">
        <animate attributeName="r" values="31;36;31" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="210" cy="50" r="52" fill="none" stroke="rgba(245,195,26,.2)" strokeWidth="1.5">
        <animate attributeName="r" values="35;78;35" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".9;0;.9" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="210" cy="50" r="80" fill="none" stroke="rgba(245,195,26,.08)" strokeWidth="1.5">
        <animate attributeName="r" values="52;120;52" dur="2.5s" begin=".7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".9;0;.9" dur="2.5s" begin=".7s" repeatCount="indefinite"/>
      </circle>

      {/* Éclairs */}
      {[{x:150,h:140,d:0,w:3},{x:178,h:172,d:.4,w:2},{x:210,h:190,d:.15,w:4},{x:240,h:158,d:.6,w:2},{x:268,h:135,d:.9,w:3}].map((b,i)=>(
        <line key={i} x1={b.x} y1={82} x2={b.x} y2={82+b.h}
          stroke="url(#bolt1)" strokeWidth={b.w} strokeLinecap="round" opacity="0">
          <animate attributeName="opacity" values="0;1;.8;0" dur="2.4s" begin={`${b.d}s`} repeatCount="indefinite"/>
        </line>
      ))}

      {/* Panneaux au sol */}
      {[{x:118,h:42,d:0},{x:174,h:53,d:.4},{x:230,h:60,d:.15},{x:286,h:50,d:.6},{x:342,h:40,d:.9}].map((p,i)=>(
        <g key={i}>
          <rect x={p.x} y={290-p.h} width={48} height={p.h} rx="5" fill="#0a1c38" stroke="rgba(140,198,63,.2)" strokeWidth="1"/>
          <line x1={p.x+16} y1={290-p.h} x2={p.x+16} y2={290} stroke="rgba(140,198,63,.15)" strokeWidth=".7"/>
          <line x1={p.x+32} y1={290-p.h} x2={p.x+32} y2={290} stroke="rgba(140,198,63,.15)" strokeWidth=".7"/>
          <rect x={p.x} y={290-p.h} width={48} height={p.h} rx="5" fill="rgba(140,198,63,0)">
            <animate attributeName="fill" values="rgba(140,198,63,0);rgba(140,198,63,.36);rgba(140,198,63,0)" dur="2.4s" begin={`${p.d}s`} repeatCount="indefinite"/>
          </rect>
        </g>
      ))}
      <rect x="100" y="290" width="270" height="8" rx="2" fill="#0a2010" opacity=".8"/>

      {/* Particules */}
      {[{cx:130,cy:100,d:0},{cx:300,cy:120,d:1},{cx:150,cy:280,d:2},{cx:360,cy:260,d:3}].map((p,i)=>(
        <circle key={i} cx={p.cx} cy={p.cy} r="4" fill="#8CC63F">
          <animate attributeName="cy" values={`${p.cy};${p.cy-17};${p.cy}`} dur="5s" begin={`${p.d}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".5;1;.5" dur="5s" begin={`${p.d}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  )
}

/* ─── État 2 : Énergie de la Nature ─── */
function NatureEnergy() {
  return (
    <svg viewBox="0 0 420 370" width="420" height="370" style={{ overflow: 'visible', marginTop: 28 }}>
      <defs>
        <radialGradient id="ng2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#86efac"/>
          <stop offset="60%" stopColor="#4ade80"/>
          <stop offset="100%" stopColor="#16a34a"/>
        </radialGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ondes organiques */}
      {[1,2,3].map((n,i)=>(
        <ellipse key={i} cx="210" cy="185" rx={60+i*55} ry={30+i*22}
          fill="none" stroke={`rgba(74,222,128,${.18-i*.04})`} strokeWidth="1.5">
          <animate attributeName="rx" values={`${60+i*55};${80+i*55};${60+i*55}`} dur={`${4+i}s`} repeatCount="indefinite"/>
          <animate attributeName="ry" values={`${30+i*22};${45+i*22};${30+i*22}`} dur={`${4+i}s`} repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="rotate"
            from={`${i%2===0?0:360} 210 185`} to={`${i%2===0?360:0} 210 185`}
            dur={`${14+i*6}s`} repeatCount="indefinite"/>
        </ellipse>
      ))}

      {/* Noyau nature — cercle lumineux vert */}
      <circle cx="210" cy="185" r="38" fill="url(#ng2)" filter="url(#glow2)">
        <animate attributeName="r" values="38;44;38" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      {/* Symbole feuille simplifié */}
      <path d="M210,165 C225,168 232,182 210,205 C188,182 195,168 210,165 Z"
        fill="rgba(0,40,10,.55)" stroke="rgba(134,239,172,.6)" strokeWidth="1"/>
      <line x1="210" y1="165" x2="210" y2="205" stroke="rgba(134,239,172,.4)" strokeWidth="1"/>

      {/* Feuilles animées flottantes */}
      {[
        {x:120,y:120,rot:25,d:0},{x:310,y:95,rot:-30,d:1.2},
        {x:90, y:240,rot:45,d:2},{x:340,y:260,rot:-20,d:.6},
        {x:170,y:60, rot:15,d:1.8},{x:280,y:310,rot:-40,d:.9},
      ].map((f,i)=>(
        <g key={i}>
          <g transform={`translate(${f.x},${f.y}) rotate(${f.rot})`}>
            <path d="M0,-10 C6,-4 8,6 0,14 C-8,6 -6,-4 0,-10 Z" fill="rgba(74,222,128,.55)" stroke="rgba(134,239,172,.3)" strokeWidth=".7"/>
            <line x1="0" y1="-10" x2="0" y2="14" stroke="rgba(134,239,172,.3)" strokeWidth=".6"/>
            <animateTransform attributeName="transform" type="translate"
              values={`0,0;${Math.sin(i)*8},${-12-i*2};0,0`}
              dur={`${5+i*.7}s`} begin={`${f.d}s`} additive="sum" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate"
              values={`${f.rot};${f.rot+8};${f.rot}`}
              dur={`${5+i*.7}s`} begin={`${f.d}s`} repeatCount="indefinite"/>
          </g>
        </g>
      ))}

      {/* Particules vertes montantes */}
      {[{cx:148,cy:300,d:0},{cx:195,cy:320,d:.8},{cx:240,cy:308,d:1.6},{cx:290,cy:295,d:.4},{cx:335,cy:315,d:2}].map((p,i)=>(
        <circle key={i} cx={p.cx} cy={p.cy} r={3+i%2} fill="#4ade80" opacity=".7">
          <animate attributeName="cy" values={`${p.cy};${p.cy-180};${p.cy-180}`} dur={`${6+i}s`} begin={`${p.d}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;.8;0" dur={`${6+i}s`} begin={`${p.d}s`} repeatCount="indefinite"/>
          <animate attributeName="r" values={`${3+i%2};1;1`} dur={`${6+i}s`} begin={`${p.d}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Sol herbe */}
      <path d="M90,310 Q210,295 370,310 L370,330 Q210,320 90,330 Z" fill="#052210" opacity=".7"/>
    </svg>
  )
}

/* ─── État 3 : Énergie du Soleil ─── */
function SunEnergy() {
  return (
    <svg viewBox="0 0 420 370" width="420" height="370" style={{ overflow: 'visible', marginTop: 28 }}>
      <defs>
        <radialGradient id="sg3" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff7d6"/>
          <stop offset="30%"  stopColor="#fde68a"/>
          <stop offset="70%"  stopColor="#fb923c"/>
          <stop offset="100%" stopColor="#c2410c"/>
        </radialGradient>
        <radialGradient id="corona3" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(253,230,138,.28)"/>
          <stop offset="100%" stopColor="rgba(251,146,60,0)"/>
        </radialGradient>
        <filter id="glow3">
          <feGaussianBlur stdDeviation="8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Couronne lumineuse expansive */}
      {[1,2,3].map((_,i)=>(
        <circle key={i} cx="210" cy="160" r={70+i*50} fill="url(#corona3)" opacity=".5">
          <animate attributeName="r" values={`${70+i*50};${90+i*60};${70+i*50}`} dur={`${3+i*.8}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".5;.15;.5" dur={`${3+i*.8}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Rayons solaires — 12 rayons */}
      {Array.from({length:12},(_,i)=>{
        const angle = (i/12)*360
        const r1=54, r2=88+i%3*14
        const rad=(a:number)=>a*Math.PI/180
        return (
          <line key={i}
            x1={210+r1*Math.cos(rad(angle))} y1={160+r1*Math.sin(rad(angle))}
            x2={210+r2*Math.cos(rad(angle))} y2={160+r2*Math.sin(rad(angle))}
            stroke={`rgba(251,146,60,${.7-i%3*.15})`} strokeWidth={3-i%2} strokeLinecap="round">
            <animate attributeName="x2"
              values={`${210+r2*Math.cos(rad(angle))};${210+(r2+20)*Math.cos(rad(angle))};${210+r2*Math.cos(rad(angle))}`}
              dur={`${2.2+i*.12}s`} repeatCount="indefinite"/>
            <animate attributeName="y2"
              values={`${160+r2*Math.sin(rad(angle))};${160+(r2+20)*Math.sin(rad(angle))};${160+r2*Math.sin(rad(angle))}`}
              dur={`${2.2+i*.12}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;.4;1" dur={`${1.6+i*.1}s`} repeatCount="indefinite"/>
          </line>
        )
      })}

      {/* Soleil central — très lumineux */}
      <circle cx="210" cy="160" r="46" fill="url(#sg3)" filter="url(#glow3)">
        <animate attributeName="r" values="46;52;46" dur="2.8s" repeatCount="indefinite"/>
      </circle>
      {/* Cœur blanc éblouissant */}
      <circle cx="210" cy="160" r="24" fill="rgba(255,255,255,.85)">
        <animate attributeName="r" values="24;28;24" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".85;.55;.85" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Chaleur ondulante — lignes de chaleur */}
      {[{x:140,d:0},{x:185,d:.6},{x:235,d:1.1},{x:280,d:.3}].map((h,i)=>(
        <path key={i}
          d={`M${h.x},310 Q${h.x+8},280 ${h.x},250 Q${h.x-8},220 ${h.x},190`}
          fill="none" stroke="rgba(251,146,60,.25)" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="d"
            values={`M${h.x},310 Q${h.x+8},280 ${h.x},250 Q${h.x-8},220 ${h.x},190;M${h.x},310 Q${h.x-8},280 ${h.x},250 Q${h.x+8},220 ${h.x},190;M${h.x},310 Q${h.x+8},280 ${h.x},250 Q${h.x-8},220 ${h.x},190`}
            dur={`${3+i*.5}s`} begin={`${h.d}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;.7;0" dur={`${3+i*.5}s`} begin={`${h.d}s`} repeatCount="indefinite"/>
        </path>
      ))}

      {/* Étincelles dorées */}
      {[
        {cx:140,cy:260,d:0},{cx:290,cy:240,d:.9},{cx:165,cy:310,d:1.7},
        {cx:320,cy:300,d:.4},{cx:110,cy:185,d:2.1},{cx:350,cy:175,d:1.2},
      ].map((s,i)=>(
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r="3" fill="#fde68a">
            <animate attributeName="cy" values={`${s.cy};${s.cy-22};${s.cy}`} dur={`${4+i*.4}s`} begin={`${s.d}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur={`${4+i*.4}s`} begin={`${s.d}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values="3;1.5;3" dur={`${4+i*.4}s`} begin={`${s.d}s`} repeatCount="indefinite"/>
          </circle>
          {/* Petite croix scintillante */}
          <line x1={s.cx-5} y1={s.cy} x2={s.cx+5} y2={s.cy} stroke="#fde68a" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;.8;0" dur={`${4+i*.4}s`} begin={`${s.d+.1}s`} repeatCount="indefinite"/>
          </line>
          <line x1={s.cx} y1={s.cy-5} x2={s.cx} y2={s.cy+5} stroke="#fde68a" strokeWidth="1" opacity="0">
            <animate attributeName="opacity" values="0;.8;0" dur={`${4+i*.4}s`} begin={`${s.d+.1}s`} repeatCount="indefinite"/>
          </line>
        </g>
      ))}

      {/* Sol chaud */}
      <path d="M90,310 Q210,300 370,310 L370,330 Q210,325 90,330 Z" fill="#2a1005" opacity=".6"/>
    </svg>
  )
}
