export default function validateBody(schema) {
  return (req, res, next) => {
  // Automatically convert numeric fields from string to number before validation
  // This ensures robust backend validation for multipart/form-data and harmonizes behavior across all bottle types
  const numericFields = [
	'labelId', 'typeId', 'userId', 'peatLevelId', 'price', 'note'
  ];
  numericFields.forEach((key) => {
	if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== '') {
	  const num = Number(req.body[key]);
	  if (!Number.isNaN(num)) req.body[key] = num;
	}
  });
	console.log('[VALIDATEBODY] req.body:', req.body);
	const {error} = schema.validate(req.body);
	if (error) {
	  console.error('[VALIDATEBODY] Validation error:', error.details[0].message);
	  return res.status(400).json({error : error.details[0].message})
	}
	return next();
  }
}
