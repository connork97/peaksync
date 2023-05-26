import { useEffect } from 'react'

const PaymentRedirect = () => {

    useEffect(() => {
        fetch('/v1/sessions/cs_test_a1dGDCaVL0dssCKRJ8LPIBFiR42ky1KLVtuNC8od7mtmeZk7RubloWx23N')
        .then((response) => response.json())
        .then((sessionData) => console.log(sessionData))
      }, []);

    return (
        <h1>Please wait while we finish processing your transaction.</h1>
    )
}

export default PaymentRedirect