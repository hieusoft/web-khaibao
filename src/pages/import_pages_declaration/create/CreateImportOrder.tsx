import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OrderPageHeader } from "./OrderPageHeader";
import { GeneralInfoForm } from "./GeneralInfoForm";
import { ProductItemsTable } from "./ProductItemsTable";
import { ProductItem } from "@/types/declaration_create";

const CreateImportOrder: React.FC = () => {

    const [products] = useState<ProductItem[]>([
        { id: '1', name: '[64-18-6] Formic Acid', batchCode: 'LOT123', expiryDate: '', quantity: 10, unit: 'L', price: 500000, total: 5000000 },
        { id: '2', name: '[64-19-7] Acetic acid', batchCode: '', expiryDate: '', quantity: 50, unit: 'L', price: 200000, total: 10000000 }
    ]);

    const totalAmount = products.reduce((sum, item) => sum + item.total, 0);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
            <OrderPageHeader />

            <Card className="border-black/10 shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-gray-50/50 border-b py-4">
                    <CardTitle className="text-lg font-bold text-gray-700">Thông tin chung</CardTitle>
                    <CardDescription>
                        Mã đơn hàng: 
                        <span className="text-gray-900 font-semibold italic uppercase">
                            Tự thêm vào
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-6">
                    <GeneralInfoForm />
                </CardContent>

                <ProductItemsTable items={products} />

                <div className="bg-gray-50/50 p-6 border-t border-black/10 flex flex-col items-end gap-6">
                    <div className="flex items-baseline gap-4">
                        <span className="text-gray-600 text-sm">Tổng cộng:</span>
                        <span className="text-3xl font-bold text-red-700">{totalAmount.toLocaleString()} đ</span>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="w-24">Hủy</Button>
                        <Button className="w-32 bg-red-700 hover:bg-red-800 text-white gap-2 shadow-lg">
                            <Save className="w-4 h-4" /> Nộp phiếu
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CreateImportOrder;