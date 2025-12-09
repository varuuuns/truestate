import React from 'react';
import { Search, User } from 'lucide-react';

export const TopBar = () => {
    return (
        <div className="flex justify-between items-center py-5 px-8 bg-white border-b border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Sales Management System</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Name, Phone no."
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <div className="bg-amber-400 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer shadow-sm hover:bg-amber-500 transition-colors">
                    Saloni
                </div>
            </div>
        </div>
    );
};
