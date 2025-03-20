const { body, validationResult } = require('express-validator');

const createContactRulesInterceptor = () => [
  body('email', 'Must be a valid email').isEmail(),
  body('firstName', 'First name is required').notEmpty(),
];

const validateRules = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors
    .array()
    .map((error) => ({ [error.path]: error.msg }));
  return res.status(422).json({ errors });
};

module.exports = {
  createContactRulesInterceptor,
  validateRules,
};
