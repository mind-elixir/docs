# Node Data

```typescript
export type NodeObj = {
  topic: string // Topic content within the node
  id: Uid // Node ID (auto-generated)
  style?: {
    // Node style
    fontSize?: string
    color?: string
    background?: string
    fontWeight?: string
  }
  children?: NodeObj[] // Child nodes
  tags?: string[] // Tags
  icons?: string[] // Icons
  hyperLink?: string // Hyperlink
  expanded?: boolean // Whether it is expanded
  direction?: number // Node direction (only effective for main nodes)
  root?: boolean // Whether it is a root node
  image?: {
    // Add an image to the node; when adding an image, width and height must be provided
    url: string // Image link
    width: number
    height: number
  }
  branchColor?: string // Color of this branch
  parent?: NodeObj // Parent node object of this node (programmatically generated)
  dangerouslySetInnerHTML?: string // Directly insert HTML
}
```