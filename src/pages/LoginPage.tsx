import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthLayout } from '@/components/layout/Layout';
export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};



