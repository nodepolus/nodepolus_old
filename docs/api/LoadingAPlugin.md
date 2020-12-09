# Loading a plugin
1. Put the file of the plugin you're trying to load in the bin directory
2. In bin/polus.ts add
```typescript
import PluginName from 'PathToPlugin'

server.load(new PluginName())
```
Add that right below
```typescript
const server = new Server({
  port: 22023,
});
```