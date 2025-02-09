import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../../utils/authUtils.js';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

describe('Get note route', () => {
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
      .auth(token, { type: 'bearer' })

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
