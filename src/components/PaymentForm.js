import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaskedInput from 'antd-mask-input';
import { Button, Select, Input, Form } from 'antd';

const { Option } = Select;

const PaymentForm = ({ setSubmitMessage }) => {
    const [form] = Form.useForm();
    const [cardTypes, setCardTypes] = useState([]);
    const [lengthCardNumber, setLengthCardNumber] = useState(16);
    const [, forceUpdate] = useState({});

    useEffect(() => {
        fetchCards();
        forceUpdate({});
    }, [])

    const handleCardNumberChange = (e) => {
        const { target: { value } } = e;

        form.setFieldsValue({ cardNumber: value.replace(/[^0-9]|[,.]+/g, '') });
    }

    const submitForm = async (data) => {
        try {
            const response = await axios.post('http://www.mocky.io/v2/5d8de422310000b19d2b517a', data);
            setSubmitMessage({
                message: response.data.responseMessage,
                color: 'blue'
            });
        } catch (error) {
            setSubmitMessage({
                message: error.response.data.responseMessage,
                color: 'red'
            });
        }
    }

    const validateFields = async (fields) => {
        try {
            return await form.validateFields(fields);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCards = async () => {
        try {
            const response = await axios.get('http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030');
            setCardTypes(response.data.cardTypes);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectChange = (value) => {
        switch (value) {
            case 'Amex':
                setLengthCardNumber(15);
                break;
            default:
                setLengthCardNumber(16);
                break;
        }

        if (form.isFieldsTouched(['cardNumber'], true)) {
            validateFields(['cardNumber']);
        }
    }

    const handleSubmit = () => {
        try {
            const values = validateFields();
            submitForm(values);
        } catch (error) {
            console.log('Failed validation:', error);
        }
    }

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Card Types:"
                name="cardType"
                rules={[
                    {
                        required: true,
                        message: 'Choose card type'
                    }
                ]}
            >
                <Select placeholder="- Select Card Types -" onChange={handleSelectChange}>
                    {cardTypes.map((cardType) => (
                        <Option
                            key={cardType.id}
                            value={cardType.value}
                        >
                            {cardType.value}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input your card number'
                    },
                    {
                        pattern: new RegExp(/(?<!\d)\d{15,16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/),
                        message: 'The input is not valid card number'
                    },
                    {
                        type: 'string',
                        min: lengthCardNumber,
                        message: `Min length is ${lengthCardNumber}`,
                    },
                    {
                        type: 'string',
                        message: `Max length is ${lengthCardNumber}`,
                        max: lengthCardNumber
                    }
                ]}
            >
                <Input maxLength={16} onChange={handleCardNumberChange} />
            </Form.Item>
            <Form.Item
                label="Expiry"
                name="expiryDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input expiry date in MM/YY format'
                    },
                    {
                        pattern: new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
                        message: 'The input must have MM/YY format'
                    }
                ]}
            >
                <MaskedInput placeholder="MM/YY" maxLength={5} mask="11/11" />
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name'
                    },
                    {
                        max: 50,
                        type: 'string',
                        message: 'Max length is 50'
                    },
                    {
                        pattern: new RegExp(/^([a-zA-Z ])+$/),
                        message: 'The input is not valid name'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                required={false}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(['cardType', 'expiryDate', 'name', 'cardNumber'], true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Confirm Payment
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default PaymentForm;
