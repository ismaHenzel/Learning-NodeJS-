import request from "request"
import {createWriteStream, createReadStream} from "fs"
// saving data
request("http://api.nomics.com/v1/currencies/ticker?key=d42688cec9a591b5e0a5e14047d0035d").pipe(createWriteStream("criptocurrenci.json"))

// reading data 
let getcriptos = createReadStream("criptocurrenci.json");

getcriptos.on("readable", (val)=>{
    console.log(getcriptos.read().toString())
})

getcriptos.on("end", ()=>{
    console.log("finish")
})

