"use client";

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cuarhogvdvidoaswcngj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YXJob2d2ZHZpZG9hc3djbmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4ODQzNjAsImV4cCI6MjA0NjQ2MDM2MH0.h4Jkb80SLxTnPR1axgsMvejduF5E8NzyjoYBAZL-uSY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);