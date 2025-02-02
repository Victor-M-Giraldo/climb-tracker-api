import PrismaClient from "../database/PrismaClient.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import { ApiException } from "../errors/ApiErrors.js";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const existingUser = await PrismaClient.user.findUnique({
    where: {
      email: email,
      mode: "insensitive",
    },
  });

  if (existingUser) {
    throw new ApiException("User with that email already exists", 409);
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

  res
    .status(201)
    .header("Location", `/users/${newUser.id}`)
    .json({
      message: "User created successfully",
      data: {
        user: userResponse,
      },
    });
});

export { registerUser };
