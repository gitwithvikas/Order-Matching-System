import React, { useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const OrderTables = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [showData, setShowData] = useState(false);

    const fetchData = async () => {
        try {
            const pendingResponse = await axios.get('http://localhost:5000/api/pending_orders');
            const completedResponse = await axios.get('http://localhost:5000/api/completed_orders');
            setPendingOrders(pendingResponse.data);
            setCompletedOrders(completedResponse.data);
            setShowData(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="12">
                    <Button variant="primary" onClick={fetchData}>
                        Show Orders
                    </Button>
                </Col>
            </Row>
            {showData && (
                <Row className="justify-content-md-center mt-4">
                    <Col md="12">
                        <h3>Pending Orders</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Buyer Qty</th>
                                    <th>Buyer Price</th>
                                    <th>Seller Price</th>
                                    <th>Seller Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.buyer_qty}</td>
                                        <td>{order.buyer_price}</td>
                                        <td>{order.seller_price}</td>
                                        <td>{order.seller_qty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="12" className="mt-4">
                        <h3>Completed Orders</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.price}</td>
                                        <td>{order.qty}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default OrderTables;
