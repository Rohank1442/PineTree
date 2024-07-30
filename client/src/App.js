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
import { Provider as ReduxProvider } from 'react-redux';
import store from './components/Redux/store';
import { UserProvider } from './components/Context/UserContext';
import './App.css';
import CreateGame from './helper/CreateGame';
import MultiplayerLeaderBoard from './components/Quiz/Multiplayer/MultiLeaderBoard';

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
              <Route path='/create-game' element={<CreateGame/>} />
              <Route path='/topics/:id/multi/*' element={<Multiplayer />} />
              <Route path='/leaderboard/:quizId' element={<LeaderBoard />} />
              <Route path='/multi/leaderboard/:leaderboardId' element={<MultiplayerLeaderBoard />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
            </Routes>
          </UserProvider>
        </ReduxProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;