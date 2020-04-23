describe('Test environment settings', () => {
  it('should be in testing environment', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  it('should load environment variables', () => {
    const { SECRET, PORT, JWT_TIMESPAN } = process.env
    expect(SECRET).not.toBeUndefined()
    expect(PORT).not.toBeUndefined()
    expect(JWT_TIMESPAN).not.toBeUndefined()
  })
})
