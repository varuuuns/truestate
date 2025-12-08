import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ meta, onPageChange }) => {
    const { page, totalPages, total } = meta;

    return (
        <div className="flex items-center justify-between p-4 glass-panel">
            <div className="text-sm text-slate-400">
                Showing page <span className="font-medium text-white">{page}</span> of{' '}
                <span className="font-medium text-white">{totalPages}</span> ({total} items)
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300 hover:text-white"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
