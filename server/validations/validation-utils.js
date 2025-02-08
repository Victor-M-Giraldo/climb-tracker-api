import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationErrors.js';

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  throw new ValidationError(errors.array());
}

function withValidation(validations) {
  return [...validations, validateRequest];
}

export { withValidation };
