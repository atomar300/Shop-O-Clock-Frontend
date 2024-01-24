import React, { useState } from 'react'
import { useEffect } from 'react'
import Payment from './Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import Loader from '../layout/loader/Loader';
import { apiClient } from '../../ApiClient';


const PrePayment = () => {

    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const token = localStorage.getItem("token");
        const config = { headers: { "Authorization" : `Bearer ${token}` } }
        const { data } = await apiClient.get("/api/v1/stripeapikey", config);
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        getStripeApiKey();
    }, [])

    return (
        <div>
            {
                stripeApiKey ?
                    (<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>)
                    : (<Loader />)
            }
        </div>
    )
}

export default PrePayment