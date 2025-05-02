import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="max-w-2xl w-full shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Welcome to CreatorHub 🚀
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
            Manage your creator profile, earn credits, and explore a personalized feed. 
            Log in or register to get started!
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button variant="default" className="px-6 py-2 text-lg">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="px-6 py-2 text-lg">
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
