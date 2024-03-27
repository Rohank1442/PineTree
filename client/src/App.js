import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/User/Signup'
import Login from './components/User/Login'
import Homepage from './components/User/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
