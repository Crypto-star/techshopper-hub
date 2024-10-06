import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';
import OTPVerificationForm from '../components/OTPVerificationForm';

const VerifyOTP = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, fullName } = location.state || {};

  useEffect(() => {
    if (!phone || !fullName) {
      navigate('/signin');
    }
  }, [phone, fullName, navigate]);

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
      setOtpExpired(true);
      toast.error('OTP has expired or is invalid. Please request a new one.');
    } else if (error.message.includes('Invalid phone number')) {
      toast.error('Invalid phone number. Please check and try again.');
      navigate('/signin');
    } else if (error.message.includes('Too many requests')) {
      toast.error('Too many attempts. Please try again later.');
    } else {
      toast.error('Verification failed. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setOtpExpired(false);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        phone,
        options: { data: { name: fullName } }
      });
      if (error) throw error;
      toast.success('A new verification code has been sent to your phone.');
    } catch (error) {
      console.error('Resend OTP error:', error);
      if (error.message.includes('Too many requests')) {
        toast.error('Too many resend attempts. Please try again later.');
      } else {
        toast.error('Failed to resend OTP. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  if (session) {
    navigate('/');
    return null;
  }

  if (!phone || !fullName) {
    return null; // The useEffect will handle navigation
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">
            {otpExpired 
              ? "Your OTP has expired. Please request a new one."
              : "Enter the OTP sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OTPVerificationForm 
            handleVerify={handleVerify} 
            handleResendOTP={handleResendOTP}
            isVerifying={isVerifying}
            isResending={isResending}
            otpExpired={otpExpired}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;