import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-sky-400 transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all shadow-lg"
                placeholder="Search customers, products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
        </div>
    );
};