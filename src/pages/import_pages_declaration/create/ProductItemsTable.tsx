import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductItem } from "@/types/declaration_create";

interface Props {
    items: ProductItem[];
}

export const ProductItemsTable = ({ items }: Props) => (
    <div className="px-6 pb-6">
        <div className="mb-4 border-b-2 border-red-700 w-fit">
            <Button variant="ghost" className="rounded-none font-bold">Sản phẩm</Button>
        </div>
        <div className="border rounded-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-12 text-center border-r">#</TableHead>
                        <TableHead className="w-[300px] border-r">Sản phẩm</TableHead>
                        <TableHead className="w-48 border-r">Mã lô</TableHead>
                        <TableHead className="w-48 border-r">Ngày hết hạn</TableHead>
                        <TableHead className="w-24 text-center border-r">Số lượng</TableHead>
                        <TableHead className="w-24 text-center border-r">ĐVT</TableHead>
                        <TableHead className="w-32 text-right border-r">Đơn giá</TableHead>
                        <TableHead className="w-32 text-right border-r">Thành tiền</TableHead>
                        <TableHead className="w-12 text-center">Xóa</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center border-r">{index + 1}</TableCell>
                            <TableCell className="border-r font-medium">{item.name}</TableCell>
                            <TableCell className="border-r"><Input className="h-8 bg-zinc-50" defaultValue={item.batchCode} /></TableCell>
                            <TableCell className="border-r"><Input type="date" className="h-8 bg-zinc-50" defaultValue={item.expiryDate} /></TableCell>
                            <TableCell className="border-r"><Input className="h-8 text-center" defaultValue={item.quantity} /></TableCell>
                            <TableCell className="border-r text-center font-bold text-xs">{item.unit}</TableCell>
                            <TableCell className="border-r text-right">{item.price.toLocaleString()}</TableCell>
                            <TableCell className="border-r text-right font-bold">{item.total.toLocaleString()} đ</TableCell>
                            <TableCell className="text-center">
                                <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <Button variant="outline" className="mt-4 gap-2 border-gray-300">
            <Plus className="w-4 h-4" /> Thêm sản phẩm
        </Button>
    </div>
);