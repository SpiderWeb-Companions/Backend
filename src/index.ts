import express from 'express';
import { registerControllers } from './server';
import { Logger } from './logging/logger';
import { logRequest, validateAuthMiddleware }  from "./MiddleWare";
import {
  AdoptionController,
  ContactController,
  HelloController,
  SpiderController,
  AuthController
} from './controllers';
const app = express();
app.use(express.json());
app.use(logRequest);
// app.use(validateAuthMiddleware);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `*`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const port = 3000;
// Register controllers here by adding controller class to array
registerControllers(app, [
  HelloController,
  AuthController,
  ContactController,
  AdoptionController,
  SpiderController
]);

app.listen(port, () => {
  Logger.info(`Server is running on http://localhost:${port}`);
});