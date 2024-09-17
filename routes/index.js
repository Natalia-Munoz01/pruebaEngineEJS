const express = require('express');
const router = express.Router();
const { obtenerProductos } = require('../models/productos');

router.get('/', (req, res) => {
    const productos = obtenerProductos();
    res.render('index', { productos, venta: [], error: null, total: 0 });
});

router.post('/agregar', (req, res) => {
    const productos = obtenerProductos();
    const productoId = parseInt(req.body.producto);
    const cantidad = parseInt(req.body.cantidad);
    let error = null;
    let total = 0;
    
    const producto = productos.find(p => p.id === productoId);
    
    if (producto && producto.stock >= cantidad) {
        producto.stock -= cantidad;
        const venta = [{ nombre: producto.nombre, precio: producto.precio, cantidad }];
        total = venta.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        res.render('index', { productos, venta, error, total });
    } else {
        error = "Stock insuficiente para este producto.";
        res.render('index', { productos, venta: [], error, total });
    }
});

module.exports = router;
