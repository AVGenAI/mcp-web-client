"use client";

import React from 'react';
import Link from 'next/link';
import { useMCPStore } from '@/store/mcpStore';
import { MCPServer } from '@/types/mcp';
import styles from './servers.module.css';

export default function ServersPage() {
  const { servers, deleteServer } = useMCPStore();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this server?')) {
      deleteServer(id);
    }
  };

  return (
    <div className={styles.serversPage}>
      <header className={styles.header}>
        <div>
          <h1>MCP Servers</h1>
          <p>View and manage your MCP servers</p>
        </div>
        <Link href="/servers/add" className="btn btn-primary">
          Add New Server
        </Link>
      </header>

      {servers.length > 0 ? (
        <div className={styles.serverGrid}>
          {servers.map((server: MCPServer) => (
            <div key={server.id} className={styles.serverCard}>
              <div className={styles.serverHeader}>
                <h2>{server.name}</h2>
                <span className={`${styles.status} ${server.isActive ? styles.active : styles.inactive}`}>
                  {server.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className={styles.serverUrl}>{server.url}</div>
              
              {server.description && (
                <p className={styles.serverDescription}>{server.description}</p>
              )}
              
              <div className={styles.serverMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Tools:</span>
                  <span className={styles.metaValue}>{server.tools.length}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Added:</span>
                  <span className={styles.metaValue}>
                    {new Date(server.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className={styles.actions}>
                <Link href={`/servers/${server.id}`} className={styles.viewButton}>
                  View Details
                </Link>
                <Link href={`/servers/${server.id}/edit`} className={styles.editButton}>
                  Edit
                </Link>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDelete(server.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No Servers Added Yet</h2>
          <p>Add your first MCP server to get started</p>
          <Link href="/servers/add" className="btn btn-primary">
            Add Server
          </Link>
        </div>
      )}
    </div>
  );
}