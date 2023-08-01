import { conn } from '../app'
import { v4 } from 'uuid'

export interface ProductInterface{
  productName?: string
  price?: number,
  id?: string,
  imagePath?: string,
  productID?: string
}

class Product {
  public body: ProductInterface
  public errors: string[]

  public product: ProductInterface | null | ProductInterface[]

  constructor (body: ProductInterface) {
    this.body = body
    this.errors = []
    this.product = null
  }

  public async getProducts () {
    await this.tableHandler()
  }

  public async getProduct () {
    await this.tableHandler()
    const getProduct: ProductInterface[] = await new Promise((resolve) => {
      conn.query(`select * from products where id = '${this.body.productID}' limit 1`, (_err, res) => {
        if (_err) {
          this.errors.push('server error')
          resolve([])
        }
        resolve(JSON.parse(JSON.stringify(res)))
      })
    })
    if (this.errors.length > 0) return
    if (getProduct.length < 1) return this.errors.push('no product found')
    this.product = getProduct
  }

  public async createProduct () {
    await this.tableHandler()
    if (this.errors.length > 0) return

    const productId = v4()

    await new Promise(resolve => {
      const createCostumerQuery = 'INSERT INTO products(productName, price, id, imagePath)' +
     `VALUES("${this.body.productName}", ${this.body.price}, "${productId}", "${this.body.imagePath}")`
      conn.query(createCostumerQuery, (_err, res) => {
        if (_err) this.errors.push('could not create product')
        resolve(res)
      })
    })
    if (this.errors.length > 0) return this.errors
    this.product = {
      productName: String(this.body.productName),
      price: this.body.price,
      id: productId,
      imagePath: this.body.imagePath
    }
  }

  public async deleteProduct () {
    await this.tableHandler()
    if (!this.body.id) return this.errors.push("didn't receive an Id")
    if (this.errors.length > 0) return
    const deleteProductQuery = `DELETE FROM products WHERE id = '${this.body.id}'`
    await new Promise(resolve => {
      conn.query('SET FOREIGN_KEY_CHECKS=0', (_err, res) => {
        console.log(res)
        resolve(res)
      })
    })
    await new Promise(resolve => {
      conn.query(deleteProductQuery, (_err, res) => {
        if (_err) resolve(this.errors.push('could not delete Product'))
        resolve(res)
      })
    })

    this.product = {
      productName: 'String(this.body.productName)',
      price: 2,
      id: 'this.body.id',
      imagePath: 'this.body.imagePath'
    }
  }

  public async updatePrice () {
    await this.tableHandler()
    if (!this.body.id) return this.errors.push("didn't receive an Id")
    if (this.errors.length > 0) return

    const updatePriceQuery = `UPDATE products SET price = ${this.body.price} WHERE id = "${this.body.id}"`

    await new Promise(resolve => {
      conn.query(updatePriceQuery, (_err, res) => {
        if (_err) resolve(this.errors.push('could not update Product'))
        if (JSON.parse(JSON.stringify(res)).affectedRows < 1) {
          return resolve(this.errors.push('given ID does not match any product'))
        }
        resolve(res)
      })
    })

    this.product = {
      productName: this.body.productName,
      price: this.body.price,
      id: this.body.id,
      imagePath: this.body.imagePath
    }
  }

  private async tableHandler (): Promise<void> {
    if (!this.body.imagePath) this.body.imagePath = '../../netflix.png'
    await new Promise(resolve => {
      conn.query('CREATE TABLE IF NOT EXISTS products (productName VARCHAR(244) NOT NULL UNIQUE, imagePath VARCHAR(244) NOT NULL, price DECIMAL(6, 2) NOT NULL, id varchar(512) PRIMARY KEY)', (_err, res) => {
        if (_err) resolve(this.errors.push(String(_err)))
        resolve(res)
      })
    })
  }
}

export default Product
