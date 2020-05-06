const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const truncate = require('../utils/truncate')
const { credentialsFactory } = require('../factories')
const app = require('../../app')

const request = supertest(app)
const { SECRET } = process.env
const [validCredentials, wrongCredentials] = credentialsFactory(2)
const wrongEmail = { ...validCredentials, email: wrongCredentials.email }
const wrongPassword = {
  ...validCredentials,
  password: wrongCredentials.password,
}

describe('Register and authentication', () => {
  beforeAll(truncate)

  test('Wrong and right credentials must not match', () => {
    expect(validCredentials.email).not.toBe(wrongCredentials.email)
    expect(validCredentials.password).not.toBe(wrongCredentials.password)
  })

  describe('User register', () => {
    it('should register a new user with email and password', async () => {
      const newUser = validCredentials
      const response = await request.post('/register').send(newUser)
      const { status } = response
      expect(status).toBe(201)
    })

    it('should not register a new user with email already registered before', async () => {
      const newUser = validCredentials
      const response = await request.post('/register').send(newUser)
      const { status, body } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
    })
  })

  describe('Get token', () => {
    it('should be able to get an valid auth token with valid credentials', async () => {
      const response = await request.post('/get_token').send(validCredentials)
      const {
        status,
        body: { token, error },
      } = response
      const payload = jwt.verify(token, SECRET)
      expect(error).toBeFalsy()
      expect(status).toBe(200)
      expect(payload).toHaveProperty('sub')
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
})
