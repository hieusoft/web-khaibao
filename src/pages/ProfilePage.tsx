import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, MapPin, Users, Warehouse, Factory, Phone, Shield } from 'lucide-react';

type TabType = 'info' | 'warehouses' | 'factories' | 'legal' | 'password';

export const ProfilePage: React.FC = () => {
  const { profile, isProfileLoading, fetchProfile, updateProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Password form states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      await updateProfile(formData);
      setSuccess('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cập nhật thất bại');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setIsSaving(true);

    try {
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setSuccess('Đổi mật khẩu thành công!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setActiveTab('info');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại');
    } finally {
      setIsSaving(false);
    }
  };

  if (isProfileLoading && !profile) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Đang tải...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'info', label: 'Thông tin công ty', icon: <Building2 className="w-4 h-4" /> },
    { id: 'warehouses', label: 'Kho hàng', icon: <Warehouse className="w-4 h-4" /> },
    { id: 'factories', label: 'Nhà máy', icon: <Factory className="w-4 h-4" /> },
    { id: 'legal', label: 'Người đại diện', icon: <Users className="w-4 h-4" /> },
    { id: 'password', label: 'Đổi mật khẩu', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hồ sơ công ty</h1>
          <p className="text-muted-foreground">Quản lý thông tin và tài nguyên của công ty</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setError('');
                setSuccess('');
                if (tab.id !== 'info') setIsEditing(false);
              }}
              className={`flex items-center gap-2 pb-2 px-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-green-500 bg-green-50 border border-green-200 rounded-md">
            {success}
          </div>
        )}

        {/* Company Info Tab */}
        {activeTab === 'info' && (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Thông tin công ty</CardTitle>
                    <CardDescription>Thông tin cơ bản về công ty</CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? 'outline' : 'default'}
                    onClick={() => {
                      if (isEditing && profile) {
                        setFormData({
                          name: profile.name || '',
                          email: profile.email || '',
                          phone: profile.phone || '',
                        });
                      }
                      setIsEditing(!isEditing);
                      setError('');
                      setSuccess('');
                    }}
                  >
                    {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="id">Mã công ty</Label>
                      <Input id="id" value={profile?.id || ''} disabled className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax_code">Mã số thuế</Label>
                      <Input id="tax_code" value={profile?.tax_code || ''} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên công ty</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business_type">Loại hình kinh doanh</Label>
                      <Input id="business_type" value={profile?.business_type || ''} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Điện thoại</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="established_date">Ngày thành lập</Label>
                      <Input
                        id="established_date"
                        value={profile?.established_date ? new Date(profile.established_date).toLocaleDateString('vi-VN') : ''}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_parent">Công ty mẹ</Label>
                      <Input id="company_parent" value={profile?.company_parent || ''} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Địa chỉ</Label>
                    <div className="grid gap-2 md:grid-cols-4">
                      <Input value={profile?.country || ''} disabled className="bg-muted" placeholder="Quốc gia" />
                      <Input value={profile?.state || ''} disabled className="bg-muted" placeholder="Tỉnh/Thành phố" />
                      <Input value={profile?.district || ''} disabled className="bg-muted" placeholder="Quận/Huyện" />
                      <Input value={profile?.ward || ''} disabled className="bg-muted" placeholder="Phường/Xã" />
                    </div>
                    <Input
                      value={profile?.address || ''}
                      disabled
                      className="bg-muted mt-2"
                      placeholder="Địa chỉ chi tiết"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </>
        )}

        {/* Warehouses Tab */}
        {activeTab === 'warehouses' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="w-5 h-5" />
                Danh sách kho hàng
              </CardTitle>
              <CardDescription>Các kho hàng của công ty</CardDescription>
            </CardHeader>
            <CardContent>
              {profile?.warehouses && profile.warehouses.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {profile.warehouses.map((warehouse) => (
                    <Card key={warehouse.id} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{warehouse.name}</h4>
                            <p className="text-sm text-muted-foreground">Mã: {warehouse.code}</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{warehouse.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>{warehouse.state}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Chưa có kho hàng nào</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Factories Tab */}
        {activeTab === 'factories' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5" />
                Danh sách nhà máy
              </CardTitle>
              <CardDescription>Các nhà máy của công ty</CardDescription>
            </CardHeader>
            <CardContent>
              {profile?.factories && profile.factories.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {profile.factories.map((factory) => (
                    <Card key={factory.id} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold">{factory.name}</h4>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{factory.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>{factory.state} - {factory.district} - {factory.ward}</span>
                          </div>
                          {factory.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              <span>{factory.phone}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Chưa có nhà máy nào</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Legal Humans Tab */}
        {activeTab === 'legal' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Người đại diện pháp luật
              </CardTitle>
              <CardDescription>Các cá nhân đại diện pháp luật của công ty</CardDescription>
            </CardHeader>
            <CardContent>
              {profile?.legal_humans && profile.legal_humans.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {profile.legal_humans.map((human) => (
                    <Card key={human.id} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold">{human.name}</h4>
                        <p className="text-sm text-muted-foreground">{human.business_type}</p>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">CMND/CCCD:</span>
                            <span>{human.cccd_number}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Mã số thuế:</span>
                            <span>{human.tax_code}</span>
                          </div>
                          {human.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{human.phone}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">Chưa có người đại diện</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Change Password Tab */}
        {activeTab === 'password' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Đổi mật khẩu
              </CardTitle>
              <CardDescription>Thay đổi mật khẩu để bảo mật tài khoản</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div className="flex justify-start">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Đang đổi...' : 'Đổi mật khẩu'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};
