import { Box, Button, Checkbox, Dialog, styled, TextField, Typography } from "@mui/material"
import LoginImage from "../../assets/LoginImage.png"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { authenticateGoogleLogin, authenticateLogin, authenticateSignup } from "../../service/api"
import { useState } from "react"

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from "@/hooks/use-toast";
import PrivacyPolicyDialog from "../AboutUs/PrivacyPolicyDialog";
import { Link } from "react-router-dom";


const Component = styled(Box)`
  height: 90vh;
  max-height: 90vh;
  width: 90vh;
  display: flex;
  overflow: hidden;
`;

const Image = styled(Box)`
  background: #F33A6A url(${LoginImage}) center 85% no-repeat;
  background-size: cover;
  width: 35%;
  padding: 45px 35px;
  box-sizing: border-box;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  overflow-y: auto;
  & > div, & > button, & > p {
    margin-top: 15px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #A52448;
  color: #ffffff;
  height: 48px;
  border-radius: 2px;
`;

const Google = styled(Button)`
  text-transform: none;
  background: #F0FFFF;
  color: #000000;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #F33A6A;
  font-weight: 600;
  cursor: pointer;
`;

const ForgotPassword = styled(Typography)`
  font-size: 14px;
  text-align: right;
  color: #A52448;
  font-weight: 600;
  cursor: pointer;
`;

const accountInitialValues = {
  login: {
    view: 'login',
    heading: 'Login',
    subHeading: 'Get access to your orders, Wishlist, and cart!'
  },
  signup: {
    view: 'signup',
    heading: 'New here? Sign up to be part of the community!',
    subHeading: 'Create your account to unlock the full experience'
  }
};

const signupInitialValues = {
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  agree: 'false'
};

const loginInitialValues = {
  email: '',
  password: ''
};

const LoginDialog = ({ open, setOpen }) => {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const toggleLogin = () => {
    toggleAccount(accountInitialValues.login);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await authenticateSignup(signup);
      if (!response) return;
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', 'user');
      localStorage.setItem("account", JSON.stringify({ id: user._id, name: user.name }));

      toast({
        title: "Signup Successful",
        description: "Welcome to your dashboard!",
        variant: "success",
      });

      window.location.reload();
      handleClose();
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      let response = await authenticateLogin(login);
      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', 'user');
        localStorage.setItem("account", JSON.stringify({ id: user._id, name: user.name }));

        toast({
          title: "Login Successful",
          description: "Welcome to your dashboard!",
          variant: "success",
        });

        window.location.reload();
        handleClose();
      } else {
        setError(true);
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async (googleUser) => {
    try {
      const decoded = jwtDecode(googleUser.credential);
      const response = await authenticateGoogleLogin(decoded);

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', 'user');
        localStorage.setItem("account", JSON.stringify({ id: user._id, name: user.name }));

        toast({
          title: "Login Successful",
          description: "Welcome to your dashboard!",
          variant: "success",
        });

        window.location.reload();
        handleClose();
      } else {
        toast({
          title: "Login Failed",
          description: "Google login failed: Account not found. Please sign up first.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { maxWidth: 'unset', maxHeight: '90vh', overflow: 'hidden' } }}>
      <Component>
        <Box style={{ display: "flex", height: '90vh' }}>
          <Image>
            <Typography variant="h5" style={{ fontWeight: 600 }}>{account.heading}</Typography>
            <Typography style={{ marginTop: 20, fontWeight: 600 }}>{account.subHeading}</Typography>
          </Image>

          <Wrapper>
            {account.view === 'login' ? (
              <>
                {error && <Typography style={{ color: '#ff6161', fontSize: 14, fontWeight: 600 }}>Please enter valid email or password</Typography>}
                <TextField variant="standard" onChange={onValueChange} name='email' label="Enter email" />
                <span>
                  <TextField variant="standard" onChange={onValueChange} name='password' type={visible ? "text" : "password"} label="Enter password" />
                  <span onClick={() => setVisible(!visible)}>{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
                </span>
                <Link  to="/recovery">
                <ForgotPassword onClick={handleClose} >Forgot Password? Recover Now</ForgotPassword>
                </Link>
                <LoginButton onClick={loginUser}>Login</LoginButton>
                <CreateAccount onClick={toggleSignup}>New to Iconique? Create an account</CreateAccount>
              </>
            ) : null}
          </Wrapper>
        </Box>
      </Component>
      <PrivacyPolicyDialog open={isPrivacyPolicyOpen} onClose={() => setPrivacyPolicyOpen(false)} />
    </Dialog>
  );
}

export default LoginDialog;
