const supertest = require('supertest')
const app = require('../../app')
const request = supertest(app)

describe('Article operations', () => {
  const newArticle = { title: 'My article' }
  let token

  beforeAll(async () => {
    const user = { email: 'lo@mail.com', password: '123456' }
    await request.post('/register').send(user)
    const { body } = await request.post('/get_token').send(user)
    token = body.token
  })

  it('should be able to create a new article', async () => {
    const { status } = await request
      .post('/article')
      .send(newArticle)
      .set({ Authorization: `Bearer ${token}` })

    expect(status).toBe(201)
  })

  it('should not be able to create a new article without authentication', async () => {
    const { status } = await request.post('/article').send(newArticle)
    expect(status).toBe(401)
  })

  it('should list all articles', async () => {
    const { body: articles } = await request.get('/articles')
    expect(articles).toHaveLength(1)
  })

  // TODO: route for deleting and updating article
})
