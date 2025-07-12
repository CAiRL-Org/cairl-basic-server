import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { swaggerAuth } from '../middleware/swaggerAuth';

const apiFiles = process.env.NODE_ENV === 'production' 
  ? ['./dist/routes/*.js'] 
  : ['./src/routes/*.ts'];

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
  apis: apiFiles,
};

export const setupSwagger = (app: Express) => {
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs));
};
