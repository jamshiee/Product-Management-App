import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
        type:String ,
        required:true
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
    }
})

const User = mongoose.model("User" ,userSchema)

export default User