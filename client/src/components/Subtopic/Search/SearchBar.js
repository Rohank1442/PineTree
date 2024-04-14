import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults([...posts.subTopics]);

        console.log(posts.subTopics)
        const resultsArray = posts.subTopics.filter((user) => {
            const { subTopicName } = user;
            console.log(subTopicName)
            const nameExists = subTopicName && typeof subTopicName === 'string';
            // console.log(nameExists)
            if (nameExists) {
                return subTopicName.toLowerCase().includes(e.target.value.toLowerCase());
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

export default SearchBar;