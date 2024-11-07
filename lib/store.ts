"use client";

import { create } from 'zustand';
import { supabase } from './supabase';
import { toTitleCase } from './utils';
import { Database } from '@/types/supabase';

export type Message = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];

interface MessageStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  fetchMessages: () => Promise<void>;
  addMessage: (message: MessageInsert) => Promise<Message>;
  getMessageById: (id: string) => Message | undefined;
  getMessagesByRecipient: (name: string) => Message[];
  getSuggestedRecipients: (query: string) => string[];
  cleanupMessages: () => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  
  setMessages: (messages) => set({ messages }),
  
  fetchMessages: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }
    
    set({ messages: data || [] });
  },
  
  addMessage: async (message) => {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        ...message,
        recipient_name: toTitleCase(message.recipient_name)
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error adding message:', error);
      throw error;
    }
    
    const newMessage = data as Message;
    set((state) => ({
      messages: [newMessage, ...state.messages]
    }));
    
    return newMessage;
  },
  
  getMessageById: (id) => {
    return get().messages.find(msg => msg.id === id);
  },
  
  getMessagesByRecipient: (name) => {
    return get().messages.filter(
      msg => msg.recipient_name.toLowerCase() === name.toLowerCase()
    );
  },
  
  getSuggestedRecipients: (query) => {
    if (!query || query.length < 2) return [];
    
    const recipients = new Set(
      get().messages
        .map(msg => msg.recipient_name)
        .filter(name => 
          name.toLowerCase().includes(query.toLowerCase())
        )
    );
    
    return Array.from(recipients).slice(0, 5);
  },

  cleanupMessages: async () => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .in('recipient_name', ['kevin', 'kurang asem', 'jaja miharja', 'flsamfafs']);

    if (error) {
      console.error('Error cleaning up messages:', error);
      return;
    }

    // Refresh messages after cleanup
    get().fetchMessages();
  }
}));