import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ListHeader } from "./ListHeader";
import { FilterSection } from "./FilterSection";
import { ImportTable } from "./ImportTable";
import { ListPagination } from "./ListPagination";
import { SectionInfoBar } from './SectionInfoBar';
import { ImportDeclaration, PaginationState } from "../../types/declaration";
import { importApi } from '@/lib/api'; 

const ImportDeclarationList: React.FC = () => {
  const [data, setData] = useState<ImportDeclaration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  });

  const fetchImportList = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: pagination.pageSize,
      };
      
      const response = await importApi.getAll(params);
      console.log(response);
      if (response) {
        const items = response.data.items || response;
        console.log(items);
        const total = response.total || items.length;
        
        setData(items);
        setPagination(prev => ({ ...prev, totalItems: total }));
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage, pagination.pageSize]);

  useEffect(() => {
    fetchImportList();
  }, [fetchImportList]);

  const handleDelete = async (id: number, name: string) => {
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa phiếu ${name}?`);
    
    if (isConfirmed) {
      try {
        await importApi.delete(id);
        fetchImportList();
      } catch (error) {
        console.log("abs")
      }
    }
  };
  return (
    <div className="space-y-6 p-4 animate-in fade-in duration-500">
      <ListHeader />
      
      <Card className="border-black/10 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <SectionInfoBar
            title="Danh sách khai báo"
            totalItems={pagination.totalItems}
          />
          
          <div className="p-4 md:p-6">
            <FilterSection />
            
            {isLoading ? (
              <div className="h-64 flex flex-col items-center justify-center gap-2 text-gray-500">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-700 border-t-transparent"></div>
                <p className="text-sm">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <ImportTable data={data} onDelete={handleDelete}/>
            )}
            
            <ListPagination 
              state={pagination} 
              onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportDeclarationList;