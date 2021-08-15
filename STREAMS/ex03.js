import { Readable, pipeline , Transform} from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";

const asyncPipeline = promisify(pipeline);

const readableStream = Readable({
    read(){
        for(let i = 0; i < 1e4; i++){
            let person = {name: `RORONOA ZORO ${i}`, age: "21"};
            let encoding = JSON.stringify(person);
            this.push(encoding);
        }
        this.push(null)
    }
})

const writableStream = Transform({
    transform(chunk,enconding, cb){
        let data = JSON.parse(chunk);
        let result = `NAME : ${data.name.toUpperCase()} | AGE : ${data.age}\n`;
        cb(null, result);
    }
})
const header = Transform({
    transform(chunk, enconding, cb){
        this.counter = this.counter ?? 0
        if(this.counter == 0){
            return cb(null, chunk)
        }
        this.counter += 1;
        cb(null, "id,name\n".concat(chunk))
    }
})
await asyncPipeline(
   readableStream,
   writableStream,
   header,
   createWriteStream("my.csv")
)
