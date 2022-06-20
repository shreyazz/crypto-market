const mongoose = require('mongoose')
require('dotenv').config()
const DB_URI = process.env.DB_URI
const connectToDB = async () => {
    mongoose.connect(DB_URI, (err) => {
        if(err) console.log('Can not connect to the DB 🔴')
        console.log('Connected to the DB 🟢')
    })
}

module.exports = connectToDB;