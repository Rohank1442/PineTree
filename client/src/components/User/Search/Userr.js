const Userr = ({ user }) => {
    return (
        <article>
            <h2>{`${user?.topicName} ${user?.creator.username}`}</h2>
            <p>Email: {user?.creator.email}</p>
            <p>User ID: {user?._id}</p>
        </article> 
    )
}
export default Userr;