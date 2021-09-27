require('dotenv').config()
const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3030 // Using process.env.<variableName> we can call from the .env file
app.use(express.json())

// Mongoose connection
const mongoose = require('mongoose'),
    db = mongoose.connection
mongoose.connect(process.env.DB_URL)
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))

// Testa att detta funkar, ersätt sedan med egen kod
//app.get('/', (req, res) => res.json("This is a test!"));

//Routers
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));