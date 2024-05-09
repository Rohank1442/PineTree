import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const SearchBar = ({ setPage, setSearchText }) => {
    const [captureSearchText, setCaptureSearchText] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        console.log(captureSearchText)
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