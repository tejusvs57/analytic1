const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

// Setup MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpassword',
  database: 'yourdb',
  multipleStatements: true
});

// Folder where MySQL will write the CSV
const OUTPUT_DIR = '/tmp'; // This should be writable by MySQL
const PORT = 3000;

app.post('/export', async (req, res) => {
  const { device, event, parameters, fromTime, toTime } = req.body;

  if (!device || !event || !parameters || !fromTime || !toTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const timestamp = Date.now();
  const csvFileName = `export_${timestamp}.csv`;
  const csvPath = path.join(OUTPUT_DIR, csvFileName);
  const zipFileName = csvFileName.replace('.csv', '.zip');
  const zipPath = path.join(OUTPUT_DIR, zipFileName);

  const columns = parameters.map(col => `\`${col}\``).join(', ');
  const exportQuery = `
    SELECT ${columns}
    INTO OUTFILE ?
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    FROM your_table
    WHERE device = ?
      AND event = ?
      AND timestamp BETWEEN ? AND ?;
  `;

  // MySQL INTO OUTFILE must use absolute path with forward slashes
  const outfilePathForMySQL = csvPath.replace(/\\/g, '/');

  connection.query(exportQuery, [
    outfilePathForMySQL,
    device,
    event,
    fromTime,
    toTime
  ], (err) => {
    if (err) {
      console.error('MySQL export error:', err);
      return res.status(500).json({ error: 'CSV export failed' });
    }

    // Zip the file
    exec(`zip -j ${zipPath} ${csvPath}`, (zipErr) => {
      if (zipErr) {
        console.error('Zipping failed:', zipErr);
        return res.status(500).json({ error: 'Zip creation failed' });
      }

      // Send the zip file as download
      res.download(zipPath, zipFileName, (downloadErr) => {
        if (downloadErr) {
          console.error('Download failed:', downloadErr);
        }

        // Cleanup files
        try {
          fs.unlinkSync(csvPath);
          fs.unlinkSync(zipPath);
        } catch (cleanupErr) {
          console.warn('Cleanup warning:', cleanupErr);
        }
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


//SHOW GRANTS FOR 'youruser'@'localhost';
// GRANT FILE ON *.* TO 'youruser'@'localhost';
// FLUSH PRIVILEGES;
//[mysqld]
// max_allowed_packet=1G
// secure_file_priv=/tmp

