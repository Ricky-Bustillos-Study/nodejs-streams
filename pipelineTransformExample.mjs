import { pipeline, Readable, Transform } from 'stream';
import { promisify } from 'util';
import { createWriteStream } from 'fs';

/* 
o pipeline funciona do mesmo modo que o pipe,
porém ele resolve problemas de vazamento de memória
e possui um método de callback */
/* o promisify permite dar um await na pipeline */
const pipelineAsync = promisify(pipeline);

const readableStream = Readable({
  read () {
    for ( let index = 0; index < 1e2; index++ ) {
      const person = { id: Date.now() + index, name: `Ricky-${index}` };
      const payload = JSON.stringify(person);
      this.push(payload);
    }
    this.push(null);
  }
})

const writableMapToCSV = Transform({
  transform(chunk, enconding, callback) {
    const payload = JSON.parse(chunk);
    const result = `${payload.id},${payload.name.toUpperCase()}\n`;
    callback(null, result);
  }
})

const setHeader = Transform({
  transform(chunk, enconding, callback) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return callback(null, chunk);
    }

    this.counter += 1;
    callback(null, "id, name\n".concat(chunk));
  }
})

await pipelineAsync(
  readableStream,
  writableMapToCSV,
  setHeader,
  // process.stdout,
  createWriteStream('my.csv')
)
