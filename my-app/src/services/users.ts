import { createSupabaseClient } from "@/lib/supabase.client";

async function executeSupabaseQuery(query: any) {
    const {data, error} = await query;

    if (error) {
        console.error('Supabase Error:', error.message);
        return null;
    }

    return data;
}

export async function addUser(email: string, name: string) {
    const supabase = await createSupabaseClient();

    const { data: { session }, error } = await supabase.auth.getSession();
    console.log('Current session:', session);

    const query = supabase.from('users').insert([{email, name}]).select('*');
    return await executeSupabaseQuery(query);
}

export async function getUsers() {
    const supabase = createSupabaseClient();

    const query = supabase.from('users').select('*');
    return await executeSupabaseQuery(query);
}

export async function updateUser(id: number, email: string, name: string) {
    const supabase = createSupabaseClient();

    const query = supabase.from('users').update({email, name}).eq('id', id).select('*');
    return await executeSupabaseQuery(query);
}

export async function deleteUser(id: number) {
    const supabase = createSupabaseClient();

    const query = supabase.from('users').delete().eq('id', id).select('*');
    return await executeSupabaseQuery(query);
}
