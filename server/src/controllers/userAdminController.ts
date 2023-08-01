import { Request, Response } from 'express'
import AdminUser from '../models/AdminUser'
class UserController {
  public async giveAdmin (req: Request, res: Response) {
    try {
      if (!req.user) return res.status(503).send({ errors: ['server error'] })
      const user = new AdminUser({ cpf: req.user.cpf })
      await user.giveAdminToUser()

      if (user.errors.length > 0) return res.status(403).send({ errors: user.errors, success: user.success })

      res.status(201).send({ success: user.success, errors: user.errors })
    } catch (error) {
      return res.status(501).send({ errors: [error] })
    }
  }

  public async checkIfAdmin (req: Request, res: Response) {
    try {
      if (!req.user) return res.status(503).send({ errors: ['server error'] })
      const user = new AdminUser({ cpf: req.user.cpf })
      await user.isUserAdmin()

      if (user.errors.length > 0) return res.status(403).send({ sucess: false })
      res.status(201).send({ success: user.success })
    } catch (error) {
      return res.status(501).send({ sucess: false })
    }
  }
}

export default new UserController()
