'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ordersApi } from '@/lib/api'
import type { OrderTrackingResponse } from '@/types'
import toast from 'react-hot-toast'

const STATUS_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  pending:    { label: 'En attente',        icon: '⏳', color: '#F59E0B' },
  confirmed:  { label: 'Confirmée',         icon: '✅', color: '#8CC63F' },
  processing: { label: 'En préparation',    icon: '🔧', color: '#3B82F6' },
  shipped:    { label: 'En livraison',      icon: '🚚', color: '#6366f1' },
  completed:  { label: 'Livrée',            icon: '🎉', color: '#8CC63F' },
  cancelled:  { label: 'Annulée',           icon: '❌', color: '#EF4444' },
}
const PAYMENT_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  pending:    { label: 'En attente',  icon: '⏳', color: '#F59E0B' },
  successful: { label: 'Payée',       icon: '✅', color: '#8CC63F' },
  failed:     { label: 'Échoué',      icon: '❌', color: '#EF4444' },
  cancelled:  { label: 'Annulé',      icon: '✖',  color: '#EF4444' },
  expired:    { label: 'Expiré',      icon: '⌛', color: '#718096' },
}

export default function SuiviPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [loading,     setLoading]     = useState(false)
  const [result,      setResult]      = useState<OrderTrackingResponse | null>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim()) { toast.error('Entrez votre numéro de commande.'); return }
    setLoading(true)
    try {
      const res = await ordersApi.track(orderNumber.trim())
      setResult(res.data.data)
    } catch {
      toast.error('Commande introuvable. Vérifiez votre numéro.')
      setResult(null)
    } finally { setLoading(false) }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '70vh', background: '#0d1520', padding: '80px 48px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="chip" style={{ display: 'inline-flex', marginBottom: 12 }}>
              <div className="chip-dot" />
              <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#a8d960', letterSpacing: '.1em', textTransform: 'uppercase' }}>Suivi Commande</span>
            </div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.5rem)', color: '#fff', marginBottom: 10 }}>
              Suivre ma <span style={{ background: 'linear-gradient(135deg,#8CC63F,#a8d960)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Commande</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '.87rem' }}>
              Entrez votre numéro de commande (format : SAP-20260602-000001)
            </p>
          </div>

          <form onSubmit={handleTrack} style={{ background: '#1E2A3A', borderRadius: 20, padding: 32, marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'rgba(255,255,255,.5)', marginBottom: 8, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              Numéro de commande *
            </label>
            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="SAP-20260602-000001"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.07)', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: 10, color: '#fff', fontFamily: 'Lato,sans-serif', fontSize: '.9rem', outline: 'none', marginBottom: 16, letterSpacing: '.03em' }}
            />
            <button type="submit" disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg,#8CC63F,#6FAE2E)', color: '#fff', border: 'none', padding: 13, borderRadius: 50, fontSize: '.9rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Lato,sans-serif', boxShadow: '0 5px 18px rgba(140,198,63,.32)' }}>
              {loading ? '⏳ Recherche en cours…' : '🔍 Suivre ma commande'}
            </button>
          </form>

          {result && (
            <div style={{ background: '#1E2A3A', borderRadius: 20, padding: 28, border: '1px solid rgba(140,198,63,.15)' }}>
              <h3 style={{ fontFamily: 'Raleway,sans-serif', fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
                📦 Commande {result.orderNumber}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>
                    {STATUS_LABELS[result.orderStatus]?.icon || '📦'}
                  </div>
                  <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>Statut commande</div>
                  <div style={{ fontSize: '.88rem', fontWeight: 700, color: STATUS_LABELS[result.orderStatus]?.color || '#fff' }}>
                    {STATUS_LABELS[result.orderStatus]?.label || result.orderStatus}
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>
                    {PAYMENT_LABELS[result.paymentStatus]?.icon || '💳'}
                  </div>
                  <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>Statut paiement</div>
                  <div style={{ fontSize: '.88rem', fontWeight: 700, color: PAYMENT_LABELS[result.paymentStatus]?.color || '#fff' }}>
                    {PAYMENT_LABELS[result.paymentStatus]?.label || result.paymentStatus}
                  </div>
                </div>
              </div>

              {result.estimatedDeliveryDate && (
                <div style={{ background: 'rgba(140,198,63,.1)', border: '1px solid rgba(140,198,63,.2)', borderRadius: 10, padding: '12px 16px', fontSize: '.82rem', color: '#a8d960' }}>
                  🚚 Livraison estimée : {new Date(result.estimatedDeliveryDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              )}

              <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)', marginTop: 16, textAlign: 'center' }}>
                Mis à jour le {new Date(result.lastUpdated).toLocaleString('fr-FR')}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
