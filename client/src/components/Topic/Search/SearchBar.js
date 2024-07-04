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
            <form className="flex items-center">
                <input
                    className="search__input border border-gray-300 rounded-l px-4 py-2"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                    value={captureSearchText}
                    placeholder="Search..."
                />
                <button className="search__button bg-indigo-500 text-white rounded-r px-4 py-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header>
    )
}

export default SearchBar;