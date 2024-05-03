import express from 'express';
import { registerControllers } from './server';
import { Logger } from './logging/logger';
import { logRequest }  from "./MiddleWare";
import {
  AdoptionController,
  HelloController,
  SpiderController
} from './controllers';
const app = express();
app.use(express.json());
app.use(logRequest);
const port = 3000;
// Register controllers here by adding controller class to array
registerControllers(app, [
  AdoptionController,
  HelloController,
  SpiderController
]);

app.listen(port, () => {
  Logger.info(`Server is running on http://localhost:${port}`);
});