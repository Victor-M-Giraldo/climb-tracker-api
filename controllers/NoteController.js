import expressAsyncHandler from 'express-async-handler';
import PrismaClient from '../database/PrismaClient.js';
import { ApiException } from '../errors/ApiErrors.js';

const getNote = expressAsyncHandler(async (req, res) => {
  let { userId, climbId, noteId } = req.params;
  userId = parseInt(userId);
  climbId = parseInt(climbId);
  noteId = parseInt(noteId);

  if (req.user.id !== userId) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this user',
      403
    );
  }

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
      userId: userId,
    },
  });

  if (!climb) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  const note = await PrismaClient.note.findUnique({
    where: {
      id: noteId,
      climbId: climbId,
    },
  });

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
  let { userId, climbId } = req.params;
  const { content } = req.body;

  userId = parseFloat(userId);
  climbId = parseFloat(climbId);

  if (req.user.id !== userId) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this user',
      403
    );
  }

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
      userId: userId,
    },
  });

  if (!climb) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  const note = await PrismaClient.note.create({
    data: {
      content,
      climbId,
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
  let { userId, climbId, noteId } = req.params;

  userId = parseInt(userId);
  climbId = parseInt(climbId);
  noteId = parseInt(noteId);

  if (req.user.id !== userId) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this user',
      403
    );
  }

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
      userId: userId,
    },
  });

  if (!climb) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view notes for this climb',
      403
    );
  }

  await PrismaClient.note.delete({
    where: {
      climbId: climbId,
      id: noteId,
    },
  });

  return res.status(204).end();
});

export { getNote, createNote, deleteNote };
