// import cartschema

const cartitems = require('../model/cartSchema')


// add to cart 

exports.addtoCart = async (req, res) => {

    const { id, title, image, price, quantity } = req.body

    // logic
    try {
        // check items

        const product = await cartitems.findOne({ id })
        if (product) {
            // product already in cart
            product.quantity += 1

            product.grandTotal = product.price * product.quantity

            // to save change in mongodb
            await product.save()
            //send res to client
            res.status(200).json('items added to you cart....')

        }
        else {
            // product not in cart
            // add producct to cart colllection 
            const newProduct = new cartitems({
                id, title, price, image, quantity, grandTotal: price
            })

            await newProduct.save()
            // send res to cleint
            res.status(200).json('item added to you cart....')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get cartItems
exports.getCartItems = async (req, res) => {
    // logic
    try {
        const allItems = await cartitems.find()
        //  send all product to client
        res.status(200).json(allItems)
        // res.status(200).json(allproducts)
    }
    catch (error) {
        res.status(401).json(error)

    }
}

// remove an items from cart

exports.removeCartItem = async (req, res) => {
    // get id of a perticular product
    const { id } = req.params

    // logic

    try {
        const removeItem = await cartitems.deleteOne({ id })
        if (removeItem) {
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        } else {
            res.status(401).json("Item is not in the cart")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// increment cart item

exports.incrCartItem = async (req, res) => {
    const { id } = req.params

    // logic
    try {
        const item = await cartitems.findOne({ id })
        if (item) {
            item.quantity += 1
            item.grandTotal = item.price * item.quantity
            await item.save()
            //get all items  form cart

            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        } else {
            res.status(404).json("item not in the cart")
        }

    } catch (error) {
        res.status(401).json(error)
    }

}

// decrement cart item

exports.decrCartItem = async (req, res) => {
    const { id } = req.params

    // logic
    try {
        const item = await cartitems.findOne({ id })
        if (item) {
            // decrement
            item.quantity -= 1
            if (item.quantity == 0) {
                // remove item from cart
                const deleteItem = await cartitems.deleteOne({ id })
                if (deleteItem) {

                    const allItems = await cartitems.find()
                    res.status(200).json(allItems)
                } else {
                    res.status(404).json("item not in the cart")
                }

            } else {
                item.grandTotal = item.price * item.quantity
                await item.save()
                //get all items  form cart

                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }


        } else {
            res.status(404).json("item not in the cart")
        }

    } catch (error) {
        res.status(401).json(error)
    }

}

// empty cart
exports.emptyCart = async (req,res)=>{
    try {
        const result = await cartitems.deleteMany({})
        res.status(200).json("Your cart is empty")
    } catch (error) {
        res.status(401).json(error)
    }
}