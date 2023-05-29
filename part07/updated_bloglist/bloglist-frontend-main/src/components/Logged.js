import { Button } from 'react-bootstrap'

const Logged = (props) => (
  <>
    <p>{props.user} logged in</p>
    <Button id="logout-button" onClick={props.handleLogout}>
      logout
    </Button>
  </>
);

export default Logged;
