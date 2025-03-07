// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import { Navbar } from "react-bootstrap";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerAPI } from "../../utils/ApiRequest";

const Register = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error,seterror] = useState('');

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  }, [navigate]);


  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",
  });

  const [dataError,setDataError] = useState({usernameError:"",emailError:"",passwordError:""})

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      setDataError({usernameError:"",emailError:"",passwordError:""})
      const {name, email, password} = values;
      
      if(name === ""){
        setDataError(value => ({...value,username:"username is cannot be empty"}));
        return;
      }else if(email === ""){
        setDataError(value => ({...value,email:"email is cannot be empty"}));
        return;
      }else if(password === ""){
        setDataError(value => ({...value,password:"password is cannot be empty"}));
        return;
      }
      setLoading(false);
     
      const {data} = await axios.post(registerAPI, {
        name,
        email,
        password
      });

      if(data.success === true){
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setLoading(true);
        navigate("/");
      }
      else{
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    };

  return (
    <>
    <div style={{ position: "relative", overflow: "hidden", height: "100vh", backgroundColor: "#707e80" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="/" className="fw-bold text-white">
          Personal Finance Manager
        </Navbar.Brand>
      </Navbar>
      
      <Container className="mt-5 text-white" style={{ position: "relative", zIndex: 2 }}>
        <Row>
          <h1 className="text-center">
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
          </h1>
          <h1 className="text-center text-white">Welcome to Expense Management System</h1>
          <Col md={{ span: 6, offset: 3 }} className="p-4 rounded bg-dark shadow">
            <h2 className="text-white text-center mt-3">Registration</h2>
            <Form>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Full name" value={values.name} onChange={handleChange} className="bg-secondary text-white border-0" />
                <p className="Error">{dataError.username}</p>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} className="bg-secondary text-white border-0" />
                <p className="Error">{dataError.email}</p>
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} className="bg-secondary text-white border-0" />
                <p className="Error">{dataError.password}</p>
              </Form.Group>
              <div className="mt-4 d-flex flex-column align-items-center">
                <Link to="/forgotPassword" className="text-white lnk">Forgot Password?</Link>
                <Button
                  type="submit"
                  className="text-center mt-3 btn btn-primary w-50"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>
                <p className="mt-3 text-muted">
                  Already have an account? <Link to="/login" className="text-white lnk">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
    </>
  )
}

export default Register