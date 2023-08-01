import { Router, Response, Request } from 'express'
import jwt from 'jsonwebtoken'

import UserController from './controllers/userController'
import ProductController from './controllers/productController'
import subscriptionController from './controllers/subscriptionController'
import cartController from './controllers/cartController'
import userAdminController from './controllers/userAdminController'

import { verifyRefreshToken, verifyAcessToken } from './middlewares/jwtTokensMiddleware'
const routes = Router()

routes.get('/refreshToken', verifyRefreshToken, (req: Request, res: Response) => {
  const accessToken = jwt.sign({
    user: req.user
  }, String(process.env.ACCESS_TOKEN_SECRET ? process.env.ACCESS_TOKEN_SECRET : 'secret9231'), {
    expiresIn: '10m'
  })
  const refreshToken = jwt.sign({
    user: req.user
  }, String(process.env.REFRESH_TOKEN_SECRET ? process.env.REFRESH_TOKEN_SECRET : 'sefsdcret9231'), {
    expiresIn: '3d'
  })

  res.send({ accessToken, refreshToken })
})

routes.post('/createUser', UserController.createUser)
routes.post('/loginUser', UserController.loginUser)

routes.post('/giveAdmin', verifyAcessToken, userAdminController.giveAdmin)
routes.get('/isAdmin', verifyAcessToken, userAdminController.checkIfAdmin)

routes.get('/getProduct/:productID', ProductController.getProduct)
routes.get('/getAllProducts/:filter', ProductController.getProducts)

routes.post('/createProduct', verifyAcessToken, ProductController.createNewProduct)
routes.post('/deleteProduct', verifyAcessToken, ProductController.deleteProduct)
routes.post('/updateProductPrice', verifyAcessToken, ProductController.updatePrice)

routes.get('/getCart', verifyAcessToken, cartController.getItems)
routes.post('/newCartItem', verifyAcessToken, cartController.newCartItem)
routes.post('/deletecartItem', verifyAcessToken, cartController.deleteCartItem)

routes.post('/newSubscription', subscriptionController.addSubscription)
routes.get('/getSubscriptions', verifyAcessToken, subscriptionController.getSubscriptions)

export default routes
