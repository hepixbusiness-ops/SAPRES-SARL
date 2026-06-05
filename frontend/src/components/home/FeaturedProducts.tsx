'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { productsApi } from '@/lib/api'
import { formatPrice } from '@/lib/cart'
import type { Product } from '@/types'
import RevealWrapper from '@/components/ui/RevealWrapper'

const FALLBACK_EMOJIS = ['☀️', '🔋', '⚡', '💡', '🌿', '🏭']
const THUMB_COLORS = [
  'linear-gradient(135deg,#0a1a10,#1a3020)',
  'linear-gradient(135deg,#12102a,#201a40)',
  'linear-gradient(135deg,#0e200e,#1a3a1a)',
  'linear-gradient(135deg,#151515,#2a2a2a)',
  'linear-gradient(135deg,#1a1505,#2a2205)',
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productsApi.getAll({ featured: true, limit: 5 })
      .then((res) => setProducts(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="sec">
      <RevealWrapper>
        <span className="slabel">Nos Produits Phares</span>
      </RevealWrapper>
      <RevealWrapper delay={1}>
        <h2 className="stitle">
          Gamme <span className="ac">Blue Carbon</span>
        </h2>
      </RevealWrapper>
      <RevealWrapper delay={2}>
        <p className="sdesc">
          Panneaux solaires, batteries lithium, onduleurs hybrides. Tous les produits Blue Carbon
          distribués par SAPRES SARL au Cameroun.
        </p>
      </RevealWrapper>

      {loading ? (
        <ProductsSkeleton />
      ) : products.length > 0 ? (
        <div className="rsp-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginTop: 8 }}>
          {products.map((p, i) => (
            <ProductCard key={p._id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <FallbackProducts />
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link href="/produits">
          <button className="btn btn-g">Voir tous les produits →</button>
        </Link>
      </div>

      <style>{`
        .prod-badge { position:absolute; top:8px; right:8px; background:var(--amber); color:#fff; font-size:.58rem; font-weight:700; padding:2px 7px; border-radius:10px; }
        .prod-info h4 { font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:700; color:var(--navy); margin-bottom:2px; }
        .prod-brand { font-size:.65rem; color:var(--tl); margin-bottom:7px; }
        .prod-price { font-family:'Raleway',sans-serif; font-size:.92rem; font-weight:800; color:var(--gd); }
        .prod-price small { font-size:.63rem; font-weight:400; color:var(--tl); }
        .prod-actions { display:flex; gap:5px; margin-top:7px; }
        .prod-btn { flex:1; background:var(--navy); color:#fff; border:none; padding:7px; border-radius:8px; font-size:.7rem; font-weight:700; cursor:pointer; font-family:'Lato',sans-serif; transition:background .22s; }
        .prod-btn:hover { background:var(--g); }
        .prod-wa { background:rgba(37,211,102,.12); color:#128C7E; padding:7px 9px; border-radius:8px; font-size:.78rem; cursor:pointer; border:none; transition:background .22s; }
        .prod-wa:hover { background:rgba(37,211,102,.2); }
      `}</style>
    </section>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const price  = product.discountPrice ?? product.price
  const hasDiscount = product.discountPrice !== null && product.discountPrice !== undefined

  return (
    <Link href={`/produits/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div className="prod-card">
        <div style={{
          height: 132, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '2.4rem', position: 'relative',
          background: THUMB_COLORS[index % THUMB_COLORS.length],
        }}>
          {product.images?.[0]?.secureUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0].secureUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 12 }}
            />
          ) : (
            FALLBACK_EMOJIS[index % FALLBACK_EMOJIS.length]
          )}
          {hasDiscount && <span className="prod-badge">Promo</span>}
        </div>
        <div className="prod-info" style={{ padding: 12 }}>
          <h4>{product.name}</h4>
          <div className="prod-brand">{product.category?.name || 'Blue Carbon'}</div>
          <div className="prod-price">
            {formatPrice(price)}
            {hasDiscount && (
              <small style={{ textDecoration: 'line-through', marginLeft: 6 }}>
                {formatPrice(product.price)}
              </small>
            )}
          </div>
          <div className="prod-actions">
            <button className="prod-btn">Détails</button>
            <button className="prod-wa" title="Commander via WhatsApp">💬</button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function FallbackProducts() {
  const MOCK = [
    { name: 'Panneau Blue Carbon 550W', cat: 'Panneaux Solaires', price: 250000, emoji: '☀️', promo: true  },
    { name: 'Batterie Lithium 100Ah',   cat: 'Batteries',         price: 185000, emoji: '🔋', promo: false },
    { name: 'Onduleur Hybride 5kW',     cat: 'Onduleurs',         price: 320000, emoji: '⚡', promo: false },
    { name: 'Lampadaire Solaire 60W',   cat: 'Éclairage',         price: 95000,  emoji: '💡', promo: true  },
    { name: 'Régulateur MPPT 40A',      cat: 'Accessoires',       price: 45000,  emoji: '🌿', promo: false },
  ]
  return (
    <div className="rsp-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginTop: 8 }}>
      {MOCK.map((p, i) => (
        <Link key={p.name} href="/produits" style={{ textDecoration: 'none' }}>
          <div className="prod-card">
            <div style={{
              height: 132, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.4rem', position: 'relative',
              background: THUMB_COLORS[i],
            }}>
              {p.emoji}
              {p.promo && <span className="prod-badge">Promo</span>}
            </div>
            <div className="prod-info" style={{ padding: 12 }}>
              <h4>{p.name}</h4>
              <div className="prod-brand">{p.cat}</div>
              <div className="prod-price">{formatPrice(p.price)}</div>
              <div className="prod-actions">
                <button className="prod-btn">Détails</button>
                <button className="prod-wa">💬</button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="rsp-grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{
          background: '#fff', borderRadius: 12,
          overflow: 'hidden', boxShadow: '0 4px 24px rgba(30,42,58,.09)',
        }}>
          <div style={{ height: 132, background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
          <div style={{ padding: 12 }}>
            <div style={{ height: 12, background: '#eee', borderRadius: 4, marginBottom: 8, width: '80%' }} />
            <div style={{ height: 10, background: '#f5f5f5', borderRadius: 4, width: '60%' }} />
          </div>
        </div>
      ))}
      <style>{`@keyframes shimmer { 0% { background-position:200% 0 } 100% { background-position:-200% 0 } }`}</style>
    </div>
  )
}
