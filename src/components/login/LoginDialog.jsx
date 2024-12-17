import { Box, Button, Checkbox, Dialog, Link, styled, TextField, Typography } from "@mui/material"
import LoginImage from "../../assets/LoginImage.png"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { authenticateGoogleLogin, authenticateLogin, authenticateSignup } from "../../service/api"
import { useState, useContext} from "react"
import { DataContext } from "../../context/DataProvider"

import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';


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
  const [error,setError]=useState(false);
  const {setAccount}=useContext(DataContext);

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
    setSignup({...signup,[e.target.name]:e.target.value})
    console.log(signup);
  }
  const signupUser=async ()=>{
    let response=await authenticateSignup(signup);
    console.log(response);
    if(!response) return;
    const { token, user } = response.data;

    // Save token and role
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'user');

    console.log('User Signup Successful:', user);
    alert('User Signup Successful!');
    handleClose();
    setAccount(signup.name);
  }

  const onValueChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
  }
  const loginUser=async ()=>{
    let response=await authenticateLogin(login);
    console.log(response);
    if(response.status===200){
      const { token, user } = response.data;

    // Save token and role
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'user');

    console.log('User login Successful:', user);
    alert('User login Successful!');
  
      handleClose();
      setAccount(response.data.user.name);
    }else{
      setError(true);
    }
  }
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

    console.log('User login Successful:', user);
    alert('User login Successful!');
            
            setAccount(response.data.user.name);
            handleClose();
        }
        else {
          console.log("Google login failed: Account not found. Please sign up first.");
      }
    } catch (error) {
        console.log("Google login failed:", error);
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
                <Text>By continuing, you agree to the Iconique's Terms of use and <Link to=""> privacy policies</Link></Text>
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
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter Name"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='email' label="Enter Email"/>
                <span><TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' type={visible? "text":"password"} label="Enter Password"/><span onClick={()=>{setvisible(!visible)}}>{visible? <VisibilityIcon/>:<VisibilityOffIcon/>}</span></span>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)}  name='phone' label="Enter Phone"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='address' label="Enter Address"/>
                <Box style={{display:'flex'}}><Checkbox onChange={(e)=>onInputChange(e)} name='agree' /> <Text>By continuing, you agree to the Iconique's Terms of use and <Link to=""> privacy policies</Link></Text></Box>
                <LoginButton onClick={()=>signupUser()} variant="contained">Sign Up</LoginButton>
              
                <CreateAccount onClick={()=>toggleLogin()}>Already have an Account? Login</CreateAccount>
              </>
} </Wrapper>
          </Box>
        </Component>
    </Dialog>
  )
}

export default LoginDialog