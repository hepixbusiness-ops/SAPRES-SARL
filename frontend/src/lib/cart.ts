// ============================================================
// SAPRES SARL — Gestion du panier (localStorage)
// Le panier est stocké côté client — pas de compte requis
// ============================================================

import type { CartItem, Product } from '@/types'

const CART_KEY = 'sapres_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const cart = getCart()
  const existing = cart.find((i) => i.product._id === product._id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({
      product: {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price: product.price,
        discountPrice: product.discountPrice,
        images: product.images,
      },
      quantity,
    })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart().filter((i) => i.product._id !== productId)
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeFromCart(productId)
  const cart = getCart().map((i) =>
    i.product._id === productId ? { ...i, quantity } : i
  )
  saveCart(cart)
  return cart
}

export function clearCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_KEY)
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price
    return sum + price * item.quantity
  }, 0)
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

// Format price in XAF
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
