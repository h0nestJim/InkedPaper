import express from 'express'
const router = express.Router()
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderDispatched
} from '../controllers/orderController.js'
import {protect, adminCheck} from '../middleware/authMiddleware.js'

//get all products from backend

router.route('/').post(protect, addOrderItems).get(protect, adminCheck, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/myorders').get(protect, getMyOrders)

router.route(('/:id')).get(protect, getOrderById)



router.route(('/:id/pay')).put(protect, updateOrderToPaid)
router.route(('/:id/dispatch')).put(protect, adminCheck, updateOrderDispatched)

export default router