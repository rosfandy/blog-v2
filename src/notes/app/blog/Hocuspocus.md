---
tags:
  - backend
date: 2026-04-13
description: Hocuspocus is a collaboration server built on Yjs for real-time editor sync, awareness, and persistence.
duration: "5"
status: published
thumbnail:
category: documentation
---
# Getting Started
---
Hocuspocus is a real-time collaboration backend built on top of [Yjs](https://github.com/yjs/yjs). It provides production-friendly server tools so you can focus on editor features instead of low-level sync logic.

It is commonly used for collaborative editors where multiple users can edit the same document at the same time with conflict-free updates.

# Why Hocuspocus
---
- Real-time collaboration powered by CRDT (via Yjs)
- Built-in hooks for authentication and authorization
- Lifecycle events for auditing, analytics, and business logic
- Easy integration with modern editors (Tiptap, ProseMirror, etc.)
- Persistence support to store and restore document state

# Core Concept
---
Hocuspocus manages document updates on the server and broadcasts changes to connected clients. Every client keeps a Yjs document in sync, so edits merge safely without manual conflict resolution.

# Typical Server Responsibilities
---
1. Verify users before connection
2. Authorize access to a document (read/write)
3. Persist document updates to your database or storage
4. Handle presence/awareness data (cursor, user identity, selection)
5. Log connection and update events for debugging/monitoring

# Minimal Integration Flow
---
1. Client opens a document and connects to Hocuspocus via WebSocket
2. Server authenticates the request
3. Client receives current document state
4. User edits generate Yjs updates
5. Server broadcasts updates to other connected users
6. Server persists state periodically or on disconnect

# Notes for Production
---
- Use access control per document ID
- Add rate limiting and connection limits
- Store periodic snapshots for faster restore
- Track metrics for active documents and connection count
- Enable structured logs for connection and update events

# Example: Basic Hocuspocus Server
---
Install dependencies:

```bash
npm install @hocuspocus/server yjs
```

Create `server.ts`:

```ts
import { Server } from '@hocuspocus/server'

const server = Server.configure({
  port: 1234,

  onAuthenticate({ token }) {
    if (token !== 'dev-token') {
      throw new Error('Unauthorized')
    }
  },

  onConnect({ documentName }) {
    console.log(`Client connected to ${documentName}`)
  },

  onDisconnect({ documentName }) {
    console.log(`Client disconnected from ${documentName}`)
  },

  onChange({ documentName }) {
    console.log(`Document changed: ${documentName}`)
  },
})

server.listen()
console.log('Hocuspocus running on ws://localhost:1234')
```

# Example: Tiptap Client Connection
---
Install dependencies:

```bash
npm install @tiptap/react @tiptap/starter-kit @hocuspocus/provider yjs
```

Create `Editor.tsx`:

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'

const doc = new Y.Doc()

const provider = new HocuspocusProvider({
  url: 'ws://localhost:1234',
  name: 'my-document-id',
  document: doc,
  token: 'dev-token',
})

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello collaborative world</p>',
    onCreate: () => {
      console.log('Editor ready')
    },
  })

  if (!editor) return null

  return <EditorContent editor={editor} />
}
```

This example shows the connection setup only. For full collaborative editing in Tiptap, add the `Collaboration` extension and bind it to the same `Y.Doc`.

# References
---
- Hocuspocus: [https://hocuspocus.dev](https://hocuspocus.dev)
- Yjs: [https://github.com/yjs/yjs](https://github.com/yjs/yjs)
- Demo Editor: [https://colab-io.vercel.app/editor](https://colab-io.vercel.app/editor)
