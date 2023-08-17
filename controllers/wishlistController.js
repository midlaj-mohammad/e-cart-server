
const wishlists = require('../model/wishlistSchema')

//logic to add items wishlists

exports.addToWishlist = async (req,res)=>{

// destructuring
    const {id,title,price,image} = req.body

    // 
    try{
    const item = await wishlists.findOne({id})

    if(item){
        res.status(401).json("item already in your wishlist")
    }
    else{
        // product is not available
        const newProduct = new wishlists({
            id,title,price,image
        })
       await newProduct.save()
       res.status(200).json("item added to your wishlist")
    }
}
catch(error){
    res.status(401).json(error)
}
}

// get all product at wishlist

exports.getAllWishlistItems= async (req,res)=>{
    //logic
    try{
        // to get all items from am collectiom

        const allItems = await wishlists.find() 
        if(allItems){
            res.status(200).json(allItems)
        }else{
            res.status(401).json('Your wishlists is empty!!!!!!')
        }
    }catch{
        res.status(401).json(error)
    }
 
   
}

// remove items

exports.removeWishlistItem =async (req,res)=>{
    // logic
    //get product id from req url
    const id = req.params.id
    // check id in collection 
    try{
        const item = await wishlists.deleteOne({id})
        if(item){
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
        else{
            res.status(401).json("product not in the wishlist") 
        }
    }
    catch(error){

        res.status(401).json(error)
    }
}