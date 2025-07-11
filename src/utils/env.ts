import logger from './logger';

const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_SECURE',
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_FROM',
];

export const checkEnv = () => {
  const missingVars = requiredEnvVars.filter(varName => {
    const value = process.env[varName];
    return !value || value.trim() === '';
  });

  if (missingVars.length > 0) {
    logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  logger.info('All required environment variables are set.');
};
