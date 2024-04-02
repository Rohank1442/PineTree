import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { getUsersPage, getTopic } from "../../Api/axios";
import User from './Userr'
import PageButton from './PageButton';
import SearchBar from './SearchBar';
import ListPage from './ListPage';
import './homepage.css'

const Homepage = () => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([])
    const [searchResults, setSearchResults] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getUsersPage().then(json => {
            setPosts([...json.data])
            setSearchResults([...json.data])
        })
    }, [])

    const {
        isLoading,
        isError,
        error,
        data: users,
        isFetching,
        isPreviousData,
    } = useQuery(['/users', page], () => getUsersPage(page), {
        keepPreviousData: true
    })

    if (isLoading) return <p>Loading Users...</p>
    if (isError) return <p>Error: {error.message}</p>
    const content = users.data.map(user => <User key={user.id} user={user} />)
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