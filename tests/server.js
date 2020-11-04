import Server from "../dist/Server.js"

const server = new Server(22023);

server.on("roomCreated", (code)=>{
    console.log("show me", code);
})