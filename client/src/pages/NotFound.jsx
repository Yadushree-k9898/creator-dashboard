import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <div className="flex items-center space-x-3 mb-6">
      <AlertTriangle className="w-12 h-12 text-destructive" />
      <h1 className="text-5xl font-bold text-foreground">404</h1>
    </div>
    <h2 className="text-2xl font-semibold mb-2 text-foreground">Page Not Found</h2>
    <p className="mb-6 text-muted-foreground">
      Sorry, the page you are looking for does not exist.
    </p>
    <Button asChild>
      <Link to="/">Go Home</Link>
    </Button>
  </div>
);

export default NotFound;