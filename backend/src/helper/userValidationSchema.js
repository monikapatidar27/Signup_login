const Joi = require("joi");

const userValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
});



module.exports = userValidationSchema;
