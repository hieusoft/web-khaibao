import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaginationState } from "../../types/declaration";

interface ListPaginationProps {
  state: PaginationState;
  onPageChange: (page: number) => void; 
}

export const ListPagination = ({ state, onPageChange }: ListPaginationProps) => {
  const { currentPage, pageSize, totalItems } = state;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between md:justify-end items-center gap-4 pt-4 border-t mt-4">
      {/* Thông tin số lượng */}
      <div className="text-xs text-gray-600">
        <span>{totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span>
        <span className="mx-1">-</span>
        <span>{Math.min(currentPage * pageSize, totalItems)}</span>
        <span className="text-gray-400 mx-1">/</span>
        <span>{totalItems} phiếu</span>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Selector số hàng trên mỗi trang */}
        <Select defaultValue={pageSize.toString()}>
          <SelectTrigger className="w-[110px] h-8 text-xs border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10/trang</SelectItem>
            <SelectItem value="20">20/trang</SelectItem>
            <SelectItem value="50">50/trang</SelectItem>
          </SelectContent>
        </Select>

        {/* Nút điều hướng */}
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-gray-300 rounded-[5px]" 
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)} // Gọi hàm lùi trang
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button className="h-8 w-8 bg-red-700 hover:bg-red-800 text-white rounded-[5px] text-xs">
            {currentPage}
          </Button>

          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-gray-300 rounded-[5px]" 
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)} // Gọi hàm tiến trang
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};