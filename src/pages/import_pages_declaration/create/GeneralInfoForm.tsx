import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const GeneralInfoForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium">Nhà cung cấp</Label>
                <Input defaultValue="Công ty TNHH ABC" className="bg-white border-gray-200" />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">Địa chỉ nhà cung cấp</Label>
                <Input placeholder="Nhập địa chỉ nhà cung cấp" className="bg-zinc-50 border-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Loại nhập hàng</Label>
                    <Select defaultValue="production">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="production">Sản xuất</SelectItem>
                            <SelectItem value="trade">Thương mại</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Tiền tệ</Label>
                    <Select defaultValue="vnd">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="vnd">VND</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium text-red-800">Ngày nhập hàng *</Label>
                <Input type="date" className="bg-zinc-50 border-gray-200" />
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">Kho nhận</Label>
                <Select>
                    <SelectTrigger className="bg-zinc-50"><SelectValue placeholder="Chọn kho" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="main">Kho chính (Hà Nội)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label className="text-sm font-medium">Mục đích</Label>
                <Input placeholder="Nhập mục đích nhập hàng" className="bg-zinc-50" />
            </div>
        </div>
    </div>
);