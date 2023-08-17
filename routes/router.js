// /import express

const express =  require("express")


//Router()
const router = new express.Router()

// import controller
const controllers = require('../controllers/productController')

// import wishlistController
const wishlistController =require('../controllers/wishlistController')
// import cart controler
const cartController = require('../controllers/cartController')

// get all api products
router.get('/products/get-all-products',controllers.getallproducts)

// view single product detials
router.get('/products/:id',controllers.viewProduct)

// route for add wishlist
router.post('/products/add-to-wishlist',wishlistController.addToWishlist)
// to get all itemsform wishlists
router.get('/wishlist/get-all-items',wishlistController.getAllWishlistItems)
// route for remove wishlist items
router.delete('/wishlist/remove-item/:id',wishlistController.removeWishlistItem)

// adding iems to cart
router.post('/products/add-to-cart',cartController.addtoCart)
// rouetr for get all cart items
router.get("/cart/get-all-items",cartController.getCartItems)
// route for remove item from cart
router.delete("/cart/item/:id", cartController.removeCartItem)
// routes for increment cart item quantity
router.get("/cart/increment-item/:id",cartController.incrCartItem)
// decrement
router.get("/cart/decrement-item/:id",cartController.decrCartItem)
// emptyCart
router.delete("/cart/empty-cart",cartController.emptyCart)





// export router
module.exports = router

