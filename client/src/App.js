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
import { UserProvider } from './components/Context/UserContext';
import './App.css';
import CreateGame from './helper/CreateGame';
import MultiplayerLeaderBoard from './components/Quiz/Multiplayer/MultiLeaderBoard';
import WithAuth from './components/Protected/WithAuth';
import WithoutAuth from './components/Protected/WithoutAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Routes>
              <Route path='' element={<WithAuth />}>
                <Route path='/' element={<Homepage />} />
                <Route path='/topics/:id' element={<SubHome />} />
                <Route path='/topics/:id/opt' element={<Qpw />} />
                <Route path='/create-game' element={<CreateGame />} />
                <Route path='/topics/:id/multi/*' element={<Multiplayer />} />
                <Route path='/leaderboard/:quizId' element={<LeaderBoard />} />
                <Route path='/multi/leaderboard/:leaderboardId' element={<MultiplayerLeaderBoard />} />
                <Route path="/quiz/:id" element={<QuizPage />} />
              </Route>

              <Route path='' element={<WithoutAuth />}>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Route>
            </Routes>
          </UserProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;