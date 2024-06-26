import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Homepage from './components/Topic/Homepage';
import SubHome from './components/Subtopic/SubHome';
import Qpw from './components/Quiz/Qpw';
import LeaderBoard from './components/Quiz/LeaderBoard';
import Multiplayer from './components/Quiz/Multiplayer';
import QuizPage from './components/Quiz/QuizPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import Result from './components/Quiz/Result';
import { Provider as ReduxProvider } from 'react-redux';
import store from './components/Redux/store';
import { UserProvider } from './components/Context/UserContext';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <UserProvider>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/topics/:id' element={<SubHome />} />
              <Route path='/topics/:id/opt' element={<Qpw />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/topics/:id/opt/multi' element={<Multiplayer />} />
              <Route path='/leaderboard/:quizId' element={<LeaderBoard />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path='indi/result' element={<Result />} />
            </Routes>
          </UserProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;