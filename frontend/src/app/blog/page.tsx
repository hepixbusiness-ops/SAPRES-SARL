'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { blogsApi } from '@/lib/api'
import type { Blog } from '@/types'

const CATS = ['Tous', 'Solar Guides', 'Company News', 'Energy Tips', 'Product Updates', 'Installation Tips', 'Success Stories']

export default function BlogPage() {
  const [blogs,   setBlogs]   = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [cat,     setCat]     = useState('Tous')
  const [page,    setPage]    = useState(1)
  const [total,   setTotal]   = useState(0)
  const LIMIT = 9

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await blogsApi.getAll({
        page, limit: LIMIT,
        category: cat === 'Tous' ? undefined : cat.toLowerCase().replace(/ /g, '-'),
        search: search || undefined,
      })
      setBlogs(res.data.data || [])
      setTotal(res.data.total || 0)
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }, [page, cat, search])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 260, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Blog & Actualités</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              Notre <span className="hl">Blog Solaire</span>
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              Guides, actualités, conseils et témoignages sur l&apos;énergie solaire au Cameroun.
            </p>
          </div>
        </section>

        <section className="sec">
          {/* Recherche */}
          <input
            type="search" placeholder="🔍 Rechercher un article…"
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            style={{ width: '100%', maxWidth: 500, padding: '10px 18px', background: '#fff', border: '1.5px solid #d4ddc8', borderRadius: 50, color: '#1E2A3A', fontFamily: 'Lato,sans-serif', fontSize: '.84rem', outline: 'none', marginBottom: 20, display: 'block' }}
          />

          {/* Filtres catégories */}
          <div className="filter-row" style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
            {CATS.map((c) => (
              <button key={c} className={`fb${cat === c ? ' on' : ''}`} onClick={() => { setCat(c); setPage(1) }}>
                {c}
              </button>
            ))}
          </div>

          {/* Grille articles */}
          {loading ? (
            <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(30,42,58,.09)' }}>
                  <div style={{ height: 148, background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                  <div style={{ padding: 16 }}>
                    <div style={{ height: 14, background: '#eee', borderRadius: 4, marginBottom: 8, width: '90%' }} />
                    <div style={{ height: 10, background: '#f5f5f5', borderRadius: 4, width: '70%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                {blogs.map((b, i) => (
                  <RevealWrapper key={b._id} delay={((i % 3) + 1) as 1|2|3}>
                    <Link href={`/blog/${b.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="blog-card">
                        <div className="blog-thumb" style={{ height: 148, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', position: 'relative', background: b.featuredImage?.secureUrl ? undefined : 'linear-gradient(135deg,#0a1a0f,#1a3020)' }}>
                          {b.featuredImage?.secureUrl
                            ? <img src={b.featuredImage.secureUrl} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                            : ['📰', '☀️', '🔋', '💡', '🌿', '📊'][i % 6]}
                          <span className="blog-cat">{b.category?.name || 'Blog'}</span>
                        </div>
                        <div style={{ padding: 16 }}>
                          <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.87rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 6, lineHeight: 1.35 }}>{b.title}</h3>
                          <p style={{ fontSize: '.76rem', color: '#4a5568', lineHeight: 1.65 }}>{b.excerpt}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11, fontSize: '.67rem', color: '#718096' }}>
                            <span>📖 {b.readTime} min · 👁 {b.views?.toLocaleString()}</span>
                            <span style={{ color: '#6FAE2E', fontWeight: 700 }}>Lire →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </RevealWrapper>
                ))}
              </div>
              {total > LIMIT && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                  <button className="fb" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Précédent</button>
                  <span style={{ padding: '5px 14px', color: '#4a5568', fontSize: '.82rem', alignSelf: 'center' }}>Page {page} / {Math.ceil(total / LIMIT)}</span>
                  <button className="fb" onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / LIMIT)}>Suivant →</button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#718096' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📰</div>
              <p>Aucun article disponible pour le moment.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <style>{`
        @keyframes shimmer { 0% { background-position:200% 0 } 100% { background-position:-200% 0 } }
        .blog-cat { position:absolute; top:10px; left:10px; background:var(--g); color:#fff; font-size:.61rem; font-weight:700; padding:3px 9px; border-radius:14px; }
      `}</style>
    </>
  )
}
