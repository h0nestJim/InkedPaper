import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import generateToken from '../utils/generateToken.js'


//@desc  AUTH User and get token
//@route post /api/users/login
//public 
const authUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})




//@desc  GET user profile
//@route GET /api/users/profile
//private
const getUserProfile = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.user._id)

   if (user){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})



//@desc  REGISTER A NEW USER
//@route POST /api/users
//public 
const registerUser = asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User Already Registered!')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//UPDATE USer Profile
const updateUserProfile = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.user._id)

   if (user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password){
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id)
     })

   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})



//ADMIN ONLY

const getUsers = asyncHandler(async (req, res) =>{

   const users = await User.find({})
   res.json(users)
})


const deleteUser = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id)
   if (user){
        await user.remove()
        res.json({message: 'User removed!'})
   }
   else{
       res.status(404)
       throw new error('User not found!')
   }
})


const getUserById = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id).select('-password')

    if (user){
        res.json(user)
    }
    else{
        throw new Error('User not found!')
    }
   
})


//UPDATE Specific User
const updateUser = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id)

   if (user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    

    const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
     })

   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})

export {registerUser, getUserProfile, authUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}

