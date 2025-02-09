import PrismaClient from '../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../utils/authUtils.js';
import configureApp from '../../utils/testUtils.js';

const app = configureApp();

describe('GET note route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should get a note and return 200', async () => {
    const { token } = issueJWT({ id: 1 });
    PrismaClient.note.findUnique = vi.fn().mockResolvedValue({
      id: 1,
      content: 'foobarfoobar',
      createdAt: new Date(),
      updatedAt: new Date(),
      climbId: 1,
    });

    const response = await request(app)
      .get('/climbs/1/notes/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(200);
  });

  it('Should return a 404 when a note is not found', async () => {
    PrismaClient.climb.findUnique = vi.fn().mockResolvedValue();

    const { token } = issueJWT({ id: 1 });

    const response = await request(app)
      .get('/climbs/1/notes/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE note route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should delete a note and return 204', async () => {
    const { token } = issueJWT({ id: 1 });
    PrismaClient.note.delete = vi.fn().mockResolvedValue({
      id: 1,
      content: 'foobarfoobar',
      createdAt: new Date(),
      updatedAt: new Date(),
      climbId: 1,
    });

    const response = await request(app)
      .delete('/climbs/1/notes/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(204);
  });

  it('Should return a 404 when invalid permissions, or note does not exist', async () => {
    const { token } = issueJWT({ id: 1 });
    PrismaClient.note.delete = vi.fn().mockRejectedValue({
      code: 'P2025',
    });

    const response = await request(app)
      .delete('/climbs/1/notes/1')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(404);
  });
});

describe('POST note route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should create a note and return 201', async () => {
    PrismaClient.note.create = vi.fn().mockResolvedValue({
      id: 1,
      content: 'foobarfoobarfoobar',
      createdAt: new Date(),
      updatedAt: new Date(),
      climbId: 1,
    });

    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs/1/notes')
      .auth(token, { type: 'bearer' })
      .send({
        content: 'foobarfoobarfoobar',
      });

    expect(response.statusCode).toBe(201);
  });

  it('Should return 404 when invalid permissions, or climb does note exist.', async () => {
    PrismaClient.note.create = vi.fn().mockRejectedValue({
      code: 'P2025',
    });
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs/1/notes')
      .auth(token, { type: 'bearer' })
      .send({
        content: 'foobarfoobarfoobar',
      });

    expect(response.statusCode).toBe(404);
  });
});

describe('Note route validations', () => {
  it('Should return a 400 when the content does not exist', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs/1/notes')
      .auth(token, { type: 'bearer' })
      .send({
        content: '',
      });
    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when the content is too short', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs/1/notes')
      .auth(token, { type: 'bearer' })
      .send({
        content: 'T'.repeat(9),
      });
    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when the content is too long', async () => {
    const { token } = issueJWT({ id: 1 });
    const response = await request(app)
      .post('/climbs/1/notes')
      .auth(token, { type: 'bearer' })
      .send({
        content: 'T'.repeat(256),
      });
    expect(response.statusCode).toBe(400);
  });
});
