'use client'
import { useEffect } from 'react'

export default function ScrollBar() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar')
    if (!bar) return
    const onScroll = () => {
      const scrollTop  = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div id="scroll-bar" />
}
