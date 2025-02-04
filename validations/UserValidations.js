import { body } from 'express-validator';

const registrationValidations = [
  body('firstName')
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .isString()
    .trim()
    .isLength({ min: 12, max: 64 })
    .withMessage('Password must be between 12 and 64 characters')
    .bail()
    .isStrongPassword({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must be at least 12 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    ),
];

const loginValidations = [
  body('email')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];

export { registrationValidations, loginValidations };
