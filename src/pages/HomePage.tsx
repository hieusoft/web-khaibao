import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainLayout } from '@/components/layout/Layout';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center space-y-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to MyApp
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A modern React application with authentication, featuring secure
            token management and automatic refresh capabilities.
          </p>
        </div>

        <div className="flex gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
            </>
          )}
        </div>

      
      </div>
    </MainLayout>
  );
};
