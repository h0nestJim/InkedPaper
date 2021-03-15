import {
    ARTIST_LIST_SUCCESS, ARTIST_LIST_FAIL, ARTIST_LIST_REQUEST,
    
} from '../constants/artistConstants'

export const artistListReducer = (state = {artists: []}, action)=>{
    switch (action.type){
        case ARTIST_LIST_REQUEST:
            return {loading:true, artists:[]}
        case ARTIST_LIST_SUCCESS:
            return {loading:false, artists: action.payload}
        case ARTIST_LIST_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}

