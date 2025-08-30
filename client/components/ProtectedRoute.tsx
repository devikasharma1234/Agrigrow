import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user } = useAuth();

  console.log('ProtectedRoute check:', {
    isAuthenticated,
    loading,
    user: user?.email || 'none',
    localStorage: !!localStorage.getItem('agrigrow_user')
  });

  // Show loading only if actually loading
  if (loading) {
    console.log('ProtectedRoute: Loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 to-earth-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-eco-600" />
          <p className="mt-2 text-eco-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (!user || !isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute: Authenticated! Rendering dashboard for:', user.email);
  return <>{children}</>;
}
