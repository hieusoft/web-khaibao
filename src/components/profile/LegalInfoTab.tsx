import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface LegalPerson {
    id?: number;
    name: string;
    cccd: string;
    taxCode: string;
    phone: string;
}

interface LegalInfoTabProps {
    legalHumans?: Array<{
        id?: number;
        name?: string;
        cccd_number?: string;
        tax_code?: string;
        phone?: string;
    }>;
}

const emptyLegalPerson: LegalPerson = {
    name: "",
    cccd: "",
    taxCode: "",
    phone: "",
};

const LegalInfoTab: React.FC<LegalInfoTabProps> = ({ legalHumans = [] }) => {
    const [legalPersons, setLegalPersons] = useState<LegalPerson[]>([]);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; index: number | null }>({
        open: false,
        index: null,
    });

    useEffect(() => {
        if (legalHumans && legalHumans.length > 0) {
            const mappedData = legalHumans.map((item) => ({
                id: item.id,
                name: item.name || "",
                cccd: item.cccd_number || "",
                taxCode: item.tax_code || "",
                phone: item.phone || "",
            }));
            setLegalPersons(mappedData);
        } else {
            setLegalPersons([{ ...emptyLegalPerson }]);
        }
    }, [legalHumans]);

    const addRow = () => {
        setLegalPersons((prev) => [...prev, { ...emptyLegalPerson }]);
    };

    const removeRow = (index: number) => {
        setDeleteDialog({ open: true, index });
    };

    const confirmDelete = () => {
        if (deleteDialog.index !== null) {
            setLegalPersons((prev) =>
                prev.filter((_, i) => i !== deleteDialog.index)
            );
        }
        setDeleteDialog({ open: false, index: null });
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, index: null });
    };

    const updateLegalPerson = (index: number, field: keyof LegalPerson, value: string) => {
        setLegalPersons((prev) =>
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
                            <TableHead>Tên pháp nhân</TableHead>
                            <TableHead>CCCD</TableHead>
                            <TableHead>Mã số thuế</TableHead>
                            <TableHead>Điện thoại</TableHead>
                            <TableHead className="w-12" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {legalPersons.map((person, index) => (
                            <TableRow key={person.id ?? index}>
                                <TableCell>
                                    <Input
                                        value={person.name}
                                        onChange={(e) =>
                                            updateLegalPerson(index, "name", e.target.value)
                                        }
                                        placeholder="Nhập tên pháp nhân"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={person.cccd}
                                        onChange={(e) =>
                                            updateLegalPerson(index, "cccd", e.target.value)
                                        }
                                        placeholder="Nhập số CCCD"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={person.taxCode}
                                        onChange={(e) =>
                                            updateLegalPerson(index, "taxCode", e.target.value)
                                        }
                                        placeholder="Nhập mã số thuế"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={person.phone}
                                        onChange={(e) =>
                                            updateLegalPerson(index, "phone", e.target.value)
                                        }
                                        placeholder="Nhập số điện thoại"
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
                            <TableCell colSpan={5} className="pt-4">
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
                            Bạn có chắc chắn muốn xóa pháp nhân này không? Hành động này không thể hoàn tác.
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

export default LegalInfoTab;
