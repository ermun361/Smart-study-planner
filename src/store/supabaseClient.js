import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://qeddtbxsjhjpazdclvsl.supabase.co';
const supabaseKey = 'sb_publishable_Ll-OisTmmkF9cqlhFhRong_N99KGiTP';

export const supabase = createClient(supabaseUrl, supabaseKey);