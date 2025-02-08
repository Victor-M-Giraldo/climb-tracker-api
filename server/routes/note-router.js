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
  '/:climbId/notes/:noteId',
  withValidation(getNoteValidations),
  NoteController.getNote
);

NoteRouter.delete(
  '/:climbId/notes/:noteId',
  withValidation(deleteNoteValidations),
  NoteController.deleteNote
);

NoteRouter.post(
  '/:climbId/notes',
  withValidation(createNoteValidations),
  NoteController.createNote
);

export default NoteRouter;
