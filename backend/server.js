
import express from 'express'
import dotenv from 'dotenv'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import dbconnect from './config/db.js'
import path from 'path'
import stripe from 'stripe'




//routes
import productRoutes from './routes/productRoutes.js'
import artistRoutes from './routes/artistRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
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
app.use('/api/orders', orderRoutes)

app.get('/api/config/stripe', (req, res) =>{res.send(process.env.STRIPE_CLIENT_ID)})


app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get('/', (req, res)=>{
    res.send("Api is running...");
});


//TRY Stripe
const stripeData = new stripe('sk_test_51IUavEFV3SCXvY9fJ1bhZnVp2634qcHKHjq3qWX7yddcUF6iOFzFuQSrsZz2k0m0404PXkthuuQta3KQQM18rsvL006Yff0nVV')
console.log(stripeData)

app.use(notFound)
app.use(errorHandler)


