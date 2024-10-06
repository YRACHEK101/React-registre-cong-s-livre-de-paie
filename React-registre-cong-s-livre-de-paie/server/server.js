const express = require('express');
const jwt = require('jsonwebtoken');// Token Authentication
const cors = require('cors');
const  SignupRoute = require('./router/signup'); // Importing the routes for Signup
const connection = require('./Connection_DB'); // Import the MySQL connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// API route to fetch all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users', details: err });
    }
    res.json(results);
  });
});

// API route to fetch all payroll records
app.get('/api/payroll', (req, res) => {
  connection.query('SELECT * FROM payroll', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch payroll records', details: err });
    }
    res.json(results);
  });
});

// API route to fetch all registered leaves
app.get('/api/registredescongespayes', (req, res) => {
  connection.query('SELECT * FROM registredescongespayes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch leave records', details: err });
    }
    res.json(results);
  });
});

// API route for user singup 
//app.use('/',SignupRoute);
// API route for user login
app.post('/api/login', (req, res) => {
  const { cin, password } = req.body;

  // Fetch the user from the database
  const query = 'SELECT * FROM users WHERE cin = ?';
  connection.query(query, [cin], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve user', details: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ error: 'Password comparison failed', details: err });
      }

      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ cin: user.cin }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// API endpoint to handle form submissions
app.post('/api/livre-de-paie', (req, res) => {
  const formData = req.body;

  const query = `
      INSERT INTO LivreDePaie (
          bulletinNumber, period, fullName, employment, birthDate, entryDate, 
          cnssNumber, familySituation, deductions, hN, hs1, hs2, hs3, total, 
          workDays, workHours, grossBaseSalary, bonuses, seniority, taxableBenefits, 
          grossSalary, toDeduct, maxRetirement, taxableSalary, cnssDeduction, 
          amoDeduction, tax, Total, netSalary, nonTaxableBonuses, adva, advances, 
          dirhamsBenefits, netPaidDirhams
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
      formData.bulletinNumber, formData.period, formData.fullName, formData.employment, 
      formData.birthDate, formData.entryDate, formData.cnssNumber, formData.familySituation, 
      formData.deductions, formData.hN, formData.hs1, formData.hs2, formData.hs3, formData.total, 
      formData.workDays, formData.workHours, formData.grossBaseSalary, formData.bonuses, 
      formData.seniority, formData.taxableBenefits, formData.grossSalary, formData.toDeduct, 
      formData.maxRetirement, formData.taxableSalary, formData.cnssDeduction, formData.amoDeduction, 
      formData.tax, formData.Total, formData.netSalary, formData.nonTaxableBonuses, 
      formData.adva, formData.advances, formData.dirhamsBenefits, formData.netPaidDirhams
  ];

  connection.query(query, values, (err, results) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Data successfully inserted' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
