import { Box, Button, Checkbox, Dialog, Link, styled, TextField, Typography } from "@mui/material"
import LoginImage from "../../assets/LoginImage.png"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { authenticateGoogleLogin, authenticateLogin, authenticateSignup } from "../../service/api"
import { useState, useEffect} from "react"


import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { toast } from "@/hooks/use-toast";
import PrivacyPolicyDialog from "../AboutUs/PrivacyPolicyDialog";
import { useNavigate } from "react-router-dom";


const Component=styled(Box)`
  height:90vh;
  max-height:90vh;
  width:90vh;
  display:flex;
  overflow:hidden;
`
const Image=styled(Box)`
  background:#F33A6A url(${LoginImage}) center 85% no-repeat;
  background-size:cover;
  
  width:35%;
  padding: 45px 35px;
  box-sizing:border-box;
`
const Wrapper=styled(Box)`
  display:flex;
  flex-direction:column;
  padding:25px 35px;
  flex:1;
  overflow-y:auto;
  & > div,& >button,& > p{
  margin-top:15px;
  }
`
const LoginButton=styled(Button)`
  text-transform:none;
  background:#A52448;
  color:#ffffff;
  height:48px;
  border-radius:2px;
`;
const Google=styled(Button)`
text-transform:none;
background:#F0FFFF;
color:#000000;
height:48px;
border-radius:2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0 /20%);
`;

const Text=styled(Typography)`
  font-size:14px;
  color:#878787
`
const CreateAccount=styled(Typography)`
  font-size:14px;
  text-align:center;
  color:#F33A6A;
  font-weight:600;
  cursor:pointer;
`

const accountInitialValues={
  login:{
    view:'login',
    heading:'Login',
    subHeading:'Get access to your orders,Wishlist and cart!'
  },
  signup:{
    view:'signup',
    heading: 'New here? Sign up to be part of the community!',
    subHeading:'Create your account to unlock the full experience'
  }
}

