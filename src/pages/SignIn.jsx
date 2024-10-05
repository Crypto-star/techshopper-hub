import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';
import SignInForm from '@/components/SignInForm';
import SignUpForm from '@/components/SignUpForm';
import OTPVerificationForm from '@/components/OTPVerificationForm';

const SignIn = () => {
  const [phone, setPhone] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  const sendOTP = async (isSignUp = false, name = '', password = '') => {
    try {
      const { error } = isSignUp
        ? await supabase.auth.signUp({ 
            phone,
            password,
            options: { data: { name } }
          })
        : await supabase.auth.signInWithOtp({ phone });

      if (error) throw error;
      setIsVerifying(true);
      toast.success('A verification code has been sent to your phone.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleVerify = async (otp) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;
      toast.success('Successfully verified!');
      navigate('/profile');
    } catch (error) {
      if (error.message.includes('Token has expired or is invalid')) {
        toast.error('The verification code has expired. Please request a new one.');
        setIsVerifying(false);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleResendOTP = () => {
    sendOTP();
  };

  if (loading) return <div>Loading...</div>;
  if (session) navigate('/profile');

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to TechnoMart</CardTitle>
          <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          {!isVerifying ? (
            <>
              <SignInForm phone={phone} setPhone={setPhone} sendOTP={sendOTP} />
              <SignUpForm phone={phone} setPhone={setPhone} sendOTP={sendOTP} />
            </>
          ) : (
            <OTPVerificationForm
              handleVerify={handleVerify}
              handleResendOTP={handleResendOTP}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;