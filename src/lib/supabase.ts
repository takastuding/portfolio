import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Booking = {
    id: string;
    date: string;
    time_start: string;
    name: string;
    email: string;
    consultation_type: string;
    message: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
};
