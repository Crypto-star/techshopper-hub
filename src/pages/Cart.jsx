import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from 'lucide-react';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { useUpdateUser } from '../integrations/supabase/hooks/useUser';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { session } = useSupabaseAuth();
  const [address, setAddress] = useState('');
  const updateUser = useUpdateUser();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!session) {
      toast.error('Please sign in to checkout');
      return;
    }

    if (!address.trim()) {
      toast.error('Please enter your address');
      return;
    }

    try {
      await updateUser.mutateAsync({
        id: session.user.id,
        address: address.trim()
      });
      toast.success('Address updated successfully');
      // Proceed with checkout logic here
    } catch (error) {
      toast.error('Failed to update address');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="flex items-center p-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 mr-4"
                  />
                  <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</h2>
            <Input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mb-4"
            />
            <Button className="w-full md:w-auto" onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;