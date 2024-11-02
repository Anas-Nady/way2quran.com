require("dotenv").config({ path: ".env.local" });

module.exports = {
  apps: [
    {
      name: "backend-server",
      script: "./backend/server.js",
      instances: 3,
      exec_mode: "cluster",
      env: {
        PORT: process.env.PORT,
        REDIS_PORT: process.env.REDIS_PORT,
        NODE_ENV: process.env.NODE_ENV,
        MONGODB_URL: process.env.MONGODB_URL,

        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,

        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_EMAIL: process.env.SMTP_EMAIL,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,

        CLIENT_URL: process.env.CLIENT_URL,
        BUCKET_NAME: process.env.BUCKET_NAME,
      },
    },
    {
      name: "next-client",
      cwd: "./client",
      script: "npm",
      args: "start",
      instances: 1,
      env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
    },
  ],
};
