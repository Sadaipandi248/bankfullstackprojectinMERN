  import React, { useState, useEffect } from "react";
  import Card from 'react-bootstrap/Card';
  import { useFormik } from "formik";
  import { Link } from 'react-router-dom';
  import "./badbank.css";
  import axios from "axios";


  export default function Deposite() {
    const [balance, setBalance] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
      async function fetchBalance() {
      
        try {
          const response = await axios.get("http://localhost:4000/getLatestUserBalance");
        
          if (response.data.balance !== undefined) {
            setBalance(response.data.balance);
            setIsLoggedIn(true);
          } 
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
      fetchBalance();
    }, []);

    const formik = useFormik({
      initialValues: {
        name: "",
        amount: ""
      },
      onSubmit: async (values,{resetForm}) => {
        try {
          const depositAmount = parseFloat(values.amount);
    
          if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
          }
    
          const response = await axios.post("http://localhost:4000/deposit", {
            name: values.name,
            amount: depositAmount
          });
    
          if (response.status === 201) {
            alert("Deposit successful.");
            resetForm(); 
          } else {
            alert("Deposit failed.");
          }
        } catch (error) {
          console.error("Error during deposit:", error);
          alert("Error during deposit.");
        }
      },
      validate: (values) => {
        let errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.amount) {
          errors.amount = "Required";
        } else if (isNaN(parseFloat(values.amount)) || parseFloat(values.amount) <= 0) {
          errors.amount = "Invalid amount";
        }
        return errors;
      }
    });
    

    return (
      <Card style={{ width: '28rem' }} className="dep">
        <Card.Body>
          <div className="form-container">
            {isLoggedIn ? (
              <form onSubmit={formik.handleSubmit} id="form">
                <div className="form-group">
                  <h1 className="balance-heading">Deposit to your account</h1>
                  {/* <label htmlFor="deposit-input" className="deposit-heading">Deposit:</label> */}
                  <label htmlFor="deposit-input" className="deposit-heading">enter name:</label>
                  <input
                    type="text"
                    id="deposit-name"
                    className="form-control"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  /><br />
                <label htmlFor="deposit-input" className="deposit-heading">enter money:</label>

                  <input
                    type="text"
                    id="deposit-input"
                    className="form-control"
                    name="amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                  />
                  {formik.errors.amount ? <div className="error-message" style={{ color: "red" }}>{formik.errors.amount}</div> : null}
                </div>
                <button type="submit" className="deposit-but" disabled={!formik.isValid}>Submit</button><br />
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

                {/* <h1 className="balance-heading">Balance {balance}</h1> */}
              </form>
            ) : (
              <p>Please log in to deposit funds.</p>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }
