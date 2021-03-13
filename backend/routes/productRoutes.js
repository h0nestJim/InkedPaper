import express from 'express'
const router = express.Router()
import { getProducts, 
    getProductById, 
    deleteProduct, 
    createProduct, 
    updateProduct
 } from '../controllers/productController.js'
import {protect, adminCheck} from '../middleware/authMiddleware.js'

//get all products from backend
router.route('/').get(getProducts).post(protect, adminCheck, createProduct)


//get one product
router.route('/:id').get(getProductById).delete(protect, adminCheck, deleteProduct).put(protect, adminCheck, updateProduct)

export default router