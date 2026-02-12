import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { Warehouse } from "@/types/auth";

interface WarehouseData {
    id?: number;
    name: string;
    code: string;
    country: string;
    state: string;
    address: string;
}

interface WarehouseTabProps {
    warehouses?: Warehouse[];
}

const emptyWarehouse: WarehouseData = {
    name: "",
    code: "",
    country: "",
    state: "",
    address: "",
};

const WarehouseTab: React.FC<WarehouseTabProps> = ({ warehouses = [] }) => {
    const [warehouseList, setWarehouseList] = useState<WarehouseData[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; index: number | null }>({
        open: false,
        index: null,
    });

    useEffect(() => {
        if (warehouses && warehouses.length > 0) {
            const mappedData = warehouses.map((item) => ({
                id: item.id,
                name: item.name || "",
                code: item.code || "",
                country: item.country || "",
                state: item.state || "",
                address: item.address || "",
            }));
            setWarehouseList(mappedData);
        } else {
            setWarehouseList([{ ...emptyWarehouse }]);
        }
    }, [warehouses]);

    const addRow = () => {
        setWarehouseList((prev) => [...prev, { ...emptyWarehouse }]);
    };

    const removeRow = (index: number) => {
        setDeleteDialog({ open: true, index });
    };

    const confirmDelete = () => {
        if (deleteDialog.index !== null) {
            setWarehouseList((prev) =>
                prev.filter((_, i) => i !== deleteDialog.index)
            );
        }
        setDeleteDialog({ open: false, index: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, index: null });
    };

    const updateWarehouse = (index: number, field: keyof WarehouseData, value: string) => {
        setWarehouseList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <Card className="border-0 shadow-none rounded-none">
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên kho</TableHead>
                            <TableHead>Mã kho</TableHead>
                            <TableHead>Quốc gia</TableHead>
                            <TableHead>Tỉnh / Thành phố</TableHead>
                            <TableHead>Địa chỉ chi tiết</TableHead>
                            <TableHead className="w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warehouseList.map((warehouse, index) => (
                            <TableRow key={warehouse.id ?? index}>
                                <TableCell>
                                    <Input
                                        value={warehouse.name}
                                        onChange={(e) =>
                                            updateWarehouse(index, "name", e.target.value)
                                        }
                                        placeholder="Tên kho"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={warehouse.code}
                                        onChange={(e) =>
                                            updateWarehouse(index, "code", e.target.value)
                                        }
                                        placeholder="Mã kho"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={warehouse.country}
                                        onValueChange={(value) =>
                                            updateWarehouse(index, "country", value)
                                        }
                                    >
                                        <SelectTrigger className="border-0 bg-transparent focus:bg-white">
                                            <SelectValue placeholder="Chọn quốc gia" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Việt Nam">Việt Nam</SelectItem>
                                            <SelectItem value="Hoa Kỳ">Hoa Kỳ</SelectItem>
                                            <SelectItem value="Nhật Bản">Nhật Bản</SelectItem>
                                            <SelectItem value="Trung Quốc">Trung Quốc</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={warehouse.state}
                                        onValueChange={(value) =>
                                            updateWarehouse(index, "state", value)
                                        }
                                    >
                                        <SelectTrigger className="border-0 bg-transparent focus:bg-white">
                                            <SelectValue placeholder="Chọn tỉnh/thành phố" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                                            <SelectItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
                                            <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                                            <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                                            <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={warehouse.address}
                                        onChange={(e) =>
                                            updateWarehouse(index, "address", e.target.value)
                                        }
                                        placeholder="Nhập địa chỉ chi tiết"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeRow(index)}
                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={6} className="pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addRow}
                                    className="w-auto px-4"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2 hidden sm:inline">Thêm dòng</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>

            <Dialog open={deleteDialog.open} onOpenChange={cancelDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xóa kho này không? Hành động này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={cancelDelete}>
                            Hủy
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default WarehouseTab;
