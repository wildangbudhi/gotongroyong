import { Container, Button, Card } from 'react-bootstrap';
import { useAuth } from "./use-auth-client";
import '../src/assets/login.css';
import Logo from '../src/assets/logo.png';

function LoggedOut(props) {
  const { login } = useAuth();

  const handleClick = async () => {
    await login();
    props.history.replace('/home');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 custom-card" style={{ width: '100%', maxWidth: '600px' }}>
        <Card.Body>
          <img
            src={Logo} // Adjust the path if needed
            alt="Gotong Royong Logo"
            className="mb-4"
            style={{ maxWidth: '150px' }} // Adjust size if needed
          />
          <Card.Title className="custom-title">
            <h2>Welcome to Gotong Royong: Be the Change, Clean the World!</h2>
          </Card.Title>
          <Card.Text className="mb-4 custom-text">
            Gotong Royong isn’t just an app—it’s a movement! We’re empowering communities to come together, tackle waste, and create a cleaner, brighter future for everyone. And it all starts with you.
            <br /><br />
            <strong>Why Join Gotong Royong?</strong>
            <ul>
              <li>Spot, Snap, Report: Whenever you see trash, don’t just walk by—take action! Capture it, report it, and see your efforts make a real difference.</li>
              <li>Earn and Celebrate: Every good deed deserves recognition. Earn points for every report or clean-up, and turn your efforts into rewards that matter.</li>
              <li>Connect and Collaborate: See what’s happening in your area with our interactive map. Join forces with your community to clean up and keep our neighborhoods pristine.</li>
            </ul>
            <br />
            <strong>Your Impact, Amplified</strong>
            <br />
            At Gotong Royong, every small act adds up to big change. As a member of our movement, you’re helping to build a cleaner, greener world—one piece of trash at a time. Together, we’re unstoppable.
          </Card.Text>
          <Button variant="success" size="lg" className="custom-button" onClick={handleClick}>Login</Button >
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoggedOut;
