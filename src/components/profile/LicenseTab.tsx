import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LicenseTab = () => {
    return (
        <Card className="border-0 shadow-none rounded-none">
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <Label className="flex-shrink-0 font-semibold">Giấy chứng nhận đăng ký kinh doanh</Label>
                        <Button variant="outline" className="w-fit bg-[#9F0712FF] text-white hover:bg-red-100 rounded-none justify-self-end">
                            <i className="fa-solid fa-upload mr-2"></i>
                            Tải lên
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <Label className="flex-shrink-0 font-semibold">Giấy chứng nhận đầu tư</Label>
                        <Button variant="outline" className="w-fit bg-[#9F0712FF] text-white hover:bg-red-100 rounded-none justify-self-end">
                            <i className="fa-solid fa-upload mr-2"></i>
                            Tải lên
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <Label className="flex-shrink-0 font-semibold">Giấy chứng nhận đăng ký doanh nhiệp</Label>
                        <Button variant="outline" className="w-fit bg-[#9F0712FF] text-white hover:bg-red-100 rounded-none justify-self-end">
                            <i className="fa-solid fa-upload mr-2"></i>
                            Tải lên
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default LicenseTab;
