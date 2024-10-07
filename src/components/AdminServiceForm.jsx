import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAddService } from '../integrations/supabase/hooks/useServices';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().optional(),
});

const categories = [
  { value: 'software', label: 'Software Services' },
  { value: 'hardware', label: 'Hardware Services' },
  { value: 'consulting', label: 'Consulting Services' },
  { value: 'repair', label: 'Repair Services' },
];

const AdminServiceForm = () => {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      icon: '',
    },
  });

  const addService = useAddService();

  const onSubmit = async (data) => {
    try {
      await addService.mutateAsync(data);
      toast.success('Service added successfully');
      form.reset();
    } catch (error) {
      toast.error('Failed to add service');
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
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter service name" {...field} />
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
                <Textarea placeholder="Enter service description" {...field} />
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter icon name or emoji" {...field} />
              </FormControl>
              <FormDescription>Enter an icon name (e.g., 'wrench') or an emoji (e.g., '🔧')</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={addService.isPending}>
          {addService.isPending ? 'Adding...' : 'Add Service'}
        </Button>
      </form>
    </Form>
  );
};

export default AdminServiceForm;