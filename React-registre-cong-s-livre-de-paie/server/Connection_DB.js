import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: '127.0.0.1',     // Database hostname
  port: 3307,            // Database port
  user: 'root',          // MySQL username
  password: 'root',      // MySQL password
  database: 'school',    // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection  
pool.getConnection()
  .then(connection => {
    console.log('Connected to the MySQL database.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

export default pool;