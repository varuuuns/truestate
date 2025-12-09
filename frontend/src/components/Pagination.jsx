export const Pagination = ({ meta, onPageChange }) => {
    const { page, totalPages } = meta;

    // Logic to show pages with ellipses
    const getPageNumbers = () => {
        const pages = [];
        const maxVisibleButtons = 7;

        if (totalPages <= maxVisibleButtons) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (page > 3) {
                pages.push('...');
            }

            let start = Math.max(2, page - 1);
            let end = Math.min(totalPages - 1, page + 1);

            if (page <= 3) {
                end = Math.min(totalPages - 1, 4);
            }
            if (page >= totalPages - 2) {
                start = Math.max(2, totalPages - 3);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (page < totalPages - 2) {
                pages.push('...');
            }

            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>

            {pageNumbers.map((p, index) => (
                <button
                    key={index}
                    onClick={() => typeof p === 'number' && onPageChange(p)}
                    disabled={p === '...'}
                    className={`
                        w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                        ${p === page
                            ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                            : p === '...'
                                ? 'text-gray-400 cursor-default'
                                : 'text-gray-600 hover:bg-gray-50 border border-gray-200'}
                    `}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    );
};
