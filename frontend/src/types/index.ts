// ============================================================
// SAPRES SARL — Types TypeScript (basés sur la documentation API)
// ============================================================

// ---- SHARED ------------------------------------------------

export interface CloudinaryImage {
  publicId: string
  secureUrl: string
  format?: string
  bytes?: number
}

// ---- CATEGORIES --------------------------------------------

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: CloudinaryImage
  parentCategory?: { _id: string; name: string; slug: string } | null
  isActive: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

// ---- PRODUCTS ----------------------------------------------

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductDatasheet {
  publicId: string
  secureUrl: string
  originalName: string
  format: string
  bytes: number
}

export interface Product {
  _id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  category: Pick<Category, '_id' | 'name' | 'slug' | 'image'>
  sku: string
  price: number
  discountPrice?: number | null
  stock: number
  featured: boolean
  status: 'draft' | 'published'
  warranty?: string
  specifications: ProductSpec[]
  images: CloudinaryImage[]
  datasheets: ProductDatasheet[]
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  success: boolean
  message: string
  page: number
  limit: number
  total: number
  data: Product[]
}

// ---- CART (localStorage) -----------------------------------

export interface CartItem {
  product: Pick<Product, '_id' | 'name' | 'slug' | 'sku' | 'price' | 'discountPrice' | 'images'>
  quantity: number
}

// ---- ORDERS ------------------------------------------------

export interface OrderCustomer {
  fullName: string
  phone: string
  email: string
}

export interface OrderDelivery {
  address: string
  city: string
  region: string
  country: string
}

export interface OrderItemRequest {
  productId: string
  quantity: number
}

export type PaymentMethod = 'mtn' | 'orange' | 'whatsapp'
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'completed' | 'cancelled'
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'cancelled' | 'expired'

export interface CreateOrderRequest {
  customer: OrderCustomer
  delivery: OrderDelivery
  items: OrderItemRequest[]
  paymentMethod: PaymentMethod
  notes?: string
}

export interface OrderSummary {
  itemsCount: number
  subtotal: number
  discount: number
  deliveryFee: number
  totalAmount: number
}

export interface OrderTrackingResponse {
  orderNumber: string
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  estimatedDeliveryDate?: string
  lastUpdated: string
}

// ---- PAYMENTS ----------------------------------------------

export interface InitiatePaymentRequest {
  orderId: string
  phoneNumber: string
}

export interface PaymentVerifyResponse {
  _id: string
  transactionReference: string
  providerReference?: string
  paymentMethod: 'mtn' | 'orange'
  amount: number
  currency: string
  status: PaymentStatus
  paidAt?: string
  order: { _id: string; orderNumber: string }
}

// ---- SERVICES ----------------------------------------------

export interface ServiceProcess {
  step: number
  title: string
  description: string
}

