import Joi from "joi";

const rhumSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(1000),
  review: Joi.string().allow('').max(1000),
  price: Joi.number().positive().allow(null).required(),
  note: Joi.number().min(0).max(10).precision(1).allow(null),
  photo: Joi.string().allow(''),
  origin: Joi.string().min(2).max(100).required(),
  supplier: Joi.string().min(2).max(100).required(),
  labelId: Joi.number().integer().required(),
  typeId: Joi.number().integer().required(),
});


export const rhumUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow('').max(1000),
  review: Joi.string().allow('').max(1000),
  price: Joi.number().positive().allow(null),
  note: Joi.number().min(0).max(10).precision(1).allow(null),
  photo: Joi.string().allow(''),
  origin: Joi.string().min(2).max(100),
  supplier: Joi.string().min(2).max(100),
  labelId: Joi.number().integer(),
  typeId: Joi.number().integer(),
});

export default rhumSchema;
