const UsersData = require("../dataModels/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
if(process.env.NODE_ENV !== "production"){
    require('dotenv/config')
}

const { KEY } = process.env;
let newUser = {}
let users = []

const register = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send("ingresar datos")
        }
        console.log(req.body)
        const { name, email, password } = req.body

        if (!(email && name && password)) {
            res.status(400).send("ingresar datos")
        }

        const userExists = users.find(user => user.email === email)

        if (userExists) {
            res.status(400).send("Ingresndo con exito")
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        newUser = UsersData.User(name, email, encryptedPassword)

        users = [...users, newUser]

    } catch (err) {
        console.log("error", err)
        res.status(500).send("Error ")
    }

    return res.status(201).json(newUser)
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            res.status(400).send("Ingresar datos")
        }

        const user = users.find(us => us.email === email)

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({email}, KEY, { expiresIn: "1h"})
            user.token = token
            res.status(200).json({ message: "exitoso", user, token})
        } else {
            res.status(403).send("invalidas")
        }
    } catch (err) {
        console.log(" error", err)
        res.status(500).send("Errorr")
    }
}

module.exports = { register, login}


