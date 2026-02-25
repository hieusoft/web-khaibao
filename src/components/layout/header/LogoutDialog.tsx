import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900">
          <LogOut className="w-5 h-5 text-red-600" />
          Xác nhận đăng xuất
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
        </p>
        
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700"
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};