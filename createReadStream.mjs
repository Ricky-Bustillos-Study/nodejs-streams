import http from 'http';

import { readFileSync, createReadStream } from 'fs';

// Criar um arquivo super pesado
// node -e "process.stdout.write(crypto.randomBytes(1e8))" > bigFile.txt

http.createServer((req, res) => {

  /* não será possível ler uma String de um arquivo gigante */
  // const file = readFileSync('bigFile.txt').toString();

  /* desse modo, o servidor aceitará, mas o client não conseguirá 
  ler diretamente, terá que fazer um download em um arquivo
  binário e depois transformá-lo em String */
  // const file = readFileSync('bigFile.txt'); 

  // res.write(file);
  // res.end();

  /* ou utilizando createReadStream */

  createReadStream('bigFile.txt')
    .pipe(res);

}).listen(3000, () => console.log('Servidor rodando na porta 3000'));