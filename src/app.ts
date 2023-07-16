import express from 'express';
import authRoutes from './app/routes/authRoutes';
import userRoutes from './app/routes/userRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

export default app;