module.exports = {
  apps: [
    {
      name: "cairl-basic-server",
      script: "./dist/server.js", // Path to the compiled server file
      instances: 1, // Or 'max' to scale across all available CPUs
      autorestart: true,
      watch: false, // Watching should be disabled in production
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
        PORT: "5757",
        MONGO_URI:
          "mongodb+srv://cairl-admin:cairl9145@cairlcluster.cgb42cz.mongodb.net/?retryWrites=true&w=majority&appName=CAiRLCluster",
        EMAIL_FROM: "CAiRL Newsletters <info@cairl.org>",
        EMAIL_SERVICE: "gmail",
        EMAIL_HOST: "smtp.gmail.com",
        EMAIL_PORT: 587,
        EMAIL_SECURE: false,
        EMAIL_USER: "cvstechsolutions@gmail.com",
        EMAIL_PASSWORD: "klvr lvdj aiez hnuw",
      },
    },
  ],
};
