import { useEffect, useRef } from 'react';
import { getTokenTimeRemaining, getRefreshToken } from '@/lib/api';

const REFRESH_THRESHOLD = 5 * 60;

export const useTokenRefresh = (onRefresh?: () => Promise<void>) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (!refreshToken) {
      return;
    }

    const checkAndRefresh = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          return;
        }

        const timeRemaining = getTokenTimeRemaining(accessToken);
        if (timeRemaining <= REFRESH_THRESHOLD && timeRemaining > 0) {
          console.log('Token expiring soon, refreshing...');
          if (onRefresh) {
            await onRefresh();
          }
        }
      } catch (error) {
        console.error('Token refresh check failed:', error);
      }
    };

    // Check immediately
    checkAndRefresh();

    // Set up interval to check every minute
    intervalRef.current = setInterval(checkAndRefresh, 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshToken, onRefresh]);
};
