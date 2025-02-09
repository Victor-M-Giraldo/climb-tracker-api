import PrismaClient from '../../../database/PrismaClient.js';
import request from 'supertest';
import { issueJWT } from '../../../utils/authUtils.js';
import configureApp from '../../../utils/testUtils.js';

const app = configureApp();

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
