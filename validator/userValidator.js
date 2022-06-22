let Joi = require('joi');

module.exports = {
    userRegister: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        contact_number: Joi.number().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        roles: Joi.string().required()
    }),
    userLogin: Joi.object({
        contact_number: Joi.number(),
        email: Joi.string(),
        password: Joi.string(),
    }).or('contact_number', 'email'),
}