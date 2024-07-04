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
    <div className="container mx-auto p-4 w-full border-double border-4 border-sky-500 bg-customBackground">
      <div className={"flex mx-auto w-full border-double border-4 border-pink-500 justify-around items-center"}>
        <div className="border-double border-4 border-red-500 flex flex-row justify-end">
          <button onClick={handleCreateGame}>Create Game</button>
          <button onClick={openJoinGameModal}>Join Game</button>
        </div>
        <div className="">Pinetree</div>
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
      <div className="flex justify-center border-double border-4 border-pink-500">
        <div className="border-double border-4 border-indigo-500 p-4">
          <SearchBar setPage={setPage} searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div className="">
          <Sort sort={sort} setSort={(sort) => setSort(sort)} />
        </div>
      </div>
      <div className="border-double border-4 border-green-500">
        <Card />
      </div>
      <div className="border-double border-4 border-blue-500">
        <div>
          <ListPage searchResults={searchResults} />
        </div>
        <div>
          {/* <Pagination page={page} limit={obj.limit ? obj.limit : 0} total={obj.total ? obj.total : 0} setPage={(page) => setPage(page)} /> */}
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