import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import routes from './routes'
import mysql from 'mysql'
dotenv.config()

class App {
  public express: express.Application
  public conn: mysql.Connection

  public constructor () {
    this.express = express()
    this.conn = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '413$314Pm',
      database: 'test'
    })

    this.middlewares()
    this.routes()

    this.database()
  }

  private middlewares ():void {
    this.express.use(cors({
      origin: process.env.CLIENT,
      credentials: true
    }))
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.json())
    this.express.use(cookieParser())
  }

  public async database ():Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        this.conn.connect((err) => {
          return err ? reject(new Error('DB connection error')) : resolve(console.log('connected to DB'))
        })
      })
    } catch (err) {
      throw new Error('unable to connect to DB: ' + err)
    }
  }

  private routes ():void {
    this.express.use(routes)
  }
}

const app = new App()
export const conn = app.conn
export default app.express
