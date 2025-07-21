import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, Wifi } from 'lucide-react';
import { healthCheck } from '@/lib/api';

export default function ApiTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const connected = await healthCheck();
      setIsConnected(connected);
      if (!connected) {
        setError('Backend is not responding');
      }
    } catch (err: any) {
      setIsConnected(false);
      setError(err.message || 'Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            API Connection Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testConnection} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing Connection...
              </>
            ) : (
              'Test Backend Connection'
            )}
          </Button>

          {isConnected !== null && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              isConnected 
                ? 'bg-green-500/10 border border-green-500/20 text-green-600' 
                : 'bg-red-500/10 border border-red-500/20 text-red-600'
            }`}>
              {isConnected ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium">
                {isConnected ? 'Connected to Backend' : 'Connection Failed'}
              </span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>This will test the connection to your Railway backend.</p>
            <p>Make sure your backend URL is set in the environment variables.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 