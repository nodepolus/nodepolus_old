import Server from "../dist/Server.js"

const server = new Server();

process.stdin.on("data", (b)=>{
    process.exit(1);
})

server.listen(22023);