import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../../utils/authUtils.js';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

describe('GET climb route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should return a 200 with a users climbs', async () => {
    PrismaClient.climb.findMany = vi.fn().mockResolvedValue([]);

    const { token } = issueJWT({ id: 1 });

    const response = await request(app)
      .get('/climbs')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(200);
  });

  it('Should return a 200 with one climb', async () => {
    PrismaClient.climb.findUnique = vi.fn().mockResolvedValue({});

    const { token } = issueJWT({ id: 1 });

    const response = await request(app)
      .get('/climbs/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(200);
  });

  it('Should return a 404 when climb is not found', async () => {
    PrismaClient.climb.findUnique = vi.fn().mockResolvedValue();

    const { token } = issueJWT({ id: 1 });

    const response = await request(app)
      .get('/climbs/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(404);
  });
});
