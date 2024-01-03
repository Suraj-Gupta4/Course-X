
import courseimage from "../assets/cH.jpg";

function Homepage(){

    return <div style={{overflow:"hidden", objectFit:"contain"}}>
        <img src={courseimage}  style={{width:"100%", height:"100%"}}></img>
    </div>
}



export default Homepage;