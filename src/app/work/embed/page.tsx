"use client";
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { frameWorksData } from '@/data/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, LucideExternalLink, TriangleAlert } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
// Importing different styles for syntax highlighting
import { solarizedLight, atomOneDark, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSession } from 'next-auth/react';

export default function Embed() {
  const [selectedTab, setSelectedTab] = useState<"html" | "reactjs" | "nextjs">('html');
  const [userData, setUserData] = useState<any>([]);
  const session = useSession();
  const user = session?.data?.user;
  // @ts-ignore
  const username = user?.username;

  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
    const processedData = await data.json();
    const userInfo = processedData.user[0];

    setUserData(userInfo)
  }
  console.log(user, "--------------------->")

  useEffect(() => {
    getData();
  }, [])

  const getCodeString = (): string => {
    const htmlCodeString = `
  <body>
    <widget-web-component theme="light" username="${username}" ></widget-web-component>
    <script src="https://custom-web-widget.vercel.app/widget.umd.js"></script>
  </body>
    `;

    const nextjsCodeString = `
    
  import Script from "next/script";
    
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

    return selectedTab === "html" ? htmlCodeString : selectedTab === "reactjs" ? reactjsCodeString : nextjsCodeString;
  };

  return (
    <section>
      {
        userData?.pullRequests?.length === 0 &&
        <div className='border-2 border-red-500 bg-red-500/10 mb-4 rounded-xl p-4'>
          <div className="flex flex-col gap-2 md:flex-row items-start">
            <TriangleAlert className='w-6 h-6 text-red-500 mr-2' />
            <div>
              <p className="font-semibold text-red-500">No Pull Requests Found</p>
              <p className="text-sm">
                It seems you don't have any pull requests saved in the
                <Badge className='font-secondary bg-accent hover:bg-accent text-foreground mx-1'>
                  Merged<span className='text-primary'>&</span>Share
                </Badge>
                database. To get started, go to the
                <Badge
                  onClick={() => window.open("/work/my-pr", "_blank")}
                  className='font-secondary bg-accent hover:bg-accent text-foreground cursor-pointer mx-1'
                >
                  My PRs <LucideExternalLink className='w-4 h-4 ml-2' />
                </Badge>
                section, select your organizations, and save your merged PRs.
              </p>
            </div>
          </div>
        </div>

      }



      <h1 className='text-xl mb-4 md:mb-2'>Embed your PRs to your own website</h1>
      <div className='text-sm font-normal text-gray-500 dark:text-gray-400'>
        Now you can embed your merged PRs saved in Merged&Share in your <span className='text-primary font-semibold'>own website</span> (be it a portfolio website or any other website)
      </div>

      <div className='bg-gradient-to-b flex flex-col gap-4 shadow-md dark:shadow-none md:flex-row from-primary/10 to-accent/40 rounded-xl mt-8 p-4'>
        <Info className='w-6 text-primary h-6 mb-4' />
        <div>
          <h3>We support multiple frameworks where you can embed your PRs, which are listed below</h3>
          <div className='flex flex-wrap gap-2 mt-2'>
            {frameWorksData.map((tool, index) => (
              <Badge key={index} className='bg-accent flex items-center justify-between hover:bg-accent text-foreground h-10 w-28'>
                <span className='font-bold'>{tool.name}</span>
                <tool.icon className='w-6 h-6' />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className='flexc flex-col gap-2 my-8'>
        <h1 className='text-xl font-bold'>Usage</h1>
        <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>Copy and paste the code in your website.</p>
      </div>

      <div>
        <Tabs defaultValue="html" onValueChange={(value) => setSelectedTab(value as "html" | "reactjs" | "nextjs")} className="w-full">
          <TabsList className='mb-4'>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="reactjs">ReactJs</TabsTrigger>
            <TabsTrigger value="nextjs">NextJS</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: "1.5",
                fontSize: "1rem",
                borderRadius: "20px",
                backgroundColor: "#202020",
                padding: "20px",
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
                lineHeight: "1.5",
                fontSize: "1rem",
                borderRadius: "20px",
                backgroundColor: "#202020",
                padding: "20px",
              }}
            >
              {getCodeString()}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent className='rounded-2xl flex flex-col gap-6' value="nextjs">
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: "1.5",
                fontSize: "1rem",
                borderRadius: "20px",
                backgroundColor: "#202020",
                padding: "20px",
              }}
            >
              {getCodeString()}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language="jsx"
              style={atomOneDark}
              customStyle={{
                lineHeight: "1.5",
                fontSize: "1rem",
                borderRadius: "20px",
                backgroundColor: "#202020",
                padding: "20px",
              }}
            >
              {`
  {/* use the widget component in any file like this */}

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
