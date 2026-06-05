// ============================================================
// SAPRES SARL — Client API
// Conforme à la documentation de l'équipe backend
// ============================================================

import axios from 'axios'
import type {
  ApiResponse, PaginatedResponse,
  Product, ProductsResponse, Category,
  Service, Project, ProjectStats,
  Job, Blog,
  Homepage, SiteSettings,
  Testimonial, Partner, Certification,
  CreateOrderRequest, OrderTrackingResponse,
  InitiatePaymentRequest, PaymentVerifyResponse,
  ContactFormData, QuoteFormData,
} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sapres.cm/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ---- Intercepteur global erreurs --------------------------
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err?.response?.data || err.message)
    return Promise.reject(err)
  }
)

// ============================================================
// MODULE 2 — PRODUITS
// ============================================================

export const productsApi = {
  getAll: (params?: {
    page?: number
    limit?: number
    search?: string
    category?: string
    featured?: boolean
    minPrice?: number
    maxPrice?: number
  }) => api.get<ProductsResponse>('/products', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/${slug}`),
}

// ============================================================
// MODULE 3 — CATEGORIES
// ============================================================

export const categoriesApi = {
  getAll: (includeInactive = false) =>
    api.get<ApiResponse<Category[]>>('/categories', { params: { includeInactive } }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Category>>(`/categories/${slug}`),
}

// ============================================================
// MODULE 4 — COMMANDES
// ============================================================

export const ordersApi = {
  checkout: (data: CreateOrderRequest) =>
    api.post<ApiResponse<{
      _id: string
      orderNumber: string
      paymentMethod: string
      paymentStatus: string
      orderStatus: string
      totalAmount: number
      createdAt: string
    }>>('/orders/checkout', data),

  track: (orderNumber: string) =>
    api.get<ApiResponse<OrderTrackingResponse>>(`/orders/track/${orderNumber}`),

  whatsappInquiry: (data: {
    customer: { fullName: string; phone: string }
    items: { productId: string; quantity: number }[]
  }) =>
    api.post<ApiResponse<{ orderNumber: string; whatsappUrl: string }>>('/orders/whatsapp', data),
}

// ============================================================
// MODULE 5 — PAIEMENTS
// ============================================================

export const paymentsApi = {
  initiateMTN: (data: InitiatePaymentRequest) =>
    api.post<ApiResponse<{
      paymentId: string
      orderId: string
      orderNumber: string
      amount: number
      transactionReference: string
      status: string
      phoneNumber: string
    }>>('/payments/mtn/initiate', data),

  initiateOrange: (data: InitiatePaymentRequest) =>
    api.post<ApiResponse<{
      paymentId: string
      orderId: string
      orderNumber: string
      amount: number
      transactionReference: string
      status: string
      phoneNumber: string
    }>>('/payments/orange/initiate', data),

  verify: (transactionReference: string) =>
    api.get<ApiResponse<PaymentVerifyResponse>>(`/payments/verify/${transactionReference}`),
}

// ============================================================
// MODULE 6 — SERVICES
// ============================================================

export const servicesApi = {
  getAll: (params?: {
    page?: number; limit?: number; featured?: boolean
    status?: string; search?: string; sort?: string
  }) => api.get<PaginatedResponse<Service>>('/services', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Service>>(`/services/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<Service[]>>('/services/featured'),
}

// ============================================================
// MODULE 7 — PROJETS
// ============================================================

export const projectsApi = {
  getAll: (params?: {
    page?: number; limit?: number; featured?: boolean
    category?: string; status?: string; search?: string; sort?: string
  }) => api.get<PaginatedResponse<Project>>('/projects', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Project>>(`/projects/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<Project[]>>('/projects/featured'),

  getStats: () =>
    api.get<ApiResponse<ProjectStats>>('/projects/stats'),
}

// ============================================================
// MODULE 8 — EMPLOIS & CANDIDATURES
// ============================================================

export const jobsApi = {
  getAll: (params?: {
    page?: number; limit?: number; featured?: boolean
    status?: string; department?: string; search?: string
  }) => api.get<PaginatedResponse<Job>>('/jobs', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Job>>(`/jobs/${slug}`),
}

export const applicationsApi = {
  submit: (formData: FormData) =>
    api.post<ApiResponse<{ _id: string; applicationNumber: string; status: string }>>
      ('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
}

// ============================================================
// MODULE 9 — BLOG
// ============================================================

export const blogsApi = {
  getAll: (params?: {
    page?: number; limit?: number; category?: string
    featured?: boolean; search?: string; tag?: string; sort?: string
  }) => api.get<PaginatedResponse<Blog>>('/blogs', { params }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Blog>>(`/blogs/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<Blog[]>>('/blogs/featured'),

  getRelated: (slug: string) =>
    api.get<ApiResponse<Blog[]>>(`/blogs/${slug}/related`),

  incrementView: (id: string) =>
    api.post(`/blogs/${id}/view`),

  search: (q: string) =>
    api.get<ApiResponse<Blog[]>>('/blogs/search', { params: { q } }),
}

// ============================================================
// MODULE 10 — CONTACT & DEVIS
// ============================================================

export const contactApi = {
  submit: (data: ContactFormData) =>
    api.post<ApiResponse<{ _id: string; status: string }>>('/contacts', data),
}

export const quotesApi = {
  submit: (formData: FormData) =>
    api.post<ApiResponse<{ _id: string; quoteNumber: string; status: string }>>
      ('/quotes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
}

// ============================================================
// MODULE 11 — HOMEPAGE & SETTINGS
// ============================================================

export const homepageApi = {
  get: () => api.get<ApiResponse<Homepage>>('/homepage'),
}

export const settingsApi = {
  get: () => api.get<ApiResponse<SiteSettings>>('/settings'),
}

// ============================================================
// MODULE 12 — TÉMOIGNAGES / PARTENAIRES / CERTIFICATIONS
// ============================================================

export const testimonialsApi = {
  getAll: (params?: { page?: number; limit?: number; featured?: boolean }) =>
    api.get<ApiResponse<Testimonial[]>>('/testimonials', { params }),
}

export const partnersApi = {
  getAll: (params?: { type?: string; featured?: boolean }) =>
    api.get<ApiResponse<Partner[]>>('/partners', { params }),
}

export const certificationsApi = {
  getAll: () => api.get<ApiResponse<Certification[]>>('/certifications'),
}

export default api
