import { body, param } from 'express-validator';

const grades = [
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V10',
  'V11',
  'V12',
];

const createClimbValidations = [
  body('grade')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Grade is required')
    .bail()
    .isIn(grades)
    .withMessage(`Invalid grade, must be one of: ${grades.join(', ')}`),
  body('location')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  body('completed')
    .optional()
    .trim()
    .isBoolean()
    .withMessage('Completed must be a boolean')
    .toBoolean(),
  param('userId').isInt().toInt().withMessage('User ID must be an integer'),
];

const getClimbValidations = [
  param('userId').isInt().toInt().withMessage('User ID must be an integer'),
];

export { createClimbValidations, getClimbValidations };
