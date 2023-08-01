import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubscriptionsItem from '../../components/SubscriptionItem/SubscriptionItem'
import { AppThunkDispatch, RootState } from '../../features/store'
import { getSubscriptionsThunk, SubscriptionSliceInterface } from '../../features/subscriptions/subscriptionSlice'
import { ThemeContext } from 'styled-components'

const Subscriptions = () => {
    const { colors } = useContext(ThemeContext)
    const subscriptions = useSelector<RootState, SubscriptionSliceInterface>(state => state.subscriptionSlice)
    const dispatch = useDispatch<AppThunkDispatch>()
    useEffect(() => {
        dispatch(getSubscriptionsThunk())
    }, [])
    return <>
        {
            subscriptions.errors.length > 0
                ? subscriptions.errors.map(error => {
                    return <p key={error} style={{
                        textAlign: 'center',
                        margin: '5vh auto',
                        width: '45vw',
                        background: colors.error_color,
                        padding: '10px',
                        borderRadius: '5px'
                    }}>{error}</p>
                })
                : subscriptions.subscriptions.length > 0 && subscriptions.subscriptions.map(subscription => {
                    return <SubscriptionsItem subscription={subscription} key={subscription.productID}/>
                })
        }
    </>
}

export default Subscriptions
