import React from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTPVerificationForm = ({ otp, handleOTPChange, handleVerify, handleResendOTP }) => {
  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={handleOTPChange}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} {...slot}>
                  {({ char }) => (
                    <span className="text-center w-full text-lg">
                      {char || ''}
                    </span>
                  )}
                </InputOTPSlot>
              ))}
            </InputOTPGroup>
          )}
        />
      </div>
      <Button type="submit" className="w-full">Verify OTP</Button>
      <Button type="button" variant="outline" className="w-full" onClick={handleResendOTP}>Resend OTP</Button>
    </form>
  );
};

export default OTPVerificationForm;