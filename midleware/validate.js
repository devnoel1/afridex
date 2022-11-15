import Joi from 'joi';

const registerValidation = (data)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confirm_password: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })
    })

    return schema.validate(data)
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4),
    })

    return schema.validate(data)
}


module.exports = {registerValidation,loginValidation}