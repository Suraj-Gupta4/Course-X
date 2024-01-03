import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleChange = (event) => {
      setRole(event.target.value);
      var role=event.target.value;
      localStorage.setItem("Role", role);
    };


    return <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div>  
      <center>
      <Typography>
         <h3>Welcome to Course-𝕏. Login here!</h3>
      </Typography>   
      </center>                                
     <Card variant="outlined" style={{width: 400, padding:20}}>
      <TextField 
      fullWidth = "true"
      label="Email" 
      variant="outlined" 
      onChange={e => setEmail(e.target.value)} 
      />
      
      <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="Password" 
       type='Password'
       variant="outlined" 
       onChange={e => setPassword(e.target.value)} 
       />
      
      <br></br>
      <br></br>

   <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Role</InputLabel>
   <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={role}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={"user"}>Student</MenuItem>
    <MenuItem value={"admin"}>Instructor</MenuItem>
   
    </Select>
   </FormControl>
    
    <br></br>
    <br></br>


      <Button variant="contained"
      onClick={()=>{

       
        if(localStorage.getItem("Role")==="user"){
      var url=baseUrl+"/users/login"
    }
    else if(localStorage.getItem("Role")==="admin"){
     url=baseUrl+"/admin/login/"
    }


          
          const  headers = {
              "Content-Type":"application/json",
              "username":email,
              "password":password
            }

          axios.post(url, {},{
           headers:headers,
           
          }).then((response)=>{
            
            
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
              window.location = "/";
            } 
          }).catch((error) => {
      
              alert("Invalid username and password/ User doesn't exist.");
            });
      }}>Signin</Button>

      </Card>
      </div>
    </div>
}

export default Signin;