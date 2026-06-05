'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { productsApi, categoriesApi } from '@/lib/api'
import { formatPrice, addToCart } from '@/lib/cart'
import type { Product, Category } from '@/types'
import toast from 'react-hot-toast'

const THUMB_COLORS = [
  'linear-gradient(135deg,#0a1a10,#1a3020)',
  'linear-gradient(135deg,#12102a,#201a40)',
  'linear-gradient(135deg,#0e200e,#1a3a1a)',
  'linear-gradient(135deg,#151515,#2a2a2a)',
  'linear-gradient(135deg,#1a1505,#2a2205)',
]
const EMOJIS = ['☀️', '🔋', '⚡', '💡', '🌿']

export default function ProduitsPage() {
  const [products,   setProducts]   = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading,    setLoading]    = useState(true)
  const [activecat,  setActiveCat]  = useState('all')
  const [search,     setSearch]     = useState('')
  const [page,       setPage]       = useState(1)
  const [total,      setTotal]      = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const LIMIT = 12

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll({
        page,
        limit: LIMIT,
        category: activecat === 'all' ? undefined : activecat,
        search: search || undefined,
      })
      setProducts(res.data.data || [])
      setTotal(res.data.total || 0)
    } catch { /* fallback silencieux */ }
    finally { setLoading(false) }
  }, [page, activecat, search])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  useEffect(() => {
    categoriesApi.getAll()
      .then((res) => setCategories(res.data.data || []))
      .catch(() => {})
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
    toast.success(`${product.name} ajouté au panier !`)
  }

  const handleWhatsApp = (product: Product) => {
    const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '237677000000'
    const msg = encodeURIComponent(`Bonjour SAPRES, je suis intéressé(e) par : ${product.name} (${formatPrice(product.price)})`)
    window.open(`https://wa.me/${num}?text=${msg}`, '_blank')
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="hero" style={{ minHeight: 300, padding: '80px 52px' }}>
          <div className="hero-floor" />
          <div className="orb orb1" />
          <div className="hc" style={{ zIndex: 10 }}>
            <div className="chip"><div className="chip-dot" /><span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Partenaire Blue Carbon</span></div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.8rem)', color: '#fff', marginBottom: 13 }}>
              Nos <span className="hl">Produits Solaires</span>
            </h1>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.58)', lineHeight: 1.75 }}>
              Toute la gamme Blue Carbon : panneaux, batteries, onduleurs, lampadaires et accessoires.
            </p>
          </div>
        </section>

        <section className="sec">
          {/* Barre de recherche */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <input
              type="search"
              placeholder="🔍 Rechercher un produit…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              style={{
                flex: 1, minWidth: 200, padding: '9px 14px',
                background: '#fff', border: '1.5px solid #d4ddc8',
                borderRadius: 50, color: '#1E2A3A',
                fontFamily: 'Lato,sans-serif', fontSize: '.82rem',
                outline: 'none',
              }}
            />
            <Link href="/devis">
              <button className="btn btn-g">☀️ Devis Gratuit</button>
            </Link>
          </div>

          {/* Filtres catégories */}
          <div className="filter-row" style={{ display: 'flex', gap: 6, marginBottom: 26, flexWrap: 'wrap' }}>
            <button
              className={`fb${activecat === 'all' ? ' on' : ''}`}
              onClick={() => { setActiveCat('all'); setPage(1) }}
            >
              Tous
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                className={`fb${activecat === c._id ? ' on' : ''}`}
                onClick={() => { setActiveCat(c._id); setPage(1) }}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Grille produits */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(30,42,58,.09)' }}>
                  <div style={{ height: 132, background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                  <div style={{ padding: 12 }}>
                    <div style={{ height: 12, background: '#eee', borderRadius: 4, marginBottom: 8, width: '80%' }} />
                    <div style={{ height: 16, background: '#f5f5f5', borderRadius: 4, width: '50%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                {products.map((p, i) => {
                  const price = p.discountPrice ?? p.price
                  const hasDiscount = p.discountPrice !== null && p.discountPrice !== undefined
                  return (
                    <RevealWrapper key={p._id} delay={((i % 4) + 1) as 1|2|3|4}>
                      <div className="prod-card" onClick={() => setSelectedProduct(p)}>
                        <div style={{ height: 132, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem', position: 'relative', background: THUMB_COLORS[i % 5] }}>
                          {p.images?.[0]?.secureUrl
                            ? <img src={p.images[0].secureUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }} />
                            : EMOJIS[i % 5]}
                          {hasDiscount && <span className="prod-badge">Promo</span>}
                        </div>
                        <div className="prod-info" style={{ padding: 12 }}>
                          <h4>{p.name}</h4>
                          <div className="prod-brand">{p.category?.name}</div>
                          <div className="prod-price">
                            {formatPrice(price)}
                            {hasDiscount && <small style={{ textDecoration: 'line-through', marginLeft: 6 }}>{formatPrice(p.price)}</small>}
                          </div>
                          <div className="prod-actions">
                            <button className="prod-btn" onClick={(e) => { e.stopPropagation(); handleAddToCart(p) }}>
                              🛒 Acheter
                            </button>
                            <button className="prod-wa" onClick={(e) => { e.stopPropagation(); handleWhatsApp(p) }}>💬</button>
                          </div>
                        </div>
                      </div>
                    </RevealWrapper>
                  )
                })}
              </div>

              {/* Pagination */}
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
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
              <p>Aucun produit trouvé. <button onClick={() => { setSearch(''); setActiveCat('all') }} style={{ color: '#8CC63F', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Réinitialiser les filtres</button></p>
            </div>
          )}
        </section>

        {/* Modal Produit */}
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} onWhatsApp={handleWhatsApp} />
        )}
      </main>
      <Footer />

      <style>{`
        @keyframes shimmer { 0% { background-position:200% 0 } 100% { background-position:-200% 0 } }
        .prod-badge { position:absolute; top:8px; right:8px; background:var(--amber); color:#fff; font-size:.58rem; font-weight:700; padding:2px 7px; border-radius:10px; }
        .prod-info h4 { font-family:'Raleway',sans-serif; font-size:.8rem; font-weight:700; color:var(--navy); margin-bottom:2px; }
        .prod-brand { font-size:.65rem; color:var(--tl); margin-bottom:7px; }
        .prod-price { font-family:'Raleway',sans-serif; font-size:.92rem; font-weight:800; color:var(--gd); }
        .prod-price small { font-size:.63rem; font-weight:400; color:var(--tl); }
        .prod-actions { display:flex; gap:5px; margin-top:7px; }
        .prod-btn { flex:1; background:var(--navy); color:#fff; border:none; padding:7px; border-radius:8px; font-size:.7rem; font-weight:700; cursor:pointer; transition:background .22s; }
        .prod-btn:hover { background:var(--g); }
        .prod-wa { background:rgba(37,211,102,.12); color:#128C7E; padding:7px 9px; border-radius:8px; font-size:.78rem; cursor:pointer; border:none; transition:background .22s; }
        .prod-wa:hover { background:rgba(37,211,102,.2); }
        @media(max-width:768px){ [style*="repeat(4,1fr)"] { grid-template-columns:1fr 1fr !important; gap:10px !important; } }
        @media(max-width:420px){ [style*="repeat(4,1fr)"] { grid-template-columns:1fr !important; } }
      `}</style>
    </>
  )
}

