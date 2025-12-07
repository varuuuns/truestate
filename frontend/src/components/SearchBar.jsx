import React from 'react';

const SearchBar = ({ onSearchChange, initialSearch }) => {
    return (
        <div className="relative w-full max-w-sm">

            <input
                type="text"
                defaultValue={initialSearch}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Name, Phone no. (Case-insensitive)"
                className="w-full p-2.5 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
    );
};

export default SearchBar;