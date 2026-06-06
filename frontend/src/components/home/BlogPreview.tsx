'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { blogsApi } from '@/lib/api'
import type { Blog } from '@/types'

const BLOG_PHOTOS = [
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1611365892117-bede7a956882?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80',
]

const MOCK_BLOGS: Blog[] = [
  { _id:'1', title:'Comment réduire sa facture ENEO de 70% avec le solaire', slug:'reduire-facture-eneo-solaire', excerpt:'Guide complet pour dimensionner votre installation solaire et maximiser vos économies au Cameroun.', tags:['solaire','économies'], readTime:7, views:3200, featured:true, allowComments:false, status:'published', category:{ _id:'c1', name:'Guides Solaires', slug:'guides-solaires' }, content:'', author:{ _id:'a1', name:'SAPRES Équipe' }, publishedAt:'2026-05-15', createdAt:'', updatedAt:'' },
  { _id:'2', title:'Les meilleures batteries lithium pour votre système solaire', slug:'meilleures-batteries-lithium', excerpt:'Comparatif complet des batteries LiFePO4 Blue Carbon. Durée de vie, capacité, prix.', tags:['batteries','lithium'], readTime:5, views:1850, featured:false, allowComments:false, status:'published', category:{ _id:'c2', name:'Produits', slug:'produits' }, content:'', author:{ _id:'a1', name:'SAPRES Équipe' }, publishedAt:'2026-05-20', createdAt:'', updatedAt:'' },
  { _id:'3', title:'Pompage solaire : alimenter 200 ménages en eau potable', slug:'pompage-solaire-200-menages', excerpt:'Retour d\'expérience sur notre projet d\'adduction d\'eau solaire dans la région Centre du Cameroun.', tags:['pompage','eau'], readTime:6, views:2100, featured:false, allowComments:false, status:'published', category:{ _id:'c3', name:'Réalisations', slug:'realisations' }, content:'', author:{ _id:'a1', name:'SAPRES Équipe' }, publishedAt:'2026-06-01', createdAt:'', updatedAt:'' },
]

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>(MOCK_BLOGS)

  useEffect(() => {
    blogsApi.getAll({ featured: true, limit: 3 })
      .then((res) => { if (res.data.data?.length) setBlogs(res.data.data.slice(0, 3)) })
      .catch(() => {})
  }, [])

  return (
    <section className="sec" style={{ padding: '72px 48px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span className="slabel">Blog & Actualités</span>
            <h2 className="stitle" style={{ marginTop: 8 }}>Nos <span className="ac">Derniers Articles</span></h2>
          </div>
          <Link href="/blog" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline">Voir tous →</button>
          </Link>
        </div>

        <div className="rsp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {blogs.map((b, i) => (
            <Link key={b._id} href={`/blog/${b.slug}`} style={{ textDecoration: 'none' }}>
              <div className="blog-card">
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.featuredImage?.secureUrl || BLOG_PHOTOS[i % BLOG_PHOTOS.length]}
                    alt={b.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = '')}
                  />
                  <span style={{ position: 'absolute', top: 10, left: 10, background: '#8CC63F', color: '#fff', fontSize: '.6rem', fontWeight: 700, padding: '3px 9px', borderRadius: 14 }}>
                    {b.category?.name || 'Blog'}
                  </span>
                </div>
                <div style={{ padding: 18 }}>
                  <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.87rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 7, lineHeight: 1.35 }}>{b.title}</h3>
                  <p style={{ fontSize: '.76rem', color: '#4a5568', lineHeight: 1.65, marginBottom: 14 }}>{b.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.67rem', color: '#718096' }}>
                    <span>📖 {b.readTime} min · 👁 {b.views?.toLocaleString()}</span>
                    <span style={{ color: '#6FAE2E', fontWeight: 700 }}>Lire →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
