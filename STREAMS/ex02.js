import http from "http"
import {createReadStream} from "fs"
http.createServer((req, res)=>{
    createReadStream("criptocurrenci.json").pipe(res)
}).listen(3333, ()=> console.log("server on"))