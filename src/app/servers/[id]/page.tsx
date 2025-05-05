"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMCPStore } from '@/store/mcpStore';
import { MCPServer, MCPTool, ToolType, ToolFormData } from '@/types/mcp';
import styles from './server-detail.module.css';

type ServerDetailPageProps = {
  params: { id: string };
};

export default function ServerDetailPage({ params }: ServerDetailPageProps) {
  const router = useRouter();
  const serverId = params.id;
  const { servers, deleteServer, addTool, updateTool, deleteTool, toggleToolEnabled } = useMCPStore();
  
  const server = servers.find(s => s.id === serverId);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [newTool, setNewTool] = useState<ToolFormData>({
    name: '',
    description: '',
    type: ToolType.GitHub,
    config: {},
  });
  
  if (!server) {
    return (
      <div className={styles.notFound}>
        <h1>Server Not Found</h1>
        <p>The server you are looking for does not exist or has been deleted.</p>
        <Link href="/servers" className="btn btn-primary">
          Back to Servers
        </Link>
      </div>
    );
  }
  
  const handleDeleteServer = () => {
    if (confirm('Are you sure you want to delete this server? This will also delete all associated tools.')) {
      deleteServer(serverId);
      router.push('/servers');
    }
  };
  
  const handleDeleteTool = (toolId: string) => {
    if (confirm('Are you sure you want to delete this tool?')) {
      deleteTool(serverId, toolId);
    }
  };
  
  const handleToolChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTool(prev => ({ ...prev, [name]: value }));
  };
  
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTool(prev => ({
      ...prev,
      config: { ...prev.config, [name]: value },
    }));
  };
  
  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    addTool(serverId, newTool);
    setNewTool({
      name: '',
      description: '',
      type: ToolType.GitHub,
      config: {},
    });
    setIsAddingTool(false);
  };
  
  const renderToolForm = () => {
    let configFields = null;
    
    // Render different config fields based on tool type
    switch (newTool.type) {
      case ToolType.GitHub:
        configFields = (
          <>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>API Token</label>
              <input
                type="password"
                name="token"
                className={styles.formControl}
                value={newTool.config.token || ''}
                onChange={handleConfigChange}
                placeholder="GitHub API Token"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>GitHub Username</label>
              <input
                type="text"
                name="username"
                className={styles.formControl}
                value={newTool.config.username || ''}
                onChange={handleConfigChange}
                placeholder="GitHub Username"
              />
            </div>
          </>
        );
        break;
      case ToolType.Playwright:
        configFields = (
          <>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Headless Mode</label>
              <select
                name="headless"
                className={styles.formControl}
                value={newTool.config.headless || 'true'}
                onChange={handleConfigChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Browser Type</label>
              <select
                name="browser"
                className={styles.formControl}
                value={newTool.config.browser || 'chromium'}
                onChange={handleConfigChange}
              >
                <option value="chromium">Chromium</option>
                <option value="firefox">Firefox</option>
                <option value="webkit">WebKit</option>
              </select>
            </div>
          </>
        );
        break;
      // Add cases for other tool types as needed
      default:
        configFields = (
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Configuration JSON</label>
            <textarea
              name="configJson"
              className={styles.formControl}
              value={newTool.config.configJson || '{}'}
              onChange={handleConfigChange}
              placeholder="{\"key\": \"value\"}"
              rows={4}
            />
          </div>
        );
    }
    
    return (
      <div className={styles.addToolForm}>
        <h3>Add New Tool</h3>
        <form onSubmit={handleAddTool}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tool Name</label>
            <input
              type="text"
              name="name"
              className={styles.formControl}
              value={newTool.name}
              onChange={handleToolChange}
              placeholder="Tool Name"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Tool Type</label>
            <select
              name="type"
              className={styles.formControl}
              value={newTool.type}
              onChange={handleToolChange}
              required
            >
              {Object.values(ToolType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              name="description"
              className={styles.formControl}
              value={newTool.description || ''}
              onChange={handleToolChange}
              placeholder="Tool description"
              rows={2}
            />
          </div>
          
          {configFields}
          
          <div className={styles.formActions}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => setIsAddingTool(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Tool
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  return (
    <div className={styles.serverDetailPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/servers">Servers</Link> / {server.name}
          </div>
          <h1>{server.name}</h1>
          <div className={styles.serverMeta}>
            <span className={`${styles.status} ${server.isActive ? styles.active : styles.inactive}`}>
              {server.isActive ? 'Active' : 'Inactive'}
            </span>
            <span className={styles.url}>{server.url}</span>
          </div>
          {server.description && (
            <p className={styles.description}>{server.description}</p>
          )}
        </div>
        
        <div className={styles.headerActions}>
          <Link href={`/servers/${serverId}/edit`} className={styles.editButton}>
            Edit Server
          </Link>
          <button 
            onClick={handleDeleteServer} 
            className={styles.deleteButton}
          >
            Delete Server
          </button>
        </div>
      </div>
      
      <div className={styles.toolsSection}>
        <div className={styles.toolsHeader}>
          <h2>Tools</h2>
          <button 
            onClick={() => setIsAddingTool(true)} 
            className={styles.addButton}
            disabled={isAddingTool}
          >
            Add Tool
          </button>
        </div>
        
        {isAddingTool && renderToolForm()}
        
        {server.tools.length > 0 ? (
          <div className={styles.toolsList}>
            {server.tools.map((tool: MCPTool) => (
              <div key={tool.id} className={styles.toolCard}>
                <div className={styles.toolHeader}>
                  <h3>{tool.name}</h3>
                  <div className={styles.toolActions}>
                    <button
                      className={`${styles.toggleButton} ${tool.isEnabled ? styles.enabled : styles.disabled}`}
                      onClick={() => toggleToolEnabled(serverId, tool.id)}
                      title={tool.isEnabled ? 'Disable Tool' : 'Enable Tool'}
                    >
                      {tool.isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                    <button
                      className={styles.deleteToolButton}
                      onClick={() => handleDeleteTool(tool.id)}
                      title="Delete Tool"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className={styles.toolMeta}>
                  <span className={styles.toolType}>{tool.type}</span>
                  {tool.description && (
                    <p>{tool.description}</p>
                  )}
                </div>
                
                <div className={styles.toolConfig}>
                  <h4>Configuration</h4>
                  <pre>{JSON.stringify(tool.config, null, 2)}</pre>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyTools}>
            <p>No tools have been added to this server yet.</p>
            <button 
              onClick={() => setIsAddingTool(true)} 
              className={styles.addEmptyButton}
            >
              Add Your First Tool
            </button>
          </div>
        )}
      </div>
    </div>
  );
}