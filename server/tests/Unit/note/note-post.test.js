import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../../utils/authUtils.js';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

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

  it('Should return 404 when invalid permissions, or climb does note exist.', async() => {
    PrismaClient.note.create = vi.fn().mockRejectedValue({
        code: 'P2025'
    })
    const { token } = issueJWT({ id: 1});
    const response = await request(app)
      .post('/climbs/1/notes')
      .auth(token, { type: 'bearer' })
      .send({
        content: 'foobarfoobarfoobar',
      });

    expect(response.statusCode).toBe(404)
  })
});
