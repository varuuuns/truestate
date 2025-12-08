import React from 'react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

const SECTIONS = [
    { id: 'region', title: 'Region', options: ['East', 'West', 'North', 'South'] },
    { id: 'category', title: 'Category', options: ['Furniture', 'Electronics', 'Clothing'] }, // Examples, adjust based on data
    { id: 'gender', title: 'Gender', options: ['Male', 'Female'] },
];

export const FilterPanel = ({ filters, onChange }) => {

    const toggleFilter = (sectionId, value) => {
        const current = filters[sectionId] || [];
        const newValues = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        onChange(sectionId, newValues);
    };

    return (
        <div className="glass-panel p-4 space-y-6">
            <div className="flex items-center gap-2 text-sky-400 font-semibold mb-4">
                <Filter className="h-5 w-5" />
                <h2>Filters</h2>
            </div>

            {SECTIONS.map((section) => (
                <div key={section.id}>
                    <h3 className="text-sm font-medium text-slate-300 mb-2">{section.title}</h3>
                    <div className="space-y-2">
                        {section.options.map((option) => {
                            const checked = filters[section.id]?.includes(option);
                            return (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={clsx(
                                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                        checked
                                            ? "bg-sky-500 border-sky-500"
                                            : "border-slate-600 group-hover:border-sky-400"
                                    )}>
                                        {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={checked}
                                        onChange={() => toggleFilter(section.id, option)}
                                    />
                                    <span className={clsx(
                                        "text-sm transition-colors",
                                        checked ? "text-slate-100" : "text-slate-400 group-hover:text-slate-300"
                                    )}>
                                        {option}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};