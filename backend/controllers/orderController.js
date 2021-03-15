import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'
const stripe = 'sk_test_51IUavEFV3SCXvY9fJ1bhZnVp2634qcHKHjq3qWX7yddcUF6iOFzFuQSrsZz2k0m0404PXkthuuQta3KQQM18rsvL006Yff0nVV'

const addOrderItems = asyncHandler(async (req, res) =>{

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        handlingPrice,
        totalPrice
        } = req.body
    
    if (orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No items in order!')
        
    }
    else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            handlingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }


})

const getOrderById = asyncHandler(async (req, res) =>{

    const order = await Order.findById(req.params.id).populate('user', 'name email') 

    if (order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})


const updateOrderToPaid = asyncHandler(async (req, res) =>{

    const order = await Order.findById(req.params.id)

    if (order){
        order.isPaid = true;
        order.paidAt = Date.now()
        /*
        order.paymentResult = {
            id: req.body.id,
            status: "Complete"
        }
        */
    
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})



    


 

export {addOrderItems, getOrderById, updateOrderToPaid}