function ProductModal({ product, onClose, onAddToCart, onWhatsApp }: {
  product: Product
  onClose: () => void
  onAddToCart: (p: Product) => void
  onWhatsApp: (p: Product) => void
}) {
  const price = product.discountPrice ?? product.price
  const hasDiscount = product.discountPrice !== null && product.discountPrice !== undefined

  return (
    <div className="prod-modal-ov show" onClick={onClose}>
      <div className="prod-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{product.name}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-top" style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>
            {/* Visual */}
            <div style={{ background: 'linear-gradient(135deg,#0a1520,#162030)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', padding: 32, flexDirection: 'column', gap: 14, minHeight: 240 }}>
              {product.images?.[0]?.secureUrl
                ? <img src={product.images[0].secureUrl} alt={product.name} style={{ maxWidth: '100%', maxHeight: 160, objectFit: 'contain' }} />
                : '☀️'}
              <div style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#8CC63F' }}>{formatPrice(price)}</div>
              <div style={{ fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{product.category?.name}</div>
            </div>

            {/* Info */}
            <div style={{ padding: '24px 26px' }}>
              <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.15rem', fontWeight: 800, color: '#1E2A3A', marginBottom: 4 }}>{product.name}</h3>
              <div style={{ fontSize: '.74rem', color: '#718096', marginBottom: 10 }}>SKU: {product.sku}</div>
              <div style={{ color: '#f59e0b', fontSize: '.85rem', marginBottom: 12 }}>★★★★★</div>
              <p style={{ fontSize: '.83rem', color: '#4a5568', lineHeight: 1.75, marginBottom: 18, paddingBottom: 16, borderBottom: '1px solid rgba(140,198,63,.1)' }}>
                {product.shortDescription}
              </p>
              {hasDiscount && (
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#6FAE2E' }}>{formatPrice(price)}</span>
                  <span style={{ fontSize: '.8rem', color: '#718096', textDecoration: 'line-through', marginLeft: 10 }}>{formatPrice(product.price)}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => { onAddToCart(product); onClose() }}
                  style={{ background: 'linear-gradient(135deg,#8CC63F,#6FAE2E)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 50, fontSize: '.87rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 18px rgba(140,198,63,.34)', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Lato,sans-serif' }}>
                  🛒 Ajouter au panier
                </button>
                <button
                  onClick={() => { onWhatsApp(product); onClose() }}
                  style={{ background: 'rgba(37,211,102,.1)', color: '#128C7E', border: '1.5px solid rgba(37,211,102,.22)', padding: '12px 20px', borderRadius: 50, fontSize: '.87rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'Lato,sans-serif' }}>
                  💬 Commander via WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Spécifications */}
          {product.specifications?.length > 0 && (
            <div style={{ padding: '20px 26px', background: '#F4F6F0', borderTop: '1px solid rgba(140,198,63,.08)' }}>
              <h4 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '.88rem', fontWeight: 700, color: '#1E2A3A', marginBottom: 14 }}>
                📋 Spécifications techniques
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {product.specifications.map((s) => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(140,198,63,.08)', fontSize: '.78rem', gap: 12 }}>
                    <span style={{ color: '#718096', flexShrink: 0 }}>{s.label}</span>
                    <span style={{ color: '#1E2A3A', fontWeight: 600, textAlign: 'right' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fiches techniques */}
          {product.datasheets?.length > 0 && (
            <div style={{ padding: '14px 26px', background: '#fff', borderTop: '1px solid rgba(140,198,63,.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '.8rem', color: '#4a5568', fontWeight: 600 }}>📄 Fiches techniques :</span>
              {product.datasheets.map((d) => (
                <a key={d.publicId} href={d.secureUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F4F6F0', border: '1.5px solid #d4ddc8', color: '#4a5568', borderRadius: 22, fontSize: '.76rem', fontWeight: 600, textDecoration: 'none' }}>
                  ⬇️ {d.originalName}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        .modal-head { display:flex; align-items:center; justify-content:space-between; padding:16px 22px; border-bottom:1px solid rgba(140,198,63,.1); flex-shrink:0; }
        .modal-head h2 { font-family:'Raleway',sans-serif; font-size:1.05rem; font-weight:800; color:#1E2A3A; }
        .modal-close { background:rgba(30,42,58,.07); border:none; width:34px; height:34px; border-radius:50%; cursor:pointer; font-size:1.1rem; display:flex; align-items:center; justify-content:center; color:#1E2A3A; transition:background .2s; }
        .modal-close:hover { background:rgba(239,68,68,.1); color:#dc2626; }
        .modal-body { overflow-y:auto; flex:1; }
        @media(max-width:768px){ .modal-top { grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  )
}
