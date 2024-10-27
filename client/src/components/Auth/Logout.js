import { useSelector } from 'react-redux';
import styles from "./styles.module.css";

const Logout = () => {
	const email = useSelector(state => state.email);
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("reduxState");
		window.location.reload();
	};

	return (
		<div>
		  <nav className='flex flex-col md:flex-row items-start gap-2'>
			<div className='break-all'>{email}</div>
			<div className='md:block hidden'>
				<button className={styles.white_btn} onClick={handleLogout}>
				Logout
				</button>
			</div>
			<div className='md:hidden block'>
				<div className="flex md:hidden">
                  <div className="cursor-pointer text-sm text-left " onClick={handleLogout}>Logout</div>
                </div>
			</div>
		  </nav>
		</div>
	  );
	};

export default Logout;