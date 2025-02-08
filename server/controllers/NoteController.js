import expressAsyncHandler from 'express-async-handler';
import PrismaClient from '../database/PrismaClient.js';
import { ApiException } from '../errors/ApiErrors.js';
import { isPrismaError } from '../utils/prismaUtils.js';

const getNote = expressAsyncHandler(async (req, res) => {
  const { climbId, noteId } = req.params;
  const userId = req.user.id;

  const note = await PrismaClient.note.findUnique({
    where: {
      id: noteId,
      climb: {
        id: climbId,
        userId: userId,
      },
    },
  });

  if (!note) {
    throw new ApiException('Note not found', 404);
  }

  return res.status(200).json({
    data: {
      note,
    },
  });
});

const createNote = expressAsyncHandler(async (req, res) => {
  const { climbId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const note = await PrismaClient.note.create({
      data: {
        content,
        climb: {
          connect: {
            id: climbId,
            userId: userId,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Note created successfully',
      data: { note },
    });
  } catch (e) {
    if (isPrismaError(e, 'P2025')) {
      throw new ApiException('Climb not found or unauthorized', 404);
    } else {
      throw new ApiException('Something went wrong', 500);
    }
  }
});

const deleteNote = expressAsyncHandler(async (req, res) => {
  let { climbId, noteId } = req.params;
  let userId = req.user.id;

  try {
    await PrismaClient.note.delete({
      where: {
        id: noteId,
        climb: {
          id: climbId,
          userId: userId,
        },
      },
    });
  } catch (e) {
    if (isPrismaError(e, 'P2025')) {
      throw new ApiException('Climb not found or unauthorized', 404);
    } else {
      throw new ApiException('Something went wrong', 500);
    }
  }

  return res.status(204).end();
});

export { getNote, createNote, deleteNote };
