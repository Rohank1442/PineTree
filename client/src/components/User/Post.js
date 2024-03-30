const Post = ({ post }) => {
    return (
        <article>
            <h2>First Name: {post.first_name}</h2>
            <p>Last Name: {post.last_name}</p>
            <p>Post ID: {post.id}</p>
            <p>Email: {post.email}</p>
        </article>
    )
}
export default Post