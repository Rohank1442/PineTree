const Userr = ({ user }) => {
    
    return (
        <article>
            <h2>{user?.subTopicName}</h2>
            {/* <ul>
                {user?.subTopics.map(subTopic => (
                    <li key={subTopic._id}>{subTopic.subTopicName}</li>
                ))}
            </ul> */}
        </article> 
    );
};

export default Userr;