import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MainLayout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import ImportDeclarationList from '@/pages/import_pages_declaration/ImportDeclarationList';
import CreateImportOrder from '@/pages/import_pages_declaration/create/CreateImportOrder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute requireAuth={false}>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/declaration/import',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <ImportDeclarationList />
        </MainLayout>

      </ProtectedRoute>
    ),
  },
  {
    path: '/declaration/import/new',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <CreateImportOrder />
        </MainLayout>

      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: (
      <ProtectedRoute>
        <MainLayout>
          <NotFoundPage />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
]);

