import net from 'net';

net.createServer(socket => socket.pipe(process.stdout)).listen(1338, () => console.log('Servidor socket rodando na porta 1338'));

/* vou conectar um Terminal ao socket nativo
tudo que for digitado no process.stdin será enviado para o socket
que por sua ver está escutando na porta 1338 e vai imprimir na tela */
// node -e "process.stdin.pipe(require('net').connect(1338))"