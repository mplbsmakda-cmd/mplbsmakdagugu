import { supabase } from './supabase';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'treasurer';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    full_name: string;
}

/**
 * Login user dengan Supabase Auth (SECURE)
 */
export async function loginUser(username: string, password: string) {
    try {
        // 1. Query user dari database untuk mendapatkan email dan role
        const { data: userData, error: queryError } = await supabase
            .from('users')
            .select('id, username, email, role, full_name')
            .eq('username', username)
            .single();

        if (queryError || !userData) {
            return { user: null, session: null, error: 'Username tidak ditemukan' };
        }

        // 2. Login menggunakan Supabase Auth dengan email
        // Supabase Auth menggunakan email sebagai identifier
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password: password,
        });

        if (authError || !authData.session) {
            return { user: null, session: null, error: 'Password salah' };
        }

        // 3. Return user data dengan session dari Supabase
        const user: User = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role as UserRole,
            full_name: userData.full_name,
        };

        return {
            user,
            session: authData.session,
            error: null
        };
    } catch (err: any) {
        console.error('Login error:', err);
        return { user: null, session: null, error: 'Terjadi kesalahan saat login' };
    }
}

/**
 * Logout user dengan Supabase Auth
 */
export async function logoutUser() {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

/**
 * Get current logged in user dari Supabase Auth
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        // Get session from Supabase Auth
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return null;
        }

        // Get user details from our users table
        const { data: userData, error } = await supabase
            .from('users')
            .select('id, username, email, role, full_name')
            .eq('email', session.user.email)
            .single();

        if (error || !userData) {
            return null;
        }

        return {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role as UserRole,
            full_name: userData.full_name,
        };
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
}

/**
 * Get current session
 */
export async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Check if user has specific role
 */
export async function hasRole(role: UserRole): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.role === role;
}

/**
 * Refresh session
 */
export async function refreshSession() {
    const { data, error } = await supabase.auth.refreshSession();
    return { session: data.session, error };
}

/**
 * Setup auth state change listener
 */
export function onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
}
