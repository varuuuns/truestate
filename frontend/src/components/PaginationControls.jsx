const PaginationControls = ({ meta, setPage, currentPage }) => {
    const totalPages = meta.totalPages || 1;
    const isFirstPage = currentPage ===1;
    const isLastPage = currentPage >= totalPages; 

    const handlePrevious = () => {
        if (!isFirstPage) setPage(currentPage - 1);
    }

    const handleNext = () => {
        if (!isLastPage) setPage(currentPage + 1);
    }

    if (meta.totalCount === 0 || totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-b-xl shadow-lg mt-0">
            <p className="text-sm text-gray-700">
                Showing page <span className="font-semibold text-blue-600">{currentPage}</span> of{' '}
                <span className="font-semibold">{totalPages}</span> total pages (
                <span className="font-medium">{meta.totalCount}</span> items)
            </p>

            <div className="flex space-x-3">
                <button
                    onClick={handlePrevious}
                    disabled={isFirstPage}
                    className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-150 ${isFirstPage
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                            : 'bg-white text-blue-600 border-blue-500 hover:bg-blue-50'
                        }`}
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={isLastPage}
                    className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-150 ${isLastPage
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                            : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PaginationControls;