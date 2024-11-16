import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          lineHeight: '1.5',
          fontSize: '1rem',
          borderRadius: '20px',
          backgroundColor: '#202020',
          padding: '20px',
        }}
      >
        {code}
      </SyntaxHighlighter>
      <Button
        className="absolute right-2 top-2"
        size="sm"
        variant="secondary"
        onClick={handleCopy}
        aria-label={isCopied ? 'Copied' : 'Copy code to clipboard'}
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
