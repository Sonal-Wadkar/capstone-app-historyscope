const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Allow multiple origins dynamically
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed for this origin'), false);
        }
    },
    credentials: true, // Allow cookies and authentication headers
}));

app.use(express.json()); 
app.use(bodyParser.json());

app.get('/ping', (req, res) => res.send('PONG'));

app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
