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
const emptyFactory = {
    id: null,
    name: "",
    country: "",
    province: "",
    district: "",
    ward: "",
    address: "",
};

/* =======================
   COMPONENT
======================= */
const FactoryTab = ({ factorys = [] }) => {
    const [factories, setFactories] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        index: null,
    });

    /* =======================
       MAP DATA FETCH → TABLE
    ======================= */
    useEffect(() => {
        if (factorys && factorys.length > 0) {
            const mappedData = factorys.map((item) => ({
                id: item.id,
                name: item.name || "",
                country: item.country || "",
                province: item.state || "",
                district: item.district || "",
                ward: item.ward || "",
                address: item.adreess || item.address || "",
            }));

            setFactories(mappedData);
        } else {
            setFactories([{ ...emptyFactory }]);
        }
    }, [factorys]);

    /* =======================
       HANDLERS
    ======================= */
    const addRow = () => {
        setFactories((prev) => [...prev, { ...emptyFactory }]);
    };

    const removeRow = (index) => {
        setDeleteDialog({ open: true, index });
    };

    const confirmDelete = () => {
        if (deleteDialog.index !== null) {
            setFactories((prev) =>
                prev.filter((_, i) => i !== deleteDialog.index)
            );
        }
        setDeleteDialog({ open: false, index: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, index: null });
    };

    const updateFactory = (index, field, value) => {
        setFactories((prev) =>
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
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên nhà máy</TableHead>
                            <TableHead>Quốc gia</TableHead>
                            <TableHead>Tỉnh / Thành phố</TableHead>
                            <TableHead>Quận / Huyện</TableHead>
                            <TableHead>Phường / Xã</TableHead>
                            <TableHead>Địa chỉ chi tiết</TableHead>
                            <TableHead className="w-16" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {factories.map((factory, index) => (
                            <TableRow key={factory.id ?? index}>
                                <TableCell>
                                    <Input
                                        value={factory.name}
                                        onChange={(e) =>
                                            updateFactory(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Tên nhà máy"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Select
                                        value={factory.country}
                                        onValueChange={(value) =>
                                            updateFactory(
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
                                        value={factory.province}
                                        onValueChange={(value) =>
                                            updateFactory(
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
                                            <SelectItem value="Tỉnh Hà Nam">
                                                Tỉnh Hà Nam
                                            </SelectItem>
                                            <SelectItem value="TP. Hồ Chí Minh">
                                                TP. Hồ Chí Minh
                                            </SelectItem>
                                            <SelectItem value="Hà Nội">
                                                Hà Nội
                                            </SelectItem>
                                            <SelectItem value="Đà Nẵng">
                                                Đà Nẵng
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={factory.district}
                                        onChange={(e) =>
                                            updateFactory(
                                                index,
                                                "district",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập quận / huyện"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={factory.ward}
                                        onChange={(e) =>
                                            updateFactory(
                                                index,
                                                "ward",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập phường / xã"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={factory.address}
                                        onChange={(e) =>
                                            updateFactory(
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
                            <TableCell colSpan={7} className="pt-4">
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
                            Bạn có chắc chắn muốn xoá nhà máy này không? Hành
                            động này không thể hoàn tác.
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

export default FactoryTab;
