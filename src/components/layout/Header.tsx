import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X, ChevronRight, User } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<string>('khai-bao');

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsLogoutDialogOpen(false);
  };


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

  const isActive = (path: string) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const isUnderPermits = location.pathname.startsWith('/permits');

  const getChildNavItems = (sectionName: string) => {
    if (sectionName === 'permits') {
      return permitNavItems;
    }
    return childNavItems;
  };

  const handleSectionClick = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  return (
    <>
      <div
        className="relative"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Yellow overlay */}
        <div className="absolute inset-0 bg-[#F9ECC2] opacity-85"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="relative text-[#9F0712FF]">
            {/* DESKTOP/TABLET TOP SECTION */}
            <div className="hidden md:block border-b-2 border-red-600">
              <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex justify-between items-center gap-2 sm:gap-4">
                  {/* LEFT SECTION - Logo & Agency Info */}
                  <div>
                    <Link
                      to="/"
                      className="cursor-pointer flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0 min-w-0"
                    >
                      <img
                        src={logo}
                        alt="logo"
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded object-contain flex-shrink-0"
                      />
                      <div className="hidden lg:block min-w-0">
                        <div className="text-sm lg:text-lg font-bold leading-tight truncate">
                          Cục Cảnh sát điều tra tội phạm về ma túy
                        </div>
                        <div className="text-xs lg:text-sm leading-tight truncate">
                          Hệ thống khai báo doanh nghiệp
                        </div>
                      </div>
                      {/* Tablet agency info */}
                      <div className="hidden md:block lg:hidden min-w-0">
                        <div className="text-xs sm:text-sm font-bold truncate">
                          Cục CSĐT TP về MT
                        </div>
                        <div className="text-xs truncate">
                          Hệ thống khai báo DN
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* RIGHT SECTION - User Info & Logout */}
                  <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0 min-w-0">
                    {/* Desktop - Full info */}
                    <Link
                      to="/profile"
                      className="hidden xl:flex items-center gap-2 min-w-0 hover:bg-white/70 px-2 py-1 rounded transition-colors"
                    >
                      <div className="text-sm leading-tight min-w-0">
                        <div className="truncate max-w-50 font-medium">
                          {profile?.name || user?.name || 'Doanh nghiệp'}
                        </div>
                        <div className="text-xs truncate">
                          MST: {profile?.tax_code || user?.tax_code || 'N/A'}
                        </div>
                      </div>
                    </Link>

                    {/* Tablet - Medium info */}
                    <Link
                      to="/profile"
                      className="hidden lg:flex xl:hidden items-center gap-1 min-w-0 hover:bg-white/70 px-2 py-1 rounded transition-colors"
                    >
                      <span className="text-xs truncate max-w-32 font-medium">
                        {profile?.name || user?.name || 'Doanh nghiệp'}
                      </span>
                    </Link>

                    {/* Mobile - Profile icon (desktop hidden) */}
                    <Link
                      to="/profile"
                      className="lg:hidden flex items-center justify-center w-8 h-8 hover:bg-white/70 rounded transition-colors"
                      title="Hồ sơ"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700">
                        {profile?.name?.[0] || user?.name?.[0] || 'D'}
                      </div>
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => setIsLogoutDialogOpen(true)}
                      className="bg-transparent text-[#9F0712FF] border border-red-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-[#9F0712FF] hover:text-white transition-colors flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
                      title="Đăng xuất"
                    >
                      <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP/TABLET NAVIGATION */}
            <nav className="relative hidden md:block">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* First Row - Parent Navigation */}
                <div className="flex justify-start">
                  {parentNavItems.map((item) => {
                    const isActive =
                      (item.path === '/' && location.pathname === '/') ||
                      (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`px-5 lg:px-6 py-3 text-sm lg:text-base font-bold transition-all whitespace-nowrap flex items-center gap-2 ${isActive
                            ? 'bg-white text-[#9F0712FF] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'
                            : 'text-[#9F0712FF] hover:bg-white/70'
                          }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Second Row - Child Navigation */}

              </div>
            </nav>

            {/* MOBILE HEADER - Logo + Text + Hamburger */}
            <div className="md:hidden border-b-2 border-red-600">
              <div className="px-4 flex justify-between items-center py-2">
                {/* Logo + Text */}
                <div className="flex items-center gap-2">
                  <Link to="/" className="cursor-pointer flex items-center gap-2">
                    <img
                      src={logo}
                      alt="logo"
                      className="w-8 h-8 rounded object-contain"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate text-[#9F0712FF]">
                        Cục CSĐT TP về MT
                      </div>
                      <div className="text-[10px] truncate text-[#9F0712FF]/80">
                        Hệ thống khai báo DN
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Hamburger Button */}
                <button
                  onClick={handleMobileMenuToggle}
                  className="flex items-center justify-center w-10 h-10 text-[#9F0712FF] hover:bg-white/70 rounded transition-colors border border-red-300 flex-shrink-0"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* MOBILE MENU - Full overlay with everything */}
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Panel - Full screen */}
                <div className="md:hidden fixed inset-0 z-50 bg-white animate-in slide-in-from-right duration-300 overflow-y-auto">
                  <div className="flex flex-col h-full">
                    {/* Header - Same as external header */}
                    <div className="px-4 py-3 border-b-2 border-red-600 bg-[#F9ECC2]">
                      <div className="flex justify-between items-center">
                        {/* Logo + Text */}
                        <div className="flex items-center gap-2">
                          <img
                            src={logo}
                            alt="logo"
                            className="w-8 h-8 rounded object-contain"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate text-[#9F0712FF]">
                              Cục CSĐT TP về MT
                            </div>
                            <div className="text-[10px] truncate text-[#9F0712FF]/80">
                              Hệ thống khai báo DN
                            </div>
                          </div>
                        </div>

                        {/* Close Button */}
                        <button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-center w-8 h-8 text-[#9F0712FF] hover:bg-white/50 rounded-full transition-colors border border-red-300 flex-shrink-0"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* User Info Section */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {profile?.name || user?.name || 'Doanh nghiệp'}
                          </div>
                          <div className="text-xs text-gray-500">
                            MST: {profile?.tax_code || user?.tax_code || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center py-2 text-sm text-[#9F0712FF] border border-red-300 rounded hover:bg-red-50 transition-colors"
                      >
                        Xem hồ sơ
                      </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Parent sections */}
                      {parentNavItems.map((section) => (
                        <div key={section.name} className="border-b border-gray-200">
                          {/* Section Header */}
                          <button
                            onClick={() => handleSectionClick(section.name)}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${activeSection === section.name
                                ? 'bg-red-50 text-red-700'
                                : 'hover:bg-gray-50 text-[#9F0712FF]'
                              }`}
                          >
                            <span className="font-medium">{section.label}</span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${activeSection === section.name ? 'rotate-90' : ''
                                }`}
                            />
                          </button>

                          {/* Child items - shown when section is active */}
                          {activeSection === section.name && (
                            <div className="bg-gray-50">
                              {getChildNavItems(section.name).map((child) => (
                                <Link
                                  key={child.path}
                                  to={child.path}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className={`px-8 py-3 text-sm transition-colors flex items-center gap-3 ${isActive(child.path)
                                      ? 'bg-red-100 text-red-700 font-medium'
                                      : 'text-[#9F0712FF] hover:bg-gray-100'
                                    }`}
                                >
                                  {isActive(child.path) && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                  )}
                                  <span className={isActive(child.path) ? '' : 'ml-5'}>
                                    {child.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Logout Section */}
                    <div className="p-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsLogoutDialogOpen(true);
                        }}
                        className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </header>
        </div>

        {/* Logout Confirmation Dialog */}
        {isLogoutDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsLogoutDialogOpen(false)}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <LogOut className="w-5 h-5 text-red-600" />
                Xác nhận đăng xuất
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsLogoutDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          {isUnderPermits
            ? permitNavItems.map((link) => {
              const isChildActive = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 lg:px-5 py-2 text-sm lg:text-base font-medium transition-all whitespace-nowrap ${isChildActive
                      ? 'bg-white text-[#9F0712FF] border-b-4 border-red-600 shadow-sm'
                      : 'text-[#9F0712FF] hover:bg-white/50 border-b-4 border-transparent'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })
            : childNavItems.map((link) => {
              const isChildActive = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 lg:px-5 py-2 text-sm lg:text-base font-medium transition-all whitespace-nowrap ${isChildActive
                      ? 'bg-white text-[#9F0712FF] border-b-4 border-red-600 shadow-sm'
                      : 'text-[#9F0712FF] hover:bg-white/50 border-b-4 border-transparent'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
        </div>
      </div>

    </>

  );
};
