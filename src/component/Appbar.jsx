import { Button, Link, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {

   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const baseUrl = import.meta.env.VITE_BASE_URL;

   useEffect(() =>{ 
    if(localStorage.getItem("Role")==="user"){
           var url=baseUrl+"/users/me";
         }
         else if(localStorage.getItem("Role")==="admin"){
          url=baseUrl+"/admin/me";
         }

    
    
    axios.get(url,{
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("token")
    }
    }).then((response) =>{
      console.log(response.data);

      setUser(response.data.username);
    })
  } , []);

  
  if(user && localStorage.getItem("Role")==="admin"){
  return <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"black", color:"white"}}>

    <div style={{paddingLeft:'10px'}}>
        <Typography>
        <h1>
        <Link href="/" underline="hover" style={{color:"white"}}>Course-𝕏</Link>
        </h1>
            
        </Typography>
    </div>

    <div style={{display:"flex", gap:20, padding:"27px"}}>

    <div>
      <Typography>
      
      <Link href="/getCourses" underline="hover" style={{marginRight:20, fontSize:25, color:"white"}}>
        Courses</Link>

        <Link href="/addCourses" underline="hover" style={{fontSize:25, color:"white"}}>
        Add Courses</Link>
      </Typography>
    </div>

    <div>
    <div style={{fontSize:25, padding:4, fontFamily:"sans-serif"}}>
      {user}
    </div>
        
    </div>

     <div>
     <Button 
        variant="contained" 
        onClick={() =>{

         window.location="/";   
        localStorage.setItem('token', null);
            
        }
            }
        >
        Logout
        </Button>
     </div>
        
    </div>
  </div>
}
else if(user && localStorage.getItem("Role")==="user"){
  return <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"black", color:"white"}}>

  <div style={{paddingLeft:'10px'}}>
      <Typography>
      <h1>
      <Link href="/" underline="hover" style={{color:"white"}}>Course-𝕏</Link>
      </h1>
          
      </Typography>
  </div>

  <div style={{display:"flex", gap:20, padding:"27px"}}>

  <div>
    <Typography>
    
    <Link href="/getCourses" underline="hover" style={{marginRight:20, fontSize:25, color:"white"}}>
      Courses</Link>

      <Link href="/purchasedCourses" underline="hover" style={{fontSize:25, color:"white"}}>
      My Courses</Link>
    </Typography>
  </div>

  <div>
  <div style={{fontSize:25, padding:4, fontFamily:"sans-serif"}}>
    {user}
  </div>
      
  </div>

   <div>
   <Button 
      variant="contained" 
      onClick={() =>{

       window.location="/";   
      localStorage.setItem('token', null);
          
      }
          }
      >
      Logout
      </Button>
   </div>
      
  </div>
</div>
}

  return <div style={{display:"flex", justifyContent:"space-between",backgroundColor:"black", color:"white"}}>

    <div style={{paddingLeft:'10px'}}>
        <Typography>
        <h1>
        <Link href="/" underline="hover" style={{color:"white"}}>Course-𝕏</Link>
        </h1>
        </Typography>
    </div>

    <div style={{display:"flex", gap:20, padding:"26px"}}>
    
    <div>
    <Button 
        variant="contained"
        onClick={() =>{
            

            navigate("/signin");
        }
            }
        >
        Signin</Button>
    </div>

     <div>
     <Button 
        variant="contained" 
        onClick={() =>{
            

            navigate("/signup");
        }
            }
        >
        Signup
        </Button>
     </div>
        
    </div>
  </div>
}

export default Appbar;