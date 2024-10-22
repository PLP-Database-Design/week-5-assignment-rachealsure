// Import required modules
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Setup MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching patients' });
    } else {
      res.json(results);
    }
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching providers' });
    } else {
      res.json(results);
    }
  });
});

// Question 3: Filter patients by first name
app.get('/patients/first_name/:name', (req, res) => {
  const { name } = req.params;
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(sql, [name], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching patients by first name' });
    } else {
      res.json(results);
    }
  });
});

// Question 4: Retrieve all providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const { specialty } = req.params;
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(sql, [specialty], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching providers by specialty' });
    } else {
      res.json(results);
    }
  });
});

// Listen to the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
