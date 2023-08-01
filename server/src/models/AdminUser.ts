import { conn } from '../app'

interface bodyInterface{
  cpf: string,
}

class AdminUser {
  public body: bodyInterface
  public errors: string[]
  public success: boolean

  constructor (body: bodyInterface) {
    this.body = body
    this.errors = []
    this.success = false
  }

  public async isUserAdmin () {
    await this.userAdminFK()
    await this.userAdminFK()
    if (this.errors.length > 0) return
    await this.tableHandler()
    if (this.errors.length > 0) return

    const userAdmin: [] = await new Promise(resolve => {
      conn.query(`select * from admin where user = '${this.body.cpf}'`, (_err, res) => {
        if (_err) {
          this.errors.push('server error')
          return resolve([])
        }
        resolve(res)
      })
    })

    if (this.errors.length > 0) return
    if (userAdmin.length < 1) return this.errors.push('user is not admin')
    this.success = true
  }

  public async giveAdminToUser () {
    await this.userAdminFK()
    if (this.errors.length > 0) return
    await this.tableHandler()
    if (this.errors.length > 0) return

    await new Promise(resolve => {
      conn.query(`INSERT INTO admin(user)VALUES('${this.body.cpf}')`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        resolve(res)
      })
    })

    if (this.errors.length > 0) return

    this.success = true
  }

  private async userAdminFK () {
    await new Promise(resolve => {
      conn.query(`SELECT * FROM customers WHERE cpf = "${this.body.cpf}"`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        if (res.length < 1) resolve(this.errors.push('could not find user'))
        resolve(true)
      })
    })
  }

  private async tableHandler (): Promise<void> {
    await new Promise(resolve => {
      conn.query('CREATE TABLE IF NOT EXISTS admin(user VARCHAR(512) NOT NULL UNIQUE, FOREIGN KEY (user) REFERENCES customers(cpf) ON DELETE CASCADE)', (_err, res) => {
        if (_err) resolve(this.errors.push(String(_err)))
        resolve(res)
      })
    })
  }
}

export default AdminUser
