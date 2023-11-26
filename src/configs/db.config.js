const mongoose = require('mongoose');


const mongo = async () =>{ await mongoose.connect(process.env.MONGO_URI)}

module.exports = {
    mongo
}