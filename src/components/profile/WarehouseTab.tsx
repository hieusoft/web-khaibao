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

/* =======================
   EMPTY ROW
======================= */
const emptyWarehouse = {
    id: null,
    shortName: "",
    country: "",
    province: "",
    address: "",
};

/* =======================
   COMPONENT
======================= */
const WarehouseTab = ({ warehouses: fetchedWarehouses = [] }) => {
    const [warehouses, setWarehouses] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        index: null,
    });

    /* =======================
       MAP DATA FETCH → TABLE
    ======================= */
    useEffect(() => {
        if (fetchedWarehouses && fetchedWarehouses.length > 0) {
            const mappedData = fetchedWarehouses.map((item) => ({
                id: item.id,
                shortName: item.code || "",
                country: item.country || "",
                province: item.state || "",
                address: item.address || "",
            }));

            setWarehouses(mappedData);
        } else {
            setWarehouses([{ ...emptyWarehouse }]);
        }
    }, [fetchedWarehouses]);

    /* =======================
       HANDLERS
    ======================= */
    const addRow = () => {
        setWarehouses((prev) => [...prev, { ...emptyWarehouse }]);
    };

    const removeRow = (index) => {
        setDeleteDialog({ open: true, index });
    };

    const confirmDelete = () => {
        if (deleteDialog.index !== null) {
            setWarehouses((prev) =>
                prev.filter((_, i) => i !== deleteDialog.index)
            );
        }
        setDeleteDialog({ open: false, index: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, index: null });
    };

    const updateWarehouse = (index, field, value) => {
        setWarehouses((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    /* =======================
       RENDER
    ======================= */
    return (
        <Card className="border-0 shadow-none rounded-none">
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader className="transform translate-x-5">
                        <TableRow>
                            <TableHead>Tên viết tắt</TableHead>
                            <TableHead>Quốc gia</TableHead>
                            <TableHead>Tỉnh / Thành phố</TableHead>
                            <TableHead>Địa chỉ chi tiết</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {warehouses.map((warehouse, index) => (
                            <TableRow key={warehouse.id ?? index}>
                                <TableCell>
                                    <Input
                                        value={warehouse.shortName}
                                        onChange={(e) =>
                                            updateWarehouse(
                                                index,
                                                "shortName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Tên viết tắt kho"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Select
                                        value={warehouse.country}
                                        onValueChange={(value) =>
                                            updateWarehouse(
                                                index,
                                                "country",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="border-0 bg-transparent focus:bg-white">
                                            <SelectValue placeholder="Chọn quốc gia" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Việt Nam">
                                                Việt Nam
                                            </SelectItem>
                                            <SelectItem value="Hoa Kỳ">
                                                Hoa Kỳ
                                            </SelectItem>
                                            <SelectItem value="Nhật Bản">
                                                Nhật Bản
                                            </SelectItem>
                                            <SelectItem value="Trung Quốc">
                                                Trung Quốc
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>

                                <TableCell>
                                    <Select
                                        value={warehouse.province}
                                        onValueChange={(value) =>
                                            updateWarehouse(
                                                index,
                                                "province",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="border-0 bg-transparent focus:bg-white">
                                            <SelectValue placeholder="Chọn tỉnh/thành phố" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TP. Hồ Chí Minh">
                                                TP. Hồ Chí Minh
                                            </SelectItem>
                                            <SelectItem value="Hà Nội">
                                                Hà Nội
                                            </SelectItem>
                                            <SelectItem value="Đà Nẵng">
                                                Đà Nẵng
                                            </SelectItem>
                                            <SelectItem value="Hải Phòng">
                                                Hải Phòng
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={warehouse.address}
                                        onChange={(e) =>
                                            updateWarehouse(
                                                index,
                                                "address",
                                                e.target.value
                                            )
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

                        {/* ADD ROW */}
                        <TableRow>
                            <TableCell colSpan={5} className="pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addRow}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Thêm dòng
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>

            {/* CONFIRM DELETE */}
            <Dialog open={deleteDialog.open} onOpenChange={cancelDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận xoá</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xoá kho này không? Hành động
                            này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={cancelDelete}>
                            Huỷ
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                        >
                            Xoá
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default WarehouseTab;
