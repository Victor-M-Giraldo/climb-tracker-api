import configureApp from '../../../utils/testUtils.js';
import { issueJWT } from '../../../utils/authUtils.js';
import request from 'supertest';

const app = configureApp();

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
