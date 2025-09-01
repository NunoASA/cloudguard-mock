import { Card, CardContent } from '@/components/ui/card';

interface LoadingCardProps {
  isLoading: boolean;
  error: boolean;
  children: React.ReactNode;
}

export const LoadingCard = ({ isLoading, error, children }: LoadingCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-cyan-400 text-sm">Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="critical">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-red-400 text-sm">Error loading data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};