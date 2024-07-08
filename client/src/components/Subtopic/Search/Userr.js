import { Link } from 'react-router-dom';

const Userr = ({ user }) => {
    console.log(user)
    
    return (
        <article className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
            <h2 className="text-white font-semibold">
                <Link to={`/topics/${user?._id}/opt`}>{`${user?.subTopicName}`}</Link>
            </h2>
        </article>
    );
};

export default Userr;