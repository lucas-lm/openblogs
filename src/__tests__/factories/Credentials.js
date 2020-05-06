const faker = require('faker/locale/pt_BR')

class Credentials {
  constructor() {
    this.email = faker.internet.email()
    this.password = faker.internet.password()
  }
}

module.exports = Credentials
