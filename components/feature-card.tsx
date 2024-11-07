"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
  href?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  buttonText, 
  onClick,
  href 
}: FeatureCardProps) {
  const renderButton = () => {
    if (!buttonText) return null;

    const buttonContent = (
      <Button className="mt-auto">
        {buttonText} →
      </Button>
    );

    if (href) {
      return <Link href={href}>{buttonContent}</Link>;
    }

    return <div onClick={onClick}>{buttonContent}</div>;
  };

  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <h3 className="mb-2 font-indie text-2xl">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      {renderButton()}
    </Card>
  );
}