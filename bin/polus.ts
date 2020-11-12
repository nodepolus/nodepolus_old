import Server from '../lib/server'

const server = new Server()

process.stdin.on("data", () => {
  process.exit(1)
})

server.listen(22023)
