const express = require('express')
const router = express.Router()
const productController = require('../controllers/Products')

router.post('/', productController.crearProducto)
router.get('/', productController.obtenerTodosLosProductos)
router.get('/:id', productController.obtenerProductoPorId)
router.put('/:id', productController.actualizarProducto)
router.delete('/:id', productController.eliminarProducto)

module.exports = router