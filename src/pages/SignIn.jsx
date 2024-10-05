import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';

const SignIn = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      const { error } = await supabase.auth.signUp({ 
        phone,
        password,
        options: { data: { name: fullName } }
      });

      if (error) throw error;
      navigate('/verify-otp', { state: { phone, fullName } });
      toast.success('A verification code has been sent to your phone.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (session) navigate('/');

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to TechnoMart</CardTitle>
          <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={sendOTP} className="space-y-4">
            <Input 
              type="text" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
            <Input 
              type="tel" 
              placeholder="Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength={6}
            />
            <Button type="submit" className="w-full">Send OTP</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;