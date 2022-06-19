const Joi = require('joi')

const userValidationSchema = (fields)=>{
    const validationSchema = Joi.object({
        email:Joi.string().min(8).max(32).required(),
        Password:Joi.string().min(6).max(24).required()
    })
    const {error,value} = validationSchema.validate(fields)
    return {error,value}
}

module.exports = {userValidationSchema}