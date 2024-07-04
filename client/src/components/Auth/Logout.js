import { useSelector } from 'react-redux';
import styles from "./styles.module.css";

const Logout = () => {
	const email = useSelector(state => state.email);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="">
		  <nav className="">
			<div>{email}</div>
			<button className={styles.white_btn} onClick={handleLogout}>
			  Logout
			</button>
		  </nav>
		</div>
	  );
	};

export default Logout;