import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({ setPage, setSearchText }) => {
    const [captureSearchText, setCaptureSearchText] = useState(""); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setSearchText(captureSearchText);
    }

    const handleSearchChange = (e) => {
        setCaptureSearchText(e.target.value);
    };

    return (
        <header className="search" onSubmit={handleSubmit}>
            <form>
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                    value={captureSearchText}
                />
                <button className="search__button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header>
    )
}

export default SearchBar;