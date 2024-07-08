import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Sort = ({ sort, setSort }) => {
	const onArrowChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

	return (
		<div className="flex items-center rounded-md">
			<button className="p-1 m-0 flex flex-col items-center justify-center text-xs bg-white" onClick={onArrowChange}>
				<FontAwesomeIcon icon={faArrowUp} className="bg-white text-xsm" />
				<FontAwesomeIcon icon={faArrowDown} className="bg-white text-xsm" />
			</button>
		</div>
	);
};

export default Sort;