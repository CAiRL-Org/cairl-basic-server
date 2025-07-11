import dotenv from 'dotenv';
import { checkEnv } from './utils/env';
import logger from './utils/logger';

const result = dotenv.config();

if (result.error) {
  logger.error('Error loading .env file', result.error);
}

if (result.parsed) {
  logger.info('Loaded environment variables from .env file');
} else {
  logger.warn('.env file not found or is empty');
}

checkEnv();

import app from "./app";
import { connectDB } from "./config/mongodb";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
