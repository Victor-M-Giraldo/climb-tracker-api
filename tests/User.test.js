import PrismaClient from "../database/PrismaClient.js";
import express from "express";
import request from "supertest";
import UserRouter from "../routes/UserRouter.js";

const app = express();
app.use(express.json());
app.use("/users", UserRouter);

describe("User Route", () => {
  test("POST /users/register", async () => {
    PrismaClient.user.create = vi.fn().mockResolvedValue({
      id: 1,
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
    });

    const response = await request(app)
      .post("/users/register")
      .send({
        firstName: "Test",
        lastName: "User",
        email: "testuser@gmail.com",
        password: "Passwordss%1",
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8",
    );
    expect(response.headers["location"]).toBe("/users/1");

    expect(response.body).toEqual({
      message: "User created successfully",
      data: {
        user: {
          id: 1,
          firstName: "Test",
          lastName: "User",
          email: "testuser@gmail.com",
        },
      },
    });
  });

    test("POST /users/register with duplicate email", async () => {
      PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
        id: 1,
        firstName: "Test",
        lastName: "User",
        email: "testuser@gmail.com",
      });

      const response = await request(app)
        .post("/users/register")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "testuser@gmail.com",
          password: "Passwordss%1",
        })
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");

      expect (response.statusCode).toBe(409);

        expect(response.body).toEqual({
          error: "User with that email already exists",
        });
    });
});
