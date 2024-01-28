const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Zidan-shop:58285828@cluster0.5pqbie3.mongodb.net/hotel-booking'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', () => {
    console.log('Mongo DB connection failed')
})

connection.on('connected', () => {
    console.log('Mongo DB connection successful')
})

module.exports = mongoose