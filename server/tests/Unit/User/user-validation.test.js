import configureApp from '../../../utils/testUtils.js';
import request from 'supertest';

const app = configureApp();

describe('User registration validation', () => {
  it('Should return 400 when the first name does not exist', async () => {
    const response = await request(app).post('/register').send({
      firstName: '',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });
    expect(response.status).toBe(400);
  });

  it('Should return 400 when the first name is too short', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'T',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });
    expect(response.status).toBe(400);
  });

  it('Should return 400 when the first name is too long', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'T'.repeat(51),
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      });

    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 when the last name does not exist', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: '',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });
    expect(response.status).toBe(400);
  });

  it('Should return 400 when the last name is too short', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'U',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });
    expect(response.status).toBe(400);
  });

  it('Should return 400 when the last name is too long', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'U'.repeat(51),
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      });

    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 when the email does not exist', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: '',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 when the email is invalid', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'nonsense',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 when the password does not exist', async () => {
    const response = await request(app).post('/register').send({
      firstName: '',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'P',
    });
    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 when the password is too short', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'P',
    });
    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 when the password is too long', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'P'.repeat(65),
      });
    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 with a password that does not contain at least one capital letter', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'passwordss%1',
    });
    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 with a password that does not contain at least lowercase letter', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'PASSWORDSS%1',
    });
    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 with a password that does not contain at least one symbol', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordsss1',
    });
    expect(response.statusCode).toBe(400);
  });

  it('Should return 400 with a password that does not contain at least one number', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%s',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('User login validation', () => {

  it('Should return a 400 when the email does not exist', async () => {
    const response = await request(app).post('/login').send({
      email: '',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when the email is invalid', async () => {
    const response = await request(app).post('/login').send({
      email: 'nonsense',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(400);
  });

  it('Should return a 400 when the password does not exist.', async () => {
    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: '',
    });

    expect(response.statusCode).toBe(400);
  });

});
