import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc Traer todos los productos
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async(req, res)=> {
    const products = await Product.find({});
    res.json(products);
});

// @desc Traer un producto por id
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
});

export {
    getProducts,
    getProductById
}