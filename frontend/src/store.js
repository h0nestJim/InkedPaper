import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productUpdateReducer, productCreateReducer, productDeleteReducer, productListReducer, productDetailsReducer} from './reducers/productReducers'
import {artistListReducer} from './reducers/artistReducer'
import { cartReducer } from './reducers/cartReducer'
import {userUpdateReducer, userDeleteReducer, userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer} from './reducers/userReducers'
import {orderCreateReducer} from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    artistList:artistListReducer,
    cart:cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderCreate:orderCreateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]


const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):[]

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):[]

const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin:{
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
