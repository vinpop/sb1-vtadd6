"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { MessageCard } from './message-card';
import { useMessageStore } from '@/lib/store';

interface MessageGridProps {
  variant?: 'home' | 'browse' | 'recipient';
  showRecent?: boolean;
  recipientName?: string;
  biasName?: string;
  searchQuery?: string;
}

export function MessageGrid({ 
  variant = 'browse',
  showRecent,
  recipientName,
  biasName,
  searchQuery = ''
}: MessageGridProps) {
  const { messages, fetchMessages } = useMessageStore();
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  let displayMessages = messages;

  // Filter by search query
  if (searchQuery) {
    displayMessages = messages.filter(
      msg => msg.recipient_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by bias/recipient name
  if (biasName) {
    displayMessages = messages.filter(
      msg => msg.recipient_name.toLowerCase() === biasName.toLowerCase()
    );
  }

  // Show recent messages
  if (showRecent) {
    displayMessages = displayMessages.slice(0, 6);
  }

  const gridClass = variant === 'home' 
    ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
    : 'grid gap-6 md:grid-cols-3 lg:grid-cols-4';

  if (displayMessages.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        {searchQuery 
          ? "No messages found for this search query."
          : biasName 
          ? `No messages found for ${biasName}.`
          : "No messages found."}
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {displayMessages.map((message) => (
        variant === 'home' ? (
          <div key={message.id} className="relative">
            <MessageCard 
              message={message.message}
              recipientName={message.recipient_name}
              backgroundColor={message.background_color}
              image={message.image}
              imagePosition={message.image_position}
              isPreview
            />
          </div>
        ) : (
          <Link 
            key={message.id}
            href={`/message/${message.id}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            <MessageCard 
              message={message.message}
              recipientName={message.recipient_name}
              backgroundColor={message.background_color}
              image={message.image}
              imagePosition={message.image_position}
            />
          </Link>
        )
      ))}
    </div>
  );
}