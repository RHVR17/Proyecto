const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const routes = require('./routes/Users')
const authRoutes = require('./routes/Auth')
const productRoutes = require('./routes/Products')


if(process.env.NODE_ENV !== "production"){
    require('dotenv/config')
}

const {PORT} = process.env

app.use(express.json())

routes(app)


app.use('/', authRoutes)
app.use('/', productRoutes)

server.listen(PORT, () => {
    console.log("Escuchando", PORT)
})