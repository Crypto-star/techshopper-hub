import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### products

| name        | type   | format | required |
|-------------|--------|--------|----------|
| id          | int8   | number | true     |
| name        | text   | string | true     |
| description | text   | string | false    |
| price       | float8 | number | true     |
| categories  | text   | string | false    |
| sku         | int4   | number | true     |

Note: 'id' is the Primary Key.
*/

export const useProduct = (id) => useQuery({
    queryKey: ['products', id],
    queryFn: () => fromSupabase(supabase.from('products').select('*').eq('id', id).single()),
});

export const useProducts = () => useQuery({
    queryKey: ['products'],
    queryFn: () => fromSupabase(supabase.from('products').select('*')),
});

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProduct) => fromSupabase(supabase.from('products').insert([newProduct])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('products').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('products').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProductSKU = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, sku }) => fromSupabase(supabase.from('products').update({ sku }).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};