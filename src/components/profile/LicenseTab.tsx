import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Upload } from "lucide-react";

interface LicenseTabProps {
    licenses?: Array<{ name: string; file?: File }>;
}

const defaultLicenses = [
    { name: "Giấy chứng nhận đăng ký kinh doanh" },
    { name: "Giấy chứng nhận đầu tư" },
    { name: "Giấy chứng nhận đăng ký doanh nghiệp" },
];

const LicenseTab: React.FC<LicenseTabProps> = ({ licenses = [] }) => {
    const licenseList = licenses.length > 0 ? licenses : defaultLicenses;

    return (
        <Card className="border-0 shadow-none rounded-none">
            <CardContent className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên giấy phép</TableHead>
                            <TableHead className="w-48">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {licenseList.map((license, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <span className="text-sm text-[#0A0A0A]">
                                        {license.name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-[#C10007] hover:bg-[#A00006] text-white border-0 h-8 px-3"
                                    >
                                        <Upload className="h-4 w-4" />
                                        <span className="ml-2 hidden sm:inline">Tải lên</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default LicenseTab;
