"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { FeatureCard } from "@/components/feature-card";
import { MessageGrid } from "@/components/message-grid";
import { useMessageStore } from "@/lib/store";

export default function Home() {
  const { fetchMessages } = useMessageStore();

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-indie text-5xl sm:text-6xl md:text-7xl">
            Write a letter for your Special Bias, and tell them your love..
          </h1>
          <div className="flex justify-center gap-4">
            <FeatureCard
              title="Share Your Message"
              description="Choose a song and write a heartfelt message to someone special"
              buttonText="Write your Letter"
              href="/submit"
            />
            <FeatureCard
              title="Browse Messages"
              description="Find messages that were written for you. Search by your name to discover heartfelt dedications"
              buttonText="See all"
              href="/browse"
            />
          </div>
        </div>

        <MessageGrid variant="home" showRecent />
      </div>
    </main>
  );
}