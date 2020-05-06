const bcrypt = require('bcrypt')

module.exports = {
  beforeSave: async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword
  },
}
