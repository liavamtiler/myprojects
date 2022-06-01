import express from "express";
import promClient from "prom-client";

const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();

collectDefaultMetrics({ register });

const monitorManager = express();

monitorManager.get("/prometheus", async function (req, res) {
  const metrics = await register.metrics();
  res.set("Content-Type", register.contentType);
  res.end(metrics);
});

export default monitorManager;
