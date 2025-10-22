export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.1 (8cbcf98)"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          announcement_category: string
          announcement_content: string
          announcement_id: string
          announcement_title: string
          created_at: string
          feedback_id: string | null
          is_draft: boolean
        }
        Insert: {
          announcement_category?: string
          announcement_content: string
          announcement_id?: string
          announcement_title: string
          created_at?: string
          feedback_id?: string | null
          is_draft?: boolean
        }
        Update: {
          announcement_category?: string
          announcement_content?: string
          announcement_id?: string
          announcement_title?: string
          created_at?: string
          feedback_id?: string | null
          is_draft?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "announcements_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "vetool_feedbacks"
            referencedColumns: ["feedback_id"]
          },
        ]
      }
      checklist: {
        Row: {
          age_in_days: number | null
          checklist_group: string[] | null
          checklist_id: string
          checklist_protocol: Json | null
          checklist_set: Json
          checklist_tag: string | null
          checklist_timetable: Json | null
          checklist_title: string
          checklist_type: string
          checklist_vet: Json | null
          comment: string | null
          created_at: string
          due_date: string | null
          end_date: string | null
          end_time: string | null
          hos_id: string
          is_txing: boolean | null
          patient_id: string | null
          start_time: string | null
          tx_memo_a: Json | null
          tx_memo_b: Json | null
        }
        Insert: {
          age_in_days?: number | null
          checklist_group?: string[] | null
          checklist_id?: string
          checklist_protocol?: Json | null
          checklist_set?: Json
          checklist_tag?: string | null
          checklist_timetable?: Json | null
          checklist_title: string
          checklist_type: string
          checklist_vet?: Json | null
          comment?: string | null
          created_at?: string
          due_date?: string | null
          end_date?: string | null
          end_time?: string | null
          hos_id: string
          is_txing?: boolean | null
          patient_id?: string | null
          start_time?: string | null
          tx_memo_a?: Json | null
          tx_memo_b?: Json | null
        }
        Update: {
          age_in_days?: number | null
          checklist_group?: string[] | null
          checklist_id?: string
          checklist_protocol?: Json | null
          checklist_set?: Json
          checklist_tag?: string | null
          checklist_timetable?: Json | null
          checklist_title?: string
          checklist_type?: string
          checklist_vet?: Json | null
          comment?: string | null
          created_at?: string
          due_date?: string | null
          end_date?: string | null
          end_time?: string | null
          hos_id?: string
          is_txing?: boolean | null
          patient_id?: string | null
          start_time?: string | null
          tx_memo_a?: Json | null
          tx_memo_b?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "checklist_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      checklist_template: {
        Row: {
          checklist_protocol: Json | null
          checklist_set: Json | null
          checklist_tag: string | null
          checklist_template_id: string
          checklist_title: string | null
          checklist_type: string | null
          created_at: string
          hos_id: string | null
          preinfo: Json | null
        }
        Insert: {
          checklist_protocol?: Json | null
          checklist_set?: Json | null
          checklist_tag?: string | null
          checklist_template_id?: string
          checklist_title?: string | null
          checklist_type?: string | null
          created_at?: string
          hos_id?: string | null
          preinfo?: Json | null
        }
        Update: {
          checklist_protocol?: Json | null
          checklist_set?: Json | null
          checklist_tag?: string | null
          checklist_template_id?: string
          checklist_title?: string | null
          checklist_type?: string | null
          created_at?: string
          hos_id?: string | null
          preinfo?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_template_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      diets: {
        Row: {
          active: boolean
          company: string
          created_at: string
          description: string | null
          diet_id: string
          hos_id: string
          mass_vol: number
          name: string
          product_tag: string | null
          species: string
          unit: string
        }
        Insert: {
          active?: boolean
          company: string
          created_at?: string
          description?: string | null
          diet_id?: string
          hos_id?: string
          mass_vol: number
          name: string
          product_tag?: string | null
          species: string
          unit: string
        }
        Update: {
          active?: boolean
          company?: string
          created_at?: string
          description?: string | null
          diet_id?: string
          hos_id?: string
          mass_vol?: number
          name?: string
          product_tag?: string | null
          species?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_vetool_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      drug_doses: {
        Row: {
          bw_unit: string | null
          created_at: string
          cri_unit: string | null
          default_dose: string | null
          description: string | null
          dose_id: string
          dose_unit: string | null
          drug_id: string | null
          hos_id: string | null
          max_dose: string | null
          min_dose: string | null
          route: string[] | null
          species: string | null
        }
        Insert: {
          bw_unit?: string | null
          created_at?: string
          cri_unit?: string | null
          default_dose?: string | null
          description?: string | null
          dose_id?: string
          dose_unit?: string | null
          drug_id?: string | null
          hos_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route?: string[] | null
          species?: string | null
        }
        Update: {
          bw_unit?: string | null
          created_at?: string
          cri_unit?: string | null
          default_dose?: string | null
          description?: string | null
          dose_id?: string
          dose_unit?: string | null
          drug_id?: string | null
          hos_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route?: string[] | null
          species?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_doses_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "raw_drugs"
            referencedColumns: ["raw_drug_id"]
          },
          {
            foreignKeyName: "drug_doses_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      drug_products: {
        Row: {
          active: boolean | null
          company: string | null
          created_at: string
          description: string | null
          drug_id: string | null
          drug_name: string | null
          drug_products_id: string
          hos_id: string | null
          mass_vol: number | null
          name: string
          product_tag: string | null
          standard: string | null
          stock_plan: number | null
          total_vol: number | null
          type: string | null
          unit: string | null
        }
        Insert: {
          active?: boolean | null
          company?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_name?: string | null
          drug_products_id?: string
          hos_id?: string | null
          mass_vol?: number | null
          name: string
          product_tag?: string | null
          standard?: string | null
          stock_plan?: number | null
          total_vol?: number | null
          type?: string | null
          unit?: string | null
        }
        Update: {
          active?: boolean | null
          company?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_name?: string | null
          drug_products_id?: string
          hos_id?: string | null
          mass_vol?: number | null
          name?: string
          product_tag?: string | null
          standard?: string | null
          stock_plan?: number | null
          total_vol?: number | null
          type?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_products_rows_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "raw_drugs"
            referencedColumns: ["raw_drug_id"]
          },
          {
            foreignKeyName: "drug_products_rows_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      hos_drugs: {
        Row: {
          caution: string
          created_at: string
          hos_drug_id: string
          hos_drug_name: string
          hos_drug_route: string
          hos_id: string
          ml_per_kg: number
          raw_drug_id: string | null
          unit: string
          unit_per_kg: number
        }
        Insert: {
          caution?: string
          created_at?: string
          hos_drug_id?: string
          hos_drug_name?: string
          hos_drug_route: string
          hos_id?: string
          ml_per_kg: number
          raw_drug_id?: string | null
          unit?: string
          unit_per_kg: number
        }
        Update: {
          caution?: string
          created_at?: string
          hos_drug_id?: string
          hos_drug_name?: string
          hos_drug_route?: string
          hos_id?: string
          ml_per_kg?: number
          raw_drug_id?: string | null
          unit?: string
          unit_per_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "drugs_description_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "hos_drugs_raw_drug_id_fkey"
            columns: ["raw_drug_id"]
            isOneToOne: false
            referencedRelation: "raw_drugs"
            referencedColumns: ["raw_drug_id"]
          },
        ]
      }
      hospital_diet_pin: {
        Row: {
          created_at: string
          diet_id: string
          hos_id: string
        }
        Insert: {
          created_at?: string
          diet_id?: string
          hos_id?: string
        }
        Update: {
          created_at?: string
          diet_id?: string
          hos_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_diet_pin_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["diet_id"]
          },
          {
            foreignKeyName: "hospital_diet_pin_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      hospitals: {
        Row: {
          business_number: string
          city: string
          created_at: string
          district: string
          group_list: string[]
          hos_id: string
          icu_memo_names: string[]
          is_in_charge_system: boolean
          is_personal: boolean
          master_user_id: string
          name: string
          order_color: Json | null
          order_color_display: string
          order_font_size: number
          plan: string
          show_orderer: boolean
          show_tx_user: boolean
          time_guidelines: number[]
          vital_ref_range: Json
        }
        Insert: {
          business_number?: string
          city: string
          created_at?: string
          district: string
          group_list?: string[]
          hos_id?: string
          icu_memo_names?: string[]
          is_in_charge_system?: boolean
          is_personal?: boolean
          master_user_id: string
          name: string
          order_color?: Json | null
          order_color_display?: string
          order_font_size?: number
          plan?: string
          show_orderer?: boolean
          show_tx_user?: boolean
          time_guidelines?: number[]
          vital_ref_range?: Json
        }
        Update: {
          business_number?: string
          city?: string
          created_at?: string
          district?: string
          group_list?: string[]
          hos_id?: string
          icu_memo_names?: string[]
          is_in_charge_system?: boolean
          is_personal?: boolean
          master_user_id?: string
          name?: string
          order_color?: Json | null
          order_color_display?: string
          order_font_size?: number
          plan?: string
          show_orderer?: boolean
          show_tx_user?: boolean
          time_guidelines?: number[]
          vital_ref_range?: Json
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_master_user_id_fkey"
            columns: ["master_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      icu_bookmarks: {
        Row: {
          bookmark_comment: string | null
          bookmark_id: string
          bookmark_name: string
          created_at: string
          hos_id: string
          icu_chart_id: string
        }
        Insert: {
          bookmark_comment?: string | null
          bookmark_id?: string
          bookmark_name?: string
          created_at?: string
          hos_id: string
          icu_chart_id: string
        }
        Update: {
          bookmark_comment?: string | null
          bookmark_id?: string
          bookmark_name?: string
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_bookmarks_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_bookmarks_icu_chart_id_fkey"
            columns: ["icu_chart_id"]
            isOneToOne: true
            referencedRelation: "icu_charts"
            referencedColumns: ["icu_chart_id"]
          },
        ]
      }
      icu_charts: {
        Row: {
          created_at: string
          hos_id: string
          icu_chart_id: string
          icu_io_id: string | null
          in_charge: Json | null
          main_vet: string | null
          patient_id: string | null
          sub_vet: string | null
          target_date: string | null
          urgency: number | null
          weight: string
          weight_measured_date: string | null
        }
        Insert: {
          created_at?: string
          hos_id: string
          icu_chart_id?: string
          icu_io_id?: string | null
          in_charge?: Json | null
          main_vet?: string | null
          patient_id?: string | null
          sub_vet?: string | null
          target_date?: string | null
          urgency?: number | null
          weight?: string
          weight_measured_date?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          icu_io_id?: string | null
          in_charge?: Json | null
          main_vet?: string | null
          patient_id?: string | null
          sub_vet?: string | null
          target_date?: string | null
          urgency?: number | null
          weight?: string
          weight_measured_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "icu_charts_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_charts_icu_io_id_fkey"
            columns: ["icu_io_id"]
            isOneToOne: false
            referencedRelation: "icu_io"
            referencedColumns: ["icu_io_id"]
          },
          {
            foreignKeyName: "icu_charts_main_vet_fkey"
            columns: ["main_vet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "icu_charts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "icu_charts_sub_vet_fkey"
            columns: ["sub_vet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      icu_default_chart: {
        Row: {
          created_at: string
          default_chart_id: string
          default_chart_order_comment: string
          default_chart_order_name: string
          default_chart_order_priority: number
          default_chart_order_type: string
          default_order_time: string[]
          hos_id: string
          is_bordered: boolean
        }
        Insert: {
          created_at?: string
          default_chart_id?: string
          default_chart_order_comment: string
          default_chart_order_name: string
          default_chart_order_priority?: number
          default_chart_order_type: string
          default_order_time?: string[]
          hos_id: string
          is_bordered?: boolean
        }
        Update: {
          created_at?: string
          default_chart_id?: string
          default_chart_order_comment?: string
          default_chart_order_name?: string
          default_chart_order_priority?: number
          default_chart_order_type?: string
          default_order_time?: string[]
          hos_id?: string
          is_bordered?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "icu_default_chart_temp_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      icu_io: {
        Row: {
          age_in_days: number
          cage: string | null
          cpcr: string
          created_at: string
          group_list: string[]
          hos_id: string | null
          icu_io_cc: string
          icu_io_dx: string
          icu_io_id: string
          icu_io_tags: string | null
          in_date: string
          memo_a: Json | null
          memo_b: Json | null
          memo_c: Json | null
          out_date: string | null
          out_due_date: string | null
          patient_id: string
        }
        Insert: {
          age_in_days: number
          cage?: string | null
          cpcr?: string
          created_at?: string
          group_list?: string[]
          hos_id?: string | null
          icu_io_cc?: string
          icu_io_dx?: string
          icu_io_id?: string
          icu_io_tags?: string | null
          in_date: string
          memo_a?: Json | null
          memo_b?: Json | null
          memo_c?: Json | null
          out_date?: string | null
          out_due_date?: string | null
          patient_id: string
        }
        Update: {
          age_in_days?: number
          cage?: string | null
          cpcr?: string
          created_at?: string
          group_list?: string[]
          hos_id?: string | null
          icu_io_cc?: string
          icu_io_dx?: string
          icu_io_id?: string
          icu_io_tags?: string | null
          in_date?: string
          memo_a?: Json | null
          memo_b?: Json | null
          memo_c?: Json | null
          out_date?: string | null
          out_due_date?: string | null
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_io_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_io_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      icu_notification: {
        Row: {
          created_at: string
          hos_id: string
          icu_chart_id: string
          notification_content: string | null
          notification_id: string
          notification_time: number
          notification_title: string
          patient_id: string
          target_date: string
        }
        Insert: {
          created_at?: string
          hos_id: string
          icu_chart_id: string
          notification_content?: string | null
          notification_id?: string
          notification_time: number
          notification_title: string
          patient_id: string
          target_date: string
        }
        Update: {
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          notification_content?: string | null
          notification_id?: string
          notification_time?: number
          notification_title?: string
          patient_id?: string
          target_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_notification_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_notification_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      icu_orders: {
        Row: {
          created_at: string
          hos_id: string
          icu_chart_id: string
          icu_chart_order_comment: string | null
          icu_chart_order_id: string
          icu_chart_order_name: string
          icu_chart_order_priority: number
          icu_chart_order_time: string[]
          icu_chart_order_type: string
          is_bordered: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          hos_id: string
          icu_chart_id: string
          icu_chart_order_comment?: string | null
          icu_chart_order_id?: string
          icu_chart_order_name: string
          icu_chart_order_priority?: number
          icu_chart_order_time?: string[]
          icu_chart_order_type: string
          is_bordered?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          icu_chart_order_comment?: string | null
          icu_chart_order_id?: string
          icu_chart_order_name?: string
          icu_chart_order_priority?: number
          icu_chart_order_time?: string[]
          icu_chart_order_type?: string
          is_bordered?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_orders_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_orders_icu_chart_id_fkey"
            columns: ["icu_chart_id"]
            isOneToOne: false
            referencedRelation: "icu_charts"
            referencedColumns: ["icu_chart_id"]
          },
        ]
      }
      icu_out: {
        Row: {
          basic_care: string
          belongings: string
          created_at: string
          etc: string
          icu_io_id: string | null
          icu_out_id: string
          out_time: string
          patient_id: string | null
          prescription: string
        }
        Insert: {
          basic_care?: string
          belongings?: string
          created_at?: string
          etc?: string
          icu_io_id?: string | null
          icu_out_id?: string
          out_time?: string
          patient_id?: string | null
          prescription?: string
        }
        Update: {
          basic_care?: string
          belongings?: string
          created_at?: string
          etc?: string
          icu_io_id?: string | null
          icu_out_id?: string
          out_time?: string
          patient_id?: string | null
          prescription?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_out_icu_io_id_fkey"
            columns: ["icu_io_id"]
            isOneToOne: false
            referencedRelation: "icu_io"
            referencedColumns: ["icu_io_id"]
          },
          {
            foreignKeyName: "icu_out_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      icu_templates: {
        Row: {
          created_at: string
          hos_id: string
          icu_chart_id: string
          template_comment: string | null
          template_id: string
          template_name: string
        }
        Insert: {
          created_at?: string
          hos_id: string
          icu_chart_id: string
          template_comment?: string | null
          template_id?: string
          template_name: string
        }
        Update: {
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          template_comment?: string | null
          template_id?: string
          template_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_templates_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_templates_icu_chart_id_fkey"
            columns: ["icu_chart_id"]
            isOneToOne: true
            referencedRelation: "icu_charts"
            referencedColumns: ["icu_chart_id"]
          },
        ]
      }
      icu_txs: {
        Row: {
          created_at: string
          has_images: boolean | null
          hos_id: string
          icu_chart_order_id: string | null
          icu_chart_tx_comment: string | null
          icu_chart_tx_id: string
          icu_chart_tx_images: string[] | null
          icu_chart_tx_log: Json[] | null
          icu_chart_tx_result: string | null
          is_crucial: boolean
          time: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          has_images?: boolean | null
          hos_id: string
          icu_chart_order_id?: string | null
          icu_chart_tx_comment?: string | null
          icu_chart_tx_id?: string
          icu_chart_tx_images?: string[] | null
          icu_chart_tx_log?: Json[] | null
          icu_chart_tx_result?: string | null
          is_crucial?: boolean
          time: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          has_images?: boolean | null
          hos_id?: string
          icu_chart_order_id?: string | null
          icu_chart_tx_comment?: string | null
          icu_chart_tx_id?: string
          icu_chart_tx_images?: string[] | null
          icu_chart_tx_log?: Json[] | null
          icu_chart_tx_result?: string | null
          is_crucial?: boolean
          time?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "icu_txs_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_txs_icu_chart_order_id_fkey"
            columns: ["icu_chart_order_id"]
            isOneToOne: false
            referencedRelation: "icu_orders"
            referencedColumns: ["icu_chart_order_id"]
          },
        ]
      }
      icu_visit: {
        Row: {
          consultation_status: string
          created_at: string
          hos_id: string | null
          icu_io_id: string | null
          icu_visit_id: string
          is_done: boolean
          main_vet: string
          patient_id: string | null
          place: string
          preparation: string
          target_date: string
          time: string
          visit_etc: string
        }
        Insert: {
          consultation_status?: string
          created_at?: string
          hos_id?: string | null
          icu_io_id?: string | null
          icu_visit_id?: string
          is_done?: boolean
          main_vet: string
          patient_id?: string | null
          place?: string
          preparation?: string
          target_date: string
          time?: string
          visit_etc?: string
        }
        Update: {
          consultation_status?: string
          created_at?: string
          hos_id?: string | null
          icu_io_id?: string | null
          icu_visit_id?: string
          is_done?: boolean
          main_vet?: string
          patient_id?: string | null
          place?: string
          preparation?: string
          target_date?: string
          time?: string
          visit_etc?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_visit_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_visit_icu_io_id_fkey"
            columns: ["icu_io_id"]
            isOneToOne: false
            referencedRelation: "icu_io"
            referencedColumns: ["icu_io_id"]
          },
          {
            foreignKeyName: "icu_visit_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      keywords: {
        Row: {
          keyword: string | null
          keyword_id: number
          main_keyword: string | null
          search_keyword: string | null
          tags: string | null
        }
        Insert: {
          keyword?: string | null
          keyword_id?: number
          main_keyword?: string | null
          search_keyword?: string | null
          tags?: string | null
        }
        Update: {
          keyword?: string | null
          keyword_id?: number
          main_keyword?: string | null
          search_keyword?: string | null
          tags?: string | null
        }
        Relationships: []
      }
      keywords_old: {
        Row: {
          keyword: string | null
          keyword_id: number
          main_keyword: string | null
          search_keyword: string | null
          tags: string | null
        }
        Insert: {
          keyword?: string | null
          keyword_id?: number
          main_keyword?: string | null
          search_keyword?: string | null
          tags?: string | null
        }
        Update: {
          keyword?: string | null
          keyword_id?: number
          main_keyword?: string | null
          search_keyword?: string | null
          tags?: string | null
        }
        Relationships: []
      }
      memos: {
        Row: {
          created_at: string
          done_date: string | null
          done_ids: string[] | null
          from_date: string | null
          has_images: boolean | null
          hos_id: string
          is_done: boolean | null
          memo_color: string | null
          memo_content: string
          memo_id: number
          memo_images: string[] | null
          memo_title: string | null
          patient_id: string | null
          target_date: string | null
          target_group: string[] | null
          target_ids: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          done_date?: string | null
          done_ids?: string[] | null
          from_date?: string | null
          has_images?: boolean | null
          hos_id: string
          is_done?: boolean | null
          memo_color?: string | null
          memo_content: string
          memo_id?: number
          memo_images?: string[] | null
          memo_title?: string | null
          patient_id?: string | null
          target_date?: string | null
          target_group?: string[] | null
          target_ids?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          done_date?: string | null
          done_ids?: string[] | null
          from_date?: string | null
          has_images?: boolean | null
          hos_id?: string
          is_done?: boolean | null
          memo_color?: string | null
          memo_content?: string
          memo_id?: number
          memo_images?: string[] | null
          memo_title?: string | null
          patient_id?: string | null
          target_date?: string | null
          target_group?: string[] | null
          target_ids?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memos_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "memos_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "memos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          avatar_url: string
          category: string
          content: string | null
          created_at: string
          hos_id: string
          message_id: string
          position: string
          user_id: string
          user_name: string
        }
        Insert: {
          avatar_url?: string
          category?: string
          content?: string | null
          created_at?: string
          hos_id?: string
          message_id?: string
          position?: string
          user_id?: string
          user_name?: string
        }
        Update: {
          avatar_url?: string
          category?: string
          content?: string | null
          created_at?: string
          hos_id?: string
          message_id?: string
          position?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "chat_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notices: {
        Row: {
          created_at: string
          hos_id: string | null
          id: string
          notice_color: string | null
          notice_order: number
          notice_text: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          hos_id?: string | null
          id?: string
          notice_color?: string | null
          notice_order: number
          notice_text?: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          hos_id?: string | null
          id?: string
          notice_color?: string | null
          notice_order?: number
          notice_text?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hos_notice_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "notices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      owners: {
        Row: {
          created_at: string
          hos_id: string
          hos_owner_id: string
          owner_address: string | null
          owner_id: string
          owner_level: Database["public"]["Enums"]["owner_level_enum"]
          owner_memo: string | null
          owner_name: string
          owner_phone_number: string | null
        }
        Insert: {
          created_at?: string
          hos_id: string
          hos_owner_id: string
          owner_address?: string | null
          owner_id?: string
          owner_level?: Database["public"]["Enums"]["owner_level_enum"]
          owner_memo?: string | null
          owner_name?: string
          owner_phone_number?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string
          hos_owner_id?: string
          owner_address?: string | null
          owner_id?: string
          owner_level?: Database["public"]["Enums"]["owner_level_enum"]
          owner_memo?: string | null
          owner_name?: string
          owner_phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owners_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      patients: {
        Row: {
          birth: string
          breed: string
          created_at: string
          gender: string
          hos_id: string
          hos_owner_id: string | null
          hos_patient_id: string
          is_alive: boolean
          memo: string | null
          microchip_no: string | null
          name: string
          owner_id: string | null
          owner_name: string | null
          patient_id: string
          species: string
        }
        Insert: {
          birth: string
          breed?: string
          created_at?: string
          gender: string
          hos_id: string
          hos_owner_id?: string | null
          hos_patient_id?: string
          is_alive?: boolean
          memo?: string | null
          microchip_no?: string | null
          name?: string
          owner_id?: string | null
          owner_name?: string | null
          patient_id?: string
          species: string
        }
        Update: {
          birth?: string
          breed?: string
          created_at?: string
          gender?: string
          hos_id?: string
          hos_owner_id?: string | null
          hos_patient_id?: string
          is_alive?: boolean
          memo?: string | null
          microchip_no?: string | null
          name?: string
          owner_id?: string | null
          owner_name?: string | null
          patient_id?: string
          species?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "patients_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["owner_id"]
          },
        ]
      }
      raw_drugs: {
        Row: {
          created_at: string
          raw_drug_description: string | null
          raw_drug_id: string
          raw_drug_indication: string | null
          raw_drug_name: string
          raw_drug_side_effect: string | null
          raw_drug_tags: string | null
        }
        Insert: {
          created_at?: string
          raw_drug_description?: string | null
          raw_drug_id?: string
          raw_drug_indication?: string | null
          raw_drug_name: string
          raw_drug_side_effect?: string | null
          raw_drug_tags?: string | null
        }
        Update: {
          created_at?: string
          raw_drug_description?: string | null
          raw_drug_id?: string
          raw_drug_indication?: string | null
          raw_drug_name?: string
          raw_drug_side_effect?: string | null
          raw_drug_tags?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          hos_id: string
          id: string
          is_done: boolean
          target_date: string
          target_user: string | null
          todo_title: string
        }
        Insert: {
          created_at?: string
          hos_id: string
          id?: string
          is_done?: boolean
          target_date: string
          target_user?: string | null
          todo_title?: string
        }
        Update: {
          created_at?: string
          hos_id?: string
          id?: string
          is_done?: boolean
          target_date?: string
          target_user?: string | null
          todo_title?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      user_approvals: {
        Row: {
          created_at: string
          hos_id: string | null
          is_approved: boolean
          updated_at: string | null
          user_approval_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          hos_id?: string | null
          is_approved?: boolean
          updated_at?: string | null
          user_approval_id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string | null
          is_approved?: boolean
          updated_at?: string | null
          user_approval_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_approval_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "user_approval_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          group: string[] | null
          hos_id: string | null
          is_active: boolean | null
          is_admin: boolean
          is_super: boolean
          is_vet: boolean
          name: string
          position: string
          rank: number
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          group?: string[] | null
          hos_id?: string | null
          is_active?: boolean | null
          is_admin?: boolean
          is_super?: boolean
          is_vet?: boolean
          name: string
          position?: string
          rank?: number
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          group?: string[] | null
          hos_id?: string | null
          is_active?: boolean | null
          is_admin?: boolean
          is_super?: boolean
          is_vet?: boolean
          name?: string
          position?: string
          rank?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      vetool_errors: {
        Row: {
          created_at: string
          description: string
          error_json: Json
          is_server: boolean
          user_id: string
          vetool_error_id: string
        }
        Insert: {
          created_at?: string
          description: string
          error_json: Json
          is_server: boolean
          user_id?: string
          vetool_error_id?: string
        }
        Update: {
          created_at?: string
          description?: string
          error_json?: Json
          is_server?: boolean
          user_id?: string
          vetool_error_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vetool_errors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vetool_feedbacks: {
        Row: {
          created_at: string
          feedback_category: string
          feedback_description: string
          feedback_id: string
          is_read: boolean
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_category: string
          feedback_description: string
          feedback_id?: string
          is_read?: boolean
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_category?: string
          feedback_description?: string
          feedback_id?: string
          is_read?: boolean
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vetool_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vitals: {
        Row: {
          blood_pressure: string | null
          body_weight: string | null
          created_at: string
          heart_rate: string | null
          patient_id: string | null
          respiratory_rate: string | null
          temperature: string | null
          vital_id: number
        }
        Insert: {
          blood_pressure?: string | null
          body_weight?: string | null
          created_at?: string
          heart_rate?: string | null
          patient_id?: string | null
          respiratory_rate?: string | null
          temperature?: string | null
          vital_id?: number
        }
        Update: {
          blood_pressure?: string | null
          body_weight?: string | null
          created_at?: string
          heart_rate?: string | null
          patient_id?: string | null
          respiratory_rate?: string | null
          temperature?: string | null
          vital_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "vitals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      checklist_sidebar_data: {
        Args: { _due_date: string; _hos_id: string }
        Returns: Json
      }
      copy_prev_orders: {
        Args: { new_chart_id_input: string; prev_chart_id_input: string }
        Returns: undefined
      }
      copy_selected_orders: {
        Args: {
          new_chart_id_input: string
          orderer_name_input: string
          selected_chart_id_input: string
        }
        Returns: undefined
      }
      copy_template_orders: {
        Args: { new_chart_id_input: string; prev_chart_id_input: string }
        Returns: undefined
      }
      create_template_orders: {
        Args: {
          hos_id_input: string
          is_time_included_input: boolean
          template_comment_input: string
          template_name_input: string
          template_orders_input: Json
        }
        Returns: undefined
      }
      fetch_checklist_sidebar_data: {
        Args: { due_date_input: string; hos_id_input: string }
        Returns: Json
      }
      fetch_checklist_with_patient_with_weight: {
        Args: { checklist_id_input: string }
        Returns: Json
      }
      fetch_icu_layout_data: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      fetch_icu_summary_data: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      fetch_icu_tx_table_data: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_chartable_vitals_data: {
        Args: { icu_io_id_input: string }
        Returns: Json
      }
      get_default_chart_data: {
        Args: { hos_id_input: string }
        Returns: Json
      }
      get_hos_list_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_icu_analysis_data: {
        Args: {
          end_date_input: string
          hos_id_input: string
          start_date_input: string
          target_date_input: string
        }
        Returns: Json
      }
      get_icu_bookmarked_data: {
        Args: { hos_id_input: string }
        Returns: Json
      }
      get_icu_chart_data: {
        Args: {
          hos_id_input: string
          patient_id_input: string
          target_date_input: string
        }
        Returns: Json
      }
      get_icu_out_due_patients: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_icu_sidebar_data: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_icu_summary_data: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_icu_tx_table_data: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_icu_visit_patients: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_icu_visitable_patients: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_not_out_due_patients: {
        Args: { hos_id_input: string; target_date_input: string }
        Returns: Json
      }
      get_patient_data_with_vitals: {
        Args: { patient_id_input: string }
        Returns: Json
      }
      get_pinned_diet_data: {
        Args: { hos_id_input: string; species_input: string }
        Returns: Json
      }
      get_template_chart_data: {
        Args: { icu_chart_id_input: string }
        Returns: Json
      }
      insert_calc_result_order: {
        Args: {
          hos_id_input: string
          order_comment_input: string
          order_name_input: string
          order_type_input: string
          patient_id_input: string
          target_date_input: string
        }
        Returns: undefined
      }
      insert_entire_hospital_diet_pin: {
        Args: { hos_id_input: string }
        Returns: undefined
      }
      paste_default_icu_chart: {
        Args: { hos_id_input: string; icu_chart_id_input: string }
        Returns: undefined
      }
      register_icu: {
        Args: {
          age_in_days_input: number
          group_list_input: Json
          hos_id_input: string
          icu_io_cc_input: string
          icu_io_dx_input: string
          in_date_input: string
          main_vet_input: string
          out_due_date_input: string
          patient_id_input: string
          sub_vet_input: string
        }
        Returns: undefined
      }
      register_new_patient_in_icu: {
        Args: {
          age_in_days_input: number
          hos_id_input: string
          in_date_input: string
          patient_id_input: string
        }
        Returns: undefined
      }
      register_patient: {
        Args: {
          birth_input: string
          body_weight_input: string
          breed_input: string
          gender_input: string
          hos_id_input: string
          hos_owner_id_input: string
          hos_patient_id_input: string
          memo_input: string
          microchip_no_input: string
          name_input: string
          owner_name_input: string
          species_input: string
        }
        Returns: string
      }
      search_patients: {
        Args: {
          hos_id_input: string
          is_icu_input?: boolean
          items_per_page_input?: number
          page_number_input?: number
          search_term_input: string
        }
        Returns: Json
      }
      toggle_io_patient_out: {
        Args: {
          age_in_days_input: number
          gender_input: string
          icu_io_id_input: string
          is_alive_input: boolean
          is_patient_out_input: boolean
          keywords_input: string
          owner_name_input: string
          patient_breed_input: string
          patient_id_input: string
          patient_name_input: string
          patient_species_input: string
        }
        Returns: undefined
      }
      update_icu_chart_table_weight_and_insert_vitals_table: {
        Args: {
          icu_chart_order_id_input: string
          weight_input: string
          weight_measured_date_input: string
        }
        Returns: undefined
      }
      update_patient_from_checklist: {
        Args: {
          birth_input: string
          breed_input: string
          gender_input: string
          hos_owner_id_input: string
          hos_patient_id_input: string
          is_weight_changed_input: boolean
          memo_input: string
          microchip_no_input: string
          name_input: string
          owner_name_input: string
          patient_id_input: string
          species_input: string
          weight_input: string
        }
        Returns: undefined
      }
      update_patient_from_icu_route: {
        Args: {
          birth_input: string
          breed_input: string
          gender_input: string
          hos_owner_id_input: string
          hos_patient_id_input: string
          icu_chart_id_input: string
          is_weight_changed_input: boolean
          memo_input: string
          microchip_no_input: string
          name_input: string
          owner_name_input: string
          patient_id_input: string
          species_input: string
          weight_input: string
          weight_measured_date_input: string
        }
        Returns: undefined
      }
      update_patient_from_patient_route: {
        Args: {
          birth_input: string
          breed_input: string
          gender_input: string
          hos_owner_id_input: string
          hos_patient_id_input: string
          is_weight_changed_input: boolean
          memo_input: string
          microchip_no_input: string
          name_input: string
          owner_name_input: string
          patient_id_input: string
          species_input: string
          weight_input: string
        }
        Returns: undefined
      }
      update_template_chart: {
        Args: {
          hos_id_input: string
          icu_chart_id_input: string
          template_comment_input: string
          template_id_input: string
          template_name_input: string
          template_orders_input: Json
        }
        Returns: undefined
      }
      update_user_approval_and_user_hos_id_when_approved: {
        Args: { hos_id_input: string; user_id_input: string }
        Returns: undefined
      }
      update_user_info_when_create_new_hospital: {
        Args: {
          business_number_input: string
          city_input: string
          district_input: string
          hos_name_input: string
          is_vet_input: boolean
          user_name_input: string
        }
        Returns: string
      }
      update_user_info_when_sending_approval: {
        Args: {
          hos_id_input: string
          is_vet_input: boolean
          name_input: string
        }
        Returns: undefined
      }
    }
    Enums: {
      owner_level_enum: "S" | "A" | "B" | "C"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      owner_level_enum: ["S", "A", "B", "C"],
    },
  },
} as const
