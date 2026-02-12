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

interface FactoryData {
    id?: number;
    name: string;
    country: string;
    state: string;
    district: string;
    ward: string;
    address: string;
}

interface FactoryTabProps {
    factories?: Array<{
        id?: number;
        name?: string;
        country?: string;
        state?: string;
        district?: string;
        ward?: string;
        address?: string;
    }>;
}

const emptyFactory: FactoryData = {
    name: "",
    country: "",
    state: "",
    district: "",
    ward: "",
    address: "",
};

const FactoryTab: React.FC<FactoryTabProps> = ({ factories = [] }) => {
    const [factoryList, setFactoryList] = useState<FactoryData[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; index: number | null }>({
        open: false,
        index: null,
    });

    useEffect(() => {
        if (factories && factories.length > 0) {
            const mappedData = factories.map((item) => ({
                id: item.id,
                name: item.name || "",
                country: item.country || "",
                state: item.state || "",
                district: item.district || "",
                ward: item.ward || "",
                address: item.address || "",
            }));
            setFactoryList(mappedData);
        } else {
            setFactoryList([{ ...emptyFactory }]);
        }
    }, [factories]);

    const addRow = () => {
        setFactoryList((prev) => [...prev, { ...emptyFactory }]);
    };

    const removeRow = (index: number) => {
        setDeleteDialog({ open: true, index });
    };

    const confirmDelete = () => {
        if (deleteDialog.index !== null) {
            setFactoryList((prev) =>
                prev.filter((_, i) => i !== deleteDialog.index)
            );
        }
        setDeleteDialog({ open: false, index: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, index: null });
    };

    const updateFactory = (index: number, field: keyof FactoryData, value: string) => {
        setFactoryList((prev) =>
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
                            <TableHead>Tên nhà máy</TableHead>
                            <TableHead>Quốc gia</TableHead>
                            <TableHead>Tỉnh / Thành phố</TableHead>
                            <TableHead>Quận / Huyện</TableHead>
                            <TableHead>Phường / Xã</TableHead>
                            <TableHead>Địa chỉ chi tiết</TableHead>
                            <TableHead className="w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {factoryList.map((factory, index) => (
                            <TableRow key={factory.id ?? index}>
                                <TableCell>
                                    <Input
                                        value={factory.name}
                                        onChange={(e) =>
                                            updateFactory(index, "name", e.target.value)
                                        }
                                        placeholder="Tên nhà máy"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={factory.country}
                                        onValueChange={(value) =>
                                            updateFactory(index, "country", value)
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
                                        value={factory.state}
                                        onValueChange={(value) =>
                                            updateFactory(index, "state", value)
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
                                        value={factory.district}
                                        onChange={(e) =>
                                            updateFactory(index, "district", e.target.value)
                                        }
                                        placeholder="Nhập quận/huyện"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={factory.ward}
                                        onChange={(e) =>
                                            updateFactory(index, "ward", e.target.value)
                                        }
                                        placeholder="Nhập phường/xã"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={factory.address}
                                        onChange={(e) =>
                                            updateFactory(index, "address", e.target.value)
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
                            <TableCell colSpan={7} className="pt-4">
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
                            Bạn có chắc chắn muốn xóa nhà máy này không? Hành động này không thể hoàn tác.
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

export default FactoryTab;
