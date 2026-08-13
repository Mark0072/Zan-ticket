import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwleutggkjpeyxvfkdqk.supabase.com'
const supabaseKey = 'sb_publishable_zfdXWbGfoBDXKBRv0ZYZ1g_Pzz3Onz1'; // Reemplaza esto

export const supabase = createClient(supabaseUrl, supabaseKey);