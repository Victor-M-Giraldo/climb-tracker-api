import PrismaClient from '../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../utils/authUtils.js';
import configureApp from '../../utils/testUtils.js';

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

describe('DELETE climb route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should delete a climb and return 204', async () => {
    const { token } = issueJWT({ id: 1 });
    PrismaClient.climb.delete = vi.fn().mockResolvedValue({
      id: 1,
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      grade: 'V12',
      location: 'Method Climbing Gym',
    });

    const response = await request(app)
      .delete('/climbs/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(204);
  });

  it('Should return 404 when the climb to delete does not exist.', async () => {
    const { token } = issueJWT({ id: 1 });
    PrismaClient.climb.delete = vi.fn().mockRejectedValue({
      code: 'P2025',
    });

    const response = await request(app)
      .delete('/climbs/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(404);
  });
});

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

describe('Climb route validations', () => {
  it('Should return a 400 when the grade is invalid', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V500',
        location: 'Method Climbing Gym',
        completed: true,
      });

    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when the location does not exist', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V5',
        location: '',
        completed: true,
      });

    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when completed does not exist', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V5',
        location: 'Method Climbing Gym',
        completed: '',
      });
    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when completed is not a boolean', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs')
      .auth(token, { type: 'bearer' })
      .send({
        grade: 'V5',
        location: 'Method Climbing Gym',
        completed: 'Bananas',
      });
    expect(response.statusCode).toBe(400);
  });

  it('Should return a 401 when a user is unauthorized.', async () => {
    const response = await request(app).get('/climbs');

    expect(response.statusCode).toBe(401);
  });
});
