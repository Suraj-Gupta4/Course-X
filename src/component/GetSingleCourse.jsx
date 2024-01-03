import { Dialog, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";

function GetSingleCourse() {
    

    const {courseId} = useParams();
    
    const [course, setCourse] = useState('');

    const baseUrl = import.meta.env.VITE_BASE_URL;

    
   
    useEffect(() =>{ 
      if(localStorage.getItem("Role")==="user"){
        var url=baseUrl+"/users/course/"
      }
      else if(localStorage.getItem("Role")==="admin"){
       url=baseUrl+"/admin/course/"
      }

     
    
      axios.get(url+courseId, {
        headers:{
          "Authorization":"Bearer " + localStorage.getItem("token")
      }}).then((response) =>{
        

        setCourse(response.data.course);
      })

    } , []);

    if(!course){
      return <div>
        LOADING........
      </div>
    }

 return <div>
 <div style={{height:200, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"gray", marginBottom:-100}}>
 <Typography >
         <h1>{course.title}</h1>
    </Typography>
 </div>
    
    
  
      <Grid container>
        <Grid item lg={8} >
          <UpdateCard course={course} setCourse={setCourse}></UpdateCard>
          <Description description={course.description}></Description>
        </Grid>
        <Grid  item lg={4}>
        <CourseCard course={course}></CourseCard>
        </Grid>
      </Grid>
     
      
  </div>
}

function UpdateCard(props){
  if(localStorage.getItem("Role")==="admin"){
  
     const baseUrl = import.meta.env.VITE_BASE_URL;
     
     const[title, setTitle] = useState(props.course.title);
     const[description, setDescription] = useState(props.course.description);
     const[image, setImage] = useState(props.course.imageLink);
     const[price, setPrice] = useState(props.course.price);
     const [published, setPublished] = useState(props.course.published);

     const [checked, setChecked] = useState(false);
    
     const handleChange = (event) => {
      
       setChecked(event.target.checked);
       if(event.target.checked===true){
         setPublished(true);
       }
       else {
        setPublished(false);
       }
     };
  

     return <div style={{paddingLeft:100, paddingTop:50, paddingBottom:10}}>
        <Card variant="outlined" style={{width: 400, padding:20}}>
        <h1>Update the course!</h1>
      <TextField 
      fullWidth = "true"
      label="Title" 
      variant="outlined" 
      defaultValue={props.course.title}
      onChange={e => setTitle(e.target.value)} 
      />
      
      <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="Description" 
       variant="outlined" 
       defaultValue={props.course.description}
       onChange={e => setDescription(e.target.value)} 
       />
      
      <br></br>
      <br></br>

      <TextField 
       fullWidth= "true"
       label="ImageLink" 
       variant="outlined"
       defaultValue={props.course.imageLink} 
       onChange={e => setImage(e.target.value)} 
       />
      
      <br></br>
      <br></br>

      <TextField 
       fullWidth= "true"
       label="Price" 
       variant="outlined" 
       defaultValue={props.course.price}
       onChange={e => setPrice(e.target.value)} 
       />
      
      <br></br>
      <br></br>

      <FormGroup>
      
      <FormControlLabel control={<Checkbox 
        checked={checked}
        onChange={handleChange}
      />} label="Published" />
      
     </FormGroup>

    
      <br></br>

      <Button variant="contained"
      onClick={()=>{

         
         axios.put(baseUrl+"/admin/courses/"+ props.course._id,{
          title:title,
               description:description,
               imageLink:image,
               price:price,
               published:published
         },
         {
          headers:{
              "Content-Type":"application/json",
               "Authorization": "Bearer " + localStorage.getItem("token")
            }
         }).then((response)=>{

         

          props.setCourse(response.data.course);
         })
          
    
      }}>Update Course</Button>

      </Card>
     </div>

}
}


function CourseCard(props) {
  

 

  return <div >
    
    <Card variant="outlined" style={{width: 400 , padding:20, height:460}}>
          <Typography>
             <h1 style={{marginTop:10, marginBottom:10}}>{props.course.title}</h1>
             
             <h2 style={{marginTop:10, marginBottom:10}}>{props.course.description}</h2>
             
             <img src={props.course.imageLink} width={400} height={250}></img>
             
             <h2 style={{marginTop:10, marginBottom:10}}>{props.course.price}</h2>
             
             <Published published={props.course.published}></Published>
             <Buy courseId={props.course._id}></Buy>
            
         </Typography>  
     
        
      </Card>
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
    return <h3 style={{marginTop:10, marginBottom:10}}>
      Unpublished
    </h3>
  }
}
}


function Description(props){
  if(localStorage.getItem("Role")==="user"){
    return <h2 style={{paddingTop:100, paddingLeft:20}}> {props.description}</h2>
  
  }
}

function Buy(props){
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if(localStorage.getItem("Role")==="user"){
   return <div>
    <Button 
        variant="contained" 
        onClick={() =>{
        console.log(props.courseId);
        fetch(baseUrl+"/users/courses/"+ props.courseId,{
            method:"POST"
            ,
            headers:{
              "Content-Type":"application/json",
               "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then((response)=>{
            response.json().then((data)=>{
              
              if(data.msg==="Course already purchased"){
                alert("Already Purchased!");
              }
              else{
              alert("Course Purchased Successfully");
              }
            })
          })
            
        }
            }
        >
        Buy now
        </Button>
   </div>
}
}

export default GetSingleCourse;

