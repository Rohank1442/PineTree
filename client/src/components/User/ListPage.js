import { useEffect } from 'react'
import Post from './Post'
import User from './Userr'

const ListPage = ({ searchResults }) => {
    
    const results = searchResults?.map(user => <User key={user._id} user={user} />)
    console.log(results)
    const content = results?.length ? results : <article>No Matching Posts</article>

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults])

    return (
        <main>{content}</main>
    )
}

export default ListPage