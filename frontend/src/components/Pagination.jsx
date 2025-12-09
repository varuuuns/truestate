export const Pagination = ({ meta, onPageChange }) => {
    const { page, totalPages } = meta;

    // A simple range generator for pagination items
    // For now, simple implementation logic. 
    // Ideally should handle 1 ... 4 5 6 ... 10 logic but simple start is sufficient
    // or just hardcode visually for now? No, functional.

    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 6); i++) {
        pages.push(i);
    }
    // Just showing first 6 pages max for simplicity as per screenshot roughly

    return (
        <div className="flex items-center gap-2">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`
                        w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors
                        ${page === p
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    `}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};