export interface Service {
  _id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  featuredImage?: CloudinaryImage
  gallery?: CloudinaryImage[]
  serviceFeatures: string[]
  serviceBenefits: string[]
  serviceProcess: ServiceProcess[]
  targetAudience: string[]
  status: 'published' | 'draft'
  featured: boolean
  displayOrder: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

// ---- PROJECTS ----------------------------------------------

export interface ProjectTestimonial {
  clientName: string
  position: string
  message: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  client?: { name: string; industry: string; location: string }
  projectCategory: string
  projectType: string
  capacity?: string
  duration?: string
  completionDate?: string
  featuredImage?: CloudinaryImage
  gallery?: CloudinaryImage[]
  beforeImages?: CloudinaryImage[]
  afterImages?: CloudinaryImage[]
  technologiesUsed: string[]
  projectChallenges: string[]
  projectSolutions: string[]
  projectResults: string[]
  testimonial?: ProjectTestimonial
  featured: boolean
  status: 'published' | 'draft' | 'archived'
  displayOrder: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectStats {
  totalProjects: number
  industrialProjects: number
  residentialProjects: number
  commercialProjects: number
  totalInstalledCapacity: string
}

// ---- JOBS & APPLICATIONS -----------------------------------

export type JobStatus = 'open' | 'closed' | 'draft' | 'archived'
export type ApplicationStatus =
  | 'submitted' | 'under-review' | 'shortlisted'
  | 'interview-scheduled' | 'interviewed' | 'accepted'
  | 'rejected' | 'withdrawn'

export interface Job {
  _id: string
  title: string
  slug: string
  department: string
  employmentType: string
  location: string
  salaryRange?: string
  experienceLevel: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  numberOfPositions: number
  applicationDeadline: string
  status: JobStatus
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

// ---- BLOG --------------------------------------------------

export interface BlogCategory {
  _id: string
  name: string
  slug: string
}

export interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: CloudinaryImage
  gallery?: CloudinaryImage[]
  category?: BlogCategory
  tags: string[]
  author?: { _id: string; name: string }
  readTime: number
  views: number
  featured: boolean
  allowComments: boolean
  status: 'published' | 'draft' | 'archived'
  publishedAt?: string
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

// ---- CONTACT & QUOTE ---------------------------------------

export interface ContactFormData {
  fullName: string
  phone: string
  email: string
  subject: string
  message: string
}

export interface QuoteFormData {
  fullName: string
  phone: string
  email: string
  location: string
  projectType: string
  propertyType: string
  budgetRange: string
  monthlyBill: number
  usageDescription: string
  requirements: string
}

// ---- HOMEPAGE & SETTINGS ----------------------------------

export interface HeroSection {
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  backgroundImage?: CloudinaryImage
}

export interface HomepageStatistics {
  completedProjects: number
  happyClients: number
  installedCapacityMW: number
  yearsExperience: number
}

export interface Homepage {
  _id: string
  heroSection: HeroSection
  statistics: HomepageStatistics
  aboutPreview?: { title: string; description: string; image?: CloudinaryImage }
  blueCarbonPartnership?: { title: string; description: string; logo?: CloudinaryImage }
  featuredProducts: string[]
  featuredServices: string[]
  featuredProjects: string[]
  testimonialsEnabled: boolean
  blogsEnabled: boolean
  recruitmentBannerEnabled: boolean
  updatedAt: string
}

export interface WorkingHours {
  mondayToFriday: string
  saturday: string
  sunday: string
}

export interface SiteSettings {
  _id: string
  companyName: string
  companyEmail: string
  companyPhone: string
  companyAddress: string
  companyDescription: string
  googleMapsEmbedUrl?: string
  whatsappNumber: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  workingHours: WorkingHours
  seo: { defaultTitle: string; defaultDescription: string; keywords: string[] }
  paymentSettings: { enableMTNMoMo: boolean; enableOrangeMoney: boolean; enableWhatsAppOrders: boolean }
  maintenanceMode: boolean
  updatedAt: string
}

// ---- TESTIMONIALS / PARTNERS / CERTIFICATIONS -------------

export interface Testimonial {
  _id: string
  clientName: string
  position?: string
  company?: string
  location?: string
  photo?: CloudinaryImage
  rating: number
  testimonial: string
  project?: { _id: string; title: string }
  featured: boolean
  status: 'published' | 'draft' | 'archived'
  displayOrder: number
  createdAt: string
}

export interface Partner {
  _id: string
  name: string
  slug: string
  type: string
  description?: string
  logo?: CloudinaryImage
  website?: string
  country?: string
  featured: boolean
  displayOrder: number
  status: 'active' | 'inactive'
}

export interface Certification {
  _id: string
  name: string
  issuingOrganization: string
  certificateNumber: string
  issueDate: string
  expiryDate: string
  description?: string
  certificateFile?: CloudinaryImage
  certificateImage?: CloudinaryImage
  featured: boolean
  status: 'active' | 'expired' | 'archived'
}

// ---- API GENERIC RESPONSE ---------------------------------

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  page: number
  limit: number
  total: number
  totalPages?: number
  data: T[]
}
