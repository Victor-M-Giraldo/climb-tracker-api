import PrismaClient from '../database/PrismaClient.js';
import ClimbRouter from '../routes/climb-router.js';
import request from 'supertest';
import express from 'express';
import ErrorHandler from '../middleware/errorhandler.js';
import { issueJWT } from '../utils/authUtils.js';
import passport from '../config/auth/passport.js';

const app = express();
app.use(express.json());
app.use(
  '/climbs',
  passport.authenticate('jwt', { session: false }),
  ClimbRouter
);
app.use(ErrorHandler);

describe('Climb Creation', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('POST /climbs', async () => {
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
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);
  });

  test('POST /climbs with invalid grade', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V500',
        location: 'Method Climbing Gym',
        completed: true,
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
  });

  test('POST /climbs with invalid location', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V5',
        location: '',
        completed: true,
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
  });

  test('POST /climbs with invalid completed', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V5',
        location: 'Method Climbing Gym',
        completed: '',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(400);
  });

  test('POST /climbs where user is not authorized', async () => {
    const response = await request(app)
      .post('/climbs')
      .send({
        grade: 'V5',
        location: 'Method Climbing Gym',
        completed: true,
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(401);
  });
});
