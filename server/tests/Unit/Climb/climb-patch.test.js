import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../../utils/authUtils.js';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

describe('PATCH climb route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should update a climb and return 204', async () => {
    const { token } = issueJWT({ id: 1 });

    PrismaClient.climb.update = vi.fn().mockResolvedValue({
      id: 1,
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      grade: 'V12',
      location: 'Method Climbing Gym',
    });

    const response = await request(app)
      .patch('/climbs/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(204);
  });

  it('Should return 404 when the climb to delete does not exist.', async () => {
    const { token } = issueJWT({ id: 1 });
    PrismaClient.climb.update = vi.fn().mockRejectedValue({
      code: 'P2025',
    });

    const response = await request(app)
      .patch('/climbs/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(404);
  });
});
