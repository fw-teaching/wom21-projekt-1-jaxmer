const express = require('express'),
    router = express.Router(),
    Cabins = require('../models/cabinsModel'),
    Authorize = require('../middleware/authorizeToken')

router.use(Authorize)

// GET/List all cabins post
router.get('/', async (req, res) => {
    try {
        const cabins = await Cabins.find()
        res.send(cabins)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// POST/Create a new cabin post
router.post('/', async (req, res) => {
    try {
        const cabin = new Cabins({
            address: req.body.address,
            size: req.body.size,
            sauna: req.body.sauna,
            beach: req.body.beach,
            rent: req.body.rent
        }),
            newCabin = await cabin.save()
        res.status(201).send(newCabin)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Middleware
const getCabinByID = async (req, res, next) => {
    const cabin = await Cabins.findOne({ _id: req.params.id }).exec()
    if (!cabin) return res.status(404).json({ message: 'Cabin not found.' })
    req.cabin = cabin
    next()
}

// GET a specific cabin post
router.get('/:id', getCabinByID, async (req, res) => {
    try {
        res.send(req.cabin)

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// PUT/Update a specific cabin post
router.put('/:id', getCabinByID, async (req, res) => {
    try {
        req.cabin.updateOne(req.body).exec()
        res.json({ message: "Cabin info updated!" })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// DELETE a specific cabin post
router.delete('/:id', async (req, res) => {
    try {
        await Cabins.deleteOne({ _id: req.params.id }).exec()
        res.json({ message: "Cabin post deleted!" })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router