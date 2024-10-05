import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignInForm = ({ phone, setPhone, sendOTP }) => {
  const handleSignIn = (e) => {
    e.preventDefault();
    sendOTP();
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <Input 
        type="tel" 
        placeholder="Phone Number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      <Button type="submit" className="w-full">Send OTP</Button>
    </form>
  );
};

export default SignInForm;