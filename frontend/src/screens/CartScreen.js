import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions.js";
import Message from "../components/Message.js";

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => dispatch((removeFromCart(id)));
    const checkoutHandler = (id) => history.push('/login?redirect=shipping');
    
	return (
		<Row>
			<Col md="8">
				<h1>Carrito de compras</h1>
				{cartItems.length === 0 ? (
					<Message>
						Tu carrito esta vacio. <Link to="/">volver a comprar</Link>
					</Message>
				) : (
					<ListGroup variant="flush">{cartItems.map((item) => (
                        <ListGroup.Item key={item.product}>
                            <Row >
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                    {item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >			
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                        ))}
                                </Form.Control>
                                </Col>
                                <Col md={2}>
                                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}</ListGroup>
				)}
			</Col>
			<Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SubTotal [{ cartItems.reduce((acc, el) => acc + el.qty, 0) }] productos</h2>
                            ${cartItems.reduce((acc, el) => acc + el.qty * el.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn w-100" disabled={cartItems.legnth === 0} onClick={checkoutHandler}>Proceder con el pago</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
		</Row>
	);
};

export default CartScreen;
