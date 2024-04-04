import { useEffect } from 'react'
import Post from './Post'
import Userr from './Userr'

const ListPage = ({ searchResults }) => {
    const results = searchResults.topics.map(user => <Userr key={user._id} user={user} />)
    //Error here
    const content = results?.length ? results : <article>No Matching Posts</article>

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults])

    return (
        <main>{content}</main>
    )
}

export default ListPage