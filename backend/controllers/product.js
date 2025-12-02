const Product = require('../models/product.js');

const createProduct= async (req, res) => {
    const {name, price, description, image, category} = req.body;

   if(!name || !price || !description || !image || !category){
    return res.status(400).json({message: 'All fields are required'});
   }

   const product = await Product.create({name, price, description, image, category});
   res.status(201).json({message: 'Product created successfully', product});

}

const getProducts= async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json({message: 'Products fetched successfully', products});
    }catch(error){
        res.status(500).json({message: 'Error fetching products', error});
    }

}

const updateProduct = async (req, res)=>{
    const {id}= req.params;
    const {name, price, description, image, category} = req.body;
    if(!name || !price || !description || !image || !category){
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        const product = await Product.findByIdAndUpdate(id, {name, price, description, image, category}, {new:true});
        res.status(200).json({message: 'Product updated successfully', product});        

    }catch(error){
        res.status(500).json({message: 'Error updating product', error});
    }
}

const deleteProduct = async(req, res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({message: 'Product deleted successfully', product});
    }catch(error){
        res.status(500).json({message: 'Error deleting product', error});
    }
}


module.exports = { createProduct, getProducts, updateProduct, deleteProduct };