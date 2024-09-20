const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});