import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js'

const getProducts = asyncHandler(async (req, res) =>{

    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }

    }:{

    }

<<<<<<< HEAD
    console.log("product request")
=======
>>>>>>> 25be678787811df9ac016781190324ecd4aef512

    const products = await Product.find({...keyword})
    res.json(products);
})

const getProductById = asyncHandler(async (req, res) =>{
     const product = await Product.findById(req.params.id)

    if (product){
        res.json(product);
    }
    else{
        res.status(404)
        throw new Error('Product not found!')
    }
})

//ADMIN DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) =>{
     const product = await Product.findById(req.params.id)

    if (product){
        await product.remove()
        res.json({message:"Product Deleted!"})
    }
    else{
        res.status(404)
        throw new Error('Product not found!')
    }
})

//ADMIN CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) =>{
   
    const product = new Product({
        name:"Sample Name",
        price: 0,
        user: req.user._id,
        artist: "Sample Artist",
        stock: 0,
        image: '/images/sample.jpg',
        description: 'Sample Description'
    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)
})

//ADMIN UPDATE PRODUCT
//ADMIN CREATE PRODUCT
const updateProduct = asyncHandler(async (req, res) =>{
   
        
    const{name, price, description, artist, stock, image} = req.body

    const product = await Product.findById(req.params.id)

    if (product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.stock = stock
        product.artist = artist

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error('Product not found!')
    }


        

    
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}