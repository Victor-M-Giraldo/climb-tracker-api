import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import configureApp from '../../../utils/testUtils.js';
import bcryptjs from 'bcryptjs';

const app = configureApp();

describe('User login route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should login a user and return 200', async () => {
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

  it('Should return a 401 when the user account does not exist', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue(null);

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(401);
  });

  it('Should return a 401 when the password does not match', async () => {
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
