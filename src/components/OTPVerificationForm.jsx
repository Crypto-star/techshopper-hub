import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from 'sonner';

const OTPVerificationForm = ({ handleVerify, handleResendOTP, isVerifying, isResending }) => {
  const [otp, setOtp] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    handleVerify(otp);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
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
      </div>
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
  );
};

export default OTPVerificationForm;