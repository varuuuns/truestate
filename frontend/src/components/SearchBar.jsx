const { useEffect } = require("react");
const { useState } = require("react")

const SearchBar = ({ onSearchSubmit, initialSearch }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearch || '');
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() !== initialSearch.trim()) {
                onSearchSubmit(searchTerm.trim());
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDeafault();
        onSearchSubmit(searchTerm.trim());
    }

    const hadleClear = () => {
        setSearchTerm('');
        onSearchSubmit('');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
                
                <input type="text" placeholder="search hpone, name"
                    className="w-full p-2.5 pl-10 border border-gray-200 rounded-xl shadow-sm foucs:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm "
                />

                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>

            </form>
        </>
    )
}