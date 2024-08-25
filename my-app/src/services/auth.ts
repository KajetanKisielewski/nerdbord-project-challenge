import { createSupabaseClient } from "@/lib/supabase.client";

export async function signUp(email: string, password: string) {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error during sign up:', error.message);
        return null;
    }

    return data;
}

export async function signIn(email: string, password: string) {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (data.session) {
        console.log('User is logged in and session is set:', data.session);
    }

    if (error) {
        console.error('Error during sign in:', error.message);
        return null;
    }

    return data;
}

export async function signOut() {
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error during sign out:', error.message);
        return false;
    }

    return true;
}

export async function getCurrentUser() {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        console.error('User is not authenticated:', error?.message);
        return null;
    }

    return data.session.user;
}

