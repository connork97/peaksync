import { useContext, useState, useEffect } from 'react'
import { LoggedInUserContext } from '../App'
import { useLocation } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

const ConfirmMembershipOrderDetails = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    const location = useLocation()
    const membership = location.state
    console.log(membership)

    return (
        <>
            <h1>Order Confirmation Page</h1>
            <div>
                <h2>Hi {currentUser.first_name}!</h2>
                <p>Please take a moment to make sure this is the membership you want to purchase before proceeding to checkout.</p>
            </div>
            <div>
                <p>You are purchasing a {membership.name} for ${membership.price}{membership.name.toLowerCase().includes("monthly") ? " per month" : null}.</p>
                <p>This purchase includes:</p>
                <p>{membership.description}</p>
                <p>If this sounds good to you, proceed to checkout!</p>
                <form action={`create-membership-checkout-session/${membership.id}`} method="POST">
                    <Button type="submit">Sounds good! Take me to Checkout.</Button>
                </form>
            </div>
        </>
    )
}

export default ConfirmMembershipOrderDetails