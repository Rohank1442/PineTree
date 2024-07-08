import { useEffect, useState } from "react";
import SearchBar from '../Search/SearchBar';
import ListPage from '../Search/ListPage';
import Pagination from "../Pagination";
import Sort from "../Sort";
import './styles.module.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setTopicNames } from '../../Redux/store'

const Subhome = () => {
    const [page, setPage] = useState(1)
    const [obj, setObj] = useState({})
    const [sort, setSort] = useState({ sort: "subTopics", order: "desc" })
    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState("")
    const [topicName, setTopicName] = useState('')
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchtopic = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/topics/${id}?page=${page}&sort=${sort.sort},${sort.order}&search=${searchText}`);
                // console.log(response)
                setTopicName(response.data.topic.topicName)
                setObj(response.data)
                setSearchResults([...response.data.subTopics]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching subtopic:', error);
                setIsLoading(false);
            }
        };

        fetchtopic();
    }, [id, sort, page, searchText]);

    // console.log(topicName)
    dispatch(setTopicNames(topicName))

    if (isLoading) return <p>Loading Users...</p>

    return (
        <div className="mx-auto p-3 w-full h-100 bg-customBackground">
            <h4 className="text-white text-3xl font-bold uppercase text-gradient">
                Subtopics
            </h4>
            <div className="flex flex-col md:flex-row justify-start mb-2">
                <div className="flex items-center mb-4 md:mb-0">
                    <SearchBar setPage={setPage} searchText={searchText} setSearchText={setSearchText} />
                </div>
                <div className="flex p-1 w-full md:w-78 h-13 rounded-lg">
                    <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                </div>
            </div>
            <ListPage searchResults={searchResults} />
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

export default Subhome;