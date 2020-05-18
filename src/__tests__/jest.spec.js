describe('Test environment settings', () => {
  it('should be in testing environment', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  it('should load environment variables', () => {
    const { SECRET, PORT, JWT_LIFESPAN, SENDGRID_API_KEY } = process.env
    expect(SECRET).not.toBeUndefined()
    expect(PORT).not.toBeUndefined()
    expect(JWT_LIFESPAN).not.toBeUndefined()
    expect(SENDGRID_API_KEY).not.toBeUndefined()
  })
})
