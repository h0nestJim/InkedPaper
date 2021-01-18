import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/UserModel.js'
import Product from './models/ProductModel.js'
import Order from './models/OrderModel.js'
import connectDB from './config/db.js'

//artist import
import Artist from './models/ArtistModel.js'
import artists from './data/artists.js'

dotenv.config()
connectDB()

const importData= async () =>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return{...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

//artist import
const importArtistData= async () =>{
    try{
        await Artist.deleteMany()
        

        const createdArtists = await Artist.insertMany(artists)
        console.log('Artist Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}




const destroyData= async () =>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

      
        console.log('Data Destruction Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

if (process.argv[2]=== '-d'){
    destroyData()
}
else{
    importArtistData()
}