const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const Product = require('./models/product');
const app= express();   
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

//! Routes
app.use('/api/products', productRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello World");
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  });

app.listen(PORT, async () => {
    await connectDB();
    console.log(`✅ Server is running on port ${PORT}`);
});