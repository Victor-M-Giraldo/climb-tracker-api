import { body, validationResult } from "express-validator";

const registrationValidations = [
  body("firstName").isString().trim().notEmpty().isLength({ min: 2, max: 50 }),
  body("lastName").isString().trim().notEmpty().isLength({ min: 2, max: 50 }),
  body("email").isString().trim().notEmpty().isEmail(),
  body("password")
    .isString()
    .trim()
    .isLength({ min: 12, max: 64 })
    .isStrongPassword(),
];

const loginValidations = [
  body("email").isString().trim().notEmpty().isEmail(),
  body("password").isString().trim().notEmpty(),
];

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
}

export { registrationValidations, loginValidations, validateRequest };
