import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import bcryptjs from "bcryptjs";

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success:false, message:"All fields are required"});
        }
        const ExistingUser = await UserModel.findOne({email});
        if(ExistingUser){
            return res.status(400).json({success:false, message:"User already exists , Please login"});
        }
        const hashedPassword = await bcryptjs.hashSync(password, 10);
        const user = new UserModel({
            name, 
            email,
            password: hashedPassword
        })
        await user.save();
        return res.status(200).json({success:true , message:"User registered successfully",user});
        
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({success:false, message:"internalServer Error"});

    }
}

export { register };