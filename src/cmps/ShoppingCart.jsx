// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'

export function ShoppingCart({ isToyShown }) {
    const dispatch = useDispatch()
    const shoppingToy = useSelector(storeState => storeState.toyModule.shoppingToy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)


    function removeFromToy(toyId) {
        console.log(`Todo: remove: ${toyId} from cart`)
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getToyTotal() {
        return shoppingToy.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getToyTotal()
        // DONE: checkout function that dispatch
        checkout(amount)
            .then(()=>{
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(()=>{
                showErrorMsg('There was a problem checking out!')
            })
    }

    if (!isToyShown) return <span></span>
    const total = getToyTotal()
    return (
        <section className="cart" >
            <h5>Your Toy</h5>
            <ul>
                {
                    shoppingToy.map((toy, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromToy(toy._id)
                        }}>x</button>
                        {toy.vendor} | ${toy.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
