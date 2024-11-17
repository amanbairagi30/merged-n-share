import React from 'react';
import { ScanEye } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface PreviewWidgetProps {
  theme: string | undefined;
  username: string | undefined;
}

export function PreviewWidget({ theme, username }: PreviewWidgetProps) {
  return (
    <div className="mb-4 rounded-xl border-2 border-primary bg-primary/10 p-4">
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
        <ScanEye className="mr-2 h-6 w-6 text-primary" />
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold text-primary">Preview the Code</p>
          <div className="text-sm">
            <Sheet>
              <SheetTrigger>
                <div className="rounded-lg bg-primary px-4 py-2 font-semibold text-black">
                  See Preview
                </div>
              </SheetTrigger>
              <SheetContent className="max-h-screen overflow-y-auto">
                <SheetHeader className="mt-8">
                  <SheetTitle>
                    You are currently previewing the PR widget
                  </SheetTitle>
                  <SheetDescription>
                    Below shows that how your PR widget will look like when it
                    is on your own website
                  </SheetDescription>
                </SheetHeader>
                <div>
                  <widget-web-component
                    card-view="list"
                    theme={theme}
                    username={username}
                    top-visible="true"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
