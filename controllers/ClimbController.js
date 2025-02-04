import asyncHandler from 'express-async-handler';
import PrismaClient from '../database/PrismaClient.js';
import { ApiException } from '../errors/ApiErrors.js';

const getClimbsForUser = asyncHandler(async (req, res) => {
  let { userId } = req.params;

  userId = parseInt(userId);

  if (req.user.id !== userId) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view climbs for this user',
      403
    );
  }

  const climbs = await PrismaClient.climb.findMany({
    where: {
      userId: userId,
    },
  });

  res.json({
    data: {
      climbs,
    },
  });
});

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

const getClimb = asyncHandler(async (req, res) => {
  let { userId, climbId } = req.params;

  userId = parseInt(userId);
  climbId = parseInt(climbId);

  if (req.user.id !== userId) {
    res.status(403);
    throw new ApiException(
      'You are not authorized to view climbs for this user',
      403
    );
  }

  const climb = await PrismaClient.climb.findUnique({
    where: {
      id: climbId,
    },
  });

  if (!climb) {
    res.status(404);
    throw new ApiException('Climb not found', 404);
  }

  return res.status(200).json({
    data: {
      climb,
    },
  });
});

export { createClimb, getClimbsForUser, getClimb };
