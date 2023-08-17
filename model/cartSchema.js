// import mongoose
const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    }

})
// create model using the schema
const cartitems = mongoose.model('cartitems',cartSchema)

// export model
module.exports = cartitems
 

