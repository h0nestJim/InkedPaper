//REPLACED BY IMPORT SYNTAX USING TYPE:MODULE IN PACKAGE.JSON
//const express = require('express');
//const dotenv = require('dotenv')
//const products = require('./data/products');

import express from 'express'
import dotenv from 'dotenv'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
//replaced with using database
//import products from './data/products.js'
import dbconnect from './config/db.js'

//routes
import productRoutes from './routes/productRoutes.js'
import artistRoutes from './routes/artistRoutes.js'
import userRoutes from './routes/userRoutes.js'



const app = express()
app.use(express.json())

dotenv.config()
dbconnect()

const PORT = process.env.PORT || 5000


app.use('/api/products', productRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/users', userRoutes)



app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get('/', (req, res)=>{
    res.send("Api is running...");
});

app.use(notFound)
app.use(errorHandler)


