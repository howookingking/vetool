export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      diet_products_rows: {
        Row: {
          active: boolean | null
          company: string | null
          created_at: string
          description: string | null
          diet_products_id: string
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
          diet_products_id?: string
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
          diet_products_id?: string
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
            foreignKeyName: 'diet_products_rows_duplicate_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
        ]
      }
      drug_doses: {
        Row: {
          bw_unit: string | null
          created_at: string
          cri_unit: string | null
          default_dose: string | null
          dose_id: string
          dose_unit: string | null
          drug_id: string | null
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
          dose_id?: string
          dose_unit?: string | null
          drug_id?: string | null
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
          dose_id?: string
          dose_unit?: string | null
          drug_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route?: string[] | null
          species?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'drug_doses_drug_id_fkey'
            columns: ['drug_id']
            isOneToOne: false
            referencedRelation: 'drugs_rows'
            referencedColumns: ['drug_id']
          },
        ]
      }
      drug_products_rows: {
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
            foreignKeyName: 'drug_products_rows_drug_id_fkey'
            columns: ['drug_id']
            isOneToOne: false
            referencedRelation: 'drugs_rows'
            referencedColumns: ['drug_id']
          },
          {
            foreignKeyName: 'drug_products_rows_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
        ]
      }
      drugs_description: {
        Row: {
          created_at: string
          description: string | null
          drug_id: string | null
          drug_name: string | null
          drugs_description_id: string
          hos_id: string | null
          indication: string | null
          side_effect: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_name?: string | null
          drugs_description_id?: string
          hos_id?: string | null
          indication?: string | null
          side_effect?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_name?: string | null
          drugs_description_id?: string
          hos_id?: string | null
          indication?: string | null
          side_effect?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'drugs_description_drug_id_fkey'
            columns: ['drug_id']
            isOneToOne: false
            referencedRelation: 'drugs_rows'
            referencedColumns: ['drug_id']
          },
          {
            foreignKeyName: 'drugs_description_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
        ]
      }
      drugs_rows: {
        Row: {
          created_at: string
          description: string | null
          drug_id: string
          drug_name: string
          drug_tag: string | null
          indication: string | null
          indication_tag: string | null
          side_effect: string | null
          side_effect_tag: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          drug_id?: string
          drug_name: string
          drug_tag?: string | null
          indication?: string | null
          indication_tag?: string | null
          side_effect?: string | null
          side_effect_tag?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          drug_id?: string
          drug_name?: string
          drug_tag?: string | null
          indication?: string | null
          indication_tag?: string | null
          side_effect?: string | null
          side_effect_tag?: string | null
        }
        Relationships: []
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
          is_personal: boolean
          master_user_id: string
          name: string
          order_color: Json | null
          plan: string
        }
        Insert: {
          business_number?: string
          city: string
          created_at?: string
          district: string
          group_list?: string[]
          hos_id?: string
          icu_memo_names?: string[]
          is_personal?: boolean
          master_user_id: string
          name: string
          order_color?: Json | null
          plan?: string
        }
        Update: {
          business_number?: string
          city?: string
          created_at?: string
          district?: string
          group_list?: string[]
          hos_id?: string
          icu_memo_names?: string[]
          is_personal?: boolean
          master_user_id?: string
          name?: string
          order_color?: Json | null
          plan?: string
        }
        Relationships: [
          {
            foreignKeyName: 'hospitals_master_user_id_fkey'
            columns: ['master_user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
        ]
      }
      icu_chart: {
        Row: {
          bookmark_id: string | null
          created_at: string
          hos_id: string
          icu_chart_id: string
          icu_io_id: string
          main_vet: string
          memo_a: string
          memo_b: string
          memo_c: string
          patient_id: string
          sub_vet: string | null
          target_date: string
          weight: string
          weight_measured_date: string | null
        }
        Insert: {
          bookmark_id?: string | null
          created_at?: string
          hos_id: string
          icu_chart_id?: string
          icu_io_id: string
          main_vet: string
          memo_a?: string
          memo_b?: string
          memo_c?: string
          patient_id: string
          sub_vet?: string | null
          target_date: string
          weight?: string
          weight_measured_date?: string | null
        }
        Update: {
          bookmark_id?: string | null
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          icu_io_id?: string
          main_vet?: string
          memo_a?: string
          memo_b?: string
          memo_c?: string
          patient_id?: string
          sub_vet?: string | null
          target_date?: string
          weight?: string
          weight_measured_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'icu_chart_bookmark_id_fkey'
            columns: ['bookmark_id']
            isOneToOne: false
            referencedRelation: 'icu_chart_bookmark'
            referencedColumns: ['bookmark_id']
          },
          {
            foreignKeyName: 'icu_chart_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'icu_chart_icu_io_id_fkey'
            columns: ['icu_io_id']
            isOneToOne: false
            referencedRelation: 'icu_io'
            referencedColumns: ['icu_io_id']
          },
          {
            foreignKeyName: 'icu_chart_main_vet_fkey'
            columns: ['main_vet']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
          {
            foreignKeyName: 'icu_chart_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['patient_id']
          },
          {
            foreignKeyName: 'icu_chart_sub_vet_fkey'
            columns: ['sub_vet']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
        ]
      }
      icu_chart_bookmark: {
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
            foreignKeyName: 'icu_chart_bookmark_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'icu_chart_bookmark_icu_chart_id_fkey'
            columns: ['icu_chart_id']
            isOneToOne: true
            referencedRelation: 'icu_chart'
            referencedColumns: ['icu_chart_id']
          },
        ]
      }
      icu_charts: {
        Row: {
          created_at: string
          hos_id: string
          icu_chart_id: string
          icu_io_id: string
          main_vet: string
          memo_a: string
          memo_b: string
          memo_c: string
          patient_id: string
          sub_vet: string | null
          target_date: string
          weight: string
          weight_measured_date: string | null
        }
        Insert: {
          created_at?: string
          hos_id: string
          icu_chart_id?: string
          icu_io_id: string
          main_vet: string
          memo_a?: string
          memo_b?: string
          memo_c?: string
          patient_id: string
          sub_vet?: string | null
          target_date: string
          weight?: string
          weight_measured_date?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          icu_io_id?: string
          main_vet?: string
          memo_a?: string
          memo_b?: string
          memo_c?: string
          patient_id?: string
          sub_vet?: string | null
          target_date?: string
          weight?: string
          weight_measured_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'icu_chart_order_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_id_fkey'
            columns: ['icu_chart_id']
            isOneToOne: false
            referencedRelation: 'icu_chart'
            referencedColumns: ['icu_chart_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_1_fkey'
            columns: ['icu_chart_order_tx_1']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_10_fkey'
            columns: ['icu_chart_order_tx_10']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_11_fkey'
            columns: ['icu_chart_order_tx_11']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_12_fkey'
            columns: ['icu_chart_order_tx_12']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_13_fkey'
            columns: ['icu_chart_order_tx_13']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_14_fkey'
            columns: ['icu_chart_order_tx_14']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_15_fkey'
            columns: ['icu_chart_order_tx_15']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_16_fkey'
            columns: ['icu_chart_order_tx_16']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_17_fkey'
            columns: ['icu_chart_order_tx_17']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_18_fkey'
            columns: ['icu_chart_order_tx_18']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_19_fkey'
            columns: ['icu_chart_order_tx_19']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_2_fkey'
            columns: ['icu_chart_order_tx_2']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_20_fkey'
            columns: ['icu_chart_order_tx_20']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_21_fkey'
            columns: ['icu_chart_order_tx_21']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_22_fkey'
            columns: ['icu_chart_order_tx_22']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_23_fkey'
            columns: ['icu_chart_order_tx_23']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_24_fkey'
            columns: ['icu_chart_order_tx_24']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_3_fkey'
            columns: ['icu_chart_order_tx_3']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_4_fkey'
            columns: ['icu_chart_order_tx_4']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_5_fkey'
            columns: ['icu_chart_order_tx_5']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_6_fkey'
            columns: ['icu_chart_order_tx_6']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_7_fkey'
            columns: ['icu_chart_order_tx_7']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_8_fkey'
            columns: ['icu_chart_order_tx_8']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_chart_order_tx_9_fkey'
            columns: ['icu_chart_order_tx_9']
            isOneToOne: false
            referencedRelation: 'icu_chart_tx'
            referencedColumns: ['icu_chart_tx_id']
          },
          {
            foreignKeyName: 'icu_chart_order_icu_io_id_fkey'
            columns: ['icu_io_id']
            isOneToOne: false
            referencedRelation: 'icu_io'
            referencedColumns: ['icu_io_id']
          },
        ]
      }
      icu_chart_tx: {
        Row: {
          created_at: string
          hos_id: string
          icu_chart_order_id: string | null
          icu_chart_tx_comment: string | null
          icu_chart_tx_id: string
          icu_chart_tx_images: string[] | null
          icu_chart_tx_log: Json[] | null
          icu_chart_tx_result: string | null
          icu_io_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          hos_id: string
          icu_chart_order_id?: string | null
          icu_chart_tx_comment?: string | null
          icu_chart_tx_id?: string
          icu_chart_tx_images?: string[] | null
          icu_chart_tx_log?: Json[] | null
          icu_chart_tx_result?: string | null
          icu_io_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string
          icu_chart_order_id?: string | null
          icu_chart_tx_comment?: string | null
          icu_chart_tx_id?: string
          icu_chart_tx_images?: string[] | null
          icu_chart_tx_log?: Json[] | null
          icu_chart_tx_result?: string | null
          icu_io_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'icu_chart_tx_icu_chart_order_id_fkey'
            columns: ['icu_chart_order_id']
            isOneToOne: false
            referencedRelation: 'icu_chart_order'
            referencedColumns: ['icu_chart_order_id']
          },
          {
            foreignKeyName: 'icu_chart_tx_icu_io_id_fkey'
            columns: ['icu_io_id']
            isOneToOne: false
            referencedRelation: 'icu_io'
            referencedColumns: ['icu_io_id']
          },
        ]
      }
      icu_default_chart: {
        Row: {
          created_at: string
          default_chart_id: string
          default_chart_order_comment: string
          default_chart_order_name: string
          default_chart_order_type: string
          hos_id: string
        }
        Insert: {
          created_at?: string
          default_chart_id?: string
          default_chart_order_comment: string
          default_chart_order_name: string
          default_chart_order_type: string
          hos_id: string
        }
        Update: {
          created_at?: string
          default_chart_id?: string
          default_chart_order_comment?: string
          default_chart_order_name?: string
          default_chart_order_type?: string
          hos_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'icu_default_chart_temp_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
        ]
      }
      icu_io: {
        Row: {
          age_in_days: number
          cpcr: string
          created_at: string
          group_list: string[]
          hos_id: string | null
          icu_io_cc: string
          icu_io_dx: string
          icu_io_id: string
          icu_io_tags: string | null
          in_date: string
          out_date: string | null
          out_due_date: string
          patient_id: string
        }
        Insert: {
          age_in_days: number
          cpcr?: string
          created_at?: string
          group_list: string[]
          hos_id?: string | null
          icu_io_cc: string
          icu_io_dx: string
          icu_io_id?: string
          icu_io_tags?: string | null
          in_date: string
          out_date?: string | null
          out_due_date: string
          patient_id: string
        }
        Update: {
          age_in_days?: number
          cpcr?: string
          created_at?: string
          group_list?: string[]
          hos_id?: string | null
          icu_io_cc?: string
          icu_io_dx?: string
          icu_io_id?: string
          icu_io_tags?: string | null
          in_date?: string
          out_date?: string | null
          out_due_date?: string
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'icu_io_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'icu_io_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['patient_id']
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
            foreignKeyName: 'icu_notification_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'icu_notification_icu_chart_id_fkey'
            columns: ['icu_chart_id']
            isOneToOne: false
            referencedRelation: 'icu_chart'
            referencedColumns: ['icu_chart_id']
          },
          {
            foreignKeyName: 'icu_notification_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['patient_id']
          },
        ]
      }
      keywords: {
        Row: {
          keyword: string
          keyword_id: number
          main_keyword: string
          search_keyword: string
          tags: string
        }
        Insert: {
          keyword: string
          keyword_id?: number
          main_keyword: string
          search_keyword: string
          tags: string
        }
        Update: {
          keyword?: string
          keyword_id?: number
          main_keyword?: string
          search_keyword?: string
          tags?: string
        }
        Relationships: []
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
            foreignKeyName: 'hos_notice_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'notices_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
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
          owner_level: Database['public']['Enums']['owner_level_enum']
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
          owner_level?: Database['public']['Enums']['owner_level_enum']
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
          owner_level?: Database['public']['Enums']['owner_level_enum']
          owner_memo?: string | null
          owner_name?: string
          owner_phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'owners_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
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
          owner_name: string
          patient_id: string
          species: string
        }
        Insert: {
          birth: string
          breed: string
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
          owner_name?: string
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
          owner_name?: string
          patient_id?: string
          species?: string
        }
        Relationships: [
          {
            foreignKeyName: 'patients_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'patients_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'owners'
            referencedColumns: ['owner_id']
          },
        ]
      }
      todos: {
        Row: {
          created_at: string
          hos_id: string
          id: string
          is_done: boolean
          target_date: string | null
          target_user: string | null
          todo_title: string
        }
        Insert: {
          created_at?: string
          hos_id: string
          id?: string
          is_done?: boolean
          target_date?: string | null
          target_user?: string | null
          todo_title?: string
        }
        Update: {
          created_at?: string
          hos_id?: string
          id?: string
          is_done?: boolean
          target_date?: string | null
          target_user?: string | null
          todo_title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'todos_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
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
            foreignKeyName: 'user_approval_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'user_approval_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
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
          is_vet?: boolean
          name?: string
          position?: string
          rank?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'users_hos_id_fkey'
            columns: ['hos_id']
            isOneToOne: false
            referencedRelation: 'hospitals'
            referencedColumns: ['hos_id']
          },
          {
            foreignKeyName: 'users_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
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
            foreignKeyName: 'vitals_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['patient_id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      copy_prev_chart: {
        Args: {
          target_date_input: string
          patient_id_input: string
        }
        Returns: Json
      }
      copy_prev_chart_orders: {
        Args: {
          prev_chart_id_input: string
          new_chart_id_input: string
          selected_io_id_input: string
        }
        Returns: undefined
      }
      copy_prev_orders: {
        Args: {
          prev_chart_id_input: string
          new_chart_id_input: string
        }
        Returns: undefined
      }
      get_drug_product_details: {
        Args: {
          hos_id_input: string
        }
        Returns: Json
      }
      get_drugs: {
        Args: {
          hos_id_input: string
        }
        Returns: Json
      }
      insert_default_chart_orders: {
        Args: {
          hos_id_input: string
          icu_chart_id_input: string
          icu_io_id_input: string
        }
        Returns: undefined
      }
      insert_patient_when_register: {
        Args: {
          hos_id_input: string
          name_input: string
          hos_patient_id_input: string
          species_input: string
          breed_input: string
          gender_input: string
          microchip_no_input: string
          body_weight_input: string
          owner_name_input: string
          owner_id_input: string
          memo_input: string
          birth_input: string
        }
        Returns: string
      }
      register_icu: {
        Args: {
          hos_id_input: string
          patient_id_input: string
          icu_io_dx_input: string
          icu_io_cc_input: string
          in_date_input: string
          out_due_date_input: string
          main_vet_input: string
          sub_vet_input: string
          group_list_input: Json
          age_in_days_input: number
        }
        Returns: undefined
      }
      register_icu_patient: {
        Args: {
          hos_id_input: string
          patient_id_input: string
          icu_io_dx_input: string
          icu_io_cc_input: string
          in_date_input: string
          out_due_date_input: string
          main_vet_input: string
          sub_vet_input: string
          group_list_input: Json
          age_in_days_input: number
        }
        Returns: undefined
      }
      toggle_out_patient: {
        Args: {
          icu_io_id_input: string
          patient_id_input: string
          is_patient_out_input: boolean
          chart_orders_input: string
          keywords_input: string
        }
        Returns: undefined
      }
      toggle_patient_out: {
        Args: {
          icu_io_id_input: string
          patient_id_input: string
          is_patient_out_input: boolean
          chart_orders_input: string
          keywords_input: string
          patient_breed_input: string
          patient_name_input: string
          patient_species_input: string
          age_in_days_input: number
        }
        Returns: undefined
      }
      update_icu_patient_weight: {
        Args: {
          patient_id_input: string
          icu_chart_id_input: string
          weight_input: string
          weight_measured_date_input: string
        }
        Returns: undefined
      }
      update_user_approval_and_user_hos_id_when_approved: {
        Args: {
          user_id_input: string
          hos_id_input: string
        }
        Returns: undefined
      }
      update_user_info_when_create_new_hospital: {
        Args: {
          hos_name_input: string
          user_name_input: string
          is_vet_input: boolean
          city_input: string
          district_input: string
          business_number_input: string
        }
        Returns: string
      }
      update_user_info_when_sending_approval: {
        Args: {
          name_input: string
          is_vet_input: boolean
          hos_id_input: string
        }
        Returns: undefined
      }
      update_user_info_when_sending_approval1: {
        Args: {
          is_vet_input: boolean
          name_input: string
          hos_id_input: string
        }
        Returns: undefined
      }
      update_weight: {
        Args: {
          patient_id_input: string
          icu_chart_id_input: string
          weight_input: string
          weight_measured_date_input: string
        }
        Returns: undefined
      }
      upsert_icu_bookmark: {
        Args: {
          icu_chart_id_input: string
          bookmark_name_input: string
          bookmark_comment_input: string
          hos_id_input: string
        }
        Returns: undefined
      }
    }
    Enums: {
      owner_level_enum: 'S' | 'A' | 'B' | 'C'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
