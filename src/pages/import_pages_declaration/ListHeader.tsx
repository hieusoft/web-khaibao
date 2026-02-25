import { Plus, FileSpreadsheet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const ListHeader = () => (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Danh sách nhập hàng
        </h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button asChild className="flex-1 sm:flex-none bg-red-700 hover:bg-red-800 text-white gap-2 h-9 px-4 transition-all active:scale-95">
                <Link to="/declaration/import/new">
                    <Plus className="w-4 h-4" />
                    <span className="whitespace-nowrap">Tạo mới</span>
                </Link>
            </Button>
            <Button
                variant="outline"
                className="flex-1 sm:flex-none border-red-800 text-red-800 hover:bg-red-50 h-9 px-4 transition-all active:scale-95"
            >
                <FileSpreadsheet className="w-4 h-4" />
                <span className="whitespace-nowrap">Nhập từ Excel</span>
            </Button>
        </div>
    </div>
);