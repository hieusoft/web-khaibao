import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Edit2 } from 'lucide-react';
import LicenseTab from '@/components/profile/LicenseTab';
import RelatedCompaniesTab from '@/components/profile/RelatedCompaniesTab';
import LegalInfoTab from '@/components/profile/LegalInfoTab';
import WarehouseTab from '@/components/profile/WarehouseTab';
import FactoryTab from '@/components/profile/FactoryTab';

type ProfileTabType = 'license' | 'related' | 'legal' | 'warehouse' | 'factory';

export const ProfilePage: React.FC = () => {
  const { profile, isProfileLoading, fetchProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTabType>('license');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isProfileLoading && !profile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C10007] mx-auto"></div>
            <p className="mt-2 text-gray-500">Đang tải...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const tabs = [
    { id: 'license' as const, label: 'Giấy phép kinh doanh' },
    { id: 'related' as const, label: 'Công ty liên quan' },
    { id: 'legal' as const, label: 'Thông tin pháp nhân' },
    { id: 'warehouse' as const, label: 'Thông tin kho' },
    { id: 'factory' as const, label: 'Nhà máy sản xuất' },
  ];

  return (
    <MainLayout>
      <div className="bg-white outline outline-1 outline-[#E5E7EB] outline-offset-[-1px] rounded-sm max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 flex flex-row justify-between items-center border-b-2 border-red-600">
          <h1 className="text-lg sm:text-xl font-normal text-[#0A0A0A]">
            {profile?.name || 'CÔNG TY CỔ PHẦN VB PHARMA'}
          </h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[#C10007] hover:bg-[#A00006] text-white h-8 px-3 w-fit flex items-center justify-center gap-2"
          >
            <Edit2 className="h-4 w-4" />
            <span className="text-sm">{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
          </Button>
        </div>

        <div className="px-4 sm:px-6">
          {/* Basic Info Section */}
          <div className="py-4 border-b border-[rgba(0,0,0,0.10)]">
            <h2 className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-4">Thông tin cơ bản</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              {/* Tên doanh nghiệp */}
              <div className="col-span-1 sm:col-span-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label className="text-sm text-[#0A0A0A]">Tên doanh nghiệp</Label>
                  <span className="text-[#FB2C36] text-sm">*</span>
                </div>
                <Input
                  value={profile?.name || ''}
                  disabled={!isEditing}
                  className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100"
                />
              </div>

              {/* Mã số thuế */}
              <div className="col-span-1 sm:col-span-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label className="text-sm text-[#0A0A0A]">Mã số thuế</Label>
                  <span className="text-[#FB2C36] text-sm">*</span>
                </div>
                <Input
                  value={profile?.tax_code || ''}
                  disabled
                  className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100"
                />
              </div>

              {/* Loại hình doanh nghiệp */}
              <div className="col-span-1 sm:col-span-1">
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Loại hình doanh nghiệp</Label>
                <div className="relative">
                  <Input
                    value={profile?.business_type || 'Công ty cổ phần'}
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Ngày thành lập */}
              <div className="col-span-1 sm:col-span-1">
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Ngày thành lập</Label>
                <div className="relative">
                  <Input
                    value={profile?.established_date
                      ? new Date(profile.established_date).toLocaleDateString('vi-VN')
                      : 'Chọn ngày thành lập'}
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Công ty mẹ */}
              <div className="col-span-1 sm:col-span-1">
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Công ty mẹ</Label>
                <Input
                  value={profile?.company_parent || ''}
                  disabled={!isEditing}
                  className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100"
                />
              </div>

              {/* Điện thoại */}
              <div className="col-span-1 sm:col-span-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label className="text-sm text-[#0A0A0A]">Điện thoại</Label>
                  <span className="text-[#FB2C36] text-sm">*</span>
                </div>
                <Input
                  value={profile?.phone || ''}
                  disabled={!isEditing}
                  className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100"
                />
              </div>

              {/* Email */}
              <div className="col-span-1 sm:col-span-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label className="text-sm text-[#0A0A0A]">Email</Label>
                  <span className="text-[#FB2C36] text-sm">*</span>
                </div>
                <Input
                  type="email"
                  value={profile?.email || ''}
                  disabled={!isEditing}
                  className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100"
                />
              </div>

              {/* Trạng thái hoạt động */}
              <div className="col-span-1 sm:col-span-1">
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Trạng thái hoạt động</Label>
                <div className="relative">
                  <Input
                    value="Đang hoạt động"
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="py-4 border-b border-[rgba(0,0,0,0.10)]">
            <h2 className="text-base text-[#0A0A0A] font-normal mb-3">Địa chỉ</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
              {/* Quốc gia */}
              <div>
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Quốc gia</Label>
                <div className="relative">
                  <Input
                    value={profile?.country || 'Việt Nam'}
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Tỉnh */}
              <div>
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Tỉnh</Label>
                <div className="relative">
                  <Input
                    value={profile?.state || ''}
                    placeholder="Chọn"
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Thành phố */}
              <div>
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Thành phố</Label>
                <div className="relative">
                  <Input
                    value={profile?.city || ''}
                    placeholder="Chọn"
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Quận/Huyện */}
              <div>
                <Label className="text-sm text-[#0A0A0A] mb-1 block">Quận/Huyện</Label>
                <div className="relative">
                  <Input
                    value={profile?.district || ''}
                    placeholder="Chọn"
                    disabled
                    className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100 pr-8"
                  />
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Địa chỉ chi tiết */}
            <div className="mt-3">
              <Label className="text-sm text-[#0A0A0A] mb-1 block">Địa chỉ chi tiết</Label>
              <Input
                value={profile?.address || 'KCN VSip, Từ Sơn, Bắc Ninh'}
                disabled
                className="h-9 bg-[#F9FAFB] text-sm disabled:opacity-100"
              />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="py-4">
            {/* Tab Buttons - Scrollable on mobile */}
            <div className="border-b border-[rgba(0,0,0,0.10)]">
              <div className="flex overflow-x-auto -mb-px scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 h-9 text-sm font-normal transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-white border-b-2 border-[#C10007] text-[#0A0A0A]'
                        : 'bg-transparent text-[#0A0A0A] hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-4 overflow-x-auto">
              {/* License Tab */}
              {activeTab === 'license' && <LicenseTab />}

              {/* Related Companies Tab */}
              {activeTab === 'related' && (
                <RelatedCompaniesTab companyChild={profile?.company_child || []} />
              )}

              {/* Legal Info Tab */}
              {activeTab === 'legal' && (
                <LegalInfoTab legalHumans={profile?.legal_humans || []} />
              )}

              {/* Warehouse Tab */}
              {activeTab === 'warehouse' && (
                <WarehouseTab warehouses={profile?.warehouses || []} />
              )}

              {/* Factory Tab */}
              {activeTab === 'factory' && (
                <FactoryTab factories={profile?.factories || []} />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-[rgba(0,0,0,0.10)] flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="h-8 px-4 text-sm border border-[rgba(0,0,0,0.10)] w-fit"
          >
            Hủy
          </Button>
          <Button className="h-8 px-4 text-sm bg-[#C10007] hover:bg-[#A00006] text-white w-fit">
            Lưu
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
