
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()
    const isToyShown = useSelector(storeState => storeState.toyModule.isToyShown)
    const count = useSelector(storeState => storeState.userModule.count)
    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)
    const shoppingToyLength = useSelector(storeState => storeState.toyModule.shoppingToy.length)


    return (
        <footer className='app-footer'>
            <h5>
                Currently {toysLength} toys in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            <h5>
                <span>{shoppingToyLength}</span> Products in your Toy
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: TOGGLE_CART_IS_SHOWN })
                }}>
                    ({(isToyShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingCart isToyShown={isToyShown} />
            <UserMsg />
        </footer>
    )
}
