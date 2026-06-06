'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { productsApi } from '@/lib/api'
import { formatPrice } from '@/lib/cart'
import type { Product } from '@/types'

/* Fallback Unsplash — remplacées dès que les vraies photos API arrivent */
const PROD_PHOTOS = [
  'https://images.unsplash.com/photo-1594835896731-af0df4b57c97?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1548611635-96b55b93d204?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
]

/* Données mock — utilisées tant que l'API ne répond pas */
const MOCK_PRODUCTS = [
  { _id:'1', name:'Pompes Solaires',               slug:'pompes-solaires',         category:{ _id:'c1', name:'Pompage Solaire',     slug:'pompage-solaire'     }, price:95000,  shortDescription:'Alimentation autonome pour forages et puits profonds, adaptée au climat tropical.', description:'', featured:true,  status:'published' as const, stock:10, sku:'PS-001', specifications:[], images:[], datasheets:[], createdAt:'', updatedAt:'' },
  { _id:'2', name:'Kits Solaires Complets',         slug:'kits-solaires',           category:{ _id:'c2', name:'Installation',          slug:'installation'        }, price:110000, shortDescription:'Panneau + batterie + régulateur MPPT inclus. Prêt à installer en 2 heures.',         description:'', featured:true,  status:'published' as const, stock:10, sku:'KS-001', specifications:[], images:[], datasheets:[], createdAt:'', updatedAt:'' },
  { _id:'3', name:'Panneaux Solaires Monocristallins', slug:'panneaux-monocristallins', category:{ _id:'c3', name:'Panneaux Solaires',   slug:'panneaux-solaires'   }, price:110000, shortDescription:'Haut rendement 22%, certifiés Blue Carbon pour conditions tropicales, garantie 25 ans.',   description:'', featured:true,  status:'published' as const, stock:10, sku:'PM-001', specifications:[], images:[], datasheets:[], createdAt:'', updatedAt:'' },
  { _id:'4', name:'Batteries Solaires LiFePO4',    slug:'batteries-solaires',      category:{ _id:'c4', name:'Stockage',              slug:'stockage'            }, price:85000,  shortDescription:'Gel & Lithium 12V-48V. Plus de 3 000 cycles de charge. BMS intégré, sans entretien.',  description:'', featured:false, status:'published' as const, stock:10, sku:'BS-001', specifications:[], images:[], datasheets:[], createdAt:'', updatedAt:'' },
  { _id:'5', name:'Éclairage Solaire LED',         slug:'eclairage-solaire',       category:{ _id:'c5', name:'Lampadaires',           slug:'lampadaires'         }, price:45000,  shortDescription:'Lampadaires autonomes 60W avec détecteur de mouvement et capteur crépusculaire.',     description:'', featured:false, status:'published' as const, stock:10, sku:'ES-001', specifications:[], images:[], datasheets:[], createdAt:'', updatedAt:'' },
  { _id:'6', name:'Onduleurs Hybrides',            slug:'onduleurs-hybrides',      category:{ _id:'c6', name:'Onduleurs',             slug:'onduleurs'           }, price:75000,  shortDescription:'Gestion intelligente réseau + batterie + panneau. Compatible Blue Carbon 5kW.',          description:'', featured:false, status:'published' as const, stock:10, sku:'OH-001', specifications:[], images:[], datasheets:[], createdAt:'', updatedAt:'' },
]

/* Image depuis API ou fallback Unsplash */
const getPhoto = (p: Product, idx: number) =>
  p.images?.[0]?.secureUrl || PROD_PHOTOS[idx % PROD_PHOTOS.length]

