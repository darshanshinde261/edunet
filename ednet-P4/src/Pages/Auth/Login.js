// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";


const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("")
    const { email, password } = values;

    setLoading(true);

    
    if(email === ""){
      setEmailError("Please Enter the email");
      return;
    }
    else if(!email.includes("@")){
      setEmailError("Invalid email");
      return;
    }
    else if(password === ""){
      setPasswordError("please enter the password");
      return;
    }
    else if(password.length <= 4){
      setPasswordError("password must contain more than 4 characters");
      return;
    }

    const { data } = await axios.post(loginAPI, {
      email,
      password,
    });
    
    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      toast.success(data.message, toastOptions);
      setLoading(false);
    } 
    
    toast.error(data.message, toastOptions);
    navigate('/register')
    setLoading(false);
    
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100vh", backgroundColor: "#707e80" }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="/" className="fw-bold text-white">
          Personal Finance Manager
        </Navbar.Brand>
      </Navbar>
      
      <Container className="mt-5" style={{ position: "relative", zIndex: 2 }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="p-4 rounded bg-dark shadow">
            <h1 className="text-center mt-3">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
            </h1>
            <h2 className="text-white text-center">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="bg-secondary text-white border-0"
                />
                <p className="Error">{emailError}</p>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  className="bg-secondary text-white border-0"
                />
                <p className="Error">{passwordError}</p>
              </Form.Group>

              <div className="mt-4 d-flex flex-column align-items-center">
                <Link to="/forgotPassword" className="text-white lnk">
                  Forgot Password?
                </Link>
                <Button
                  type="submit"
                  className="text-center mt-3 btn btn-primary w-50"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>
                <p className="mt-3 text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-white lnk">
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
