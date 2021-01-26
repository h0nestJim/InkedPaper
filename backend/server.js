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
import path from 'path'

//routes
import productRoutes from './routes/productRoutes.js'
import artistRoutes from './routes/artistRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


const app = express()
app.use(express.json())


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

dotenv.config()
dbconnect()

const PORT = process.env.PORT || 5000


app.use('/api/products', productRoutes)
app.use('/api/artists', artistRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)



app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get('/', (req, res)=>{
    res.send("Api is running...");
});

app.use(notFound)
app.use(errorHandler)


