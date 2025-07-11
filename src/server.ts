import app from "./app";
import { connectDB } from "./config/mongodb";
import logger from "./utils/logger";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
