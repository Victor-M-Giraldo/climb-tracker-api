import PrismaClient from '../database/PrismaClient.js';
import express from 'express';
import request from 'supertest';
import bcryptjs from 'bcryptjs';
import UserRouter from '../routes/user-router.js';
import ErrorHandler from '../middleware/errorhandler.js';

const app = express();
app.use(express.json());
app.use('/', UserRouter);
app.use(ErrorHandler);

describe('User Registration', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('POST /register', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue(null);
    PrismaClient.user.create = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
    });

    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toBe(
      'application/json; charset=utf-8'
    );
    expect(response.headers['location']).toBe('/users/1');

    expect(response.body).toEqual({
      message: 'User created successfully',
      data: {
        user: {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: 'testuser@gmail.com',
        },
      },
    });
  });

  test('POST /register with duplicate email', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
    });

    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(409);

    expect(response.body).toEqual({
      error: 'User with that email already exists',
    });
  });

  test('POST /register with a first name that is too short', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'T',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a first name that is too long', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'T'.repeat(51),
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      });

    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a last name that is too short', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'U',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a last name that is too long', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'U'.repeat(51),
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      });

    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a password that is too short', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'P',
    });
    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a password that is too long', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'P'.repeat(65),
      });
    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a password that does not contain at least one capital letter', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'passwordss%1',
    });
    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a password that does not contain at least lowercase capital letter', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'PASSWORDSS%1',
    });
    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a password that does not contain at least one symbol', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordsss1',
    });
    expect(response.statusCode).toBe(400);
  });

  test('POST /register with a password that does not contain at least one number', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%s',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('User Login', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('POST /login', async () => {
    bcryptjs.compare = vi.fn().mockResolvedValue(true);
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      message: 'User logged in successfully',
      data: {
        expiresIn: '7d',
        token: expect.any(String),
        user: {
          firstName: 'Test',
          lastName: 'User',
        },
      },
    });
  });

  test('POST /login with invalid email', async () => {
    const response = await request(app).post('/login').send({
      email: 'abcdefgh',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  test('POST /login with no email', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  test('POST /login with no password', async () => {
    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: '',
    });

    expect(response.statusCode).toBe(400);
  });

  test('POST /login with email that does not match', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue(null);

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(401);
  });

  test('POST /login with password that does not match', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'password',
    });

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordsx%1',
    });

    expect(response.statusCode).toBe(401);
  });
});
