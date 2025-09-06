const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const booksRouter = require('./routes/books');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/books', booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
