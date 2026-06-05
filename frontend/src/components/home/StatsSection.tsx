'use client'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { to: 500, suffix: '+',    label: 'Clients Satisfaits'  },
  { to: 300, suffix: '+',    label: 'Projets Réalisés'    },
  { to: 10,  suffix: ' MW',  label: 'Capacité Installée'  },
  { to: 10,  suffix: ' ans', label: "Années d'Expérience" },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [values, setValues] = useState(STATS.map(() => 0))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          STATS.forEach((s, i) => {
            let current = 0
            const step = Math.ceil(s.to / 60)
            const interval = setInterval(() => {
              current = Math.min(current + step, s.to)
              setValues((prev) => prev.map((v, j) => (j === i ? current : v)))
              if (current >= s.to) clearInterval(interval)
            }, 25)
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  return (
    <section className="sec-gr">
      <div ref={ref} className="rsp-grid-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
        {STATS.map((s, i) => (
          <div key={s.label} className="stat">
            <div className="n" style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '2.65rem', fontWeight: 800,
              color: '#fff', lineHeight: 1,
              marginBottom: 6,
            }}>
              {values[i]}{s.suffix}
            </div>
            <div className="l" style={{
              fontSize: '.77rem', fontWeight: 500,
              color: 'rgba(255,255,255,.66)',
              letterSpacing: '.04em',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
