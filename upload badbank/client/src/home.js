import bank from "../src/image/bank.png"
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
export default function Home(){
    return(
        <>
    <Card style={{ width: '18rem',marginLeft:'490px' }} className="home">
      <Card.Img variant="top" src={bank} />
      <Card.Body>
        <Card.Title>  WELCOMES YOU</Card.Title>
        {/* <Card.Text>
        WELCOME
        </Card.Text> */}
      </Card.Body>

    
      <Card.Body>
         <Card.Link href="#/Create" className="cre-buttom"><Button>Create An Account</Button></Card.Link>
      </Card.Body>
    </Card>
        </>
    )
}