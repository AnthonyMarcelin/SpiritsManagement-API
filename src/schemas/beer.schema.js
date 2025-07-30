import Joi from "joi";

const beerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(1000),
  review: Joi.string().allow('').max(1000),
  price: Joi.number().positive().required(),
  note: Joi.number().min(0).max(10).precision(1).allow(null),
  photo: Joi.string().allow(''),
  origin: Joi.string().min(2).max(100).required(), // saisie libre
  supplier: Joi.string().min(2).max(100).required(), // saisie libre
  labelId: Joi.number().integer().required(), // choix dans un select
  typeId: Joi.number().integer().required(), // choix dans un select
});


export const beerUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow('').max(1000),
  review: Joi.string().allow('').max(1000),
  price: Joi.number().positive(),
  note: Joi.number().min(0).max(10).precision(1).allow(null),
  photo: Joi.string().allow(''),
  origin: Joi.string().min(2).max(100),
  supplier: Joi.string().min(2).max(100),
  labelId: Joi.number().integer(),
  typeId: Joi.number().integer(),
});

export default beerSchema;
