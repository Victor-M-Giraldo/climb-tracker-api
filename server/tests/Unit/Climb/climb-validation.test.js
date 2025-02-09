import configureApp from '../../../utils/testUtils.js';
import { issueJWT } from '../../../utils/authUtils.js';
import request from 'supertest';

const app = configureApp();

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
