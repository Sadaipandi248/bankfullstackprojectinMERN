import { useState } from "react"
import {useFormik } from "formik";
import Card from 'react-bootstrap/Card';
import './badbank.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Widthdraw() {
  const [balance, setBalance] = useState();
console.log("hi",balance)

  const formik = useFormik({
    initialValues: {
      username: '', 
      withdraw: '',
    },
    onSubmit: async (values) => {
      try {
        const withdrawalAmount = parseFloat(values.withdraw);

        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
          formik.setFieldError('withdraw', 'Invalid withdrawal amount');
          return;
        }

        const response = await axios.post('http://localhost:4000/withdraw', {
          username: values.username, 
          amount: withdrawalAmount,
        });

        if (response.status === 200) {
          setBalance(balance - withdrawalAmount);
          formik.resetForm();
        } else {
          console.error('Withdrawal failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error during withdrawal:', error);

      }
    },
    validate: (values) => {
      let errors = {};

      if (!values.withdraw) errors.withdraw = "Required";
      if (
        values.withdraw !== "" &&
        isNaN(parseFloat(values.withdraw))
      )
        errors.withdraw = "Just Numbers only allowed";
      if (values.withdraw < 0)
        errors.withdraw = "Negative Numbers not allowed";
      if (values.withdraw >= balance) 
      errors.withdraw ="insufficinent balance"
      return errors;
    },
  });

  return (
    <>
         <Card style={{ width: '28rem' }} className="widthdraw">

<Card.Body>
  
<div className="form-container">
    <form onSubmit={formik.handleSubmit} id="form">
      <div className="form-group">
        <label className="balance-heading">Withdraw your money</label><br></br>
        <label>name:</label><br />
        <input type="text" id="username" name="username" onChange={formik.handleChange} value={formik.values.username} required></input>
        <label className="withdraw">Withdraw:</label>
        <input  type="text"  id="withdraw"  name="withdraw"  className="form-control"  onChange={formik.handleChange}  value={formik.values.withdraw} />
        {formik.errors.withdraw ? ( <div className="error-message">    {formik.errors.withdraw}   </div>   ) : null} </div>
        <button type="submit" className="btn-submit" disabled={!formik.isValid} > Submit</button><br />
    {/* <h1 className="balance-heading">Balance: {balance}</h1> */}
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
    </form>
  </div>
 
</Card.Body>
</Card>

    </>
  );
}
