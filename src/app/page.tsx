"use client";

import React from 'react';
import Link from 'next/link';
import { useMCPStore } from '@/store/mcpStore';
import styles from './page.module.css';

export default function Home() {
  const { servers } = useMCPStore();
  
  // Calculate stats
  const totalServers = servers.length;
  const activeServers = servers.filter(server => server.isActive).length;
  const totalTools = servers.reduce((sum, server) => sum + server.tools.length, 0);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>MCP Dashboard</h1>
        <p>Manage your MCP servers and tools in one place</p>
      </header>

      <div className={styles.quickActions}>
        <Link href="/servers/add" className={styles.actionCard}>
          <h3>Add New Server</h3>
          <p>Connect to a new MCP server</p>
        </Link>
        
        <Link href="/servers" className={styles.actionCard}>
          <h3>Manage Servers</h3>
          <p>View and manage your connected servers</p>
        </Link>
        
        <Link href="/settings" className={styles.actionCard}>
          <h3>Settings</h3>
          <p>Configure application settings</p>
        </Link>
      </div>

      <div className={styles.statsSection}>
        <h2>Overview</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Servers</h3>
            <div className={styles.statValue}>{totalServers}</div>
          </div>
          
          <div className={styles.statCard}>
            <h3>Active Servers</h3>
            <div className={styles.statValue}>{activeServers}</div>
          </div>
          
          <div className={styles.statCard}>
            <h3>Total Tools</h3>
            <div className={styles.statValue}>{totalTools}</div>
          </div>
        </div>
      </div>

      <div className={styles.introduction}>
        <h2>Getting Started</h2>
        <p>
          The MCP Web Client allows you to manage Multimodal Conversational Protocol servers and tools.
          You can add servers, configure tools, and monitor their status from a single interface.
        </p>
        
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Add a Server</h3>
              <p>Start by adding an MCP server using the "Add New Server" button.</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Configure Tools</h3>
              <p>Add tools to your server to extend its capabilities.</p>
            </div>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>Monitor and Manage</h3>
              <p>Monitor the status of your servers and tools from the dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}