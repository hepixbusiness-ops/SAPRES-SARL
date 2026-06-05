'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (hidden) return null

  return (
    <div id="loader" className={hidden ? 'hide' : ''}>

      {/* Vrai logo SAPRES — pulsation douce */}
      <div style={{
        width: 100, height: 100,
        animation: 'ldIn .8s cubic-bezier(.4,0,.2,1) both',
        position: 'relative',
      }}>
        {/* Halo vert animé derrière le logo */}
        <div style={{
          position: 'absolute', inset: -10,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140,198,63,.18) 0%, transparent 70%)',
          animation: 'haloPulse 2s ease-in-out infinite',
        }} />
        <Image
          src="/logo.png"
          alt="SAPRES SARL"
          width={100}
          height={100}
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 18px rgba(140,198,63,.45))',
            animation: 'logoPulse 2s ease-in-out infinite',
          }}
          priority
        />
      </div>

      {/* Barre de chargement */}
      <div className="ld-bar" style={{ marginTop: 20 }}>
        <div className="ld-fill" />
      </div>

      {/* Texte */}
      <p className="ld-txt" style={{ marginTop: 10 }}>SAPRES SARL</p>
      <p style={{ fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(140,198,63,.5)', marginTop: 4 }}>
        Énergie Solaire
      </p>

      <style>{`
        @keyframes ldIn {
          from { opacity:0; transform:scale(.5) rotate(-10deg) }
          to   { opacity:1; transform:scale(1) rotate(0deg) }
        }
        @keyframes logoPulse {
          0%,100% { transform:scale(1);   filter:drop-shadow(0 0 18px rgba(140,198,63,.45)); }
          50%      { transform:scale(1.06); filter:drop-shadow(0 0 28px rgba(140,198,63,.7)); }
        }
        @keyframes haloPulse {
          0%,100% { transform:scale(1);   opacity:.6; }
          50%      { transform:scale(1.3); opacity:1; }
        }
        #loader { transition: opacity .6s, visibility .6s; }
        #loader.hide { opacity:0; visibility:hidden; pointer-events:none; }
      `}</style>
    </div>
  )
}
