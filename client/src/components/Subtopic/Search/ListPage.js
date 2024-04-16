import { useEffect } from 'react'
import User from './Userr'

const ListPage = ({ searchResults }) => {
    const results = searchResults?.map(user => <User key={user._id} user={user} />)
    const content = results?.length ? results : <article>No Matching Posts</article>

    return (
        <main>{content}</main>
    )
}

export default ListPage;