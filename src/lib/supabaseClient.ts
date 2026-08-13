import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno de Supabase. Verifica tu archivo .env ' +
      '(VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY).'
  )
}

// Cliente único y tipado de Supabase, reutilizado en toda la aplicación.
// El tipo genérico Database permite autocompletado y chequeo de tipos
// en cada tabla, columna y relación definida en el esquema.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
