import "reflect-metadata";
import express from 'express';
import { 
    HelloController
} from './controllers';
import { registerControllers } from './server';

const app = express();
const port = 3000;
// Register controllers here by adding controller class to array
registerControllers(app, [
  HelloController
]);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});