import { Request, Response } from 'express'
import Cart from '../models/Cart'

class CartController {
  async getItems (req: Request, res: Response) {
    try {
      if (!req.user) return res.status(503).send({ errors: ['server error'] })
      const cart = new Cart({ customerCPF: req.user.cpf })
      await cart.getCart()
      if (cart.errors.length > 0) return res.status(503).send({ errors: [...cart.errors] })

      res.status(201).send({ cart: cart.cart })
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }

  async newCartItem (req: Request, res: Response) {
    try {
      if (!req.user) return res.status(503).send({ errors: ['server error'] })

      const cart = new Cart({ customerCPF: req.user.cpf, productID: req.body.productID })
      await cart.addNewItem()
      if (cart.errors.length > 0) return res.status(403).send({ errors: [...cart.errors] })
      res.status(201).redirect('/getCart')
    } catch (error) {
      res.status(503).send({ errors: ['server error'] })
    }
  }

  async deleteCartItem (req: Request, res: Response) {
    try {
      if (!req.user) return res.status(503).send({ errors: ['server error'] })

      const cart = new Cart({ customerCPF: req.user.cpf, productID: req.body.productID })
      await cart.deleteItem()
      if (cart.errors.length > 0) return res.status(403).send({ errors: [...cart.errors] })
      res.status(201).redirect('/getCart')
    } catch (error) {
      res.status(503).send({ errors: ['server error'] })
    }
  }
}

export default new CartController()
