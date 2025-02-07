import { body } from 'express-validator';
import { validateId } from './common-validations.js';

const validateContent = () =>
  body('content')
    .isString()
    .trim()
    .isLength({ min: 10, max: 255 })
    .withMessage(
      'The content of the note must be between 10 and 255 characters.'
    );

const getNoteValidations = [validateId('noteId')];

const deleteNoteValidations = [validateId('noteId')];

const createNoteValidations = [validateContent()];

export { createNoteValidations, getNoteValidations, deleteNoteValidations };
