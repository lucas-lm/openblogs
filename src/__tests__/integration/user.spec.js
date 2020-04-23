const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)

describe('Register and authentication', () => {
  const validCredentials = { email: 'example@mail.com', password: '123456' }
  const wrongCredentials = { email: 'wrong@mail.com', password: 'wrongpass' }
  const wrongEmail = { email: 'wrong@mail.com', password: '123456' }
  const wrongPassword = { email: 'example@mail.com', password: 'wrongpass' }
  const { SECRET } = process.env

  it('should register a new user with email and password', async () => {
    const newUser = validCredentials
    const response = await request.post('/register').send(newUser)
    const { status } = response
    expect(status).toBe(201)
  })

  it('should be able to get an auth token with valid credentials', async () => {
    const response = await request.post('/get_token').send(validCredentials)
    const {
      status,
      body: { token, error },
    } = response
    const payload = jwt.verify(token, SECRET)
    expect(status).toBe(200)
    expect(error).toBeFalsy()
    expect(payload).toHaveProperty('aud')
    expect(payload).toHaveProperty('iat')
    expect(payload).toHaveProperty('exp')
  })

  it('should not get auth token with wrong credentials', async () => {
    const response = await request.post('/get_token').send(wrongCredentials)
    const { status, body } = response
    expect(status).toBe(400)
    expect(body).toHaveProperty('error')
  })

  it('should not authenticate with wrong email', async () => {
    const response = await request.post('/get_token').send(wrongEmail)
    const { status, body } = response
    expect(status).toBe(400)
    expect(body).toHaveProperty('error', 'Email not found')
  })

  it('should not authenticate with wrong password', async () => {
    const response = await request.post('/get_token').send(wrongPassword)
    const { status, body } = response
    expect(status).toBe(400)
    expect(body).toHaveProperty('error', 'Incorrect password')
  })
})
