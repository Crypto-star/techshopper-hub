import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAddUser } from '../integrations/supabase/hooks/useUser';

const SignIn = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();
  const addUser = useAddUser();

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOtp({ 
        phone,
        options: { 
          data: { name: fullName }
        }
      });

      if (error) throw error;

      // The user will be added to the user table in the auth listener
      // when the OTP is verified and the user is fully signed in

      navigate('/verify-otp', { state: { phone, fullName } });
      toast.success('A verification code has been sent to your phone.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signInWithOAuth = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });
      if (error) throw error;
      // The user will be added to the user table in the auth listener
      // when the OAuth sign-in is complete
    } catch (error) {
      toast.error(`Error signing in with ${provider}: ${error.message}`);
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
            <Button type="submit" className="w-full">Send OTP</Button>
          </form>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-600 mb-2">Or sign in with</p>
            <div className="flex justify-center space-x-2">
              <Button
                onClick={() => signInWithOAuth('google')}
                variant="outline"
                className="flex items-center justify-center"
              >
                <FcGoogle className="mr-2" /> Google
              </Button>
              <Button
                onClick={() => signInWithOAuth('github')}
                variant="outline"
                className="flex items-center justify-center"
              >
                <FaGithub className="mr-2" /> GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
