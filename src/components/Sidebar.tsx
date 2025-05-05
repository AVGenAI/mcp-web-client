import React from 'react';
import Link from 'next/link';
import { useMCPStore } from '@/store/mcpStore';
import { MCPServer } from '@/types/mcp';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { servers, activeServerId, setActiveServer } = useMCPStore();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>MCP Client</h1>
      </div>
      
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/" className={styles.navItem}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/servers" className={styles.navItem}>
              Servers
            </Link>
          </li>
          <li>
            <Link href="/settings" className={styles.navItem}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className={styles.serverList}>
        <div className={styles.serverListHeader}>
          <h3>MCP Servers</h3>
          <Link href="/servers/add" className={styles.addButton}>
            +
          </Link>
        </div>
        
        {servers.length > 0 ? (
          <ul>
            {servers.map((server: MCPServer) => (
              <li 
                key={server.id} 
                className={`${styles.serverItem} ${server.id === activeServerId ? styles.active : ''} ${server.isActive ? styles.online : styles.offline}`}
                onClick={() => setActiveServer(server.id)}
              >
                <span className={styles.serverName}>{server.name}</span>
                <span className={styles.toolCount}>
                  {server.tools.length} tools
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noServers}>
            <p>No servers added yet</p>
            <Link href="/servers/add" className={styles.addFirstButton}>
              Add Your First Server
            </Link>
          </div>
        )}
      </div>
      
      <div className={styles.footer}>
        <p>MCP Web Client v0.1.0</p>
      </div>
    </div>
  );
}