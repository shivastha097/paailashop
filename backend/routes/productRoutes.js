import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts } from '../controllers/productController.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
    
router.get('/top', getTopProducts)
// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct)

router
    .route('/:id/reviews')
    .post(protect, createProductReview)


export default router