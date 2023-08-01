import User from '../models/User'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class UserController {
  public async createUser (req: Request, res: Response) {
    try {
      const user = new User(req.body)
      await user.createUser()
      if (user.errors.length > 0) return res.status(403).send({ errors: user.errors })

      const accessToken = jwt.sign({
        user: user.user
      }, String(process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'secret9231'), {
        expiresIn: '10m'
      })
      const refreshToken = jwt.sign({
        user: user.user
      }, String(process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET : 'sefsdcret9231'), {
        expiresIn: '3d'
      })

      res.status(201).send({ refreshToken, accessToken })
    } catch (error) {
      res.status(500).send({ errors: ['SERVER ERROR'] })
    }
  }

  public async loginUser (req: Request, res: Response) {
    try {
      const user = new User(req.body)
      await user.loginUser()
      const accessToken = jwt.sign({
        user: user.user
      }, String(process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'secret9231'), {
        expiresIn: '10m'
      })
      const refreshToken = jwt.sign({
        user: user.user
      }, String(process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET : 'sefsdcret9231'), {
        expiresIn: '3d'
      })
      if (user.errors.length > 0) return res.status(403).send({ errors: user.errors })

      res.status(201).send({ refreshToken, accessToken })
    } catch (error) {
      return res.status(501).send({ errors: [error] })
    }
  }
}

export default new UserController()
