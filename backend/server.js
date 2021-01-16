//REPLACED BY IMPORT SYNTAX USING TYPE:MODULE IN PACKAGE.JSON
//const express = require('express');
//const dotenv = require('dotenv')
//const products = require('./data/products');

import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

const app = express();
dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get('/', (req, res)=>{
    res.send("Api is running...");
});

//get all products from backend
app.get('/api/products', (req, res)=>{
    res.json(products);
});


//get one product
app.get('/api/products/:id', (req, res)=>{
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
});