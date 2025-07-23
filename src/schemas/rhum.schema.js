import Joi from "joi";

const rhumSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('').max(1000),
  review: Joi.string().allow('').max(1000),
  price: Joi.number().positive().required(),
  note: Joi.number().min(0).max(10).precision(1).allow(null),
  photo: Joi.string().allow(''),
  labelId: Joi.number().integer().required(),
  originId: Joi.number().integer().required(),
  supplierId: Joi.number().integer().required(),
  typeId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
});

export default rhumSchema;
