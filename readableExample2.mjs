const stdin = process.stdin
  .on('data', (chunk) => console.log('Recebi seu texto: ', chunk.toString()))