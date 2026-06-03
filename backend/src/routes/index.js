const express = require('express');
const router = express.Router();

// import feature routes
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const productRoutes = require('../modules/products/product.routes');
const categoryRoutes = require('../modules/categories/category.routes');
const serviceRoutes = require('../modules/services/service.routes');
const projectRoutes = require('../modules/projects/project.routes');
const jobRoutes = require('../modules/jobs/job.routes');
const applicationRoutes = require('../modules/applications/application.routes');
const blogRoutes = require('../modules/blogs/blog.routes');
const testimonialRoutes = require('../modules/testimonials/testimonial.routes');
const contactRoutes = require('../modules/contacts/contact.routes');
const quoteRoutes = require('../modules/quotes/quote.routes');
const orderRoutes = require('../modules/orders/order.routes');
const paymentRoutes = require('../modules/payments/payment.routes');
const homepageRoutes = require('../modules/homepage/homepage.routes');
const settingRoutes = require('../modules/settings/setting.routes');

// mount feature routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/projects', projectRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/blogs', blogRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/contacts', contactRoutes);
router.use('/quotes', quoteRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);
router.use('/homepage', homepageRoutes);
router.use('/settings', settingRoutes);

module.exports = router;
