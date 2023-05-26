import { useContext, useState, useEffect } from 'react'
import { LoggedInUserContext } from '../App'
import { useLocation } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const ConfirmOrderDetails = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    const location = useLocation()
    const offering = location.state
    console.log(offering)

    const goToCheckout = () => {
        if (offering.category) {
            fetch(`/create-membership-checkout-session/${offering.id}`, {
                method: 'POST'
            })
        }
    }

    return (
        <>
            <h1>Order Confirmation Page</h1>
            <div>
                <h2>Hi {currentUser.first_name}!</h2>
                <p>Please take a moment to make sure this is the offering you want to purchase before proceeding to checkout.</p>
            </div>
            <div>
                <p>You are purchasing a {offering.name} for ${offering.price}{offering.name.toLowerCase().includes("monthly") ? " per month" : null}.</p>
                <p>This purchase includes:</p>
                <p>{offering.description}</p>
                <p>If this sounds good to you, proceed to checkout!</p>
                <form action={offering.category ? `/create-event-checkout-session/${offering.id}` : `create-membership-checkout-session/${offering.id}`} method="POST">
                    <Button type="submit">Sounds good! Take me to Checkout.</Button>
                </form>
            </div>
        </>
    )
}

export default ConfirmOrderDetails