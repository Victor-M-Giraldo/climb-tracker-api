import { body } from 'express-validator';
import { GRADES } from '../constants/index.js';
import { validateId } from './common-validations.js';

const validateGrade = () =>
  body('grade')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Grade is required')
    .bail()
    .isIn(GRADES)
    .withMessage(`Invalid grade, must be one of: ${GRADES.join(', ')}`);

const validateLocation = () =>
  body('location')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Location is required');

const validateCompleted = () =>
  body('completed')
    .optional()
    .trim()
    .isBoolean()
    .withMessage('Completed must be a boolean')
    .toBoolean();

const updateClimbValidations = [
  validateGrade().optional(),
  validateLocation().optional(),
  validateCompleted(),
  validateId('climbId'),
];

const createClimbValidations = [
  validateGrade(),
  validateLocation(),
  validateCompleted(),
];

const deleteClimbValidations = [validateId('climbId')];

const getClimbValidations = [validateId('climbId')];

export {
  createClimbValidations,
  updateClimbValidations,
  deleteClimbValidations,
  getClimbValidations,
};
