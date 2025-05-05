import type { Metadata } from 'next';
import { ClientLayout } from '@/components/ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'MCP Web Client',
  description: 'A web client for managing MCP servers and tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}