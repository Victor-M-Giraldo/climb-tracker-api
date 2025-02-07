import asyncHandler from 'express-async-handler';
import PrismaClient from '../database/PrismaClient.js';
import { ApiException } from '../errors/ApiErrors.js';

const getClimbsForUser = asyncHandler(async (req, res) => {
  const climbs = await PrismaClient.climb.findMany({
    where: {
      userId: req.user.id,
    },
    include: {},
  });

  res.status(200).json({
    data: {
      climbs,
    },
  });
});

const createClimb = asyncHandler(async (req, res) => {
  const { grade, location, completed } = req.body;

  const climb = await PrismaClient.climb.create({
    data: {
      grade: grade,
      location: location,
      completed: completed,
      user: {
        connect: {
          id: req.user.id,
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
  let { climbId } = req.params;

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

const deleteClimb = asyncHandler(async (req, res) => {
  let { climbId } = req.params;

  await PrismaClient.climb.delete({
    where: {
      id: climbId,
    },
  });

  return res.status(204).end();
});

const updateClimb = asyncHandler(async (req, res) => {
  let { climbId } = req.params;
  const { grade, location, completed } = req.body;

  const updateData = {};
  if (grade) {
    updateData.grade = grade;
  }

  if (location) {
    updateData.location = location;
  }

  if (completed) {
    updateData.completed = completed;
  }

  await PrismaClient.climb.update({
    where: {
      id: climbId,
    },
    data: {
      ...updateData,
    },
  });

  res.set('Content-Location', `/climbs/${climbId}`);
  return res.status(204).end();
});

export { createClimb, getClimbsForUser, getClimb, updateClimb, deleteClimb };
