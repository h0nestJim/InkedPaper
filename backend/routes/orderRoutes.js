import express from 'express'
const router = express.Router()
import { 
    addOrderItems
} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'

//get all products from backend

router.route('/').post(protect, addOrderItems)



export default router