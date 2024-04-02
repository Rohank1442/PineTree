import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { useEffect } from "react"

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts);

        navigate(`?title=${e.target.value}`);

        // console.log(posts)
        // const resultsArray = posts.filter((user) => {
        //     const { first_name } = user;
        //     console.log(first_name)
        //     const nameExists = first_name && typeof first_name === 'string';
        //     // console.log(nameExists)
        //     if (nameExists) {
        //         return first_name.toLowerCase().includes(e.target.value.toLowerCase());
        //     }
        //     return false;
        // });

        // setSearchResults(resultsArray);
    };

    useEffect(() => {
        console.log(location);

        if (location.search) {
            const hold = location.search.substring(1);
            let queries = hold.split("&");

            let title = "";
            for (let i=0; i<queries.length; i++) {
                let query = queries[i].split("=");
                if (query[0] === "title") {
                    title = query[1];
                }
            }
            console.log(title);
        }
    }, [location])

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