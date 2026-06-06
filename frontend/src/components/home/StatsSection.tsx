'use client'
import { useEffect, useRef, useState } from 'react'
import { homepageApi } from '@/lib/api'

interface StatDef { to: number; suffix: string; label: string; icon: string }

const FALLBACK: StatDef[] = [
  { to: 500,  suffix: '+',    label: 'Clients Satisfaits',  icon: '😊' },
  { to: 5,    suffix: ' MW',  label: 'Capacité Installée',  icon: '⚡' },
  { to: 70,   suffix: '%',    label: 'Économies sur ENEO',  icon: '💰' },
  { to: 25,   suffix: ' ans', label: 'Garantie Produits',   icon: '🛡️' },
]

function useCount(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / 50)
    const t = setInterval(() => {
      start = Math.min(start + step, target)
      setVal(start)
      if (start >= target) clearInterval(t)
    }, 24)
    return () => clearInterval(t)
  }, [target, active])
  return val
}

function StatCard({ stat, active }: { stat: StatDef; active: boolean }) {
  const val = useCount(stat.to, active)
  return (
    <div className="stat-light">
      <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{stat.icon}</div>
      <div className="n">{val}<span className="u">{stat.suffix}</span></div>
      <div className="l">{stat.label}</div>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [stats,  setStats]  = useState<StatDef[]>(FALLBACK)

  // Charger depuis GET /homepage (Module 11)
  useEffect(() => {
    homepageApi.get()
      .then((res) => {
        const s = res.data.data?.statistics
        if (!s) return
        setStats([
          { to: s.happyClients,        suffix: '+',    label: 'Clients Satisfaits', icon: '😊' },
          { to: s.installedCapacityMW, suffix: ' MW',  label: 'Capacité Installée', icon: '⚡' },
          { to: 70,                    suffix: '%',    label: 'Économies sur ENEO', icon: '💰' },
          { to: s.yearsExperience,     suffix: ' ans', label: 'Années d\'Expérience', icon: '🛡️' },
        ])
      })
      .catch(() => {/* fallback déjà défini */})
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="sec" style={{ padding: '56px 48px', borderTop: '1px solid rgba(0,0,0,.06)', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
      <div ref={ref} className="rsp-grid-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, maxWidth: 1080, margin: '0 auto' }}>
        {stats.map((s) => <StatCard key={s.label} stat={s} active={active} />)}
      </div>
    </section>
  )
}
