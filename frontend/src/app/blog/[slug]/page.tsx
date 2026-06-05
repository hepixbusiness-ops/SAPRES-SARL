'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { blogsApi } from '@/lib/api'
import type { Blog } from '@/types'

export default function BlogDetailPage() {
  const { slug }  = useParams() as { slug: string }
  const [blog, setBlog] = useState<Blog | null>(null)
  const [related, setRelated] = useState<Blog[]>([])

  useEffect(() => {
    if (!slug) return
    blogsApi.getBySlug(slug).then((res) => {
      setBlog(res.data.data)
      blogsApi.incrementView(res.data.data._id).catch(() => {})
      blogsApi.getRelated(slug).then((r) => setRelated(r.data.data || [])).catch(() => {})
    }).catch(console.error)
  }, [slug])

  if (!blog) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1520', color: '#fff' }}>
        Chargement de l&apos;article…
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main>
        {/* Hero article */}
        <section className="hero" style={{ minHeight: 300, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div style={{ zIndex: 10, position: 'relative', maxWidth: 720 }}>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,.5)', fontSize: '.78rem', textDecoration: 'none', marginBottom: 16, display: 'block' }}>
              ← Retour au Blog
            </Link>
            {blog.category && (
              <span style={{ background: 'rgba(140,198,63,.15)', color: '#a8d960', fontSize: '.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 12 }}>
                {blog.category.name}
              </span>
            )}
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              {blog.title}
            </h1>
            <div style={{ display: 'flex', gap: 16, color: 'rgba(255,255,255,.42)', fontSize: '.75rem', flexWrap: 'wrap' }}>
              {blog.author && <span>✍️ {blog.author.name}</span>}
              {blog.publishedAt && <span>📅 {new Date(blog.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
              <span>📖 {blog.readTime} min de lecture</span>
              <span>👁 {blog.views?.toLocaleString()} vues</span>
            </div>
          </div>
        </section>

        {/* Image featured */}
        {blog.featuredImage?.secureUrl && (
          <div style={{ background: '#0d1520', display: 'flex', justifyContent: 'center', padding: '0 48px' }}>
            <img
              src={blog.featuredImage.secureUrl}
              alt={blog.title}
              style={{ width: '100%', maxWidth: 900, height: 400, objectFit: 'cover', borderRadius: '0 0 16px 16px' }}
            />
          </div>
        )}

        {/* Contenu */}
        <section style={{ padding: '64px 48px', background: '#F4F6F0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40, maxWidth: 1100, margin: '0 auto' }}>
            {/* Article */}
            <article>
              <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: 1.85, marginBottom: 24, fontStyle: 'italic', padding: '16px 20px', borderLeft: '3px solid #8CC63F', background: 'rgba(140,198,63,.05)', borderRadius: '0 8px 8px 0' }}>
                {blog.excerpt}
              </p>
              <div
                style={{ fontSize: '.9rem', color: '#4a5568', lineHeight: 1.85 }}
                dangerouslySetInnerHTML={{ __html: blog.content || '<p>Contenu de l\'article…</p>' }}
              />
              {blog.tags?.length > 0 && (
                <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(140,198,63,.15)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {blog.tags.map((t) => (
                    <span key={t} style={{ background: 'rgba(140,198,63,.1)', color: '#6FAE2E', fontSize: '.72rem', fontWeight: 700, padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(140,198,63,.2)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside>
              {/* CTA Devis */}
              <div style={{ background: 'linear-gradient(135deg,#4a8a1a,#6FAE2E,#8CC63F)', borderRadius: 16, padding: 24, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>☀️</div>
                <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.95rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>Passez au Solaire</h4>
                <p style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.6, marginBottom: 16 }}>Devis gratuit · Étude technique offerte</p>
                <Link href="/devis">
                  <button style={{ background: '#fff', color: '#4a8a1a', border: 'none', padding: '10px 20px', borderRadius: 50, fontSize: '.82rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'Lato,sans-serif', width: '100%' }}>
                    Devis Gratuit →
                  </button>
                </Link>
              </div>

              {/* Articles liés */}
              {related.length > 0 && (
                <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 4px 24px rgba(30,42,58,.09)' }}>
                  <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.88rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 14 }}>
                    Articles liés
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {related.slice(0, 3).map((r) => (
                      <Link key={r._id} href={`/blog/${r.slug}`} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                          <div style={{ width: 50, height: 50, flexShrink: 0, background: 'linear-gradient(135deg,#0a1a0f,#1a3020)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', overflow: 'hidden' }}>
                            {r.featuredImage?.secureUrl
                              ? <img src={r.featuredImage.secureUrl} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : '📰'}
                          </div>
                          <div>
                            <p style={{ fontSize: '.74rem', fontWeight: 600, color: '#1E2A3A', lineHeight: 1.3, marginBottom: 3 }}>{r.title}</p>
                            <span style={{ fontSize: '.65rem', color: '#718096' }}>{r.readTime} min</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:768px){
          [style*="1fr 280px"] { grid-template-columns:1fr !important; }
          aside { order:-1; }
        }
      `}</style>
    </>
  )
}
