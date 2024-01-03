import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Appbar from './component/Appbar'
import Signup from './component/Signup'
import Signin from './component/Signin'
import AddCourses from './component/AddCourses';
import GetCourses from './component/GetCourses';
import GetSingleCourses from './component/GetSingleCourse';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Homepage from './component/Homepage';
import UserCourses from './component/UserCourses';

function App() {
  

  return (
    <>
    <div style={{backgroundColor:"#eeeeee", width:'100vw', height:'100vh', overflow:'auto'}}>
    
    <RecoilRoot>
    <Router>
        <Appbar />
            <Routes>
                <Route path='/'  element={<Homepage/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/addCourses"  element={<AddCourses />} />
                <Route path="/getCourses" element={<GetCourses />} />
                <Route path="/course/:courseId" element={<GetSingleCourses />} />
                <Route path="/purchasedCourses"  element={<UserCourses/>} />
            </Routes>
        </Router>
        </RecoilRoot>
    </div>
      
    </>
  )
}

export default App
