import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { MCPServer, MCPTool, ServerFormData, ToolFormData } from '@/types/mcp';

interface MCPState {
  servers: MCPServer[];
  activeServerId: string | null;
  
  // Server actions
  addServer: (serverData: ServerFormData) => MCPServer;
  updateServer: (id: string, serverData: Partial<ServerFormData>) => void;
  deleteServer: (id: string) => void;
  setActiveServer: (id: string | null) => void;
  
  // Tool actions
  addTool: (serverId: string, toolData: ToolFormData) => MCPTool;
  updateTool: (serverId: string, toolId: string, toolData: Partial<ToolFormData>) => void;
  deleteTool: (serverId: string, toolId: string) => void;
  toggleToolEnabled: (serverId: string, toolId: string) => void;
}

export const useMCPStore = create<MCPState>(
  persist(
    (set, get) => ({
      servers: [],
      activeServerId: null,
      
      addServer: (serverData: ServerFormData) => {
        const newServer: MCPServer = {
          id: uuidv4(),
          ...serverData,
          isActive: false,
          tools: [],
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          servers: [...state.servers, newServer],
        }));
        
        return newServer;
      },
      
      updateServer: (id: string, serverData: Partial<ServerFormData>) => {
        set((state) => ({
          servers: state.servers.map(server =>
            server.id === id ? { ...server, ...serverData } : server
          ),
        }));
      },
      
      deleteServer: (id: string) => {
        set((state) => ({
          servers: state.servers.filter(server => server.id !== id),
          activeServerId: state.activeServerId === id ? null : state.activeServerId,
        }));
      },
      
      setActiveServer: (id: string | null) => {
        set({ activeServerId: id });
      },
      
      addTool: (serverId: string, toolData: ToolFormData) => {
        const newTool: MCPTool = {
          id: uuidv4(),
          ...toolData,
          isEnabled: true,
          serverId,
        };
        
        set((state) => ({
          servers: state.servers.map(server =>
            server.id === serverId
              ? { ...server, tools: [...server.tools, newTool] }
              : server
          ),
        }));
        
        return newTool;
      },
      
      updateTool: (serverId: string, toolId: string, toolData: Partial<ToolFormData>) => {
        set((state) => ({
          servers: state.servers.map(server =>
            server.id === serverId
              ? {
                  ...server,
                  tools: server.tools.map(tool =>
                    tool.id === toolId ? { ...tool, ...toolData } : tool
                  ),
                }
              : server
          ),
        }));
      },
      
      deleteTool: (serverId: string, toolId: string) => {
        set((state) => ({
          servers: state.servers.map(server =>
            server.id === serverId
              ? {
                  ...server,
                  tools: server.tools.filter(tool => tool.id !== toolId),
                }
              : server
          ),
        }));
      },
      
      toggleToolEnabled: (serverId: string, toolId: string) => {
        set((state) => ({
          servers: state.servers.map(server =>
            server.id === serverId
              ? {
                  ...server,
                  tools: server.tools.map(tool =>
                    tool.id === toolId
                      ? { ...tool, isEnabled: !tool.isEnabled }
                      : tool
                  ),
                }
              : server
          ),
        }));
      },
    }),
    {
      name: 'mcp-storage',
    }
  )
);