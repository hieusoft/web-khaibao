import React from 'react';
import { LayoutList } from 'lucide-react';

interface SectionInfoBarProps {
    title: string;
    totalItems: number;
}

export const SectionInfoBar: React.FC<SectionInfoBarProps> = ({ title, totalItems }) => {
    return (
        <div className="px-4 md:px-6 py-3 md:py-4 border-b flex justify-between items-center bg-white">
            <div className="flex items-center gap-2 font-medium text-gray-950 min-w-0 flex-1">
                <LayoutList className="w-4 h-4 md:w-5 md:h-5 text-red-700 flex-shrink-0" />
                <span className="text-sm md:text-base truncate">
                    {title}
                </span>
                <span className="flex-shrink-0 ml-1 md:ml-2 px-2 py-0.5 bg-gray-100 text-[10px] md:text-xs text-gray-600 border rounded whitespace-nowrap">
                    {totalItems} phiếu
                </span>
            </div>
        </div>
    );
};