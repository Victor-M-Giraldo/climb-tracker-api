import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

describe('User registration route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should register a user and return 201.', async () => {
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

  it('Should throw a 409 if a user with the same email already exists.', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
    });

    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(409);

    expect(response.body).toEqual({
      message: 'User with that email already exists',
      type: 'ClimbTrackerApiException',
    });
  });
});
