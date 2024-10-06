// this file is new server for backend
import express from 'express'; //importing for express Js 
import cors from 'cors';//

const app = express(); // instance of express
const PORT = 5000; // setting port

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// importing all routes
import SignupTste from './router/RouterSugnup.js';
import PayRollRoute from './router/RouterPayRoll.js';
app.use('/Sugnup', SignupTste);
app.use('/PayRoll', PayRollRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // listening on the port

