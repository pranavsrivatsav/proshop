import React, { useEffect } from 'react';
/*
  Replaces mapStateToProps and Connect method used previously,
  to link state and dispatch actions from a react component.

  useDispatch -> provides a dispatch function to dispatch actions
  useSelector -> select the part required from redux state (similar to mapStateToProps)
*/
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import { fetchProducts } from '../actions/productActions';
import Loader from '../components/Loader';

const HomeScreen = () => {
  // obtaining the dispatch function
  const dispatch = useDispatch();

  // selecting the productsList part from redux state
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  // Fetch products on initial load
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Helper function to render products
  const renderProducts = () => {
    return (
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <h1>Latest Products</h1>
      {products.length === 0 ? <Loader /> : renderProducts()}
    </>
  );
};

export default HomeScreen;
