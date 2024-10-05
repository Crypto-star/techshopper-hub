import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const SignIn = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();

  const sendOTP = async (isSignUp = false) => {
    const { error } = isSignUp
      ? await supabase.auth.signUp({ 
          phone,
          password,
          options: { data: { name } }
        })
      : await supabase.auth.signInWithOtp({ phone });

    if (error) {
      toast.error(error.message);
    } else {
      setIsVerifying(true);
      toast.success('A verification code has been sent to your phone.');
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    sendOTP();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    sendOTP(true);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
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
      toast.error(error.message);
    }
  };

  const handleResendOTP = () => {
    setOtp('');
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
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  <Button type="submit" className="w-full">Send OTP</Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                  <Button type="submit" className="w-full">Sign Up</Button>
                </form>
              </TabsContent>
            </Tabs>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                  value={otp}
                  onChange={setOtp}
                />
              </div>
              <Button type="submit" className="w-full">Verify OTP</Button>
              <Button type="button" variant="outline" className="w-full" onClick={handleResendOTP}>Resend OTP</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;