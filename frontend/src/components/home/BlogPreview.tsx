'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { blogsApi } from '@/lib/api'
import type { Blog } from '@/types'
import RevealWrapper from '@/components/ui/RevealWrapper'

const MOCK_BLOGS: Blog[] = [
  { _id: '1', title: 'Comment réduire sa facture ENEO de 70% avec le solaire', slug: 'reduire-facture-eneo-solaire', excerpt: 'Guide complet pour dimensionner votre installation solaire et maximiser vos économies au Cameroun.', tags: ['solaire', 'économies'], readTime: 7, views: 3200, featured: true, allowComments: false, status: 'published', category: { _id: 'c1', name: 'Guides Solaires', slug: 'guides-solaires' }, content: '', author: { _id: 'a1', name: 'SAPRES Équipe' }, publishedAt: '2026-05-15', createdAt: '', updatedAt: '' },
  { _id: '2', title: 'Les meilleures batteries lithium pour votre système solaire', slug: 'meilleures-batteries-lithium', excerpt: 'Comparatif complet des batteries LiFePO4 Blue Carbon. Durée de vie, capacité, prix : tout ce qu\'il faut savoir.', tags: ['batteries', 'lithium'], readTime: 5, views: 1850, featured: false, allowComments: false, status: 'published', category: { _id: 'c2', name: 'Produits', slug: 'produits' }, content: '', author: { _id: 'a1', name: 'SAPRES Équipe' }, publishedAt: '2026-05-20', createdAt: '', updatedAt: '' },
  { _id: '3', title: 'Pompage solaire : alimenter 200 ménages en eau potable', slug: 'pompage-solaire-200-menages', excerpt: 'Retour d\'expérience sur notre projet d\'adduction d\'eau solaire dans la région Centre du Cameroun.', tags: ['pompage', 'eau'], readTime: 6, views: 2100, featured: false, allowComments: false, status: 'published', category: { _id: 'c3', name: 'Réalisations', slug: 'realisations' }, content: '', author: { _id: 'a1', name: 'SAPRES Équipe' }, publishedAt: '2026-06-01', createdAt: '', updatedAt: '' },
]

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>(MOCK_BLOGS)

  useEffect(() => {
    blogsApi.getAll({ featured: true, limit: 3 })
      .then((res) => { if (res.data.data?.length) setBlogs(res.data.data.slice(0, 3)) })
      .catch(() => {})
  }, [])

  return (
    <section className="sec">
      <RevealWrapper><span className="slabel">Blog & Actualités</span></RevealWrapper>
      <RevealWrapper delay={1}>
        <h2 className="stitle">Nos <span className="ac">Derniers Articles</span></h2>
      </RevealWrapper>
      <RevealWrapper delay={2}>
        <p className="sdesc">Guides solaires, actualités du secteur et retours d&apos;expérience de nos projets.</p>
      </RevealWrapper>

      <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 24 }}>
        {blogs.map((b, i) => (
          <RevealWrapper key={b._id} delay={((i + 1) % 3 + 1) as 1|2|3}>
            <Link href={`/blog/${b.slug}`} style={{ textDecoration: 'none' }}>
              <div className="blog-card">
                <div className="blog-thumb" style={{
                  height: 148, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.8rem', position: 'relative',
                  background: b.featuredImage?.secureUrl
                    ? undefined
                    : 'linear-gradient(135deg,#0a1a0f,#1a3020)',
                }}>
                  {b.featuredImage?.secureUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.featuredImage.secureUrl} alt={b.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  ) : ['📰', '🔋', '💧'][i % 3]}
                  <span className="blog-cat">{b.category?.name || 'Blog'}</span>
                </div>
                <div className="blog-info" style={{ padding: 16 }}>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.87rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 6, lineHeight: 1.35 }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: '.76rem', color: '#4a5568', lineHeight: 1.65 }}>{b.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 11, fontSize: '.67rem', color: '#718096' }}>
                    <span>📖 {b.readTime} min · 👁 {b.views.toLocaleString()}</span>
                    <span style={{ color: '#6FAE2E', fontWeight: 700 }}>Lire →</span>
                  </div>
                </div>
              </div>
            </Link>
          </RevealWrapper>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link href="/blog">
          <button className="btn btn-navy">Voir tous les articles →</button>
        </Link>
      </div>

      <style>{`
        .blog-cat { position:absolute; top:10px; left:10px; background:var(--g); color:#fff; font-size:.61rem; font-weight:700; padding:3px 9px; border-radius:14px; }
      `}</style>
    </section>
  )
}
