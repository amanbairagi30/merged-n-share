import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface Framework {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FrameworkListProps {
  frameworks: Framework[];
}

export function FrameworkList({ frameworks }: FrameworkListProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 rounded-xl bg-gradient-to-r from-primary/10 p-4 md:flex-row">
      <Info className="mb-4 h-6 w-6 text-primary" />
      <div>
        <h3>
          We support multiple frameworks where you can embed your PRs, which are
          listed below
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {frameworks.map((tool, index) => (
            <Badge
              key={index}
              className="flex h-10 w-28 items-center justify-between bg-accent text-foreground hover:bg-accent"
            >
              <span className="font-bold">{tool.name}</span>
              <tool.icon className="h-6 w-6" />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
