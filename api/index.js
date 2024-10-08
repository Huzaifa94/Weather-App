import express from  'express';
import cors from 'cors';
import connectDB from './db/connect.js';

import userRoutes from './routes/users.routes.js'
import protectRoutes from './routes/proetectedRoutes.js'
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
}));


app.use('/auth', userRoutes)
app.use('/auth',protectRoutes)

app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});
