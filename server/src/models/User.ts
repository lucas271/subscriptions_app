import { conn } from '../app'
import validator from 'validator'
import bcrypt from 'bcrypt'
// it would be more perfomatic to not run the method "tableHandler" everytime,
// but it's intentionally put here for visual matters
// it's important to also mention that userValidation should Also be done in mysql query

export interface UserInterface{
  username: string,
  email: string,
  cpf: string,
  password?: string
}

interface bodyInterface{
  email?: string,
  cpf: string,
  username?: string,
  password: string,
}

class User {
  public body: bodyInterface

  public errors: string[]
  public user: UserInterface | null

  constructor (body: bodyInterface) {
    this.body = body
    this.errors = []
    this.user = null
  }

  public async loginUser () {
    await this.tableHandler()
    this.userValidation('login')

    if (this.errors.length > 0) return this.errors

    const checkIfCustomerExists: UserInterface[] = await new Promise(resolve => {
      conn.query(`SELECT * FROM customers WHERE cpf = "${this.body.cpf}"`, (_err, res) => {
        if (_err) this.errors.push('server error')
        resolve(JSON.parse(JSON.stringify(res)))
      })
    })

    if (checkIfCustomerExists.length < 1) return this.errors.push('customer does not exist')
    if (!checkIfCustomerExists[0].password) return this.errors.push('Server Error')

    if (!(bcrypt.compareSync(this.body.password, checkIfCustomerExists[0].password))) return this.errors.push('invalid credentials')
    if (this.errors.length > 0) return this.errors
    this.user = {
      email: checkIfCustomerExists[0].email,
      username: checkIfCustomerExists[0].username,
      cpf: checkIfCustomerExists[0].cpf
    }
  }

  public async createUser () {
    await this.tableHandler()
    this.userValidation('register')
    if (this.errors.length > 0) return this.errors

    const checkIfCustomerExists: [] = await new Promise(resolve => {
      conn.query(`SELECT * FROM customers WHERE cpf = "${this.body.cpf}" or email = "${this.body.email}" or username = "${this.body.username}"`, (_err, res) => {
        if (_err) this.errors.push('server error')
        resolve(res)
      })
    })

    if (checkIfCustomerExists.length > 0) return this.errors.push('customer already exists')
    if (this.errors.length > 0) return this.errors

    await new Promise(resolve => {
      const createCostumerQuery = 'INSERT INTO customers(email, username, password, cpf)' +
     `VALUES("${this.body.email}", "${this.body.username}",` +
     ` "${bcrypt.hashSync(this.body.password, 6)}", "${this.body.cpf}")`

      conn.query(createCostumerQuery, (_err, res) => {
        if (_err) this.errors.push('could not create user')
        resolve(res)
      })
    })

    if (this.errors.length > 0) return this.errors
    this.user = {
      username: String(this.body.username),
      email: String(this.body.email),
      cpf: this.body.cpf
    }
  }

  private async tableHandler (): Promise<void> {
    await new Promise(resolve => {
      conn.query('CREATE TABLE IF NOT EXISTS customers (email VARCHAR(244) NOT NULL UNIQUE, username VARCHAR(244) NOT NULL UNIQUE, password VARCHAR(512) NOT NULL, cpf VARCHAR(24) PRIMARY KEY)', (_err, res) => {
        if (_err) resolve(this.errors.push(String(_err)))
        resolve(res)
      })
    })
  }

  private userValidation (validationType: string) {
    if (validationType === 'register') {
      if (!this.body.username || !this.body.email) return this.errors.push('Empty spaces')
      if (!validator.isEmail(this.body.email)) return this.errors.push('invalid email')
    }
    if (!this.body.password || !this.body.cpf) return this.errors.push('Empty spaces')

    this.validateCPF()

    if (this.body.password.length > 20) this.errors.push('password cannot be longer than 20 chars')
    if (this.body.password.length < 6) this.errors.push('password cannot be smaller than 20 chars')
  }

  private validateCPF = () => {
    const cleanCPF: string = this.body.cpf.split('.').join('').split('-').join('')
    const CPFNumbers: number[] = Array.from(cleanCPF).map((cv) => {
      return Number(cv)
    })

    // first Number validation
    const firstNumberMultiplied: number[] = []
    for (let i = 10; i >= 2; i--) {
      firstNumberMultiplied.push(CPFNumbers[10 - i] * i)
    }

    // reduce firstNumberMultiplied, multiplies it times 10,
    // get the rest of the division resulted from the multiplied number divided by 11
    const firstNumberTotal: number = firstNumberMultiplied.reduce((pv, cv) => pv + cv) * 10 % 11

    // secondNumberValidation
    const secondNumberMultiplied: number[] = []
    for (let i = 11; i >= 2; i--) {
      secondNumberMultiplied.push(CPFNumbers[11 - i] * i)
    }

    // reduce firstNumberMultiplied, multiplies it times 10,
    // get the rest of the division resulted from the multiplied number divided by 11
    const secondNumberTotal = secondNumberMultiplied.reduce((pv, cv) => pv + cv) * 10 % 11

    if (cleanCPF.length < 11) return this.errors.push('invalid cpf')

    // check if all numbers are the same
    const trues: boolean[] = []
    for (let i = 0; i < cleanCPF.length; i++) {
      if (cleanCPF[i] === (cleanCPF[i - 1] ? cleanCPF[i - 1] : cleanCPF[i + 1])) {
        trues.push(true)
      }
    }
    if (trues.length === 11) return this.errors.push('invalid cpf')
    // reminder if firstNumberTotal/secondNumberTotal total
    // is equal to 10 it must be considered a 0

    // check if firstNumberTotal is equal to cpf first digit
    if (cleanCPF[9] !== String(firstNumberTotal) &&
    firstNumberTotal !== 10 && cleanCPF[9] !== '0') this.errors.push('invalid cpf')

    // check if secondNumberTotal is equal to cpf second digit
    if (cleanCPF[10] !== String(secondNumberTotal) &&
    secondNumberTotal !== 10 && cleanCPF[10] !== '0') this.errors.push('invalid cpf')
  }
}

export default User
