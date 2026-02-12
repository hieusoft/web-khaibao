import { Calendar, Package, Clock, Link, Pencil, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImportDeclaration } from "../../types/declaration";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImportTableProps {
  data: ImportDeclaration[];
  onDelete: (id: number, name: string) => void;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "---";
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN');
};

const getStatusDetails = (state: string) => {
  switch (state?.toLowerCase()) {
    case 'draft':
      return { label: 'BẢN NHÁP', class: 'bg-gray-100 text-gray-600 border-gray-200' };
    case 'posted':
      return { label: 'ĐÃ NỘP', class: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'success':
      return { label: 'HOÀN THÀNH', class: 'bg-green-50 text-green-700 border-green-200' };
    default:
      return { label: state?.toUpperCase() || 'N/A', class: 'bg-gray-100 text-gray-600 border-gray-200' };
  }
};

const HEADERS = ["Mã đơn hàng", "Nhà cung cấp", "Ngày nhập hàng", "Ngày tạo", "Tổng", "Trạng thái", "Thao tác"];

export const ImportTable = ({ data, onDelete }: ImportTableProps) => {
  return (
    <div className="border border-gray-200 rounded-sm overflow-hidden bg-white">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="border-collapse">
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent">
              {HEADERS.map((header, index) => (
                <TableHead
                  key={header}
                  className={cn(
                    "text-center font-bold text-gray-950 border-r border-gray-200 h-10 px-4 whitespace-nowrap",
                    index === HEADERS.length - 1 && "border-r-0"
                  )}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center text-gray-500 italic">
                  Không có dữ liệu khai báo
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const status = getStatusDetails(item.state);
                return (
                  <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="border-r font-bold text-red-800 text-center uppercase whitespace-nowrap">
                      {item.name}
                    </TableCell>
                    <TableCell className="border-r text-gray-700 font-medium min-w-[200px]">
                      {item.partner_name}
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-600 whitespace-nowrap">
                      {formatDate(item.date_order)}
                    </TableCell>
                    <TableCell className="border-r text-center text-gray-400 text-[11px] whitespace-nowrap">
                      {formatDate(item.create_order)}
                    </TableCell>
                    <TableCell className="border-r text-right font-bold text-gray-900 whitespace-nowrap">
                      {item.amount_total?.toLocaleString()} <span className="text-[10px] font-normal">{item.currency}</span>
                    </TableCell>
                    <TableCell className="border-r text-center">
                      <span className={cn("px-2 py-1 rounded text-[10px] font-bold border whitespace-nowrap", status.class)}>
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-blue-50"
                        disabled={item.state !== 'draft'}
                        asChild
                      >
                        <Link to={`/declaration/import/edit/${item.id}`}>
                          <Pencil className={cn("w-4 h-4", item.state === 'draft' ? "text-blue-600" : "text-gray-300")} />
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-50"
                        onClick={() => onDelete(item.id, item.name)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden divide-y divide-gray-200">
        {data.map((item) => {
          const status = getStatusDetails(item.state);
          return (
            <div key={item.id} className="p-4 space-y-3 bg-white active:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <span className="font-bold text-red-800 uppercase">{item.name}</span>
                <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", status.class)}>
                  {status.label}
                </span>
              </div>

              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-gray-400 shrink-0" />
                  <span className="font-medium line-clamp-1">{item.partner_name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar size={13} className="text-gray-400" />
                    <span>Nhập: {formatDate(item.date_order)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={13} />
                    <span>Tạo: {formatDate(item.create_order)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-3 border-t border-dashed mt-3">
                <Link to={`/declaration/import/edit/${item.id}`} className="text-xs font-medium text-blue-600 flex items-center gap-1">
                  <Pencil size={14} /> Sửa
                </Link>
                <button
                  onClick={() => onDelete(item.id, item.name)}
                  className="text-xs font-medium text-red-600 flex items-center gap-1"
                >
                  <Trash2 size={14} /> Xóa
                </button>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dashed">
                <span className="text-xs text-gray-400">Tổng tiền ({item.currency}):</span>
                <span className="font-bold text-gray-900">{item.amount_total?.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};