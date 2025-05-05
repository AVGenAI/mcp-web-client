# MCP Web Client

A web client for managing MCP (Multimodal Conversational Protocol) servers and tools. This application allows you to configure, monitor, and manage multiple MCP servers and their associated tools from a single interface.

## Features

- 🌐 Manage multiple MCP servers in one place
- 🛠️ Configure and organize MCP tools (GitHub, Playwright, etc.)
- 🔄 Enable/disable tools as needed
- 💾 Persistent storage of your configuration
- 📱 Responsive design that works on desktop and mobile

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AVGenAI/mcp-web-client.git
cd mcp-web-client
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Adding a Server

1. Navigate to the "Servers" page
2. Click "Add New Server"
3. Fill in the server details:
   - Name: A friendly name for the server
   - URL: The server's endpoint URL
   - Description: (Optional) Additional information about the server
4. Click "Add Server"

### Adding Tools to a Server

1. Navigate to a server's detail page
2. Click "Add Tool"
3. Fill in the tool details:
   - Name: A name for the tool
   - Type: The type of tool (GitHub, Playwright, etc.)
   - Configuration: Tool-specific configuration settings
4. Click "Add Tool"

### Managing Tools

- Toggle tools on/off using the enable/disable button
- Delete tools you no longer need
- View tool configuration details

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard/home page (client component)
│   ├── layout.tsx         # Root layout (server component)
│   └── servers/           # Server management pages
│       ├── page.tsx       # Server list page (client component)
│       ├── add/           # Add server page (client component)
│       └── [id]/          # Server detail page (client component)
├── components/            # Reusable components
│   ├── Sidebar.tsx        # Navigation sidebar (client component)
│   └── ClientLayout.tsx   # Layout wrapper for client components
├── store/                 # State management
│   └── mcpStore.ts        # Zustand store for MCP data
└── types/                 # TypeScript type definitions
    └── mcp.ts             # MCP type definitions
```

## Client vs Server Components

This project follows Next.js App Router patterns:

- Server Components: Used for static parts and metadata (default in App Router)
- Client Components: Used for interactive elements and state management (marked with "use client" directive)

Components that use hooks, event handlers, or browser APIs must be client components. We've structured the app with:

- A server component root layout that includes metadata
- A client component wrapper (`ClientLayout`) that includes interactive elements
- Client components for all pages that need to access state

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with App Router
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Zustand](https://github.com/pmndrs/zustand) - State management
- CSS Modules - Component-scoped styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.