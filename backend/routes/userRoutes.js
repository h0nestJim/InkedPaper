import express from 'express'
const router = express.Router()
import { authUser, 
    getUsers, 
    getUserProfile, 
    registerUser, 
    updateUserProfile, 
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js'
import {protect, adminCheck} from '../middleware/authMiddleware.js'

//get all products from backend

router.route('/').post(registerUser).get(protect, adminCheck, getUsers)



router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, adminCheck, deleteUser).get(protect, adminCheck, getUserById).put(protect, updateUser)


export default router