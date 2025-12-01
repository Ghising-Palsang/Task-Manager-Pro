const joi = require("joi");

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/;




const LoginUserDTO = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const RegisterUserDTO = joi.object({
  name: joi.string().min(2).max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().regex(passwordPattern).required(),
  confirmPassword: joi.ref("password"),
  role: joi.string().regex(/^(customer|seller|admin)$/),
});

module.exports = { LoginUserDTO, RegisterUserDTO };
