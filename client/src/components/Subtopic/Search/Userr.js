import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setsubtopicNames } from '../../Redux/store';

const Userr = ({ user }) => {
    const dispatch = useDispatch();
    console.log(user);
    dispatch(setsubtopicNames(user?.subTopicName))
    return (
        <article>
            <h2>
                <Link to={`/topics/${user?._id}/opt`}>{`${user?.subTopicName}`}</Link>
            </h2>
        </article>
    );
};

export default Userr;