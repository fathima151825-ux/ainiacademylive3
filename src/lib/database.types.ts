export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      venues: {
        Row: {
          id: string
          name: string
          address: string
          contact_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          contact_number: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          contact_number?: string
          created_at?: string
          updated_at?: string
        }
      }
      batches: {
        Row: {
          id: string
          venue_id: string
          batch_name: string
          days: string
          time_slot: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          batch_name: string
          days: string
          time_slot: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          batch_name?: string
          days?: string
          time_slot?: string
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          name: string
          photo_url: string | null
          parent_phone: string
          batch_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          photo_url?: string | null
          parent_phone: string
          batch_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          photo_url?: string | null
          parent_phone?: string
          batch_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      staff: {
        Row: {
          id: string
          name: string
          role: string
          contact: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          contact: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          contact?: string
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          student_id: string
          batch_id: string
          date: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          batch_id: string
          date?: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          batch_id?: string
          date?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}
