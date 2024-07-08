import styles from './styles.module.css';

const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);
    
	const onClick = (newPage) => {
		setPage(newPage + 1);
	};

	return (
		<div className="flex justify-center mt-4">
			{totalPages > 0 &&
				[...Array(totalPages)].map((val, index) => (
					<button
						onClick={() => onClick(index)}
                        className={`px-3 py-1 mx-1 border rounded-full ${
                            page === index + 1
                                ? 'bg-[#E32970] text-white'
                                : 'bg-white text-[#E32970] border-[#E32970]'
                        }`}
                        key={index}
					>
						{index + 1}
					</button>
				))}
		</div>
	);
};

export default Pagination;