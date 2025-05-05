import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import historyRouter from './routes/HistoryRoutes';
import adminRouter from './routes/AdminRoutes';
import mathRouter from './routes/MathRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/history', historyRouter);
app.use('/api/math', mathRouter);
app.use('/api/users-admin', adminRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
