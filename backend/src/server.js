import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { router } from './routes/notesRoutes.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const PORT = process.env.PORT;

const app = express();

// middleware
// initial
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
// logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// mount router
app.use('/api/notes', router);

async function startServer() {
  try {
    //    connect to db
    await connectDB();
    //    start listening to port
    app.listen(PORT, () => {
      console.log('Listening to port', PORT);
    });
  } catch (error) {
    console.error('Error starting server.', error);
    process.exit(1);
  }
}

startServer();
