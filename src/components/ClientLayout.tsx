"use client";

import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}