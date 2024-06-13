import React from 'react';
import OrderForm from './components/OrderForm';
import './App.css';
import { Container } from 'react-bootstrap';
import OrderTables from './components/showTable';

const App = () => {
    return (
        <Container className="App">
            <header className="App-header">
                <h1>Order Matching System</h1>
            </header>
            <OrderForm />
            <OrderTables/>
        </Container>
    );
};

export default App;
