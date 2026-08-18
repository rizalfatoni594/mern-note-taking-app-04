import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { router } from './routes/notesRoutes.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import path from 'path';

const PORT = process.env.PORT;

const app = express();
const __dirname = path.resolve();

// middleware
// initial
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);
// logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// mount router
app.use('/api/notes', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

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
