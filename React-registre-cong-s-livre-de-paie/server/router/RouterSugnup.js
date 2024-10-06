import Express from "express";
import bcrypt from 'bcryptjs';//Importing Hash password
import pool from '../Connection_DB.js';// Importing Connection

const router = Express.Router();
// all users 
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM registredescongespayes');
    res.json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});


router.post('/Signup', async (req, res) => {
  const { prenom, nom, cin, motDePasse } = req.body;
  // Validate input
  if (!prenom || !nom || !cin || !motDePasse) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  // Check if CIN already exists
  const [existingUser] = await pool.query('SELECT * FROM singup WHERE cin = ?', [cin]);

  if (existingUser.length > 0) {
    console.log('Le CIN existe déjà :', cin);
    return res.status(400).json({ error: ('Le CIN existe déjà : ' + cin + ', Veuillez utiliser un autre CIN.') });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(motDePasse, 10);
  //const queryUser = 'INSERT INTO signup (cin,password_hash) VALUES (?, ?)';

  const [result] = await pool.query(
    'insert into singup (prenom, nom, cin, password_hash) VALUES (?, ?, ?, ?)',
    [prenom, nom, cin, hashedPassword]
  )
  res.status(201).json({ message: 'User registered successfully', userId: result.cin });

})

export default router;