"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface MessageCardProps {
  message?: string;
  recipientName?: string;
  backgroundColor?: string;
  image?: string;
  imagePosition?: 'top' | 'bottom';
  isPreview?: boolean;
  hideRecipient?: boolean;
  variant?: 'default' | 'story';
}

export function MessageCard({ 
  message = '',
  recipientName = '',
  backgroundColor = '#ffffff',
  image,
  imagePosition = 'top',
  isPreview = false,
  hideRecipient = false,
  variant = 'default'
}: MessageCardProps) {
  const displayMessage = isPreview && message.length > 150
    ? `${message.slice(0, 150)}...`
    : message;

  const containerClass = variant === 'story'
    ? 'w-[1080px] h-[1920px] relative overflow-hidden rounded-lg p-6'
    : 'relative h-full overflow-hidden rounded-lg p-6';

  return (
    <div 
      className={containerClass}
      style={{ backgroundColor }}
    >
      <div className="absolute right-4 top-4">
        <Heart className="h-6 w-6 text-red-500" fill="currentColor" />
      </div>

      {!hideRecipient && !isPreview && (
        <Link
          href={`/bias/${encodeURIComponent(recipientName)}`}
          className="mb-4 block font-indie text-2xl hover:opacity-70"
        >
          To: {recipientName}
        </Link>
      )}

      {!hideRecipient && isPreview && (
        <div className="mb-4 font-indie text-2xl">
          To: {recipientName}
        </div>
      )}

      {image && imagePosition === 'top' && (
        <div className="mb-4">
          <Image
            src={image}
            alt=""
            width={1080}
            height={1920}
            className="rounded-lg"
          />
        </div>
      )}

      <p className="whitespace-pre-wrap text-lg">{displayMessage}</p>

      {image && imagePosition === 'bottom' && (
        <div className="mt-4">
          <Image
            src={image}
            alt=""
            width={1080}
            height={1920}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}