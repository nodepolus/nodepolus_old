import Server from "../dist/Server"

const server = new Server(22023);

process.stdin.on("data", (b)=>{
    process.exit(1);
})

//server.listen(22023);