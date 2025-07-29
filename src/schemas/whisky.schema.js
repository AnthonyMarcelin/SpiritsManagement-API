import Joi from "joi";

const whiskySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(1000),
  review: Joi.string().allow('').max(1000),
  price: Joi.number().positive().required(),
  note: Joi.number().min(0).max(10).precision(1).allow(null),
  photo: Joi.string().allow(''),
  origin: Joi.string().min(2).max(100), // saisie libre
  supplier: Joi.string().min(2).max(100), // saisie libre
  labelId: Joi.number().integer().required(), // choix dans un select
  peatLevelId: Joi.number().integer().required(), // choix dans un select
  typeId: Joi.number().integer().required(), // choix dans un select
});

export default whiskySchema;
