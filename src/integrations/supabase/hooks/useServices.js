import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### services

| name        | type   | format | required |
|-------------|--------|--------|----------|
| id          | int8   | number | true     |
| name        | text   | string | true     |
| description | text   | string | false    |
| price       | float8 | number | true     |
| icon        | text   | string | false    |

Note: 'id' is the Primary Key.
*/

export const useService = (id) => useQuery({
    queryKey: ['services', id],
    queryFn: () => fromSupabase(supabase.from('services').select('*').eq('id', id).single()),
});

export const useServices = () => useQuery({
    queryKey: ['services'],
    queryFn: () => fromSupabase(supabase.from('services').select('*')),
    retry: 3,
    retryDelay: 1000,
});

export const useAddService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newService) => fromSupabase(supabase.from('services').insert([newService])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('services').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('services').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });
};
