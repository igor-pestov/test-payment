import React from 'react';

import { Typography, Space } from 'antd';

const { Text } = Typography;

const ProductInfo = ({ product }) => {
    return (
        <Space direction="vertical">
            <Text>Product: {product.name}</Text>
            <Text>Date: {product.date}</Text>
            <Text>Amount: {product.amount} USD</Text>
        </Space>
    );
}

export default ProductInfo;
