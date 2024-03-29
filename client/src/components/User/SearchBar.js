import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    // const handleSearchChange = (e) => {
    //     if (!e.target.value) return setSearchResults(posts)

    //     console.log(posts)
    //     const resultsArray = posts.filter(post => post.name.includes(e.target.value) || post.year.includes(e.target.value))
    //     return setSearchResults(resultsArray)
    // }

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts);

        const resultsArray = posts.filter((post) => {
            const { name } = post;
            const nameExists = name && typeof name === 'string';

            if (nameExists) {
                return name.includes(e.target.value);
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