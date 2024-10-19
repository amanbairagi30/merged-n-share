'use client';
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { frameWorksData } from '@/data/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, LucideExternalLink, ScanEye, TriangleAlert } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
// Importing different styles for syntax highlighting
import {
  solarizedLight,
  atomOneDark,
  vs2015,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'widget-web-component': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        theme: string | undefined;
        username: string | undefined;
      };
    }
  }
}

export default function Embed() {
  const [selectedTab, setSelectedTab] = useState<'html' | 'reactjs' | 'nextjs'>(
    'html',
  );
  const [userData, setUserData] = useState<any>([]);
  const session = useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.data?.user;
  const username = user?.username;

  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
    const processedData = await data.json();
    const userInfo = processedData.user[0];

    setUserData(userInfo);
  };

  useEffect(() => {
    getData();
  }, []);

  const getCodeString = (): string => {
    const htmlCodeString = `
  <body>
    <widget-web-component theme="light" username="${username}" ></widget-web-component>
    <script src="https://custom-web-widget.vercel.app/widget.umd.js"></script>
  </body>
    `;

    const nextjsCodeString = `
  import Script from "next/script";

  <body>
    <Script async src="https://custom-web-widget.vercel.app/widget.umd.js"></Script>
  </body>
    `;

    const reactjsCodeString = `
  <body>
    <widget-web-component theme="light" username="${username}" />
    <script async src="https://custom-web-widget.vercel.app/widget.umd.js"></script>
  </body>
    `;

    return selectedTab === 'html'
      ? htmlCodeString
      : selectedTab === 'reactjs'
        ? reactjsCodeString
        : nextjsCodeString;
  };

  return (
    <section>
      {userData?.pullRequests?.length === 0 && (
        <div className="mb-4 rounded-xl border-2 border-red-500 bg-red-500/10 p-4">
          <div className="flex flex-col items-start gap-2 md:flex-row">
            <TriangleAlert className="mr-2 h-6 w-6 text-red-500" />
            <div>
              <p className="font-semibold text-red-500">
                No Pull Requests Found
              </p>
              <p className="text-sm">
                It seems you don&apos;t have any pull requests saved in the
                <Badge className="mx-1 bg-accent font-secondary text-foreground hover:bg-accent">
                  Merged<span className="text-primary">&</span>Share
                </Badge>
                database. To get started, go to the
                <Badge
                  onClick={() => window.open('/work/my-pr', '_blank')}
                  className="mx-1 cursor-pointer bg-accent font-secondary text-foreground hover:bg-accent"
                >
                  My PRs <LucideExternalLink className="ml-2 h-4 w-4" />
                </Badge>
                section, select your organizations, and save your merged PRs.
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="mb-4 text-xl font-bold md:mb-2">
        Embed your PRs to your own website
      </h1>
      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Now you can embed your merged PRs saved in Merged&Share in your{' '}
        <span className="font-semibold text-primary">own website</span> (be it a
        portfolio website or any other website)
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-xl bg-gradient-to-b from-primary/10 to-accent/40 p-4 shadow-md dark:shadow-none md:flex-row">
        <Info className="mb-4 h-6 w-6 text-primary" />
        <div>
          <h3>
            We support multiple frameworks where you can embed your PRs, which
            are listed below
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {frameWorksData.map((tool, index) => (
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

      <div className="flexc my-8 flex-col gap-2">
        <h1 className="text-xl font-bold">Usage</h1>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Copy and paste the code in your website.
        </p>
      </div>

      <div className="mb-4 rounded-xl border-2 border-primary bg-primary/10 p-4">
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
          <ScanEye className="mr-2 h-6 w-6 text-primary" />
          <div className="flex w-full items-center justify-between">
            <p className="font-semibold text-primary">Preview the Code</p>
            <div className="text-sm">
              <Sheet>
                <SheetTrigger>
                  <div className="rounded-lg border-2 bg-primary px-4 py-2 font-semibold text-black">
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
                    <widget-web-component theme={theme} username={username} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div>
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
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: '1.5',
                fontSize: '1rem',
                borderRadius: '20px',
                backgroundColor: '#202020',
                padding: '20px',
              }}
            >
              {getCodeString()}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="reactjs">
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: '1.5',
                fontSize: '1rem',
                borderRadius: '20px',
                backgroundColor: '#202020',
                padding: '20px',
              }}
            >
              {getCodeString()}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent
            className="flex flex-col gap-6 rounded-2xl"
            value="nextjs"
          >
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: '1.5',
                fontSize: '1rem',
                borderRadius: '20px',
                backgroundColor: '#202020',
                padding: '20px',
              }}
            >
              {getCodeString()}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: '1.5',
                fontSize: '1rem',
                borderRadius: '20px',
                backgroundColor: '#202020',
                padding: '20px',
              }}
            >
              {`
  {/* use the widget component in any file like this */}

   declare global {
    namespace JSX {
      interface IntrinsicElements {
        "widget-web-component": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          theme: string;
          username: string;
        };
      }
    }
  }

  const YourComponent = () =>{
    return(
    <>
      <widget-web-component theme="light" username="${username}" />
    </>
    );
  }
              `}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
