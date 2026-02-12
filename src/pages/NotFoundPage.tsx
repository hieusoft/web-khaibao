import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-8">
          <span className="text-9xl font-bold text-red-600">4</span>
          <span className="text-9xl font-bold text-gray-300">0</span>
          <span className="text-9xl font-bold text-red-600">4</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Trang không tìm thấy
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
          <Link to="/">
            <Button className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700">
              <Home className="w-4 h-4" />
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


