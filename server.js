const inquirer = require('inquirer');
const express = require('express')
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const connection = require('./db/database');

const app = express();

//api routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found) - catch all
app.use((req, res) => {
    res.status(404).end();
  });

// Start server after DB connection
connection.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });