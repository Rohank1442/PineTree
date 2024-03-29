const Post = ({ post }) => {
    return (
        <article>
            <h2>Color: {post.color}</h2>
            <p>Year: {post.year}</p>
            <p>Post ID: {post.id}</p>
            <p>Post Name: {post.name}</p>
        </article>
    )
}
export default Post