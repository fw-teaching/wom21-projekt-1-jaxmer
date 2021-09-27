require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'],
            token = authHeader?.split(' ')[1],
            authUser = jwt.verify(token, process.env.JWT_SECRET)
        req.authUser = authUser
        console.log(`Authorized ${authUser.email}`)
        next()

    } catch (error) {
        res.json({ message: error.message })
    }
}