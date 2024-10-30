import { Box, Button, Checkbox, Dialog, Link, styled, TextField, Typography } from "@mui/material"
import LoginImage from "../../assets/LoginImage.png"
import GoogleLogo from "../../assets/GoogleLogo.png"
import { authenticateSignup } from "../../service/api"
import { useState } from "react"

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
const LoginDialog = ({open,setOpen}) => {
  const [account,toggleAccount]=useState(accountInitialValues.login);
  const [signup,setSignup]=useState(signupInitialValues);

  const handleClose=()=>{
    setOpen(false);
    toggleAccount(accountInitialValues.login)
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
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}  PaperProps={{
      style: {
          maxWidth: 'unset',
           // Responsive width
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
                <TextField variant="standard" label="Enter email"/>
                <TextField variant="standard" label="Enter password"/>
                <Text>By continuing, you agree to the Iconique's Terms of use and <Link to=""> privacy policies</Link></Text>
                <LoginButton variant="contained">Login</LoginButton>
                <Typography style={{textAlign:"center"}}>OR</Typography>
                <Google variant="contained"><img src={GoogleLogo} style={{width:25 ,height:25}}></img>Continue with google</Google>
                <CreateAccount onClick={()=>toggleSignup()}>New to Iconique? Create an account</CreateAccount>
              </>
              :
              <>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter Name"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='email' label="Enter Email"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter Password"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)}  name='phone' label="Enter Phone"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='address' label="Enter Address"/>
                <Checkbox onChange={(e)=>onInputChange(e)} name='agree' /> <Text>By continuing, you agree to the Iconique's Terms of use and <Link to=""> privacy policies</Link></Text>
                <LoginButton onClick={()=>signupUser()} variant="contained">Sign Up</LoginButton>
                <Typography style={{textAlign:"center"}}>OR</Typography>
                <Google variant="contained"><img src={GoogleLogo} style={{width:25 ,height:25}}></img>Continue with google</Google>
                <CreateAccount onClick={()=>toggleLogin()}>Already have an Account? Login</CreateAccount>
              </>
} </Wrapper>
          </Box>
        </Component>
    </Dialog>
  )
}

export default LoginDialog