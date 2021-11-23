import React from 'react';
import { Container } from 'react-bootstrap';
import { Router, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import history from './history';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/auth" component={AuthScreen} exact />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
      <Toaster
        containerStyle={{
          position: 'absolute',
          bottom: '15%',
        }}
      />
    </Router>
  );
};

export default App;
