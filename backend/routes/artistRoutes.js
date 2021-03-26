import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Artist from '../models/ArtistModel.js'
import Product from '../models/ProductModel.js'


router.get(
    '/', 
    asyncHandler (async (req, res)=>{
    const artists = await Artist.find({})
    res.json(artists);
}))


//get products by artist
router.get('/:id', asyncHandler(async (req, res)=>{
    const artist= await Artist.findById(req.params.id)
    

    if (artist){
        res.json(artist.products);
    }
    else{
        res.status(404)
        throw new Error('Product not found!')
    }
    
}))


export default router