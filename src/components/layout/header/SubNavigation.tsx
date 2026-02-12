import { Link } from 'react-router-dom';

interface SubNavigationProps {
  items: { path: string, label: string }[];
  isActive: (path: string) => boolean;
}

export const SubNavigation = ({ items, isActive }: SubNavigationProps) => (
  <div className="hidden md:block shadow-md border-b border-gray-200 bg-white/50 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto flex">
      {items.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-4 lg:px-5 py-2 text-sm lg:text-base font-medium transition-all whitespace-nowrap ${
            isActive(link.path)
              ? 'bg-white text-[#9F0712FF] border-b-4 border-red-600 shadow-sm'
              : 'text-[#9F0712FF] hover:bg-white/50 border-b-4 border-transparent'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
);