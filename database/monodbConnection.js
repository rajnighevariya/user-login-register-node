let mongoose = require('mongoose');

let mongodb_url = process.env.MONGO_URl || 'mongodb://localhost:27017/storeData'

// console.log(process.env.MONGO_URl, 'jj process.env.MONGO_URl')
let mondbConnection = () => {
    mongoose.connect(mongodb_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Mongodb connected.')
    })
}

module.exports = mondbConnection;