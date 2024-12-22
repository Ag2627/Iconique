import { Box, Button, Checkbox, Dialog, Link, styled, TextField, Typography } from "@mui/material"
import { toast } from "@/hooks/use-toast";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginImage from "../../assets/LoginImage.png"
import { useState, useContext} from "react"
import { DataContext } from "../../context/DataProvider"
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { authenticateSellerGoogleLogin, authenticateSellerLogin, authenticateSellerSignup } from "../../service/api";
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
    subHeading:'Get access to your products,users and more!'
  },
  signup:{
    view:'signup',
    heading: 'New here? Sign up to be a seller!',
    subHeading:'Create your account to sell products.'
  }
}
const signupInitialValues={
    name:'',
    email:'',
    password:'',
    phone:'',
    address:'',
    storeName:'',
    Description:'',
    socialLink:'',
    logo:'',
    agree:'false'
  }
const loginInitialValues={
    email:'',
    password:''
}
const SellerLogin = ({open,setOpen}) => {

  const navigate=useNavigate(); //to navigate
  const [account,toggleAccount]=useState(accountInitialValues.login);
  const [signup,setSignup]=useState(signupInitialValues);
  const[login,setLogin]=useState(loginInitialValues);
  const [visible,setvisible]=useState(false);
  const [error,setError]=useState(false);
  const {setAccount}=useContext(DataContext);

  //form data setup
  const formData = new FormData();
  formData.append("name", signup.name);
  formData.append("email", signup.email);
  formData.append("password", signup.password);
  formData.append("phone", signup.phone);
  formData.append("address", signup.address);
  formData.append("storeName", signup.storeName);
  formData.append("description", signup.Description);
  formData.append("socialLink", signup.socialLink);
  formData.append("logo", signup.logo);
  formData.append("agree",signup.agree);

  //toast for errors 
  const showToast = 
  (message) => {
    toast({
      title: message,
      duration: 3000,
      position: 'top-center',
      style: { backgroundColor: '#f33a6a', color: '#fff' ,zIndex: 1301}
    });
  };

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
  const onImageChange=(e)=>{
    setSignup({...signup,logo: e.target.files[0]})
  }
  const signupSeller=async ()=>{
    try{
    let response=await authenticateSellerSignup(formData);
    //console.log(response);
    if(!response) showToast("Signup failed.Please check your details.");
    else{
      const { token, seller } = response.data;

    // Save token and role
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'seller');
    localStorage.setItem(
      "account",
      JSON.stringify({ id: seller._id, name: seller.name })
    );
    showToast("Seller Signup Successful");

      navigate('/seller');
      handleClose();
    }
  }catch(error){
    showToast(`An error occurred during signup. Please try again.${error.message}`);
  }
    
  }

  const onValueChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
  }
  const loginUser=async ()=>{
    let response=await authenticateSellerLogin(login);
    console.log(response);
    if(response.status===200){
      handleClose();
      const { token, seller } = response.data;

    // Save token and role
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'seller');
    localStorage.setItem(
      "account",
      JSON.stringify({ id: seller._id, name: seller.name })
    );
    showToast("Seller Login Successfull");
  
      navigate('/seller')
    }else{
      setError(true);
    }
  }
  const handleGoogleLogin = async (googleUser) => {
    try {
        const decoded = jwtDecode(googleUser.credential); 
        const response = await authenticateSellerGoogleLogin(decoded);

        if (response.status === 200) {
            console.log(response);
        
           const { token, seller } = response.data;
           
           // Save token and role
           localStorage.setItem('token', token);
           localStorage.setItem('role', 'seller');
           localStorage.setItem(
            "account",
            JSON.stringify({ id: seller._id, name: seller.name })
          );
           toast({
            title: "Login Successful",
            description: "Welcome to your dashboard!",
            variant: "success",
          });
            handleClose();
            navigate('/seller')
        }
        else {
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
                <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='email' label="Enter email"/>
                <span><TextField variant="standard" type={visible? "text":"password"} onChange={(e)=>onValueChange(e)} name='password' label="Enter password"/>
                <span onClick={()=>{setvisible(!visible)}}>{visible? <VisibilityIcon/>:<VisibilityOffIcon/>}</span></span>
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
                <span><TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' type={visible? "text":"password"}  label="Enter Password"/> <span onClick={()=>{setvisible(!visible)}}>{visible? <VisibilityIcon/>:<VisibilityOffIcon/>}</span></span>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)}  name='phone' label="Enter Phone"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='address' label="Enter Address"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='storeName' label="Enter Brand name"/>
                <TextField variant="standard" multiline
  rows={4} fullWidth onChange={(e)=>onInputChange(e)} name='description' label="Enter Description"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='socialLink' label="Enter your instagram account"/>
                <Typography>Upload Logo</Typography>
                <input type="file" onChange={(e)=>onImageChange(e)} name="logo" accept="image/*"/>
                <Box style={{display:'flex'}}><Checkbox onChange={(e)=>onInputChange(e)} name='agree' /> <Text>By continuing, you agree to the Iconique's Terms of use and <Link to=""> privacy policies</Link></Text></Box>
                <LoginButton onClick={()=>signupSeller()} variant="contained">Sign Up</LoginButton>
              
                <CreateAccount onClick={()=>toggleLogin()}>Already have an Account? Login</CreateAccount>
              </>
} </Wrapper>
          </Box>
        </Component>
    </Dialog>
  )
}

export default SellerLogin