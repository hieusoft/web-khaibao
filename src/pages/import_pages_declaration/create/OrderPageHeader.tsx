import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const OrderPageHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Đơn nhập hàng mới</h2>
            <p className="text-gray-500 text-sm">Tạo phiếu khai báo nhập hàng</p>
        </div>
        <Button asChild variant="outline" className="gap-2 border-black/10 transition-all active:scale-95">
            <Link to="/declaration/import">
                <ArrowLeft className="w-4 h-4" />
                Quay lại danh sách
            </Link>
        </Button>
    </div>
);