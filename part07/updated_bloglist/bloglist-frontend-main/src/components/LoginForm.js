import PropTypes from "prop-types";
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => (

  <>
  <h2>login to use app</h2>
    <Form onSubmit={props.handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
          <Form.Control
          type="text"
          name="username"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
          />
        <Form.Label>password:</Form.Label>
        <Form.Control
        type="password"
        value={props.password}
        name="Password"
        id="password"
        onChange={({ target }) => props.setPassword(target.value)}
        />
        <Button 
        variant="primary" 
        type="submit"
        id="login-button">
          login
        </Button>
      </Form.Group>
    </Form>
  </>

);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
