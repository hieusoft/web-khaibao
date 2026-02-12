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

const emptyLegalPerson = {
    id: null,
    name: "",
    cccd: "",
    taxCode: "",
    phone: "",
};

const LegalInfoTab = ({ legalHumans = [] }) => {
    const [legalPersons, setLegalPersons] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState({
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

    /* =======================
       HANDLER
    ======================= */
    const addRow = () => {
        setLegalPersons((prev) => [...prev, { ...emptyLegalPerson }]);
    };

    const removeRow = (index) => {
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

    const updateLegalPerson = (index, field, value) => {
        setLegalPersons((prev) =>
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
                            <TableHead>Tên pháp nhân</TableHead>
                            <TableHead>CCCD</TableHead>
                            <TableHead>Mã số thuế</TableHead>
                            <TableHead>Điện thoại</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {legalPersons.map((person, index) => (
                            <TableRow key={person.id ?? index}>
                                <TableCell>
                                    <Input
                                        value={person.name}
                                        onChange={(e) =>
                                            updateLegalPerson(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập tên pháp nhân"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={person.cccd}
                                        onChange={(e) =>
                                            updateLegalPerson(
                                                index,
                                                "cccd",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập số CCCD"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={person.taxCode}
                                        onChange={(e) =>
                                            updateLegalPerson(
                                                index,
                                                "taxCode",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Nhập mã số thuế"
                                        className="border-0 bg-transparent focus:bg-white"
                                    />
                                </TableCell>

                                <TableCell>
                                    <Input
                                        value={person.phone}
                                        onChange={(e) =>
                                            updateLegalPerson(
                                                index,
                                                "phone",
                                                e.target.value
                                            )
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
                            Bạn có chắc chắn muốn xoá pháp nhân này không?
                            Hành động này không thể hoàn tác.
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

export default LegalInfoTab;
