import { conn } from '../app'
import { ProductInterface } from './Product'

export interface CartInterface{
  productID?: string,
  customerCPF?: string,
  dateAdd?: Date,
  count?: number,
}

class Cart {
  public body: CartInterface
  public errors: string[]
  public cart: null | CartInterface | CartInterface[]

  constructor (body: CartInterface) {
    this.body = body
    this.errors = []
    this.cart = null
  }

  public async getCart () {
    await this.handleTable()
    await this.handleCustomerFK()
    if (this.errors.length > 0) return

    const userCartItems: CartInterface[] = await new Promise((resolve) => {
      conn.query(`select * FROM cart where customerCPF = '${this.body.customerCPF}'`, (_err, res) => {
        try {
          if (_err) this.errors.push('request error')
          if (res.length < 1) this.errors.push('empty cart')
          resolve(JSON.parse(JSON.stringify(res)))
        } catch (error) {
          this.errors.push('request error')
          resolve([])
        }
      })
    })
    if (this.errors.length > 0) return
    if (userCartItems.length < 1) return
    const itemsReduced: CartInterface[] = []

    for (let i = 0; i < userCartItems.length; i++) {
      // check if itemExists in Itemsreduced Array
      // no need to validate cpf since it's already done in mysql query
      const itemExists: CartInterface[] = itemsReduced.filter(item => item.productID === userCartItems[i].productID)
      if (itemExists.length > 0) continue

      const getAllItem: CartInterface[] = userCartItems.filter(item => item.productID === userCartItems[i].productID)

      itemsReduced.push({
        productID: userCartItems[i].productID,
        customerCPF: userCartItems[i].customerCPF,
        count: getAllItem.length,
        dateAdd: userCartItems[i].dateAdd
      })
    }

    // getproductsinfo
    interface cartInterface extends ProductInterface{
      count: number,
      productID: string
    }

    const getCart: cartInterface[] = []
    for (let i = 0; i < itemsReduced.length; i++) {
      await new Promise((resolve) => {
        conn.query(`select * FROM products where id = '${itemsReduced[i].productID}' limit 1`, (_err, res) => {
          try {
            if (_err) this.errors.push('request error')
            resolve(getCart.push({
              ...JSON.parse(JSON.stringify(res))[0],
              count: itemsReduced[i].count
            }))
          } catch (error) {
            this.errors.push('request error')
            resolve('error')
          }
        })
      })
    }
    this.cart = getCart
  }
  // just need to send the cart to the client above remember mtf

  public async deleteItem () {
    await this.handleTable()
    await this.handleCustomerFK()
    await this.handleProductFK()
    if (this.errors.length > 0) return

    await new Promise(resolve => {
      conn.query(`DELETE from cart where customerCPF = '${this.body.customerCPF}' and
      productID = '${this.body.productID}' limit 1`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        resolve(res)
      })
      if (this.errors) return
      this.cart = {
        customerCPF: this.body.customerCPF,
        productID: this.body.productID
      }
    })
  }

  public async addNewItem () {
    await this.handleTable()
    await this.handleCustomerFK()
    await this.handleProductFK()

    if (this.errors.length > 0) return
    await new Promise(resolve => {
      conn.query(`INSERT INTO cart(productID, customerCPF)values('${this.body.productID}', '${this.body.customerCPF}')`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        resolve(res)
      })
    })
    if (this.errors.length > 0) return
    this.cart = {
      customerCPF: this.body.customerCPF,
      productID: this.body.productID
    }
  }

  private async handleTable () {
    await new Promise(resolve => {
      conn.query('CREATE TABLE IF NOT EXISTS CART (dateAdd DATETIME, productID VARCHAR(512) NOT NULL, FOREIGN KEY (productID) REFERENCES products(id) ON DELETE CASCADE, customerCPF VARCHAR(512) NOT NULL, FOREIGN KEY(customerCPF) REFERENCES customers(cpf) ON DELETE CASCADE)'
        , (_err) => {
          if (_err) resolve(this.errors.push('server error'))
          resolve(true)
        })
    })
  }

  private async handleCustomerFK (): Promise<void> {
    await new Promise(resolve => {
      conn.query(`SELECT * FROM customers WHERE cpf = "${this.body.customerCPF}"`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        if (res && res.length < 1) resolve(this.errors.push('could not find user'))
        resolve(true)
      })
    })
  }

  private async handleProductFK (): Promise<void> {
    await new Promise(resolve => {
      conn.query(`SELECT * FROM products WHERE id = "${this.body.productID}"`, (_err, res) => {
        if (_err) resolve(this.errors.push('server error'))
        if (res && res.length < 1) resolve(this.errors.push('could not find product'))
        resolve(true)
      })
    })
  }
}

export default Cart
