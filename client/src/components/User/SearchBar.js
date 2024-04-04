import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts);

        // navigate(`?title=${e.target.value}`);

        console.log(posts.topics)
        const resultsArray = posts.topics.filter((user) => {
            const { topicName } = user;
            console.log(topicName)
            const nameExists = topicName && typeof topicName === 'string';
            // console.log(nameExists)
            if (nameExists) {
                return topicName.toLowerCase().includes(e.target.value.toLowerCase());
            }
            return false;
        });

        setSearchResults(resultsArray);
    };

    return (
        <header className="search" onSubmit={handleSubmit}>
            <form>
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                />
                <button className="search__button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header>
    )
}

export default SearchBar