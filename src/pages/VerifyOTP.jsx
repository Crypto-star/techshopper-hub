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
  const [isResending, setIsResending] = useState(false);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, fullName } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
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
      if (error.message.includes('Token has expired or is invalid')) {
        toast.error('The verification code has expired or is invalid. Please try again or request a new code.');
      } else {
        toast.error(error.message);
      }
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
    } catch (error) {
      toast.error('Failed to resend OTP: ' + error.message);
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
            <Button type="submit" className="w-full">Verify OTP</Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={handleResendOTP}
              disabled={isResending}
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