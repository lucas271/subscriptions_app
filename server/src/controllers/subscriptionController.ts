import { Response, Request } from 'express'
import Subscription from '../models/Subscription'

class SubscriptionController {
  async getSubscriptions (req: Request, res: Response) {
    try {
      if (!req.user?.cpf) return res.status(501).send({ errors: ['no user found'] })
      const subscriptions = new Subscription({ customerCPF: req.user?.cpf })
      await subscriptions.getSubscription()
      if (subscriptions.errors.length > 0) return res.status(501).send({ errors: [...subscriptions.errors] })
      res.status(201).send({ subscriptions: subscriptions.product })
    } catch (error) {
      res.status(501).send({ errors: ['server error'] })
    }
  }

  async addSubscription (req: Request, res: Response) {
    try {
      const subscription = new Subscription(req.body)

      await subscription.addSubscription()

      if (subscription.errors.length > 0) return res.status(403).send({ errors: subscription.errors })

      res.status(201).send({ product: subscription.product })
    } catch (error) {
      res.send(501).send({ errors: ['server error'] })
    }
  }
}

export default new SubscriptionController()
