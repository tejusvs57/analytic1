const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const archiver = require('archiver');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'youruser',
  password: 'yourpassword',
  database: 'yourdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

app.post('/export', (req, res) => {
  const { device, event, parameters, fromTime, toTime } = req.body;

  if (!device || !event || !parameters || !fromTime || !toTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const fileName = `export_${Date.now()}.csv`;
  const filePath = path.join(outputDir, fileName);

  const csvStream = fastcsv.format({ headers: true });
  const writeStream = fs.createWriteStream(filePath);
  csvStream.pipe(writeStream);

  const columns = parameters.map(col => `\`${col}\``).join(', ');
  const sql = `
    SELECT ${columns}
    FROM your_table
    WHERE device = ?
      AND event = ?
      AND timestamp BETWEEN ? AND ?
  `;

  const queryStream = pool.query(sql, [device, event, fromTime, toTime]).stream();

  queryStream.on('data', row => {
    csvStream.write(row);
  });

  queryStream.on('end', () => {
    csvStream.end();

    writeStream.on('finish', () => {
      fs.stat(filePath, (err, stats) => {
        if (err) return res.status(500).json({ error: 'File error' });

        if (stats.size > 50 * 1024 * 1024) {
          // Create ZIP if CSV is large
          const zipName = fileName.replace('.csv', '.zip');
          const zipPath = path.join(outputDir, zipName);
          const output = fs.createWriteStream(zipPath);
          const archive = archiver('zip');

          output.on('close', () => {
            res.download(zipPath, zipName, () => {
              fs.unlinkSync(filePath);
              fs.unlinkSync(zipPath);
            });
          });

          archive.pipe(output);
          archive.file(filePath, { name: fileName });
          archive.finalize();
        } else {
          res.download(filePath, fileName, () => {
            fs.unlinkSync(filePath);
          });
        }
      });
    });
  });

  queryStream.on('error', err => {
    console.error(err);
    res.status(500).json({ error: 'Database stream error' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
