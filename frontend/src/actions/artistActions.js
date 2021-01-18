import {
    ARTIST_LIST_FAIL, ARTIST_LIST_SUCCESS, ARTIST_LIST_REQUEST,
    ARTIST_DETAILS_SUCCESS, ARTIST_DETAILS_REQUEST, ARTIST_DETAILS_FAIL
} from '../constants/artistConstants'
//import { productListReducer } from '../reducers/productReducers'
import axios from 'axios'

export const listArtists = () => async (dispatch)=>{
    try {
        dispatch({type: ARTIST_LIST_REQUEST})

        const {data} = await axios.get('/api/artists')
        dispatch({
            type: ARTIST_LIST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: ARTIST_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}


export const listProductDetails = (id) => async (dispatch)=>{
    try {
        dispatch({type: ARTIST_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: ARTIST_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: ARTIST_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}