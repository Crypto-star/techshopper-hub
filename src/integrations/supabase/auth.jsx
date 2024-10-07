import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabase.js';
import { useQueryClient } from '@tanstack/react-query';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAddUser, useUpdateUser } from './hooks/useUser';

const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  return (
    <SupabaseAuthProviderInner>
      {children}
    </SupabaseAuthProviderInner>
  );
}

export const SupabaseAuthProviderInner = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const addUser = useAddUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setLoading(false);
      queryClient.invalidateQueries('user');
      
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        const { user } = session;
        const { data: existingUser } = await supabase
          .from('user')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!existingUser) {
          await addUser.mutateAsync({
            user_id: user.id,
            name: user.user_metadata.full_name || user.user_metadata.name || 'Unknown',
          });
        } else if (event === 'USER_UPDATED') {
          await updateUser.mutateAsync({
            id: user.id,
            name: user.user_metadata.full_name || user.user_metadata.name || existingUser.name,
          });
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient, addUser, updateUser]);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    queryClient.invalidateQueries('user');
  };

  return (
    <SupabaseAuthContext.Provider value={{ session, loading, logout }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  return useContext(SupabaseAuthContext);
};

export const SupabaseAuthUI = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    theme="default"
    providers={['google', 'github']}
  />
);