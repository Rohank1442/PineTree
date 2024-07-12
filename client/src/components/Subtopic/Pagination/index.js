class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage);
    };

    const getPageNumbers = () => {
        const pageNumbers = new Queue();
        const window = 5;
        let start = Math.max(1, page - Math.floor(window / 2));
        let end = Math.min(totalPages, start + window - 1);

        start = Math.max(1, end - window + 1);

        for (let i = start; i <= end; i++) {
            pageNumbers.enqueue(i);
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-4 mb-4">
            {totalPages > 0 && (
                <>
                    {page > 1 && (
                        <button
                            onClick={() => onClick(page - 1)}
                            className="px-3 py-1 mx-1 border rounded-full bg-white text-[#E32970] border-[#E32970]"
                        >
                            &lt;
                        </button>
                    )}

                    {Array.from({ length: getPageNumbers().items.length }, (_, index) => {
                        const pageNum = getPageNumbers().items[index];
                        return (
                            <button
                                onClick={() => onClick(pageNum)}
                                className={`px-3 py-1 mx-1 border rounded-full ${page === pageNum
                                    ? 'bg-[#E32970] text-white'
                                    : 'bg-white text-[#E32970] border-[#E32970]'
                                    }`}
                                key={pageNum}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {page < totalPages && (
                        <button
                            onClick={() => onClick(page + 1)}
                            className="px-3 py-1 mx-1 border rounded-full bg-white text-[#E32970] border-[#E32970]"
                        >
                            &gt;
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Pagination;