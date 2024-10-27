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
            <form className="flex items-center font-assist">
                <input
                    type="text"
                    className="rounded-md p-0.5 mr-1 w-full"
                    id="search"
                    onChange={handleSearchChange}
                    value={captureSearchText}
                    placeholder="Search topic"
                />
                <button className="bg-white p-1 m-1">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                </button>
            </form>
        </header>
    )
}

export default SearchBar;