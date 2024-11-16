'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { frameWorksData } from '@/data/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, LucideExternalLink, ScanEye, TriangleAlert } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useUserData } from '@/app/hooks/useUserData';
import { AlertBox } from '@/components/alert-box';
import { PreviewWidget } from '@/components/preview-widget';
import { FrameworkList } from '@/components/frameworks-list';
import { CodeBlock } from '@/components/code-block';

export default function Embed() {
  const [selectedTab, setSelectedTab] = React.useState<
    'html' | 'reactjs' | 'nextjs'
  >('html');
  const { theme } = useTheme();
  const { data: session } = useSession();
  const username = session?.user?.username;
  const { userData } = useUserData();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCodeString = (tab: 'html' | 'reactjs' | 'nextjs'): string => {
    const codeStrings = {
      html: `
<body>
  <widget-web-component theme="${theme}" username="${username}"></widget-web-component>
  <script src="https://custom-web-widget.vercel.app/widget.umd.js"></script>
</body>
      `,
      reactjs: `
<body>
  <widget-web-component theme="${theme}" username="${username}" />
  <script async src="https://custom-web-widget.vercel.app/widget.umd.js"></script>
</body>
      `,
      nextjs: `
// STEP-1 : paste this at src/app/layout.tsx

import Script from "next/script";

<body>
  <Script async src="https://custom-web-widget.vercel.app/widget.umd.js"></Script>
</body>
      `,
    };

    return codeStrings[tab];
  };

  if (!mounted) {
    return null; // or a loading placeholder
  }

  return (
    <section>
      {userData?.pullRequests?.length === 0 && (
        <AlertBox
          icon={<TriangleAlert className="mr-2 h-6 w-6 text-red-500" />}
          title="No Pull Requests Found"
          message={
            <>
              It seems you don't have any pull requests saved in the
              <Badge className="mx-1 bg-accent font-secondary text-foreground hover:bg-accent">
                Merged<span className="text-primary">&</span>Share
              </Badge>
              database. To get started, go to the
              <Badge
                onClick={() => window.open('/work/my-pr', '_blank')}
                className="mx-1 cursor-pointer bg-accent font-secondary text-foreground hover:bg-accent"
              >
                My PRs <LucideExternalLink className="ml-2 h-3 w-3" />
              </Badge>
              section, select your organizations, and save your merged PRs.
            </>
          }
        />
      )}

      <h1 className="mb-4 text-xl font-bold md:mb-2">
        Embed your PRs to your own website
      </h1>
      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Now you can embed your merged PRs saved in Merged&Share in your{' '}
        <span className="font-semibold text-primary">own website</span> (be it a
        portfolio website or any other website)
      </div>

      <FrameworkList frameworks={frameWorksData} />

      <div className="flexc my-8 flex-col gap-2">
        <h1 className="text-xl font-bold">Usage</h1>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Copy and paste the code in your website.
        </p>
      </div>

      <PreviewWidget theme={theme} username={username} />

      <Tabs
        defaultValue="html"
        onValueChange={(value) =>
          setSelectedTab(value as 'html' | 'reactjs' | 'nextjs')
        }
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="reactjs">ReactJs</TabsTrigger>
          <TabsTrigger value="nextjs">NextJS</TabsTrigger>
        </TabsList>
        <TabsContent value="html">
          <CodeBlock code={getCodeString('html')} language="jsx" />
        </TabsContent>
        <TabsContent value="reactjs">
          <CodeBlock code={getCodeString('reactjs')} language="jsx" />
        </TabsContent>
        <TabsContent className="flex flex-col gap-6 rounded-2xl" value="nextjs">
          <CodeBlock code={getCodeString('nextjs')} language="jsx" />
          <CodeBlock
            code={`
// STEP-2 : add the types at : src/types/global.d.ts

export interface WidgetWebComponentProps
  extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
  > {
  theme?: string | undefined;
  username?: string | undefined;
  'lg-cols'?: number; // sets columns on large screens (works with grid layout only) .
  'card-view'?: 'list' | 'grid'; // toggles between list and grid view of the PR cards
  'fontVariable'?: string; // You can add your font variable (e.g., --font-primary or any custom variable name) in this prop.
  'md-cols'?: number; // sets columns on medium screens (works with grid layout only) .
  'base-cols'?: number; // sets columns on small screens (works with grid layout only) .
  'top-visible'?: boolean; // toggles the top bar which shows the organisations where you contributed. 
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'widget-web-component': WidgetWebComponentProps;
    }
  }
}
            `}
            language="typescript"
          />
          <CodeBlock
            code={`
// STEP-3 : Now , you can add this widget component in any file

const YourComponent = () => {
  return (
    <>
      <widget-web-component theme="${theme}" username="${username}" />
    </>
  );
}
            `}
            language="jsx"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
