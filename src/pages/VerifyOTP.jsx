import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, fullName } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const { error, data } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;
      
      // If it's a new user, update their profile with the full name
      if (data.user && !data.user.user_metadata.name) {
        await supabase.auth.updateUser({
          data: { name: fullName }
        });
      }
      
      toast.success('Successfully verified!');
      navigate('/');
    } catch (error) {
      console.error('Verification error:', error);
      if (error.message.includes('Token has expired or is invalid')) {
        toast.error('OTP has expired. Please request a new one.');
      } else {
        toast.error(error.message || 'Verification failed. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        phone,
        options: { 
          data: { name: fullName }
        }
      });

      if (error) throw error;
      toast.success('A new verification code has been sent to your phone.');
      setOtp(''); // Clear the OTP input
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
          <form onSubmit={handleVerify} className="space-y-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
            <Button type="submit" className="w-full" disabled={isVerifying || isResending}>
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={handleResendOTP}
              disabled={isVerifying || isResending}
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;