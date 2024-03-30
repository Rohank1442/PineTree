import { useEffect } from 'react'
import Post from './Post'
import Userr from './Userr'

const ListPage = ({ searchResults }) => {
    const results = searchResults.map(user => <Userr key={user.id} user={user} />)
    const content = results?.length ? results : <article>No Matching Posts</article>

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults])

    return (
        <main>{content}</main>
    )
}

export default ListPage