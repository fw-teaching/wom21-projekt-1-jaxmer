const express = require('express'),
    router = express.Router(),
    User = require('../models/usersModel'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')

// GET USERS (DELETE LATER)
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// USER LOGIN w/ email & password
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec(),
            match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const jwtBody = {
                sub: user._id,
                email: user.email
            },
                accessToken = await jwt.sign(
                    jwtBody,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' })
            return res.status(201).send(`Login SUCCESSFUL`)
            //return res.status(201).send(`Login SUCCESSFUL, access token: ${accessToken}`)
        } else res.status(201).send('Login FAILED')

    } catch (error) {
        res.status(500).send({ message: "Oops, something went wrong: " + error.message })
    }
})

// CREATE USER
router.post('/', async (req, res) => {
    try {
        // Do not change/touch the number 8
        const hashedPassword = await bcrypt.hash(req.body.password, 8),
            user = new User({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashedPassword
            }),
            newUser = await user.save()
        res.status(201).send(newUser)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// DELETE a USER by _id
router.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id }).exec()
        res.json({ message: "User deleted!" })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router