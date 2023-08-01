import { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'

export const verifyAcessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).json({ errors: 'No token provided.' })
  try {
    jwt.verify(String(JSON.parse(String(token)).accessToken), String(process.env.ACCESS_TOKEN_SECRET), (_err, decoded) => {
      // proceeds to verify refresh token if acesstoken is invalid in bellow line
      if (_err) return verifyRefreshToken(req, res, next)
      req.user = { ...JSON.parse(JSON.stringify(decoded)).user }
      next()
    })
  } catch (error) {
    return res.status(500).json({ errors: ['Authentication error'] })
  }
}

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).json({ errors: 'No token provided.' })

  try {
    jwt.verify(String(JSON.parse(String(token)).refreshToken), String(process.env.REFRESH_TOKEN_SECRET), (_err, decoded) => {
      if (_err) return res.status(500).json({ errors: ['Authentication error'] })
      req.user = { ...JSON.parse(JSON.stringify(decoded)).user }
      next()
    })
  } catch (error) {
    return res.status(500).json({ errors: ['Authentication error'] })
  }
}
