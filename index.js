require('dotenv').config();
const express = require('express');
const pool = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 5000;
const checkAndSeedDB = require('./db/seed');
const timesheetController = require('./server/controllers/timesheet');

// json parsins and static files
app.use(express.json());
app.use(express.static('build'));

// seed table if doesn't exist
(async function () {
  await checkAndSeedDB(pool);
})();

// Routes
app.get('/api/timesheets', timesheetController.getAllEntries);

app.get('/api/timesheets/:client', timesheetController.getOneEntry);

app.post('/api/timesheets', timesheetController.createEntry);

app.listen(PORT, () => console.log('connected'));
