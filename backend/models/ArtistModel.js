import mongoose from 'mongoose'

const artistSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    studio:{
        type:String,
        required:true
        
    },
    image:{
        type:String,
        required:true
        
    },
    social:{
        type:String,
        required:true
        
    },
    products:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
        }
    ],
},{
    timestamps:true
})

const Artist = mongoose.model('Artist', artistSchema)
export default Artist