import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

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
        mutationFn: async (newService) => {
            const { data, error } = await supabase.from('services').insert([newService]).select();
            if (error) {
                console.error('Error adding service:', error);
                throw error;
            }
            return data[0];
        },
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