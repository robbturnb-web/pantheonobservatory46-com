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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      audio_tracks: {
        Row: {
          created_at: string
          duration_seconds: number
          error_message: string | null
          generated_at: string | null
          id: string
          label: string
          playlist: string
          prompt: string
          public_url: string | null
          status: string
          track_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_seconds?: number
          error_message?: string | null
          generated_at?: string | null
          id?: string
          label: string
          playlist: string
          prompt: string
          public_url?: string | null
          status?: string
          track_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          error_message?: string | null
          generated_at?: string | null
          id?: string
          label?: string
          playlist?: string
          prompt?: string
          public_url?: string | null
          status?: string
          track_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_testimonies: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          body: string
          category: string
          created_at: string
          flow_drive_url: string | null
          id: string
          media_url: string | null
          pinned: boolean
          status: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          body: string
          category?: string
          created_at?: string
          flow_drive_url?: string | null
          id?: string
          media_url?: string | null
          pinned?: boolean
          status?: string
          tags?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          body?: string
          category?: string
          created_at?: string
          flow_drive_url?: string | null
          id?: string
          media_url?: string | null
          pinned?: boolean
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_cosmos_pulse: {
        Row: {
          generated_at: string
          id: string
          source_title: string | null
          source_url: string | null
          summary_date: string
          summary_md: string
        }
        Insert: {
          generated_at?: string
          id?: string
          source_title?: string | null
          source_url?: string | null
          summary_date: string
          summary_md: string
        }
        Update: {
          generated_at?: string
          id?: string
          source_title?: string | null
          source_url?: string | null
          summary_date?: string
          summary_md?: string
        }
        Relationships: []
      }
      echo_usage: {
        Row: {
          created_at: string
          id: string
          message_count: number
          updated_at: string
          usage_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_count?: number
          updated_at?: string
          usage_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_count?: number
          updated_at?: string
          usage_date?: string
          user_id?: string
        }
        Relationships: []
      }
      echo_xp: {
        Row: {
          created_at: string
          id: string
          last_daily_at: string | null
          pages_visited: Json
          rank: string
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string
          id?: string
          last_daily_at?: string | null
          pages_visited?: Json
          rank?: string
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string
          id?: string
          last_daily_at?: string | null
          pages_visited?: Json
          rank?: string
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      echo_xp_events: {
        Row: {
          created_at: string
          event_id: string
          event_type: string
          id: string
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string
          event_id: string
          event_type: string
          id?: string
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string
          event_id?: string
          event_type?: string
          id?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      echoverse_channels: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      echoverse_messages: {
        Row: {
          channel_id: string
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          channel_id: string
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "echoverse_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "echoverse_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      glyph_submissions: {
        Row: {
          ai_interpretation: string | null
          created_at: string
          culture_tags: string[]
          drawn_svg: string | null
          id: string
          image_url: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_interpretation?: string | null
          created_at?: string
          culture_tags?: string[]
          drawn_svg?: string | null
          id?: string
          image_url?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_interpretation?: string | null
          created_at?: string
          culture_tags?: string[]
          drawn_svg?: string | null
          id?: string
          image_url?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      observer_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      observer_field_notes: {
        Row: {
          conviction: string | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          note: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          conviction?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          note?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          conviction?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          note?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      observer_files: {
        Row: {
          bio: string | null
          clearance: string
          codename: string
          joined_at: string
          public_profile: boolean
          slug: string | null
          starseed_archetype: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          clearance?: string
          codename: string
          joined_at?: string
          public_profile?: boolean
          slug?: string | null
          starseed_archetype?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          clearance?: string
          codename?: string
          joined_at?: string
          public_profile?: boolean
          slug?: string | null
          starseed_archetype?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      orb_sightings: {
        Row: {
          created_at: string
          description: string
          email: string | null
          id: string
          location: string
          sighting_date: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          email?: string | null
          id?: string
          location: string
          sighting_date: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          email?: string | null
          id?: string
          location?: string
          sighting_date?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          username?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          id: string
          price_id: string
          product_id: string
          status: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          price_id: string
          product_id: string
          status?: string
          stripe_customer_id: string
          stripe_subscription_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          id?: string
          price_id?: string
          product_id?: string
          status?: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      orb_sightings_public: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          location: string | null
          sighting_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          location?: string | null
          sighting_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          location?: string | null
          sighting_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      public_glyphs: {
        Row: {
          created_at: string | null
          culture_tags: string[] | null
          id: string | null
          image_url: string | null
        }
        Insert: {
          created_at?: string | null
          culture_tags?: string[] | null
          id?: string | null
          image_url?: string | null
        }
        Update: {
          created_at?: string | null
          culture_tags?: string[] | null
          id?: string | null
          image_url?: string | null
        }
        Relationships: []
      }
      public_observer_xp: {
        Row: {
          rank: string | null
          updated_at: string | null
          user_id: string | null
          xp: number | null
        }
        Relationships: []
      }
      public_testimonies: {
        Row: {
          body: string | null
          created_at: string | null
          id: string | null
          media_url: string | null
          title: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: string | null
          media_url?: string | null
          title?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: string | null
          media_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      award_xp: {
        Args: { p_amount: number; p_event_id: string; p_event_type: string }
        Returns: Json
      }
      compute_clearance: { Args: { _xp: number }; Returns: string }
      compute_rank: { Args: { _xp: number }; Returns: string }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_active_subscription: {
        Args: { check_env?: string; user_uuid: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_echo_usage: {
        Args: { _env?: string; _limit?: number; _user_id: string }
        Returns: Json
      }
      is_premium: { Args: { _env?: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      track_page_visit: { Args: { _page: string }; Returns: undefined }
      unlock_achievement: { Args: { _achievement_id: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
