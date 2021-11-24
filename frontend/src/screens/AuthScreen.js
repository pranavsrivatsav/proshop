import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import toastMessage from '../utils/toastMessage';
import { login, register } from '../actions/userActions';

const AuthScreen = ({ location, history }) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordField, setPasswordField] = useState('password');
  const [visibleIcon, setVisibleIcon] = useState('fas fa-eye');
  const [signUp, setSignUp] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, loggedIn } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (loggedIn) {
      history.push(redirect);
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (signUp) {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
      } else {
        dispatch(register(name, email, password));
      }
    } else {
      dispatch(login(email, password));
    }
  };

  const changeAuthHandler = () => {
    setSignUp((prev) => !prev);
  };

  const passwordHandler = () => {
    setPasswordField((prev) => {
      if (prev === 'password') return 'text';
      return 'password';
    });
    setVisibleIcon((prev) => {
      if (prev === 'fas fa-eye') return 'fas fa-eye-slash';
      return 'fas fa-eye';
    });
  };

  const googleSuccess = (res) => {
    const { name, email, googleId } = res.profileObj;
    if (signUp) {
      dispatch(register(name, email, googleId));
    } else {
      dispatch(login(email, googleId));
    }
  };

  const googleFailure = (error) => {
    console.log('Google sign in failed -', error);
    toastMessage('Unable to sign in using google. Please try again', 'error');
  };

  return (
    <FormContainer>
      <h1>{signUp ? 'SIGN UP' : 'SIGN IN'}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        {signUp && (
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
        )}
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={passwordField}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
            {signUp && (
              <InputGroup.Append>
                <InputGroup.Text
                  onClick={passwordHandler}
                  style={{ cursor: 'pointer' }}>
                  <span>
                    <i className={visibleIcon}></i>
                  </span>
                </InputGroup.Text>
              </InputGroup.Append>
            )}
          </InputGroup>
        </Form.Group>
        {signUp && (
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>
        )}

        <Button type="submit" variant="primary" block>
          {signUp ? 'Sign Up' : 'Sign in'}
        </Button>

        <GoogleLogin
          /* eslint-disable-next-line no-undef */
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <Button
              block
              variant="info"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}>
              <span>
                <i className="fab fa-google"></i> &nbsp;Sign in with Google
              </span>
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </Form>

      <Row className="py-3">
        <Col>
          <Button variant="link" onClick={changeAuthHandler}>
            {signUp
              ? 'Already have an account? Sign in'
              : 'Have not created an account? Sign Up'}
          </Button>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AuthScreen;
