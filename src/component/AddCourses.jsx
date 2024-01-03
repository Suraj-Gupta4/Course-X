import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';


function AddCourses() {

     const[title, setTitle] = useState("");
     const[description, setDescription] = useState("");
     const[image, setImage] = useState('');
     const[price, setPrice] = useState('');
     const [published, setPublished] = useState('');
     const baseUrl = import.meta.env.VITE_BASE_URL;  
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
     
     return <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:20}}>
        <Card variant="outlined" style={{width: 400, padding:20}}>
      <TextField 
      fullWidth = "true"
      label="Title" 
      variant="outlined" 
      onChange={e => setTitle(e.target.value)} 
      />
      
      <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="Description" 
       variant="outlined" 
       onChange={e => setDescription(e.target.value)} 
       />
      
      <br></br>
      <br></br>

      <TextField 
       fullWidth= "true"
       label="ImageLink" 
       variant="outlined" 
       onChange={e => setImage(e.target.value)} 
       />
      
      <br></br>
      <br></br>
      
      <TextField 
       fullWidth= "true"
       label="Price" 
       variant="outlined" 
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
      <br></br>

      <Button variant="contained"
      onClick={()=>{
        
        axios.post(baseUrl+"/admin/courses",{
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
        }).then((response) => {
          console.log(response.data);

          alert("Course Added");
              
          window.location="/addCourses"
        })
      }}>Add Course</Button>

      </Card>
     </div>
}



export default AddCourses;