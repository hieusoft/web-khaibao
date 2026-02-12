import React, { useState, useEffect } from 'react';
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
import { CompanyChild } from '@/types/auth';

interface RelatedCompany {
    id?: number;
    name: string;
    taxCode: string;
    businessType: string;
    status: string;
}

interface RelatedCompaniesTabProps {
    companyChild?: CompanyChild[];
}

const emptyRelatedCompany: RelatedCompany = {
    name: "",
    taxCode: "",
    businessType: "",
    status: "",
};

const RelatedCompaniesTab: React.FC<RelatedCompaniesTabProps> = ({ companyChild = [] }) => {
    const [companies, setCompanies] = useState<RelatedCompany[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; index: number | null }>({ open: false, index: null });

    useEffect(() => {
        if (companyChild && companyChild.length > 0) {
            const mappedCompanies = companyChild.map(item => ({
                id: item.id,
                name: item.name || "",
                taxCode: item.tax_code || "",
                businessType: item.business_type || "",
                status: item.status || "",
            }));
            setCompanies(mappedCompanies);
        } else {
            setCompanies([{ ...emptyRelatedCompany }]);
        }
    }, [companyChild]);

    const addRow = () => {
        setCompanies(prev => [...prev, { ...emptyRelatedCompany }]);
    };

    const removeRow = (index) => {
        setDeleteDialog({ open: true, index });
    };

    const confirmDelete = () => {
        if (deleteDialog.index !== null) {
            setCompanies(prev => prev.filter((_, i) => i !== deleteDialog.index));
        }
        setDeleteDialog({ open: false, index: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, index: null });
    };

    const updateCompany = (index, field, value) => {
        setCompanies(prev =>
            prev.map((company, i) =>
                i === index ? { ...company, [field]: value } : company
            )
        );
    };

    return (
        <Card className="border-0 shadow-none rounded-none">
           

            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên doanh nghiệp</TableHead>
                            <TableHead>Mã số thuế</TableHead>
                            <TableHead>Loại hình doanh nghiệp</TableHead>
                            <TableHead>Trạng thái hoạt động</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companies.map((company, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Input
                                        value={company.name}
                                        onChange={(e) => updateCompany(index, "name", e.target.value)}
                                        placeholder="Tên doanh nghiệp"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={company.taxCode}
                                        onChange={(e) => updateCompany(index, "taxCode", e.target.value)}
                                        placeholder="Mã số thuế"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={company.businessType}
                                        onValueChange={(value) => updateCompany(index, "businessType", value)}
                                    >
                                        <SelectTrigger className="border-0 bg-transparent focus:bg-white">
                                            <SelectValue placeholder="Chọn loại hình" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="private">Doanh nghiệp tư nhân</SelectItem>
                                            <SelectItem value="limited">Công ty TNHH</SelectItem>
                                            <SelectItem value="joint_stock">Công ty cổ phần</SelectItem>
                                            <SelectItem value="foreign">Doanh nghiệp FDI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={company.status}
                                        onValueChange={(value) => updateCompany(index, "status", value)}
                                    >
                                        <SelectTrigger className="border-0 bg-transparent focus:bg-white">
                                            <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Đang hoạt động</SelectItem>
                                            <SelectItem value="inactive">Tạm ngừng</SelectItem>
                                            <SelectItem value="suspended">Bị đình chỉ</SelectItem>
                                            <SelectItem value="dissolved">Đã giải thể</SelectItem>
                                        </SelectContent>
                                    </Select>
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

                        {/* Dòng thêm mới */}
                        <TableRow>
                            <TableCell colSpan={5} className="text-left pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addRow}
                                    className="w-auto px-4 py-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2 hidden sm:inline">Thêm dòng</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>

            {/* Dialog xác nhận xóa */}
            <Dialog open={deleteDialog.open} onOpenChange={cancelDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa</DialogTitle>
                        <DialogDescription>
                            Bạn có chắc chắn muốn xóa thông tin công ty này không? Hành động này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={cancelDelete}>
                            Huỷ
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

export default RelatedCompaniesTab;
