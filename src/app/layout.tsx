"use client";

import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';

// This metadata can't be used in a client component, so it should be moved to a separate server component
// or can be removed if not essential
// export const metadata: Metadata = {
//   title: 'MCP Web Client',
//   description: 'A web client for managing MCP servers and tools',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}