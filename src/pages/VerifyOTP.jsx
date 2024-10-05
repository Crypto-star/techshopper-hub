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
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, fullName } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;
      toast.success('Successfully verified!');
      navigate('/');
    } catch (error) {
      if (error.message.includes('Token has expired or is invalid')) {
        toast.error('The verification code has expired or is invalid. Please try again.');
      } else {
        toast.error(error.message);
      }
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;