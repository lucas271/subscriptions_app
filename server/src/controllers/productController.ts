import { Response, Request } from 'express'
import { conn } from '../app'
import Product, { ProductInterface } from '../models/Product'

class ProductController {
  async getProduct (req:Request, res: Response) {
    try {
      if (!req.params?.productID) return res.status(501).send({ errors: ['no item received'] })
      const product = new Product({ productID: req.params.productID })
      await product.getProduct()
      if (product.errors.length > 0) return res.status(403).send({ errors: [...product.errors] })
      res.status(201).send({ products: product.product })
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }

  async getProducts (req: Request, res: Response) {
    try {
      const countProducts: unknown = await new Promise((resolve) => {
        conn.query('select count(*) from products', (err, res) => {
          try {
            if (err) resolve('err')
            resolve(JSON.parse(JSON.stringify(res[0]))['count(*)'])
          } catch {
            resolve('err')
          }
        })
      })
      if (countProducts === 'err') return res.status(403).send({ errors: ['server Error'] })
      if (countProducts === 0) return res.status(403).send({ products: [], errors: ['no products'], amountOfProducts: countProducts })

      try {
        interface filterProps {
          offset: number,
          limit: number
        }
        const filter: filterProps = JSON.parse(req.params.filter)
        const getAllProducts: ProductInterface[] = await new Promise(resolve => {
          conn.query(`SELECT * FROM products limit ${filter.limit} offset ${filter.offset}`, (_err, resp) => {
            resolve(resp)
          })
        })

        res.status(201).send({ products: getAllProducts, amountOfProducts: countProducts })
      } catch (error) {
        const getAllProducts: ProductInterface[] = await new Promise(resolve => {
          conn.query('SELECT * FROM products', (_err, resp) => {
            resolve(resp)
          })
        })

        res.status(201).send({ products: getAllProducts, amountOfProducts: countProducts })
      }
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }

  async createNewProduct (req: Request, res: Response) {
    try {
      const product = new Product(req.body)

      await product.createProduct()

      if (product.errors.length > 0) return res.status(403).send({ errors: product.errors })

      res.status(201).redirect(`/getAllProducts/${JSON.stringify({ limit: req.body.limit, offset: req.body.offset })}`)
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }

  async deleteProduct (req: Request, res: Response) {
    try {
      const product = new Product(req.body)
      await product.deleteProduct()
      console.log(product.errors)
      if (product.errors.length > 0) return res.status(403).send({ errors: product.errors })

      res.status(201).redirect(`/getAllProducts/${JSON.stringify({ limit: req.body.limit, offset: req.body.offset })}`)
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }

  async updatePrice (req: Request, res: Response) {
    try {
      const product = new Product(req.body)

      await product.updatePrice()

      if (product.errors.length > 0) return res.status(403).send({ errors: product.errors })

      res.status(201).send({ product: product.product })
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }
}

export default new ProductController()
