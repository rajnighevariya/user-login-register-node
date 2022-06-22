const catchAsyncError = require('../middleware/catchAsyncError');
let User = require('../models/userModel');
let Vendor = require('../models/vendorModel');
let Bcrypt = require('bcryptjs');
let senToken = require('../utils/jwtToken');
const userValidator = require('../validator/userValidator');
const errorHandler = require('../utils/catchErrohandler');


module.exports = {
    userSignin: catchAsyncError(async (req, res, next) => {
        const { firstname, lastname, email, password, contact_number, roles } = req.body;

        await userValidator.userRegister.validateAsync(req.body)

        const finduser = await User.findOne({ $or: [{ email }, { contact_number }] });

        if (!finduser) {
            let hashpass = Bcrypt.hashSync(password, 10);
            let userData = {
                firstname, lastname, email, password: hashpass, contact_number, roles
            }
            let newuser = new User(userData);
            await newuser.save();
            senToken(newuser, 200, res)

        } else {
            res.status(200).json({
                success: true,
                msg: 'Alrready Register.',
                user: finduser
            })
        }
    }),
    userLogin: catchAsyncError(async (req, res, next) => {
        const { email, password, contact_number } = req.body;

        let conditions;
        await userValidator.userLogin.validateAsync(req.body)

        if (email && contact_number) {
            conditions = { $and: [{ contact_number }, { email }] }
        }
        else if (!email) {
            conditions = { contact_number }
        }
        else {
            conditions = { email }
        }

        const finduser = await User.findOne(conditions);

        if (finduser) {
            if (!email) {
                senToken(finduser, 200, res)
            } else if (!password) {
                return next(new errorHandler('Please Enter password..', 201))
            }
            let isCurretpass = Bcrypt.compareSync(password, finduser.password);
            if (isCurretpass) {
                senToken(finduser, 200, res)

            } else {
                return next(new errorHandler('User password is incorrect.Please write right  Password.', 201))
            }

        } else {
            return next(new errorHandler('user not Found', 201))
        }
    }),
}