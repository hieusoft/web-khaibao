import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAccessToken, getTokenTimeRemaining, isTokenExpired } from '@/lib/api';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const accessToken = getAccessToken();
  const tokenTimeRemaining = accessToken ? getTokenTimeRemaining(accessToken) : 0;
  const isExpired = accessToken ? isTokenExpired(accessToken) : true;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Company:</span>
                <span className="text-sm text-muted-foreground">{user?.company_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Tax Code:</span>
                <span className="text-sm text-muted-foreground">{user?.tax_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Username:</span>
                <span className="text-sm text-muted-foreground">{user?.username}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">ID:</span>
                <span className="text-sm text-muted-foreground">{user?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Role:</span>
                <span className="text-sm text-muted-foreground capitalize">
                  {user?.role}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Status</CardTitle>
              <CardDescription>Authentication token information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Token Valid:</span>
                <span
                  className={`text-sm font-medium ${
                    !isExpired ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {!isExpired ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Time Remaining:</span>
                <span className="text-sm text-muted-foreground">
                  {formatTime(tokenTimeRemaining)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Auto Refresh:</span>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
