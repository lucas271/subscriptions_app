/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {email: string, cpf: string, username: string}
    }
  }
}
