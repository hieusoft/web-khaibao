import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface UserActionsProps {
    user: any;
    profile: any;
    onLogout: () => void;
}

export const UserActions = ({ user, profile, onLogout }: UserActionsProps) => (
    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0 min-w-0">
        {/* Desktop/Tablet Info */}
        <Link to="/profile" className="hidden lg:flex items-center gap-2 min-w-0 hover:bg-white/70 px-2 py-1 rounded transition-colors">
            <div className="text-sm leading-tight min-w-0">
                <div className="truncate font-medium">{profile?.name || user?.name || 'Doanh nghiệp'}</div>
                <div className="text-xs truncate">MST: {profile?.tax_code || user?.tax_code || 'N/A'}</div>
            </div>
        </Link>

        {/* Mobile Avatar Link (Visible on small screens) */}
        <Link to="/profile" className="lg:hidden flex items-center justify-center w-8 h-8 hover:bg-white/70 rounded transition-colors">
            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700">
                {profile?.name?.[0] || user?.name?.[0] || 'D'}
            </div>
        </Link>

        <button
            onClick={onLogout}
            className="bg-transparent text-[#9F0712FF] border border-red-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-[#9F0712FF] hover:text-white transition-colors flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
        >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
        </button>
    </div>
);