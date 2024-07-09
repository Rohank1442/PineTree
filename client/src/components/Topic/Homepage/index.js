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
      <div className="flex justify-between items-center mx-auto w-full">
        <div className="text-4xl font-cedarville">Pinetree</div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            <FaBars />
          </button>
        </div>
        <div className={`flex-col md:flex-row items-center md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:visible absolute md:relative top-16 left-0 md:top-0 md:left-0 w-full md:w-auto bg-white  md:bg-transparent`}>
          <div className="flex flex-col md:flex-row justify-end w-full md:w-auto mb-4 md:mb-0">
            <div className="flex p-4">
              <div className="cursor-pointer mr-4 text-sm" onClick={handleCreateGame}>Create Game</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end w-full md:w-auto">
            {!user && (
              <>
                <button className={styles.login_btn} onClick={handleLogin}>Log In</button>
                <button className={styles.signup_btn} onClick={handleSignup}>Sign Up</button>
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