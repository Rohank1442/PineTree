import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/User/Signup'
import Login from './components/User/Login'
import Homepage from './components/User/Homepage'
import SubHome from './components/Subtopic/SubHome'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/topics/:id' element={<SubHome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;