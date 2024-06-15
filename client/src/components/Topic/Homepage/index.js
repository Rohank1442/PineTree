import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import ListPage from '../Search/ListPage';
import Pagination from "../Pagination";
import Sort from "../Sort";
import './styles.module.css'
import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import Logout from "../../Auth/Logout";
import styles from './styles.module.css'

const base_url = 'http://localhost:5000/'

const Homepage = () => {
    const [page, setPage] = useState(1)
    const [obj, setObj] = useState({})
    const [sort, setSort] = useState({ sort: "topicName", order: "desc" })
    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        setUser(token);
    }, []);

    useEffect(() => {
        const getAllTopics = async () => {
            setIsLoading(true);
            try {
                const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&search=${searchText}`;
                const { data } = await axios.get(url);
                setObj(data)
                setSearchResults([...data.topics]);
                // console.log(data)
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        getAllTopics();
    }, [sort, page, searchText]);


    if (isLoading) return <p>Loading Users...</p>

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/signup')
    }

    return (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.logo}>Pinetree</div>
            <div className={styles.nav}>
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
          <div className={styles.sort}>
            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
          </div>
          <div className={styles.searchBar}>
            <SearchBar
              setPage={setPage}
              searchText={searchText}
              setSearchText={setSearchText}
            />
          </div>
          <div className={styles.listPage}>
            <ListPage searchResults={searchResults} />
          </div>
          <div className={styles.pagination}>
            <Pagination
              page={page}
              limit={obj.limit ? obj.limit : 0}
              total={obj.total ? obj.total : 0}
              setPage={(page) => setPage(page)}
            />
          </div>
        </div>
      );
    };

export default Homepage;