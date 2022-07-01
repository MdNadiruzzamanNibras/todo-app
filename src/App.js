import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Navbar/Navbar';
import Complete from './Pages/Complete/Complete';
import Clander from './Pages/Home/Clander';
import Updatetodo from './Pages/Home/Updatetodo';

function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar/>
       <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/complete' element={<Complete></Complete>}></Route>
        <Route path='/clander' element={<Clander></Clander>}></Route>
        <Route path='/update' element={<Updatetodo></Updatetodo>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
       </Routes>
    </div>
  );
}

export default App;
