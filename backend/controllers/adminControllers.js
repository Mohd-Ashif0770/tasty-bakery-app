const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin= async (req, res)=>{
    const {name, email, password}= req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({name, email, password:hashedPassword});
        await admin.save();
        res.status(201).json({message:"Admin registered successfully", admin});
    }catch(error){
        res.status(500).json({message:"Error registering admin", error});
    }
}

const loginAdmin = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:'All fields are required'});
    }
    const admin = await Admin.findOne({email});
    if(!admin){
        return res.status(400).json({message:"Admin not found"});
    }
    const decodedPassword = await bcrypt.compare(password, admin.password);
    if(!decodedPassword){
        return res.status(400).json({message:"Invalid password"});
    }
    const token = jwt.sign({adminId:admin._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    res.cookie('token', token);
    res.status(200).json({message:"Login successful", admin, token});
}

const logoutAdmin = async (req, res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout successful"});    
}

module.exports = {registerAdmin, loginAdmin, logoutAdmin};