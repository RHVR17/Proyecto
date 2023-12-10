const jwt = require("jsonwebtoken")

if(process.env.NODE_ENV !== "production"){
    require('dotenv/config')
}

const {KEY} = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        return res.status(403).send("No se envio correctamente")
    }

    try{
        const decoded = jwt.verify(token, KEY)
        req.user = decoded
    }catch(err){
        return res.status(401).send("Es invalido su ingreso")
    }
    return next()
}

module.exports = verifyToken