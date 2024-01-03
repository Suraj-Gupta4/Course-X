import { useState } from "react";
import Card from '@mui/material/Card';
import { ButtonBase, CardActionArea, CardContent, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserCourses(){

    const [courses, setCourses] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() =>{ 
      
      
        axios.get(baseUrl+"/users/purchasedCourses",{
          headers:{
            "Authorization":"Bearer " + localStorage.getItem("token")
        }
        }).then((response) =>{
          

          setCourses(response.data.purchasedCourse);
        })
      } , []);

     
      if(courses.length===0){
    
        return <div>
    
    <Typography style={{display:"flex", justifyContent:"center"}}>
          <h1>No Courses to show! Please Purchase any.</h1>
        </Typography>
          
        </div>
      }

return <div>
        <Typography style={{display:"flex", justifyContent:"center"}}>
        <h1>All Purchased Courses</h1>
       </Typography>
       <div style={{display:"flex", flexWrap:"wrap", padding:20, gap:40}}>
       {courses.map(c => <Course title={c.title} description={c.description} image={c.imageLink}  courseId={c._id}/>)}
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
               
              
               
           </Typography>  
        </Card>
        
      </CardActionArea>
       
      
        
     </div>
   }
export default UserCourses;