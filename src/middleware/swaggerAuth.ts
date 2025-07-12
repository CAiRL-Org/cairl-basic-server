
import { Request, Response, NextFunction } from 'express';
import basicAuth from 'express-basic-auth';

export const swaggerAuth = basicAuth({
  users: { [process.env.SWAGGER_USER || 'admin']: process.env.SWAGGER_PASSWORD || 'password' },
  challenge: true,
});
