export let accountBaseUrl: string = process.env.ACCOUNT_BASE_URL || "http://localhost:3006";
export let elasticBaseUrl: string = process.env.ELASTIC_BASE_URL || "http://localhost:3007";
export let notificationBaseUrl: string = process.env.NOTIFICATION_BASE_URL || "http://localhost:3007";
export let requestBaseUrl: string = process.env.REQUEST_BASE_URL || "http://localhost:3003";
export let reviewBaseUrl: string = process.env.REVIEW_BASE_URL || "http://localhost:3005";
export let serviceBaseUrl: string = process.env.SERVICE_BASE_URL || "http://localhost:3002";

import { app } from "./app";
import connectMongodb from "./db/mongodb/connection"
const start = async () => {
  await connectMongodb();
  const PORT = parseInt(`${process.env.SERVICE_PORT}`) || 3004;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!!!!!!`);
  });
};

start();

