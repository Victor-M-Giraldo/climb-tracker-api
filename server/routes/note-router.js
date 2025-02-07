import { Router } from 'express';
import * as NoteController from '../controllers/NoteController.js';
import {
  createNoteValidations,
  getNoteValidations,
  deleteNoteValidations,
} from '../validations/note-validations.js';
import { withValidation } from '../validations/validation-utils.js';

const NoteRouter = Router({ mergeParams: true });

NoteRouter.get(
  '/:noteId',
  withValidation(getNoteValidations),
  NoteController.getNote
);

NoteRouter.delete(
  '/:noteId',
  withValidation(deleteNoteValidations),
  NoteController.deleteNote
);

NoteRouter.post(
  '/',
  withValidation(createNoteValidations),
  NoteController.createNote
);

export default NoteRouter;
