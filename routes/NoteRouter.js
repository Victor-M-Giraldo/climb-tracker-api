import { Router } from "express";
import *  as NoteController from "../controllers/NoteController.js";

const NoteRouter = Router({mergeParams: true});

NoteRouter.get("/:noteId", NoteController.getNote);

NoteRouter.delete("/:noteId", NoteController.deleteNote);

NoteRouter.post("/", NoteController.createNote);

export default NoteRouter;
