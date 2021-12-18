import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import { fetchProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const { productDetails, cart, userLogin } = useSelector((state) => state);

  const { cartItems } = cart;
  const { loggedIn } = userLogin;

  const { product } = productDetails;
  let isAddedToCart = cartItems.find(
    (item) => item.product === match.params.id
  );

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
  }, []);

  const addToCartHandler = () => {
    if (!isAddedToCart) {
      isAddedToCart = true;
      if (!loggedIn) {
        dispatch(
          addToCart([
            {
              product: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              maxQty: Math.min(product.countInStock, product.maxQty),
              qty: Number(qty),
            },
          ])
        );
      } else {
        dispatch(addToCart([{ product, qty }]));
      }
    }
    history.push('/cart?tracker=product');
  };

  const renderProductDetails = () => {
    return (
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item hidden={isAddedToCart}>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                        {[
                          ...Array(
                            Math.min(product.countInStock, product.maxQty)
                          ).keys(),
                        ].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  variant={isAddedToCart && 'success'}
                  type="button"
                  disabled={product.countInStock === 0}>
                  {isAddedToCart ? 'Go to Cart' : 'Add to Cart'}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {product._id !== match.params.id ? <Loader /> : renderProductDetails()}
    </>
  );
};

export default ProductScreen;
