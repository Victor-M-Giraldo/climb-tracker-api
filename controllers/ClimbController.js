import asyncHandler from 'express-async-handler';
import PrismaClient from '../database/PrismaClient.js';
import { ApiException } from '../errors/ApiErrors.js';

const createClimb = asyncHandler(async (req, res) => {
  const { grade, location, completed } = req.body;
  let { userId } = req.params;
  userId = parseInt(userId);

  if (req.user.id !== userId) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to create a climb for this user',
      403
    );
  }

  const climb = await PrismaClient.climb.create({
    data: {
      grade: grade,
      location: location,
      completed: completed,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(201).json({
    message: 'Climb created successfully',
    data: {
      climb,
    },
  });
});

export { createClimb };
