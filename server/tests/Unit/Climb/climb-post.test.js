import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../../utils/authUtils.js';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

describe('POST climb route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should create a climb and return 200', async () => {
    PrismaClient.climb.create = vi.fn().mockResolvedValue({
      climb: {
        id: 1,
        grade: 'V5',
        location: 'Method Climbing Gym',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
    });

    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V5',
        location: 'Method Climbing Gym',
        completed: true,
      });

    expect(response.statusCode).toBe(201);
  });

  it('Should return a 401', async () => {
    const response = await request(app).post('/climbs').send({
      grade: 'V5',
      location: 'Method Climbing Gym',
      completed: true,
    });

    expect(response.statusCode).toBe(401);
  });
});
