import { conn } from '../app'

export interface SubscriptionInterface{
  productID?: string,
  customerCPF: string,
  expireDate?: Date
}

class Subscription {
  public body: SubscriptionInterface
  public errors: string[]

  public product: SubscriptionInterface | null | SubscriptionInterface[]

  constructor (body: SubscriptionInterface) {
    this.body = body
    this.errors = []
    this.product = null
  }

  public async getSubscription () {
    await this.customerFKValidation()
    await this.tableHandler()

    if (this.errors.length > 0) return

    const getSubscriptions: SubscriptionInterface[] = await new Promise(resolve => {
      conn.query(`select * from subscriptions where customerCPF = "${this.body.customerCPF}"`, (_err, res) => {
        try {
          if (_err) return this.errors.push('request error')
          resolve(JSON.parse(JSON.stringify(res)))
        } catch (error) {
          this.errors.push('request error')
          resolve([])
        }
      })
    })
    if (getSubscriptions.length < 1) return this.errors.push('no subscriptions')

    this.product = getSubscriptions
  }

  public async addSubscription () {
    if (!this.body.customerCPF || !this.body.expireDate || !this.body.productID) return this.errors.push('empty fields')
    await this.customerFKValidation()
    await this.productFKValidation()
    await this.tableHandler()
    await this.checkIfSubscriptionExists()
    if (this.errors.length > 0) return

    await new Promise(resolve => {
      conn.query(`INSERT INTO subscriptions(expireDate, productID, customerCPF) VALUES('${this.body.expireDate}', '${this.body.productID}', '${this.body.customerCPF}')`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        resolve(res)
      })
    })

    if (this.errors.length > 0) return

    this.product = {
      productID: this.body.productID,
      customerCPF: this.body.customerCPF,
      expireDate: this.body.expireDate
    }
  }

  private async checkIfSubscriptionExists () {
    const checkIfSubscriptionsExists: SubscriptionInterface[] = await new Promise(resolve => {
      conn.query(`SELECT * FROM subscriptions WHERE productID = '${this.body.productID}' AND customerCPF = '${this.body.customerCPF}'`
        , (_err, res) => {
          if (_err) {
            this.errors.push('server error')
            resolve(res)
          }
          resolve(res)
        })
    })

    if (this.errors.length > 0) return this.errors

    if (checkIfSubscriptionsExists.length > 0) return this.errors.push('subscription already exists')
  }

  private async tableHandler () {
    await new Promise(resolve => {
      conn.query('CREATE TABLE IF NOT EXISTS subscriptions (expireDate DATE NOT NULL, productID VARCHAR(512) NOT NULL, FOREIGN KEY (productID) REFERENCES products(id) ON DELETE CASCADE, customerCPF VARCHAR(512) NOT NULL, FOREIGN KEY(customerCPF) REFERENCES customers(cpf) ON DELETE CASCADE)'
        , (_err) => {
          if (_err) resolve(this.errors.push('server error'))
          resolve(true)
        })
    })
  }

  private async customerFKValidation (): Promise<void> {
    await new Promise(resolve => {
      conn.query(`SELECT * FROM customers WHERE cpf = "${this.body.customerCPF}"`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        if (res.length < 1) resolve(this.errors.push('could not find user'))
        resolve(true)
      })
    })
  }

  private async productFKValidation (): Promise<void> {
    await new Promise(resolve => {
      conn.query(`SELECT * FROM products WHERE id = "${this.body.productID}"`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        if (res.length < 1) resolve(this.errors.push('could not find product'))
        resolve(true)
      })
    })
  }
}

export default Subscription