/* Prix formaté sans doublon de devise */
const price = (p: Product) => formatPrice(p.discountPrice ?? p.price)

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS as unknown as Product[])

  useEffect(() => {
    productsApi.getAll({ featured: true, status: 'published', limit: 6 })
      .then((res) => { if ((res.data.data?.length ?? 0) >= 3) setProducts(res.data.data) })
      .catch(() => {})
  }, [])

  /* Disposition des cartes */
  const left    = products[0]
  const kits    = products[1]
  const feat    = products[2] || products[0]
  const smalls  = products.slice(3, 6)

  return (
    <section className="sec-g" style={{ padding: '72px 48px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="slabel">Boutique</span>
          <h2 className="stitle" style={{ marginTop: 8 }}>Nos <span className="ac">Produits Phares</span></h2>
          <p className="sdesc" style={{ margin: '8px auto 0', textAlign: 'center' }}>
            Équipements solaires sélectionnés pour le marché camerounais.
          </p>
        </div>

        {/* Bento grid — classes CSS pour le responsive */}
        <div className="bpg">

          {/* Gauche — carte sombre (span 2 rows) */}
          <Link href={`/produits/${left?.slug}`} style={{ textDecoration: 'none' }}>
            <div className="bpg-left">
              <div style={{ flex: 1, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getPhoto(left as Product, 0)} alt={left?.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 160, display: 'block' }} />
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <span style={{ fontSize: '.6rem', fontWeight: 700, color: '#8CC63F', letterSpacing: '.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                  {left?.category?.name}
                </span>
                <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                  {left?.name}
                </h3>
                <p style={{ fontSize: '.73rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.6, marginBottom: 14 }}>
                  {(left as any)?.shortDescription || left?.description?.slice(0, 90)}
                </p>
                <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>
                  À partir de <strong style={{ color: '#8CC63F', fontSize: '.88rem' }}>{price(left as Product)}</strong>
                </div>
                <button className="btn btn-g" style={{ width: '100%', justifyContent: 'center', fontSize: '.78rem' }}>
                  ⚡ Commander
                </button>
              </div>
            </div>
          </Link>

          {/* Centre — Featured principal (row 1) */}
          <Link href={`/produits/${feat?.slug}`} style={{ textDecoration: 'none' }}>
            <div className="bpg-feat">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getPhoto(feat as Product, 2)} alt={feat?.name}
                style={{ width: '100%', height: 170, objectFit: 'cover', borderRadius: 16, marginBottom: 18 }} />
              <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 8, lineHeight: 1.25 }}>
                {feat?.name} ✦
              </h3>
              <p style={{ fontSize: '.76rem', color: '#718096', lineHeight: 1.6, marginBottom: 16 }}>
                {(feat as any)?.shortDescription || feat?.description?.slice(0, 100)}
              </p>
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: '.72rem', color: '#718096' }}>À partir de : </span>
                <span style={{ background: '#1E2A3A', color: '#fff', borderRadius: 50, padding: '5px 14px', fontWeight: 700, fontSize: '.85rem' }}>
                  {price(feat as Product)}
                </span>
              </div>
              <button className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }}>⚡ Découvrir</button>
            </div>
          </Link>

          {/* Centre — Kits (row 2, sous featured) */}
          <Link href={`/produits/${kits?.slug}`} style={{ textDecoration: 'none' }}>
            <div className="bpg-kits">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getPhoto(kits as Product, 1)} alt={kits?.name}
                style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.84rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 3 }}>
                  {kits?.name}
                </h4>
                <p style={{ fontSize: '.71rem', color: '#718096', lineHeight: 1.5, marginBottom: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {(kits as any)?.shortDescription || kits?.description?.slice(0, 80)}
                </p>
                <div style={{ fontSize: '.74rem', color: '#4a5568' }}>
                  À partir de : <strong style={{ color: '#6FAE2E' }}>{price(kits as Product)}</strong>
                </div>
              </div>
            </div>
          </Link>

          {/* Droite — Petites cartes (span 2 rows) */}
          <div className="bpg-right">
            {(smalls.length > 0 ? smalls : MOCK_PRODUCTS.slice(3) as unknown as Product[]).map((p, i) => (
              <Link key={p._id} href={`/produits/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div className="bento-prod-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={getPhoto(p, i + 3)} alt={p.name}
                    style={{ width: 54, height: 54, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <h5 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.78rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 2 }}>
                      {p.name}
                    </h5>
                    <p style={{ fontSize: '.67rem', color: '#718096', lineHeight: 1.4, marginBottom: 4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {(p as any)?.shortDescription || p.description?.slice(0, 60)}
                    </p>
                    <div style={{ fontSize: '.68rem', color: '#8CC63F', fontWeight: 700 }}>⚡ Voir le produit →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Lien vers boutique */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/produits" style={{ textDecoration: 'none' }}>
            <button className="btn btn-dark">Voir tous les produits →</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