const signupInitialValues={
  name:'',
  email:'',
  password:'',
  phone:'',
  address:'',
  agree:'false'
}
const loginInitialValues={
  email:'',
  password:''
}
const LoginDialog = ({open,setOpen}) => {
  const [account,toggleAccount]=useState(accountInitialValues.login);
  const [signup,setSignup]=useState(signupInitialValues);
  const[login,setLogin]=useState(loginInitialValues);
  const [visible,setvisible]=useState(false);
  const [error,setError]=useState("");
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const navigate=useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; // At least 6 chars, 1 letter, 1 number
    return passwordRegex.test(password);
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phone);
  };
  
  const signupUser = async () => {
    if (!signup.name || !signup.email || !signup.password || !signup.phone || !signup.address || !signup.agree) {
      setError("Please fill all required fields.");
      return;
    }
  
    if (!validateEmail(signup.email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (!validatePassword(signup.password)) {
      setError("Password must be at least 6 characters long and contain at least one number.");
      return;
    }
  
    if (!validatePhone(signup.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
  
    try {
      let response = await authenticateSignup(signup);
      console.log(response);
      //if (!response) return;
      if (response.status === 200) {
        const { token, user } = response.data;
  
        // Save token and role
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'user');
        localStorage.setItem(
          "account",
          JSON.stringify({ id: user._id, name: user.name })
        );
        toast({
          title: "Signup Successful",
          description: "Welcome to your dashboard!",
          variant: "success",
        });
        setError(""); // Clear error on success
        window.location.reload();
        handleClose();
      } else if (response.status === 401 && response.data.message === 'User already exists') {
        // Handle case where user already exists
        setError("User already exists. Please login.");
      }else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      setError("An error occurred. Please try again.");
    }
  };
  
  const loginUser = async () => {
    if (!login.email || !login.password) {
      setError("Please enter both email and password.");
      return;
    }
  
    if (!validateEmail(login.email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      let response = await authenticateLogin(login);
      if (response.status === 200) {
        const { token, user } = response.data;
  
        // Save token and role
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'user');
        localStorage.setItem(
          "account",
          JSON.stringify({ id: user._id, name: user.name })
        );
        toast({
          title: "Login Successful",
          description: "Welcome to your dashboard!",
          variant: "success",
        });
        setError(""); // Clear error on success
        window.location.reload();
        handleClose();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      setError("An error occurred. Please try again.");
    }
  };
 
  const setLogoutTimer = (token) => {
    if (!token || typeof token !== 'string') {
      return;  
    }
    const { exp } = jwtDecode(token);
    const timeout = exp * 1000 - Date.now(); // Time until token expires
  
    setTimeout(() => {
      alert('Session expired. Please login again.');
      localStorage.clear();
      navigate('/'); // Navigate to the login page
      window.location.reload();
    }, timeout);
  };
  
  setLogoutTimer(localStorage.getItem("token"));
  
  const handleClose=()=>{
    setOpen(false);
    toggleAccount(accountInitialValues.login)
    setError(false);
  }
  const toggleSignup=()=>{
    toggleAccount(accountInitialValues.signup);
  }
  const toggleLogin=()=>{
    toggleAccount(accountInitialValues.login);
  }
  const onInputChange=(e)=>{
    setError("");
    setSignup({...signup,[e.target.name]:e.target.value})
    console.log(signup);
  }
//   const signupUser=async ()=>{
//     try{
//     let response=await authenticateSignup(signup);
//     //console.log(response);
//     if(!response) return;
//     if(response.status===201){
//     const { token, user } = response.data;

//     // Save token and role
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', 'user');
//     localStorage.setItem(
//       "account",
//       JSON.stringify({ id: user._id, name: user.name })
//     );
//     toast({
//       title: "Signup Successful",
//       description: "Welcome to your dashboard!",
//       variant: "success",
//     });
    
//     window.location.reload();
//     handleClose();
//   }else{
//     setError(true);
//   }
//   } catch(error){
//     toast({
//       title: "Signup Failed",
//       description: error.response?.data?.message || "An error occurred. Please try again.",
//       variant: "destructive",
//     });
//   }
// }

  const onValueChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
  }
//   const loginUser=async ()=>{
//     try{
//     let response=await authenticateLogin(login);
//     console.log(response);
//     if(response.status===200){
//       const { token, user } = response.data;

//     // Save token and role
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', 'user');
//     localStorage.setItem(
//       "account",
//       JSON.stringify({ id: user._id, name: user.name })
//     );
//     toast({
//       title: "Login Successful",
//       description: "Welcome to your dashboard!",
//       variant: "success",
//     });
//     window.location.reload();
//       handleClose();
//     }else{
//       setError(true);
//     }
//   }catch(error){
//     toast({
//       title: "Login Failed",
//       description: error.response?.data?.message || "An error occurred. Please try again.",
//       variant: "destructive",
//     });
//   }
// }
  const handleGoogleLogin = async (googleUser) => {
    try {
        const decoded = jwtDecode(googleUser.credential); 
        const response = await authenticateGoogleLogin(decoded);

        if (response.status === 200) {
            console.log(response);
            const { token, user } = response.data;

    // Save token and role
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'user');
    localStorage.setItem(
      "account",
      JSON.stringify({ id: user._id, name: user.name })
    );

    toast({
      title: "Login Successful",
      description: "Welcome to your dashboard!",
      variant: "success",
    });
    window.location.reload();
            handleClose();
        }
        else {
          
          setError(true);
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
    <Dialog open={open} onClose={handleClose}  PaperProps={{
      style: {
          maxWidth: 'unset',
          maxHeight: '90vh',
          overflow: 'hidden',
      }
  }}>
        <Component>
          <Box style={{display:"flex", height:'90vh'}}>
          {/* left */}
          <Image>
            <Typography variant="h5" style={{fontWeight:600}} >{account.heading}</Typography>
            <Typography style={{marginTop:20, fontWeight:600}}>{account.subHeading}</Typography>
          </Image>
          {/* right */}
          <Wrapper>
             {account.view==='login'?
              <>
                {error && <Typography style={{color:'#ff6161',fontSize:14, fontWeight:600}}>Please enter valid email or password</Typography>}
                <span><TextField variant="standard" onChange={(e)=>onValueChange(e)} name='email' label="Enter email"/>
                <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='password' type={visible? "text":"password"} label="Enter password"/> <span onClick={()=>{setvisible(!visible)}}>{visible? <VisibilityIcon/>:<VisibilityOffIcon/>}</span></span>
                <Text>By continuing, you agree to the Iconique's Terms of use and <Link onClick={() => setPrivacyPolicyOpen(true)} style={{ cursor: "pointer" }}> privacy policies</Link></Text>
                <LoginButton onClick={()=>loginUser()} variant="contained">Login</LoginButton>
                <Typography style={{textAlign:"center"}}>OR</Typography>
                <Google variant="contained">
                <GoogleLogin
                   onSuccess={(credentialResponse) => {
                    handleGoogleLogin(credentialResponse);
                   console.log(credentialResponse);
                   }}
                   onError={() => {
                        console.log('Login Failed');
                      }}
                />;
</Google>
                
                <CreateAccount onClick={()=>toggleSignup()}>New to Iconique? Create an account</CreateAccount>
              </>
              :
              <>
                {error && <Typography style={{color:'#ff6161',fontSize:14, fontWeight:600}}>{error}</Typography>}
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter Name"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='email' label="Enter Email"/>
                <span><TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' type={visible? "text":"password"} label="Enter Password"/><span onClick={()=>{setvisible(!visible)}}>{visible? <VisibilityIcon/>:<VisibilityOffIcon/>}</span></span>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)}  name='phone' label="Enter Phone"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='address' label="Enter Address"/>
                <Box style={{display:'flex'}}><Checkbox onChange={(e)=>onInputChange(e)} name='agree' /> <Text>By continuing, you agree to the Iconique's Terms of use and <Link onClick={() => setPrivacyPolicyOpen(true)} style={{ cursor: "pointer" }}> privacy policies</Link></Text></Box>
                <LoginButton onClick={()=>signupUser()} variant="contained">Sign Up</LoginButton>
              
                <CreateAccount onClick={()=>toggleLogin()}>Already have an Account? Login</CreateAccount>
              </>
} </Wrapper>
          </Box>
        </Component>
        <PrivacyPolicyDialog open={isPrivacyPolicyOpen} onClose={() => setPrivacyPolicyOpen(false)} />
    </Dialog>
  )
}

export default LoginDialog