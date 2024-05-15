import { Link } from 'react-router-dom';

const Userr = ({ user }) => {
    
    return (
        <article>
            <h2>
                <Link to={`/topics/${user?._id}/opt`}>{`${user?.subTopicName}`}</Link>
            </h2>
        </article>
    );
};

export default Userr;