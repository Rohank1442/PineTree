import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

const Sort = ({ sort, setSort }) => {
	const onArrowChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

	return (
		<div className="flex items-center bg-customBackgroundPink rounded-md">
			<button className="p-1 m-0 flex flex-col items-center justify-center text-xs bg-customBackgroundPink" onClick={onArrowChange}>
				<FontAwesomeIcon icon={faArrowUp} className="text-xsm" />
				<FontAwesomeIcon icon={faArrowDown} className="text-xsm" />
			</button>
		</div>
	);
};

export default Sort;