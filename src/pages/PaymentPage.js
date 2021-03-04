import React, { useState } from 'react';

import ProductInfo from '../components/ProductInfo';
import PaymentForm from '../components/PaymentForm';

const PaymentPage = () => {
    const [submitMessage, setSubmitMessage] = useState({
        message: '',
        color: ''
    });
    const [product] = useState({
        name: 'ABCD',
        date: '08/09/2019 12.03:44',
        amount: 1123.03
    });

    return (
        <div className="container">
            <ProductInfo product={product} />
            <div className="content">
                {submitMessage.message !== ''
                    ? <span style={{ color: submitMessage.color }}>{submitMessage.message}</span>
                    : <PaymentForm setSubmitMessage={setSubmitMessage} />
                }
            </div>
        </div >
    );
}

export default PaymentPage;
