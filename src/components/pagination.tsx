interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = [];
    const MAX_VISIBLE_PAGES = 3;

    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
        startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }



    return (
        <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 text-[10px] sm:text-xs flex-wrap">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="cursor-pointer px-2 sm:px-4 py-2 rounded-lg bg-[#00B1C8] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#057887] transition-colors duration-200"
            >
                <span className="rotate-180 block">➜</span>
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="cursor-pointer px-2 sm:px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="text-gray-500 mx-0.5">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`cursor-pointer px-2.5 sm:px-3 py-2 rounded-lg transition-colors duration-200 ${page === currentPage
                        ? 'bg-[#00B1C8] text-white font-semibold ring-1 ring-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-gray-500 mx-0.5">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="cursor-pointer px-2 sm:px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="cursor-pointer px-2 sm:px-4 py-2 rounded-lg bg-[#00B1C8] text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#057887] transition-colors"
            >
                ➜
            </button>
        </div>
    );
}