// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({ posts, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts)
        const resultsArray = posts.filter(post => post.title.includes(e.target.value) || post.body.includes(e.target.value))
        return setSearchResults(resultsArray)
    }
    return (
        <div>SearchBar</div>
    )
}

export default SearchBar