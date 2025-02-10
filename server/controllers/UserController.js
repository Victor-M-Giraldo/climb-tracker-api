import PrismaClient from '../database/PrismaClient.js';
import bcryptjs from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { issueJWT } from '../utils/authUtils.js';
import { ApiException } from '../errors/ApiErrors.js';

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const existingUser = await PrismaClient.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });

  if (existingUser) {
    throw new ApiException('User with that email already exists', 409);
  }

  const newUser = await PrismaClient.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    },
  });

  const { password: _, ...userResponse } = newUser;

  const { token, expiresIn } = issueJWT(newUser);

  res
    .status(201)
    .header('Location', `/users/${newUser.id}`)
    .json({
      message: 'User created successfully',
      data: {
        token: `bearer ${token}`,
        expiresIn: expiresIn,
        user: userResponse,
      },
    });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await PrismaClient.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });

  if (!user) {
    throw new ApiException('Invalid email or password', 401);
  }

  const match = await bcryptjs.compare(password, user.password);

  if (!match) {
    throw new ApiException('Invalid email or password', 401);
  }

  const { token, expiresIn } = issueJWT(user);

  const existingUser = {
    firstName: user.firstName,
    lastName: user.lastName,
  };
  res.json({
    message: 'User logged in successfully',
    data: {
      token: `Bearer ${token}`,
      expiresIn,
      user: existingUser,
    },
  });
});

export { registerUser, loginUser };
