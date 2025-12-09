import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    FileInput,
    ChevronDown,
    ChevronRight,
    Box
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, hasSubmenu, expanded }) => {
    return (
        <div className={`
            flex items-center justify-between px-4 py-3 cursor-pointer transition-colors
            ${active ? 'bg-amber-50 text-amber-600 border-r-4 border-amber-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}
        `}>
            <div className="flex items-center gap-3">
                {Icon && <Icon size={18} />}
                <span className="text-sm font-medium">{label}</span>
            </div>
            {hasSubmenu && (
                expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            )}
        </div>
    );
};

const SubMenuItem = ({ label, active }) => {
    return (
        <div className={`
            pl-11 py-2 text-sm cursor-pointer transition-colors
            ${active ? 'text-amber-600 font-medium' : 'text-gray-500 hover:text-gray-700'}
        `}>
            {label}
        </div>
    );
};

const SectionHeader = ({ label, expanded, onToggle }) => {
    return (
        <div
            className="flex items-center justify-between px-4 py-3 mt-2 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={onToggle}
        >
            <div className="flex items-center gap-3">
                <Box size={18} />
                <span className="text-sm font-medium">{label}</span>
            </div>
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
    );
};

export const Sidebar = () => {
    const [servicesExpanded, setServicesExpanded] = useState(true);
    const [invoicesExpanded, setInvoicesExpanded] = useState(true);

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    V
                </div>
                <div>
                    <h1 className="font-bold text-gray-800 leading-tight">Vault</h1>
                </div>
            </div>

            <div className="px-6 pb-6 pt-0">
                <p className="text-xs text-gray-400">VARUN SARALA</p>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem icon={Users} label="Nexus" />
                <SidebarItem icon={FileInput} label="Intake" />

                <SectionHeader
                    label="Services"
                    expanded={servicesExpanded}
                    onToggle={() => setServicesExpanded(!servicesExpanded)}
                />

                {servicesExpanded && (
                    <div className="mb-2">
                        <SubMenuItem label="Pre-active" />
                        <SubMenuItem label="Active" active={true} />
                        <SubMenuItem label="Blocked" />
                        <SubMenuItem label="Closed" />
                    </div>
                )}

                <SectionHeader
                    label="Invoices"
                    expanded={invoicesExpanded}
                    onToggle={() => setInvoicesExpanded(!invoicesExpanded)}
                />

                {invoicesExpanded && (
                    <div className="mb-2">
                        <SubMenuItem label="Proforma Invoices" />
                        <SubMenuItem label="Final Invoices" />
                    </div>
                )}
            </div>
        </div>
    );
};
