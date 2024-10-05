import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';
import OTPVerificationForm from '../components/OTPVerificationForm';

const VerifyOTP = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, fullName } = location.state || {};

  const handleVerify = async (otp) => {
    setIsVerifying(true);
    try {
      const { error, data } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;
      
      if (data.user && !data.user.user_metadata.name) {
        await supabase.auth.updateUser({ data: { name: fullName } });
      }
      
      toast.success('Successfully verified!');
      navigate('/');
    } catch (error) {
      console.error('Verification error:', error);
      handleVerificationError(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationError = (error) => {
    if (error.message.includes('Token has expired or is invalid')) {
      toast.error('OTP has expired. Please request a new one.');
    } else {
      toast.error(error.message || 'Verification failed. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        phone,
        options: { data: { name: fullName } }
      });
      if (error) throw error;
      toast.success('A new verification code has been sent to your phone.');
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP: ' + (error.message || 'Unknown error'));
    } finally {
      setIsResending(false);
    }
  };

  if (session) navigate('/');

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">Enter the OTP sent to your phone</CardDescription>
        </CardHeader>
        <CardContent>
          <OTPVerificationForm 
            handleVerify={handleVerify} 
            handleResendOTP={handleResendOTP}
            isVerifying={isVerifying}
            isResending={isResending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;