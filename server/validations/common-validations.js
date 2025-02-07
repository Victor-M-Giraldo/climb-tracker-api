import { param } from 'express-validator';

function validateId(paramName) {
  return param(paramName)
    .isInt({ min: 1 })
    .withMessage(`${paramName} must be a positive integer`)
    .toInt();
}

export { validateId };
