import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { getUsersPage } from "../../../Api/axios";
import SearchBar from '../Search/SearchBar';
import ListPage from '../Search/ListPage';
import Pagination from "../Pagination";
import Sort from "../Sort";
import './styles.module.css'
import axios from 'axios'

const base_url = 'http://localhost:5000/'

const Homepage = () => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [obj, setObj] = useState({})
    const [sort, setSort] = useState({ sort: "topicName", order: "desc" })
    const [searchResults, setSearchResults] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getAllTopics = async () => {
            try {
                const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&searchResults=${searchResults}`;
                const { data } = await axios.get(url);
                setObj(data)
                // console.log(data)
                setPosts(data);
                setSearchResults([...data.topics]);
                console.log(data)
            } catch (err) {
                console.log(err);
            }
        };

        getAllTopics();
    }, [sort, page]);
    // console.log(searchResults)
    const {
        isLoading,
        isError,
        error,
        data: users,
        isFetching,
        isPreviousData,
    } = useQuery(['/', page], () => getUsersPage(page), {
        keepPreviousData: true
    })

    if (isLoading) return <p>Loading Users...</p>
    if (isError) return <p>Error: {error.message}</p>

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault()
        navigate('/signup')
    }

    return (
        <div>
            {isFetching && <span className="loading">Loading...</span>}
            <div className="flex justify-center">
                <div className="flex justify-center items-center">
                    <button type="submit" class="bg-black text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                        Log In
                    </button>
                </div>
                <div className="flex justify-center items-center m-2 p-2">
                    <button type="submit" class="bg-black text-white font-bold py-2 px-4 rounded" onClick={handleSignup}>
                        Sign up
                    </button>
                </div>
            </div>
            <div className="sort">
                <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            </div>
            <div>
                <SearchBar posts={posts} setSearchResults={setSearchResults} />
                <ListPage searchResults={searchResults} />
            </div>
            <div className="paginate">
                <Pagination
                    page={page}
                    limit={obj.limit ? obj.limit : 0}
                    total={obj.total ? obj.total : 0}
                    setPage={(page) => setPage(page)}
                />
            </div>
        </div>
    )
}

export default Homepage;