import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faQuestion } from "@fortawesome/free-solid-svg-icons"
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
            <form className="flex items-center">
                <input
                    className="rounded-md p-0.5 mr-1"
                    type="text"
                    id="search"
                    onChange={handleSearchChange}
                    value={captureSearchText}
                    placeholder="Search Subtopic"
                />
                <button className="bg-white p-1 m-1">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                </button>
            </form>
        </header>
    )
}

export default SearchBar;