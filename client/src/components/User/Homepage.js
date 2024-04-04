import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { getUsersPage } from "../../Api/axios";
import User from './Userr'
import PageButton from './PageButton';
import SearchBar from './SearchBar';
import ListPage from './ListPage';
import './homepage.css'
import axios from 'axios'

const base_url = 'http://localhost:5000/topics'

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
                setSearchResults(data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllTopics();
    }, [sort, page, searchResults]);

    const {
        isLoading,
        isError,
        error,
        data: users,
        isFetching,
        isPreviousData,
    } = useQuery(['/topics', page], () => getUsersPage(page), {
        keepPreviousData: true
    })

    if (isLoading) return <p>Loading Users...</p>
    if (isError) return <p>Error: {error.message}</p>
    // console.log(users.topics)
    const content = users.topics.map(user => <User key={user._id} user={user} />)
    // console.log(content)

    const lastPage = () => setPage(users.total_pages)
    const firstPage = () => setPage(1)
    const pagesArray = Array(users.total_pages).fill().map((_, index) => index + 1)

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    const handleSignup = (e) => {
        e.preventDefault();
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
            <div>
                <SearchBar posts={posts} setSearchResults={setSearchResults} />
                <ListPage searchResults={searchResults} />
            </div>
            {content}
            <nav className="nav-ex2">
                <button onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;&lt;</button>
                {pagesArray.map(pg => <PageButton pg={pg} setPage={setPage} />)}
                <button onClick={lastPage} disabled={isPreviousData || page === users.total_pages}>&gt;&gt;</button>
            </nav>
        </div>
    )
}

export default Homepage;