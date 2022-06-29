import express from 'express';
import 'reflect-metadata';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerSpecification } from './tools/swagger/swagger.specification';
import router from './router/routes';
import http from 'http';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';
import { Server } from 'socket.io';
import event from 'events';

const emiters = new event.EventEmitter();

export class Application {
  private app = (express.application = express());
  private port = process.env.PORT || 3000;
  private swaggerSpecification = new SwaggerSpecification();
  private specs = swaggerJSDoc(this.swaggerSpecification.options);
  public server = http.createServer(this.app);

  constructor() {
    this.config();
    this.socket();
    this.start();
  }

  socket() {
    const io: Server = new Server(this.server, {
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      /* socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      }); */
      console.log('conectado');
      emiters.on('notification', (msg) => {
        io.emit('chat message', msg);
        console.log('teste');
      });
    });
  }

  config() {
    this.app.engine('html', ejs.renderFile);
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.set('views', path.join(__dirname, 'public'));
    this.app.set('view engine', 'html');
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/index.html');
    });
    this.app.use(cors());
    this.app.use(router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.specs, { explorer: true }));
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server started in http://localhost:${this.port}`);
    });
  }
}

export const notification = () => {
  emiters.emit('notification', 'teste');
};
