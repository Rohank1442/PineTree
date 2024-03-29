import { useEffect } from 'react'
import Post from './Post'


const ListPage = ({ searchResults }) => {
    const results = searchResults.map(post => <Post key={post.id} post={post} />)
    console.log(results)
    const content = results?.length ? results : <article>No Matching Posts</article>

    useEffect(() => {
        // console.log(searchResults);  
    }, [searchResults])

    return (
        <main>{content}</main>
    )
}

export default ListPage