import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import ListPage from '../Search/ListPage';
import Pagination from "../Pagination";
import Card from "../Card";
import Sort from "../Sort";
import axios from 'axios';
import Logout from "../../Auth/Logout";
import Modal from 'react-modal';
import styles from './styles.module.css';

const base_url = 'http://localhost:5000/'

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "topicName", order: "desc" });
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&search=${searchText}`;
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

  if (isLoading) return <p>Loading Users...</p>;

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

  const openJoinGameModal = () => {
    setIsModalOpen(true);
  };

  const closeJoinGameModal = () => {
    setIsModalOpen(false);
  };

  const handleJoinGame = () => {
    navigate('/quiz');
  };

  return (
    <div className="container mx-auto p-3 w-full bg-customBackground">
      <div className="flex mx-auto w-full justify-around items-center">
        <div className="flex flex-row justify-end">
          <div className="cursor-pointer mr-4 text-sm" onClick={handleCreateGame}>Create Game</div>
          <div className="cursor-pointer text-sm" onClick={openJoinGameModal}>Join Game</div>
        </div>
        <div className="text-4xl font-cedarville">Pinetree</div>
        <div className="">
          {!user && (
            <>
              <button onClick={handleLogin}>Log In</button>
              <button onClick={handleSignup}>Sign Up</button>
            </>
          )}
          {user && (
            <Routes>
              <Route path="/" exact element={<Logout />} />
            </Routes>
          )}
        </div>
      </div>
      <div className="">
        <Card />
      </div>
      <div className="flex justify-start m-4">
        <div className="flex items-center">
          <SearchBar setPage={setPage} searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div className="flex p-1 w-78 h-13 rounded-lg">
          <Sort sort={sort} setSort={(sort) => setSort(sort)} />
        </div>
      </div>
      <div className="">
        <div>
          <ListPage searchResults={searchResults} />
        </div>
        <div>
          <Pagination page={page} limit={obj.limit ? obj.limit : 0} total={obj.total ? obj.total : 0} setPage={(page) => setPage(page)} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeJoinGameModal}
        contentLabel="Join Game"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Join Game</h2>
        <button onClick={handleJoinGame}>Join Game</button>
        <button onClick={closeJoinGameModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Homepage;