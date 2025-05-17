import User from "../models/userSchema.js";

export const wishlistToggle = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id;
  
      const user = await User.findById(userId);
  
      const checkWishList =  user.wishlist.includes(productId)
  
      if(checkWishList){
          user.wishlist.pull(productId);
          await user.save();
          return res.status(200).json({message: "Removed From Wishlist",status:"removed"})
      }else{
          user.wishlist.push(productId)
        //   const userData = await User.findByIdAndUpdate(userId, {wishlist:productId})

          await user.save();
          return res.status(200).json({message:"Added to Wishlist",status:"added"})
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }   
  };

  export const getAllWishList = async(req,res)=>{
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate("wishlist");

        const wishlist = user.wishlist

        if(wishlist){
           return res.status(200).json({message:"Wishlist Fetched",wishlist})
        }
        else{
            return res.status(200).json({message:"Wishlist is Empty"})
        }        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }