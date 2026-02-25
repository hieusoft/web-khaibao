import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';


import { AgencyInfo } from './AgencyInfo';
import { UserActions } from './UserActions';
import { SubNavigation } from './SubNavigation';
import { MobileMenu } from './MobileMenu';
import { LogoutDialog } from './LogoutDialog';

interface HeaderProps {
    logo?: string;
    background?: string;
}

export const Header: React.FC<HeaderProps> = ({
    logo = '/logo-no-bg.png',
    background = '/background.png',
}) => {
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    // --- CẤU HÌNH NAVIGATION ---
    const parentNavItems = [
        { name: 'khai-bao', label: 'Khai Báo', path: '/declaration' },
        { name: 'permits', label: 'Hồ Sơ Cấp Phép', path: '/permits' },
    ];

    const childNavItems = [
        { path: '/declaration/import', label: 'Nhập hàng' },
        { path: '/declaration/export', label: 'Xuất hàng' },
        { path: '/declaration/production', label: 'Sản xuất' },
        { path: '/declaration/transportation', label: 'Vận chuyển' },
        { path: '/declaration/inventory', label: 'Tồn kho' },
    ];

    const permitNavItems = [
        { path: '/permits', label: 'Danh sách hồ sơ' },
        { path: '/permits/new', label: 'Tạo hồ sơ mới' },
        { path: '/permits/pending', label: 'Hồ sơ chờ duyệt' },
        { path: '/permits/approved', label: 'Hồ sơ đã duyệt' },
    ];

    // --- LOGIC HELPER ---
    const isActive = (path: string) => location.pathname === path;
    const isUnderPermits = location.pathname.startsWith('/permits');

    // Hàm bổ trợ quan trọng bị thiếu:
    const getChildNavItems = (sectionName: string) => {
        if (sectionName === 'permits') return permitNavItems;
        return childNavItems;
    };

    return (
        <>
            {/* PHẦN NỀN VÀ TOP BAR */}
            <div className="relative" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }}>
                <div className="absolute inset-0 bg-[#F9ECC2] opacity-85"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <header className="relative text-[#9F0712FF]">

                        {/* THANH TRÊN CÙNG: LOGO & THÔNG TIN USER */}
                        <div className="border-b-2 border-red-600">
                            <div className="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                                <AgencyInfo logo={logo} />

                                {/* Desktop User Actions */}
                                <div className="hidden md:block">
                                    <UserActions 
                                        user={user} 
                                        profile={profile} 
                                        onLogout={() => setIsLogoutDialogOpen(true)} 
                                    />
                                </div>

                                {/* Mobile Menu Toggle */}
                                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-[#9F0712FF] border border-red-300 rounded active:bg-white/50">
                                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* THANH MENU CHÍNH (DESKTOP) */}
                        <nav className="hidden md:block">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
                                {parentNavItems.map((item) => {
                                    const isParentActive = location.pathname.startsWith(item.path);
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`px-6 py-3 text-base font-bold transition-all whitespace-nowrap ${
                                                isParentActive ? 'bg-white text-[#9F0712FF] shadow-sm' : 'text-[#9F0712FF] hover:bg-white/70'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>
                    </header>
                </div>
            </div>

            {/* THANH MENU CON (DESKTOP) */}
            <SubNavigation
                items={isUnderPermits ? permitNavItems : childNavItems}
                isActive={isActive}
            />

            {/* PANEL MENU CHO MOBILE */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                user={user}
                profile={profile}
                onLogout={() => setIsLogoutDialogOpen(true)}
                parentNavItems={parentNavItems}
                getChildNavItems={getChildNavItems} 
                isActive={isActive}
                logo={logo}
            />

            {/* HỘP THOẠI XÁC NHẬN ĐĂNG XUẤT */}
            <LogoutDialog
                isOpen={isLogoutDialogOpen}
                onClose={() => setIsLogoutDialogOpen(false)}
                onConfirm={() => { logout(); navigate('/login'); }}
            />
        </>
    );
};