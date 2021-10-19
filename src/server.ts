import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes';

const app = express();

// Passando o caminho da pasta Public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Passando o caminho das views
app.set('views', path.join(__dirname, '..', 'public'));

// Informando a engine que sera usada "Padrão é ejs"
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Rota de teste
app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
});

// Criando protocolo http
const http = createServer(app);

// Criando protocolo web service
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('Connected', socket.id);
});

// antes das rotas adiconar o comando abaixo para ler json
app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Server is running on port 3333 🚀🚀🚀'));
