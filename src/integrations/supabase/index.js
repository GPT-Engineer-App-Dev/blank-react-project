import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Drinks // table: drinks
    id: number
    created_at: string
    name: string
    type: string
    price: number

*/

// Hooks for Drinks table

export const useDrinks = () => useQuery({
    queryKey: ['drinks'],
    queryFn: () => fromSupabase(supabase.from('drinks').select('*')),
});

export const useAddDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDrink) => fromSupabase(supabase.from('drinks').insert([newDrink])),
        onSuccess: () => {
            queryClient.invalidateQueries('drinks');
        },
    });
};

export const useUpdateDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDrink) => fromSupabase(supabase.from('drinks').update(updatedDrink).eq('id', updatedDrink.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('drinks');
        },
    });
};

export const useDeleteDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('drinks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('drinks');
        },
    });
};