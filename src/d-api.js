// grafana-cli plugins install grafana-image-renderer
// sudo systemctl restart grafana-server

const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cron = require('node-cron');

// Grafana Details
const GRAFANA_URL = 'http://localhost:3000/render/d-solo/your_dashboard_uid';
const GRAFANA_API_KEY = 'Bearer YOUR_API_KEY_HERE'; // replace this
const PANEL_ID = 1;

// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your_app_password_or_email_password'
  }
});

// Function to fetch panel image and send email
async function fetchAndSendPanel() {
  try {
    const response = await axios.get(GRAFANA_URL, {
      headers: {
        Authorization: GRAFANA_API_KEY
      },
      params: {
        panelId: PANEL_ID,
        width: 1000,
        height: 500,
        from: 'now-24h',
        to: 'now'
      },
      responseType: 'arraybuffer'
    });

    const imagePath = './panel.png';
    fs.writeFileSync(imagePath, response.data);

    // Email
    const mailOptions = {
      from: 'your.email@gmail.com',
      to: 'recipient1@example.com, recipient2@example.com',
      subject: 'Daily Grafana Report',
      text: 'Attached is the daily Grafana dashboard snapshot.',
      attachments: [
        {
          filename: 'panel.png',
          path: imagePath
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent with Grafana panel.');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Schedule the job to run every day at 8:00 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running scheduled Grafana report...');
  fetchAndSendPanel();
});


// Config
// const GRAFANA_URL = 'http://localhost:3000/render/d/your_dashboard_uid'; // 👈 full dashboard
// const GRAFANA_API_KEY = 'Bearer YOUR_API_KEY'; // replace this