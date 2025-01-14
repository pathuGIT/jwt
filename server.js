// filepath: /c:/Users/Acer/Downloads/jwt/server.js
import express from 'express';
import dotenv from 'dotenv';
import user from './routers/user.js';
import student from './routers/student.js';
import auth from './middleware/auth.js';

dotenv.config();

const app = express();
const port = 8005;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/user', user);
app.use('/api/student', auth, student);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});