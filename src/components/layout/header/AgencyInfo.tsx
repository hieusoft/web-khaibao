import { Link } from 'react-router-dom';

export const AgencyInfo = ({ logo }: { logo: string }) => (
    <Link to="/" className="cursor-pointer flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0 min-w-0">
        <img src={logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded object-contain flex-shrink-0" />
        <div className="hidden lg:block min-w-0">
            <div className="text-sm lg:text-lg font-bold leading-tight truncate">Cục Cảnh sát điều tra tội phạm về ma túy</div>
            <div className="text-xs lg:text-sm leading-tight truncate">Hệ thống khai báo doanh nghiệp</div>
        </div>
        <div className="hidden md:block lg:hidden min-w-0">
            <div className="text-xs sm:text-sm font-bold truncate">Cục CSĐT TP về MT</div>
            <div className="text-xs truncate">Hệ thống khai báo DN</div>
        </div>
    </Link>
);