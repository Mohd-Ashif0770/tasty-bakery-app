const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res)=>{
    const {name, email, password}= req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password:hashedPassword});
        await user.save();
        res.status(201).json({message:"User registered successfully", user});

    }catch(error){
        res.status(500).json({message:"Error registering user", error});
    }
}

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    } 
    const decodedPassword =await bcrypt.compare(password, user.password);
    if(!decodedPassword){
        return res.status(400).json({message:"Invalid password"});
    }
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    res.cookie('token', token);
    res.status(200).json({message:"Login successful", user,token});
}

const logoutUser = async (req, res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout successful"});
}

module.exports = {registerUser, loginUser, logoutUser};