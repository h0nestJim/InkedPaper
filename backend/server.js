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




const app = express()
dotenv.config()
dbconnect()

const PORT = process.env.PORT || 5000


app.use('/api/products', productRoutes)



app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get('/', (req, res)=>{
    res.send("Api is running...");
});

app.use(notFound)
app.use(errorHandler)


