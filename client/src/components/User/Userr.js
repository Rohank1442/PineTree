const Userr = ({ user }) => {
    return (
        <article>
            <h2>{`${user?.topicName} ${user?.creator.username}`}</h2>
            <p>Email: {user?.creator._id}</p>
            <p>User ID: {user?._id}</p>
        </article> 
    )
}
export default Userr