import PrismaClient from '../../database/PrismaClient.js';
import request from 'supertest';
import configureApp from '../../utils/testUtils.js';
import bcryptjs from 'bcryptjs';

const app = configureApp();

describe('User login route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should login a user and return 200', async () => {
    bcryptjs.compare = vi.fn().mockResolvedValue(true);

    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      message: 'User logged in successfully',
      data: {
        expiresIn: '7d',
        token: expect.any(String),
        user: {
          firstName: 'Test',
          lastName: 'User',
        },
      },
    });
  });

  it('Should return a 401 when the user account does not exist', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue(null);

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(401);
  });

  it('Should return a 401 when the password does not match', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'password',
    });

    const response = await request(app).post('/login').send({
      email: 'testuser@gmail.com',
      password: 'Passwordsx%1',
    });

    expect(response.statusCode).toBe(401);
  });
});

describe('User registration route', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('Should register a user and return 201.', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue(null);
    PrismaClient.user.create = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
    });

    const response = await request(app)
      .post('/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@gmail.com',
        password: 'Passwordss%1',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({
      message: 'User created successfully',
      data: {
        user: {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: 'testuser@gmail.com',
        },
      },
    });
  });

  it('Should throw a 409 if a user with the same email already exists.', async () => {
    PrismaClient.user.findFirst = vi.fn().mockResolvedValue({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
    });

    const response = await request(app).post('/register').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@gmail.com',
      password: 'Passwordss%1',
    });

    expect(response.statusCode).toBe(409);

    expect(response.body).toEqual({
      message: 'User with that email already exists',
      type: 'ClimbTrackerApiException',
    });
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
