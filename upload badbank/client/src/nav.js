import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import './badbank.css';
export default function Navigition() {
  return (
    <>
    
    <Navbar className="navbar">
    <Container>
      <Nav className="me-auto">
        <Navbar.Brand  className='logo' href="/">Home</Navbar.Brand>
        <Nav.Link href="#/Create" className="animate-navbar">Create</Nav.Link>
        <Nav.Link href="#/Login" className="animate-navbar">Login</Nav.Link>
        {/* <Nav.Link href="#/Deposite" className="animate-navbar">Deposit</Nav.Link>
        <Nav.Link href="#/Widthdraw" className="animate-navbar">Widthdraw</Nav.Link>
        <Nav.Link href="#/Alldata" className="animate-navbar">Alldata</Nav.Link> */}

      </Nav>
    </Container>
  </Navbar>
  
  </>
  );
}

 