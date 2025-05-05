// MCP Server and Tool types

export interface MCPServer {
  id: string;
  name: string;
  url: string;
  description?: string;
  isActive: boolean;
  tools: MCPTool[];
  createdAt: string;
  lastConnected?: string;
}

export interface MCPTool {
  id: string;
  name: string;
  description?: string;
  type: ToolType;
  // Configuration parameters specific to this tool
  config: Record<string, any>;
  isEnabled: boolean;
  serverId: string; // Reference to the parent server
}

export enum ToolType {
  GitHub = 'github',
  Playwright = 'playwright',
  Database = 'database',
  FileSystem = 'filesystem',
  API = 'api',
  Custom = 'custom'
}

// Form interfaces for adding/editing
export interface ServerFormData {
  name: string;
  url: string;
  description?: string;
}

export interface ToolFormData {
  name: string;
  description?: string;
  type: ToolType;
  config: Record<string, any>;
}