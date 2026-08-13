// Tipos generados a partir del esquema de Supabase.
// Se pueden regenerar automáticamente con:
//   npx supabase gen types typescript --project-id <PROJECT_ID> > src/types/database.types.ts

export type TicketType = 'Proyecto' | 'Servicio' | 'Venta' | 'Compra'
export type TicketStatus = 'en_proceso' | 'completado' | 'cancelado'
export type InventoryItemType = 'Producto' | 'Servicio'

export interface Database {
  public: {
    Tables: {
      tickets: {
        Row: {
          id: number
          client_name: string
          ticket_type: TicketType
          status: TicketStatus
          sla_due_at: string | null
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          client_name: string
          ticket_type: TicketType
          status?: TicketStatus
          sla_due_at?: string | null
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          client_name?: string
          ticket_type?: TicketType
          status?: TicketStatus
          sla_due_at?: string | null
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      ticket_items: {
        Row: {
          id: number
          ticket_id: number
          inventory_item_id: number | null
          description: string
          quantity: number
          unit_price: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: number
          ticket_id: number
          inventory_item_id?: number | null
          description: string
          quantity?: number
          unit_price: number
          subtotal?: number
          created_at?: string
        }
        Update: {
          id?: number
          ticket_id?: number
          inventory_item_id?: number | null
          description?: string
          quantity?: number
          unit_price?: number
          subtotal?: number
          created_at?: string
        }
      }
      inventory_items: {
        Row: {
          id: number
          sku: string
          name: string
          type: InventoryItemType
          base_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          sku: string
          name: string
          type: InventoryItemType
          base_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          sku?: string
          name?: string
          type?: InventoryItemType
          base_price?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Tipos auxiliares de conveniencia
export type Ticket = Database['public']['Tables']['tickets']['Row']
export type TicketItem = Database['public']['Tables']['ticket_items']['Row']
export type InventoryItem = Database['public']['Tables']['inventory_items']['Row']
