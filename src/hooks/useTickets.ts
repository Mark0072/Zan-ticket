import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Ticket } from '@/types/database.types'

interface UseTicketsResult {
  tickets: Ticket[]
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Obtiene los tickets desde Supabase. Se suscribe además a cambios en
 * tiempo real (realtime) sobre la tabla 'tickets' para mantener la UI
 * sincronizada sin necesidad de refrescar manualmente.
 */
export function useTickets(status?: Ticket['status']): UseTicketsResult {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('tickets').select('*').order('created_at', { ascending: false })
    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) {
      setError(error.message)
    } else {
      setTickets(data ?? [])
      setError(null)
    }
    setLoading(false)
  }, [status])

  useEffect(() => {
    fetchTickets()

    const channel = supabase
      .channel('tickets-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () => {
        fetchTickets()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchTickets])

  return { tickets, loading, error, refetch: fetchTickets }
}
