import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FilterSection = () => (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-[474px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
                placeholder="Tìm kiếm theo mã, ngày nhập hàng..."
                className="pl-10 bg-zinc-100 border-transparent focus:bg-white focus:border-gray-200 transition-all"
            />
        </div>
        <div className="w-full md:w-48">
            <Select defaultValue="all">
                <SelectTrigger className="bg-zinc-100 border-transparent w-full">
                    <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="unpaid">Chưa nộp</SelectItem>
                    <SelectItem value="paid">Đã nộp</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
);