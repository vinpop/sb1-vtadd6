export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string;
          recipient_name: string;
          message: string;
          image?: string;
          image_position?: 'top' | 'bottom';
          background_color: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
    };
  };
}