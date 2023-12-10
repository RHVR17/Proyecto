const productos = []

const crearProducto = (req, res) => {
    try {

        const { nombre, precio} = req.body
        const nuevoProducto = {id: productos.length + 1, nombre, precio}
        productos.push(nuevoProducto)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("Error")
    }
}

const obtenerTodosLosProductos = (req, res) => {
    try {  
        res.status(200).json(productos)
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("Error")
    }
};

const obtenerProductoPorId = (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const producto = productos.find(p => p.id === productId)

        if (producto) {
            res.status(200).json(producto)
        } else {
            res.status(404).send("No encontrado")
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("Error")
    }
};

const actualizarProducto = (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const { nombre, precio } = req.body
        const indiceProducto = productos.findIndex(p => p.id === productId)

        if (indiceProducto !== -1) {
            productos[indiceProducto] = { ...productos[indiceProducto], nombre, precio }
            res.status(200).json(productos[indiceProducto])
        } else {
            res.status(404).send("Noencontrado")
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("Error")
    }
};

const eliminarProducto = (req, res) => {
    try {
        
        const productId = parseInt(req.params.id)
        const indiceProducto = productos.findIndex(p => p.id === productId)

        if (indiceProducto !== -1) {
            const productoEliminado = productos.splice(indiceProducto, 1)
            res.status(200).json(productoEliminado[0])
        } else {
            res.status(404).send("No encontrado")
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("Error")    }
}

module.exports = {crearProducto, obtenerTodosLosProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto}
