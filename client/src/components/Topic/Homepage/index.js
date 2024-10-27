import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import ListPage from '../Search/ListPage';
import Pagination from "../Pagination";
import Card from "../Card";
import Sort from "../Sort";
import axios from 'axios';
import Logout from "../../Auth/Logout";
import JoinGame from "./JoinGame";
import Footer from '../Footer';
import { FaBars } from 'react-icons/fa';
import Loader from "../../../Loader";
import styles from './styles.module.css';

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "topicName", order: "desc" });
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);

  useEffect(() => {
    const getAllTopics = async () => {
      setIsLoading(true);
      try {
        const url = `${process.env.REACT_APP_SERVER_NAME}?page=${page}&sort=${sort.sort},${sort.order}&search=${searchText}`;
        const { data } = await axios.get(url);
        setObj(data);
        setSearchResults([...data.topics]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    getAllTopics();
  }, [sort, page, searchText]);

  if (isLoading) return <Loader />;

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleCreateGame = (e) => {
    e.preventDefault();
    navigate('/create-game');
  };

  return (
    <div className="mx-auto p-3 w-full bg-customBackground">
      <div className="flex fixed z-50 bg-customBackground justify-between items-center mx-auto w-screen top-0 left-0 p-3">
        <div className="text-2xl md:text-4xl font-cedarville">Pinetree</div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            <FaBars />
          </button>
        </div>

        <div className={`flex-col md:flex-row z-40 p-2 md:p-0 items-center md:flex ${isMenuOpen ? 'flex' : 'hidden'} absolute hidden md:flex md:relative top-16 right-0 md:top-0 md:left-0 md:w-auto bg-white md:bg-transparent`}>
          <div className="flex flex-col md:flex-row justify-end w-full md:w-auto mb-2 md:mb-0">
            <div className="flex md:p-4">
              <div className="cursor-pointer text-sm" onClick={handleCreateGame}>Create Game</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end w-full md:w-auto gap-y-2 md:gap-0">
            {!user && (
              <>
                <div className="hidden md:block">
                  <button className={styles.login_btn} onClick={handleLogin}>Log In</button>
                </div>
                <div className="hidden md:block">
                  <button className={styles.signup_btn} onClick={handleSignup}>Sign Up</button>
                </div>
                <div className="flex md:p-4 md:hidden">
                  <div className="cursor-pointer mr-4 text-sm" onClick={handleLogin}>Log In</div>
                </div>
                <div className="flex md:p-4 md:hidden">
                  <div className="cursor-pointer mr-4 text-sm" onClick={handleSignup}>Sign Up</div>
                </div>
              </>
            )}
            {user && (
              <Routes>
                <Route path="/" exact element={<Logout />} />
              </Routes>
            )}
          </div>
        </div>
        
        <div className={`flex-col md:flex-row z-40 p-2 md:p-0 items-center md:flex ${isMenuOpen ? 'flex' : 'hidden'} absolute md:hidden md:relative top-16 right-0 md:top-0 md:left-0 w-1/2 sm:w-1/3 rounded-md md:w-auto bg-white md:bg-transparent`}>
          <div className="flex flex-col md:flex-row justify-end w-full md:w-auto mb-2 md:mb-0">
            <div className="flex md:p-4">
              <div className="cursor-pointer mr-4 text-sm" onClick={handleCreateGame}>Create Game</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end w-full md:w-auto gap-y-2 md:gap-0">
            {!user && (
              <>
                <div className="hidden md:block">
                  <button className={styles.login_btn} onClick={handleLogin}>Log In</button>
                </div>
                <div className="hidden md:block">
                  <button className={styles.signup_btn} onClick={handleSignup}>Sign Up</button>
                </div>
                <div className="flex md:p-4 md:hidden">
                  <div className="cursor-pointer mr-4 text-sm" onClick={handleLogin}>Log In</div>
                </div>
                <div className="flex md:p-4 md:hidden">
                  <div className="cursor-pointer mr-4 text-sm" onClick={handleSignup}>Sign Up</div>
                </div>
              </>
            )}
            {user && (
              <Routes>
                <Route path="/" exact element={<Logout />} />
              </Routes>
            )}
          </div>
        </div>
      </div>
      <div>
        <Card />
      </div>
      <JoinGame />
      <div className="flex flex-col md:flex-row justify-start p-2">
        <div className="flex items-center mb-4 md:mb-0">
          <SearchBar setPage={setPage} searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div className="flex p-1 w-full md:w-78 h-13 rounded-lg">
          <Sort sort={sort} setSort={(sort) => setSort(sort)} />
        </div>
      </div>
      <div>
        <ListPage searchResults={searchResults} />
        <Pagination page={page} limit={obj.limit ? obj.limit : 0} total={obj.total ? obj.total : 0} setPage={(page) => setPage(page)} />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;