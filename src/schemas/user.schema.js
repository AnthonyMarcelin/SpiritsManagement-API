import Joi from "joi";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const registerSchema = Joi.object({
  pseudo: Joi.string().min(2).max(20).required(),
  firstname: Joi.string().min(2).max(30).required(),
  lastname: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(passwordPattern)
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    }),

  isAdmin: Joi.boolean().default(false),

});

export default registerSchema;
