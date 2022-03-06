import { pipeline, Readable, Writable } from 'stream';
import { promisify } from 'util';

/* 
o pipeline funciona do mesmo modo que o pipe,
porém ele resolve problemas de vazamento de memória
e possui um método de callback */
/* o promisify permite dar um await na pipeline */
const pipelineAsync = promisify(pipeline);

const readableStream = Readable({
  read: function () {
    this.push("Hello world! 0");
    this.push("Hello world! 1");
    this.push("Hello world! 2");
    this.push(null);
  }
})

const writableStream = Writable({
  write(chunk, enconding, callback) {
    console.log('msg', chunk.toString());
    callback();
  }
})

await pipelineAsync(
  readableStream,
  // process.stdout,
  writableStream,
)
