import Cart from '../Model/CartSchema.js';
import Product from '../Model/product-schema.js';

export const addToCart = async (req,res) => {
    try{
       const {userId ,productId ,quantity} = req.body;
       if(!userId || !productId || quantity <=0){
        return res.status(400).json({
            success : false,
            message : 'Invalid data provided!'
        })
       }
       const product = await Product.findById(productId);
       if(!product){
        return res.status(400).json({
            success : false,
            message : 'Product not found!'
        })
       }
       let cart = await Cart.findOne({userId});
       //if there is no product in the cart
       if(!cart){
        cart = new Cart({userId,items :[]})
       }
       //if we have to increase the quantity
       const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString()===productId)
       if(findCurrentProductIndex===-1){
        cart.items.push({productId,quantity})
       }
       else{
        cart.items[findCurrentProductIndex].quantity =+ quantity;
       }
       await cart.save();
       res.status(200).json
    ({   
        sucess:true,
        data : cart

    })    
}
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Error'
        })
    }
}
export const fetchCartItems = async (req,res) => {
    try{
        const {userId} = req.params

        if(!userId){
            return res.status(400).json({
                success : false,
                message : 'user id is mandatory!'
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : "image title price discount"
        })
        if(!cart){
            return res.status(404).json({
                success : false,
                message : 'cart not found!'
            });
        }

        //what if items is in the cart but seller deleted it
        const validItems = cart.items.filter(productItem => productItem.productId);
        if(validItems.length < cart.items.length){
            cart.items=validItems
            await cart.save();
        }
        const populateCartItems = validItems.map(item => ({
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            discount:item.productId.discount,
            quantity : item.quantity,
        }))
        res.status(201).json({
            
            success : true,
            message : "product added to Cart",
            data :{
                ...cart._doc,
                items : populateCartItems
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Error'
        })
    }
}
export const updateCartItem = async (req,res) => {
    try{
        const {userId ,productId ,quantity} = req.body;
       if(!userId || !productId || quantity <=0){
        return res.status(400).json({
            success : false,
            message : 'Invalid data provided!'
        })
       }
       const cart = await Cart.findOne({userId})
       if(!cart){
        return res.status(404).json({
            success : false,
            message : 'cart not found!'
        });
    }

    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString()=== productId);

    if(findCurrentProductIndex === -1){
        return res.status(404).json({
            success : false,
            message : 'Cart item not present!'
        })
    }

    cart.items[findCurrentProductIndex].quantity=quantity
    await cart.save();
    await cart.populate({
        path : 'items.productId',
        select : "image title price discount",
    })
    const populateCartItems = cart.items.map(item => ({
        productId : item.productId? item.productId._id : null,
        image : item.productId ? item.productId.image : null,
        title : item.productId ? item.productId.title : null,
        price : item.productId ? item.productId.price : null,
        discount :item.productId ? item.productId.discount : null,
        quantity : item.quantity,
    }));
    res.status(200).json({
        success : true,
        data :{
            ...cart._doc,
            items : populateCartItems
        }
    });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Error'
        })
    }
}
export const deleteCartItem = async (req,res) => {
    try{
        const {userId,productId} = req.params;
        if(!userId || !productId ){
            return res.status(400).json({
                success : false,
                message : 'Invalid data provided!'
            });
           }
           
           
         const cart =await Cart.findOne({userId}).populate({
            path : "items.productId",
            select :"image title price discount",
         })
         
       if(!cart){
        return res.status(404).json({
            success : false,
            message : 'cart not found!'
        });
        }
        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
        await cart.save();
        await cart.populate({
            path : "items.productId",
            select :"image title price discount",
         })
         const populateCartItems = cart.items.map(item => ({
            productId : item.productId? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : null,
            price : item.productId ? item.productId.price : null,
            discount :item.productId ? item.productId.discount : null,
            quantity : item.quantity,
        }));
        res.status(200).json({
            success : true,
            data :{
                ...cart._doc,
                items : populateCartItems
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message: 'Error'
        })
    }
}

export const deleteCartItemById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: {
        ...cart._doc,
        items: []  // explicitly return empty items
      }
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
    });
  }
};

