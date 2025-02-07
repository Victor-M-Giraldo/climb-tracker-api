import expressAsyncHandler from 'express-async-handler';
import PrismaClient from '../database/PrismaClient.js';
import { ApiException } from '../errors/ApiErrors.js';

const getNote = expressAsyncHandler(async (req, res) => {
  let { climbId, noteId } = req.params;
  climbId = parseInt(climbId);
  noteId = parseInt(noteId);

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
    },
  });

  if (!climb) {
    throw new ApiException('Climb not found', 404);
  }

  if (climb.userId !== req.user.id) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  const note = await PrismaClient.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    throw new ApiException('Note not found', 404);
  }

  if (note.climbId !== climb.id) {
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  if (!note) {
    res.status(404);
    throw new ApiException('Note not found', 404);
  }

  return res.status(200).json({
    data: {
      note,
    },
  });
});

const createNote = expressAsyncHandler(async (req, res) => {
  let { climbId } = req.params;
  const { content } = req.body;

  climbId = parseFloat(climbId);

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
    },
  });

  if (!climb) {
    throw new ApiException('Climb not found', 404);
  }

  if (climb.userId !== req.user.id) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  const note = await PrismaClient.note.create({
    data: {
      content,
      climb: {
        connect: {
          id: climb.id,
        },
      },
    },
  });

  res.status(201).json({
    message: 'Note created successfully',
    data: {
      note,
    },
  });
});

const deleteNote = expressAsyncHandler(async (req, res) => {
  let { climbId, noteId } = req.params;

  climbId = parseInt(climbId);
  noteId = parseInt(noteId);

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
    },
  });

  if (!climb) {
    throw new ApiException('Climb not found', 404);
  }

  if (climb.userId !== req.user.id) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  const note = await PrismaClient.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    throw new ApiException('Note not found', 404);
  }

  if (note.climbId !== climb.id) {
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  await PrismaClient.note.delete({
    where: {
      id: noteId,
    },
  });

  return res.status(204).end();
});

export { getNote, createNote, deleteNote };
