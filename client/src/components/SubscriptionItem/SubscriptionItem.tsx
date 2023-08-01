import { useEffect, useState } from 'react'
import api from '../../api'
import { ProductInterface } from '../../features/product/productSlice'
import { SubscriptionInterface } from '../../features/subscriptions/subscriptionSlice'
import { SubscriptionsContainer } from './styles.css'

const SubscriptionsItem = ({ subscription }:{subscription: SubscriptionInterface}) => {
    const [products, setProducts] = useState<ProductInterface[]>([])
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        async function getProduct () {
            try {
                // cannot do it on redux since redux updates global state not local.
                const { data } = await api.get(`/getProduct/${subscription.productID}`)
                return data
            } catch (error) {
                setErrors(['server error'])
                return []
            }
        }

        getProduct().then(response => {
            setProducts([...response.products])
        })
    }, [])
    return <SubscriptionsContainer>
        {
            errors.length > 0
                ? <h2>
                    {errors.map(error => error)}
                </h2>
                : products.length > 0 && products.map(product => {
                    return <div key={product.id}>
                        <h2>{product.productName}</h2>
                    </div>
                })
        }
    </SubscriptionsContainer>
}

export default SubscriptionsItem
