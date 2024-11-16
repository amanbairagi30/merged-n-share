import React, { ReactNode } from 'react';

interface AlertBoxProps {
  icon: ReactNode;
  title: string;
  message: ReactNode;
}

export function AlertBox({ icon, title, message }: AlertBoxProps) {
  return (
    <div className="mb-4 rounded-xl border-2 border-red-500 bg-red-500/10 p-4">
      <div className="flex flex-col items-start gap-2 md:flex-row">
        {icon}
        <div>
          <p className="font-semibold text-red-500">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
