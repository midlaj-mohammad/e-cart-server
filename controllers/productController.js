// 


// import product collection
const products = require('../model/productSchema')


exports.getallproducts = async (req,res)=>{
   // logic
    try{
      const allproducts = await products.find()
         //  send all product to client
         res.status(200).json(allproducts)
     // res.status(200).json(allproducts)
     }
    catch (error){
      res.status(401).json(error)

    }
 }
//  logic to get perticular item from mongodb
exports.viewProduct = async (req,res)=>{
// logic
const id =req.params.id
try{
  const product = await products.findOne({id})
  
res.status(200).json(product)
 
}
catch(error){
  res.status(401).json(error)
}

}