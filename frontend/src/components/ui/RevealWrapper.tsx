'use client'
import { useEffect, useRef } from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: 1 | 2 | 3 | 4 | 5
}

export default function RevealWrapper({ children, className, delay }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback : si l'élément est déjà visible au chargement (notamment mobile)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('show')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('show')
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.08,     // seuil bas : se déclenche très tôt sur mobile
        rootMargin: '0px 0px -20px 0px', // légèrement avant que l'élément soit visible
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={clsx('rv', delay && `d${delay}`, className)}
    >
      {children}
    </div>
  )
}
