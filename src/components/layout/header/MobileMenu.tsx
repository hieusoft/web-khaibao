import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, ChevronRight, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  profile: any;
  onLogout: () => void;
  parentNavItems: any[];
  getChildNavItems: (name: string) => any[];
  isActive: (path: string) => boolean;
  logo: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen, onClose, user, profile, onLogout, 
  parentNavItems, getChildNavItems, isActive, logo
}) => {
  const [activeSection, setActiveSection] = useState<string>('khai-bao');

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="md:hidden fixed inset-0 z-50 bg-white animate-in slide-in-from-right duration-300 overflow-y-auto">
        <div className="flex flex-col h-full font-['Arimo']">
          
          {/* Mobile Header (Inside Menu) */}
          <div className="px-4 py-3 border-b-2 border-red-600 bg-[#F9ECC2]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-8 h-8 rounded object-contain" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate text-[#9F0712FF]">Cục CSĐT TP về MT</div>
                  <div className="text-[10px] truncate text-[#9F0712FF]/80">Hệ thống khai báo DN</div>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 text-[#9F0712FF] border border-red-300 rounded-full">
                <X size={18} />
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
                <div className="font-medium text-sm truncate">{profile?.name || user?.name || 'Doanh nghiệp'}</div>
                <div className="text-xs text-gray-500">MST: {profile?.tax_code || user?.tax_code || 'N/A'}</div>
              </div>
            </div>
            <Link 
              to="/profile" 
              onClick={onClose}
              className="block w-full text-center py-2 text-sm text-[#9F0712FF] border border-red-300 rounded hover:bg-red-50"
            >
              Xem hồ sơ
            </Link>
          </div>

          {/* Accordion Navigation */}
          <div className="flex-1 overflow-y-auto">
            {parentNavItems.map((section) => (
              <div key={section.name} className="border-b border-gray-200">
                <button
                  onClick={() => setActiveSection(activeSection === section.name ? '' : section.name)}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                    activeSection === section.name ? 'bg-red-50 text-red-700' : 'text-[#9F0712FF]'
                  }`}
                >
                  <span className="font-medium">{section.label}</span>
                  <ChevronRight size={16} className={`transition-transform ${activeSection === section.name ? 'rotate-90' : ''}`} />
                </button>

                {activeSection === section.name && (
                  <div className="bg-gray-50 animate-in slide-in-from-top-2 duration-200">
                    {getChildNavItems(section.name).map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={onClose}
                        className={`px-8 py-3 text-sm flex items-center gap-3 ${
                          isActive(child.path) ? 'bg-red-100 text-red-700 font-medium' : 'text-[#9F0712FF]'
                        }`}
                      >
                        {isActive(child.path) && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                        <span className={isActive(child.path) ? '' : 'ml-4'}>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => { onClose(); onLogout(); }}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 active:bg-red-700"
            >
              <LogOut size={16} /> Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </>
  );
};