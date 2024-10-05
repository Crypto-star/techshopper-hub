import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { supabase } from '../integrations/supabase/supabase';
import { toast } from 'sonner';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const { session, loading, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.user_metadata.name || '');
      setPhone(session.user.user_metadata.phone || '');
      setOccupation(session.user.user_metadata.occupation || '');
    }
  }, [session]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({
      data: { name, phone, occupation }
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Profile updated successfully!');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!session) navigate('/signin');

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">Occupation</label>
              <Input id="occupation" type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
          <Button onClick={handleLogout} className="w-full mt-4" variant="outline">Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;