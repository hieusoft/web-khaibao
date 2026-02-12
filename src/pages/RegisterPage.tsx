import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AuthLayout } from '@/components/layout/Layout';
export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};


