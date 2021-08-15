
import split from "split";
import { createWriteStream } from "fs"
import request  from "request";

let req = request("https://api.nomics.com/v1/currencies/ticker?key=d42688cec9a591b5e0a5e14047d0035d&convert=USD&interval=1d")
    .pipe(split(JSON.parse).on("data", function(item){
        let filtered_data = createWriteStream("./filtered_cripto_data.json");
        item.map(data=>{
            let formated_data =  `{
                "price": ${data.price},\n
                "logo_url": ${data.logo_url},\n
                "name": ${data.name}\n
            },`
            filtered_data.write(formated_data)
        })
        filtered_data.end();
        return null;
    }).on("error", function(err){
        return err; 
    }))

    console.log(req)
