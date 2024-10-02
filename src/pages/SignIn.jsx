import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in form submitted');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In to TechnoMart</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input type="password" id="password" name="password" required />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;