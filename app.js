const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorhandler = require('./middleware/errorHandler');
let mongodbCoonect = require('./database/monodbConnection');
var expressLayouts = require('express-ejs-layouts');
let path = require('path')
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))

app.use(expressLayouts);
app.set('view engine', 'ejs');
let userRoutes = require('./routes/userRoutes');
//mongodb connection
mongodbCoonect()

// server port
const PORT = process.env.SERVER_PORT


app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

//router user 
app.use('/user', userRoutes)

app.get('/', (req, res) => {

    res.status(200).json({
        success: true,
        message: 'Welcome In Our App.'
    })
})

// Middleware for Errors
app.use(errorhandler)


module.exports = app;
// app.listen(PORT, () => {
//     console.log('Server Run On This' + PORT)
// })
