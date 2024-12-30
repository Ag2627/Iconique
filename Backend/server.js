import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use('/api',router)

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`express app listening at https://localhost:${port}`);
});
