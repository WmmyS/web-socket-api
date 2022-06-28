import express from 'express';
import 'reflect-metadata';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerSpecification } from './tools/swagger/swagger.specification';
import router from './router/routes';

export class Application {
  private app = (express.application = express());
  private port = process.env.PORT || 3000;
  private swaggerSpecification = new SwaggerSpecification();
  private specs = swaggerJSDoc(this.swaggerSpecification.options);

  constructor() {
    this.config();
    this.start();
  }

  config() {
    this.app.use(router);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.specs, { explorer: true }));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server started in http://localhost:${this.port}`);
    });
  }
}

new Application();
