import { useState } from "react";
import Card from '@mui/material/Card';
import { ButtonBase, CardActionArea, CardContent, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";


function GetCourses() {
  
  const [courses, setCourses] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;


  useEffect(() =>{ 
    if(localStorage.getItem("Role")==="user"){
      var url=baseUrl+"/users/courses"
    }
    else if(localStorage.getItem("Role")==="admin"){
     url=baseUrl+"/admin/courses/"
    }

   

    axios.get(url,{
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("token")
    }
    }).then((response) =>{
      

      setCourses(response.data.course);
    })

  } , []);
  


  if(courses.length===0){
    
  

if(localStorage.getItem("Role")==="user"){
 return <Typography style={{display:"flex", justifyContent:"center"}}>
      <h1>LOADING.....</h1>
    </Typography>
    }
    else if(localStorage.getItem("Role")==="admin"){
    return  <Typography style={{display:"flex", justifyContent:"center"}}>
      <h1>No Courses to show! Please Add.</h1>
    </Typography>
    }

      
    
  }

  return <div>
       <Typography style={{display:"flex", justifyContent:"center"}}>
        <h1>All Courses</h1>
       </Typography>
       <div style={{display:"flex", flexWrap:"wrap", padding:20, gap:40}}>
       {courses.map(c => <Course title={c.title} description={c.description} image={c.imageLink} price={c.price} published={c.published} courseId={c._id}/>)}
       </div>
       
  </div>
}

 function Course(props){
  const navigate = useNavigate();
   return <div>
    
    <CardActionArea onClick={()=>{
      navigate("/course/"+props.courseId);
    }}>
     <Card variant="outlined" style={{width: 400 , padding:20, height:450}}>
          <Typography>
             <h1 style={{marginTop:10, marginBottom:10}}>{props.title}</h1>
             
             <h2 style={{marginTop:10, marginBottom:10}}>{props.description}</h2>
             
             <img src={props.image} width={400} height={250} style={{objectFit:"cover"}}></img>
             
             <h2 style={{marginTop:10, marginBottom:10}}>{"₹"+props.price}</h2>
             
             <Published published={props.published}></Published>
         </Typography>  
      </Card>
      
    </CardActionArea>
     
    
      
   </div>
 }

function Published(props){
  if(localStorage.getItem("Role")==="admin"){
  if(props.published===true){
    return <h3 style={{marginTop:10, marginBottom:10}}>
      Published
    </h3>
  }
  else {
    return <h3>
      Unpublished
    </h3>
  }
}
}

export default GetCourses;    