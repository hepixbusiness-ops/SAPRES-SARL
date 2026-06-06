'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { productsApi } from '@/lib/api'
import { formatPrice } from '@/lib/cart'
import type { Product } from '@/types'

// Photos Unsplash produits solaires
const PROD_PHOTOS = [
  'https://images.unsplash.com/photo-1594835896731-af0df4b57c97?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1548611635-96b55b93d204?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&w=500&q=80',
]

const MOCK_PRODUCTS: Product[] = [
  { _id:'1', name:'Pompes Solaires', slug:'pompes-solaires', category:{ _id:'c1', name:'Pompage Solaire', slug:'pompage-solaire' }, price:95000, status:'published', isFeatured:true, inStock:true, tags:['pompage','forage'], images:[], description:'Alimentation autonome pour forages et puits profonds, adaptées au climat tropical.', features:['Débit jusqu\'à 10m³/h','Protection IP68','Garantie 3 ans'], specifications:{}, warranty:'3 ans', createdAt:'', updatedAt:'' },
  { _id:'2', name:'Kits Solaires Complets', slug:'kits-solaires', category:{ _id:'c2', name:'Installation Résidentielle', slug:'installation-residentielle' }, price:110000, status:'published', isFeatured:true, inStock:true, tags:['kit','résidentiel'], images:[], description:'Panneau + batterie + régulateur inclus. Prêt à installer.', features:['Panneau 450Wc','Batterie LiFePO4','Régulateur MPPT'], specifications:{}, warranty:'25 ans', createdAt:'', updatedAt:'' },
  { _id:'3', name:'Panneaux Solaires Monocristallins', slug:'panneaux-monocristallins', category:{ _id:'c3', name:'Panneaux Solaires', slug:'panneaux-solaires' }, price:110000, status:'published', isFeatured:true, inStock:true, tags:['panneaux','Blue Carbon'], images:[], description:'Haut rendement, certifiés pour conditions tropicales.', features:['450Wc','Rendement 22%','Garantie 25 ans'], specifications:{}, warranty:'25 ans', createdAt:'', updatedAt:'' },
  { _id:'4', name:'Batteries Solaires', slug:'batteries-solaires', category:{ _id:'c4', name:'Stockage', slug:'stockage' }, price:85000, status:'published', isFeatured:false, inStock:true, tags:['batterie','lithium'], images:[], description:'Gel & Lithium 12V-48V. Longue durée sans entretien.', features:['LiFePO4','Cycles >3000','BMS intégré'], specifications:{}, warranty:'5 ans', createdAt:'', updatedAt:'' },
  { _id:'5', name:'Éclairage Solaire', slug:'eclairage-solaire', category:{ _id:'c5', name:'Lampadaires', slug:'lampadaires' }, price:45000, status:'published', isFeatured:false, inStock:true, tags:['lampadaire','LED'], images:[], description:'Lampadaires autonomes. Détecteur de mouvement.', features:['LED 60W','Panneau intégré','Capteur crépusculaire'], specifications:{}, warranty:'3 ans', createdAt:'', updatedAt:'' },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)

  useEffect(() => {
    productsApi.getAll({ isFeatured: true, status: 'published', limit: 6 })
      .then((res) => { if (res.data.data?.length >= 3) setProducts(res.data.data) })
      .catch(() => {})
  }, [])

  const featured  = products[2] || products[0]
  const sideLeft  = products[0] || products[0]
  const sideRight = products[1] || products[1]
  const smalls    = products.slice(3, 6)

  const getPhoto = (p: Product, idx: number) =>
    p.images?.[0]?.secureUrl || PROD_PHOTOS[idx % PROD_PHOTOS.length]

  return (
    <section className="sec-g" style={{ padding: '72px 48px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="slabel">Boutique</span>
          <h2 className="stitle" style={{ marginTop: 8 }}>Nos <span className="ac">Produits Phares</span></h2>
          <p className="sdesc" style={{ margin: '8px auto 0', textAlign: 'center' }}>
            Retrouvez nos équipements solaires sélectionnés pour le marché camerounais.
          </p>
        </div>

        {/* Bento grid produits */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 14 }}>

          {/* Gauche — carte côté */}
          <Link href={`/produits/${sideLeft.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#1E2A3A', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)', boxShadow: '0 2px 12px rgba(0,0,0,.08)', gridRow: '1 / 3', height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform .28s', minHeight: 320 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getPhoto(sideLeft, 0)} alt={sideLeft.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 14 }} />
              </div>
              <div style={{ padding: '0 20px 20px' }}>
                <span style={{ fontSize: '.6rem', fontWeight: 700, color: '#8CC63F', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>{sideLeft.category?.name}</span>
                <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>{sideLeft.name}</h3>
                <p style={{ fontSize: '.73rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.6, marginBottom: 14 }}>{sideLeft.description}</p>
                <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>
                  A partir de <strong style={{ color: '#8CC63F', fontSize: '.88rem' }}>{formatPrice(sideLeft.price)} FCFA</strong>
                </div>
                <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center', fontSize: '.78rem' }}>⚡ Commander</button>
              </div>
            </div>
          </Link>

          {/* Centre haut — Kits */}
          <Link href={`/produits/${sideRight.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,.07)', boxShadow: '0 2px 12px rgba(0,0,0,.06)', cursor: 'pointer', transition: 'transform .28s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}>
              <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getPhoto(sideRight, 1)} alt={sideRight.name} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.84rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 3 }}>{sideRight.name}</h4>
                  <p style={{ fontSize: '.71rem', color: '#718096', lineHeight: 1.5 }}>{sideRight.description}</p>
                  <div style={{ marginTop: 8, fontSize: '.74rem', color: '#4a5568' }}>
                    A partir de : <strong style={{ color: '#6FAE2E' }}>{formatPrice(sideRight.price)} FCFA</strong>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Centre — Featured principal */}
          <Link href={`/produits/${featured.slug}`} style={{ textDecoration: 'none', gridColumn: '2 / 4', gridRow: '1', display: 'block' }}>
            <div style={{ background: '#fff', borderRadius: 24, border: '1px solid rgba(0,0,0,.08)', boxShadow: '0 8px 32px rgba(0,0,0,.09)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', transition: 'transform .28s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ''}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getPhoto(featured, 2)} alt={featured.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 16, marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8, lineHeight: 1.25 }}>{featured.name} ✦</h3>
              <p style={{ fontSize: '.76rem', color: '#718096', lineHeight: 1.6, marginBottom: 16 }}>{featured.description}</p>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: '.72rem', color: '#718096' }}>A partir de : </span>
                <span style={{ background: '#1E2A3A', color: '#fff', borderRadius: 50, padding: '5px 14px', fontWeight: 700, fontSize: '.85rem' }}>{formatPrice(featured.price)} FCFA</span>
              </div>
              <button className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }}>⚡ Découvrir</button>
            </div>
          </Link>

          {/* Droite — Carte côté */}
          <div style={{ gridRow: '1 / 3', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {smalls.length > 0 ? smalls.map((p, i) => (
              <Link key={p._id} href={`/produits/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div className="bento-prod-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getPhoto(p, i + 3)} alt={p.name} style={{ width: 54, height: 54, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                  <div>
                    <h5 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.78rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 2 }}>{p.name}</h5>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {p.features?.slice(0, 2).map((f) => (
                        <li key={f} style={{ fontSize: '.66rem', color: '#718096' }}>· {f}</li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 4, fontSize: '.68rem', color: '#8CC63F', fontWeight: 700 }}>⚡ Voir</div>
                  </div>
                </div>
              </Link>
            )) : (
              <>
                {MOCK_PRODUCTS.slice(3).map((p, i) => (
                  <Link key={p._id} href={`/produits/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="bento-prod-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={PROD_PHOTOS[i + 3]} alt={p.name} style={{ width: 54, height: 54, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                      <div>
                        <h5 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.78rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 2 }}>{p.name}</h5>
                        <p style={{ fontSize: '.66rem', color: '#718096', lineHeight: 1.4 }}>{p.description?.slice(0, 50)}…</p>
                        <div style={{ marginTop: 4, fontSize: '.68rem', color: '#8CC63F', fontWeight: 700 }}>⚡ Voir</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/produits" style={{ textDecoration: 'none' }}>
            <button className="btn btn-dark">Voir tous les produits →</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
