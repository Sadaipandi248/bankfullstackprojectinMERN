import { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default function Alldata() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setItem(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card style={{ width: '28rem' }} className="alldata">
        <Card.Body>
          <h1 className="all">Alldata</h1>
          <ul>
            {item.map((i, index) => (
              <li key={index}>
                Name: {i.name}<br />
                Email: {i.email}<br />
                Balance: {i.balance}<br />
              </li>
            ))}
          </ul>
          <div className="container">
    <Link to="/Deposite">
        <button className="btn-submit">deposit</button>
      </Link>
      <Link to="/Widthdraw">
        <button className="btn-submit">Widthdraw</button>
      </Link>
      <Link to="/Alldata">
        <button className="btn-submit">Alldata</button>
      </Link>
      </div>

        </Card.Body>
      </Card>
    </>
  );
}
