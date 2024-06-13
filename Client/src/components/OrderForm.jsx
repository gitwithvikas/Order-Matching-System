import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        buyer_qty: '',
        buyer_price: '',
        seller_price: '',
        seller_qty: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/place_order', formData);
            console.log(response)
            alert(response.data.status);
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>Place a New Order</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBuyerQty">
                            <Form.Label>Buyer Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="buyer_qty"
                                value={formData.buyer_qty}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBuyerPrice">
                            <Form.Label>Buyer Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="buyer_price"
                                value={formData.buyer_price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSellerPrice">
                            <Form.Label>Seller Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="seller_price"
                                value={formData.seller_price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSellerQty">
                            <Form.Label>Seller Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="seller_qty"
                                value={formData.seller_qty}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />{' '}
                                    Placing Order...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderForm;
