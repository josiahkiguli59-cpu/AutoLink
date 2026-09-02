'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isEmailVerified: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: {
    fullName: string;
    email: string;
    password?: string;
    role: UserRole;
    phone?: string;
    whatsapp?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resendVerificationEmail: () => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: UserRole) => void;
}

const DEMO_USERS: Record<UserRole, UserProfile> = {
  buyer: {
    id: 'user-buyer-1',
    full_name: 'Sarah Nsubuga',
    email: 'sarah.buyer@example.com',
    phone: '+256701122334',
    whatsapp: '+256701122334',
    role: 'buyer',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    is_verified: true,
  },
  seller: {
    id: 'seller-1',
    full_name: 'Victoria Motors Kampala',
    email: 'sales@victoriamotors.ug',
    phone: '+256701234567',
    whatsapp: '+256701234567',
    role: 'seller',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    is_verified: true,
  },
  admin: {
    id: 'user-admin-1',
    full_name: 'Admin Supervisor',
    email: 'admin@autolink.ug',
    phone: '+256788990011',
    whatsapp: '+256788990011',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    is_verified: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(true);

  // Initialize auth
  useEffect(() => {
    async function loadSession() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setUser(profile);
            } else {
              setUser({
                id: session.user.id,
                full_name: session.user.user_metadata?.full_name || 'AutoLink User',
                email: session.user.email || '',
                role: (session.user.user_metadata?.role as UserRole) || 'buyer',
                phone: session.user.user_metadata?.phone,
                whatsapp: session.user.user_metadata?.whatsapp,
                is_verified: Boolean(session.user.email_confirmed_at),
              });
            }
            setIsEmailVerified(Boolean(session.user.email_confirmed_at));
            setLoading(false);
            return;
          }
        }

        // Check local storage for mock session
        const savedDemo = localStorage.getItem('autolink_user');
        if (savedDemo) {
          const parsed = JSON.parse(savedDemo);
          setUser(parsed);
          setIsEmailVerified(parsed.is_verified ?? true);
        }
      } catch (err) {
        console.error('Error loading session:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile);
          }
          setIsEmailVerified(Boolean(session.user.email_confirmed_at));
        } else {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          setIsEmailVerified(Boolean(data.user.email_confirmed_at));
        }
        return { success: true };
      }

      // Fallback demo matching
      const role: UserRole = email.includes('admin')
        ? 'admin'
        : email.includes('seller')
        ? 'seller'
        : 'buyer';

      const demo = { ...DEMO_USERS[role], email };
      setUser(demo);
      localStorage.setItem('autolink_user', JSON.stringify(demo));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: {
    fullName: string;
    email: string;
    password?: string;
    role: UserRole;
    phone?: string;
    whatsapp?: string;
  }) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && data.password) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.fullName,
              role: data.role,
              phone: data.phone,
              whatsapp: data.whatsapp,
            },
            emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify-email`,
          },
        });
        if (error) throw error;
        setIsEmailVerified(false);
        return { success: true };
      }

      // Demo fallback signup
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        full_name: data.fullName,
        email: data.email,
        role: data.role,
        phone: data.phone,
        whatsapp: data.whatsapp,
        is_verified: true,
      };
      setUser(newUser);
      localStorage.setItem('autolink_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Sign up failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('autolink_user');
  };

  const resetPassword = async (email: string) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/login?mode=reset`,
        });
        if (error) throw error;
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Password reset request failed' };
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (isSupabaseConfigured && user?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.email,
        });
        if (error) throw error;
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to resend verification email' };
    }
  };

  const loginAsDemo = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    setUser(demo);
    setIsEmailVerified(true);
    localStorage.setItem('autolink_user', JSON.stringify(demo));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isEmailVerified,
        login,
        signup,
        logout,
        resetPassword,
        resendVerificationEmail,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
