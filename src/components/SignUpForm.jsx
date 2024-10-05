import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const SignUpForm = ({ phone, setPhone, sendOTP }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    sendOTP(true, name, password);
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 mt-4">
      <Input 
        type="text" 
        placeholder="Full Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <Input 
        type="tel" 
        placeholder="Phone Number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required 
      />
      <Input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        minLength={6} 
      />
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;