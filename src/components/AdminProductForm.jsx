import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAddProduct } from '../integrations/supabase/hooks/useProducts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  categories: z.string().optional(),
});

const AdminProductForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      categories: '',
    },
  });

  const addProduct = useAddProduct();

  const onSubmit = async (data) => {
    try {
      if (imageFile) {
        // Generate a unique filename
        const filename = `product_${Date.now()}_${imageFile.name}`;
        // In a real application, you would save the file to your server or a CDN here
        // For this example, we'll just use a placeholder URL
        data.image_url = `/images/${filename}`;
      }
      await addProduct.mutateAsync(data);
      toast.success('Product added successfully');
      form.reset();
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Input placeholder="Enter categories (comma-separated)" {...field} />
              </FormControl>
              <FormDescription>Optional: Provide categories separated by commas</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </FormControl>
              <FormDescription>Upload a product image (optional)</FormDescription>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={addProduct.isPending}>
          {addProduct.isPending ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
};

export default AdminProductForm;
