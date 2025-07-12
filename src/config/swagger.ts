import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerAuth } from '../middleware/swaggerAuth';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CAiRL API',
      version: '1.0.0',
      description: 'API documentation for the CAiRL application',
    },
    servers: [
      {
        url: '/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs));
};
