import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Homepage from './components/Topic/Homepage'
import SubHome from './components/Subtopic/SubHome'
import Qpw from './components/Quiz/Qpw'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css';

const queryClient = new QueryClient()

function App() {
 
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/topics/:id' element={<SubHome />} />
          <Route path="topics/:id/opt" element={<Qpw />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;