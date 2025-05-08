router.post('/fetch', async (req, res) => {
      const { event, device, parameters, fromTime, toTime } = req.body;
    
      if (!parameters.length || !fromTime || !toTime) {
        return res.status(400).json({ error: 'Missing fields' });
      }
    
      const paramStr = parameters.includes('ALL') ? '*' : parameters.map(p => `\`${p}\``).join(', ');
      let query = `SELECT ${paramStr} FROM logs WHERE timestamp BETWEEN ? AND ?`;
    
      const params = [fromTime, toTime];
    
      if (event !== 'ALL') {
        query += ` AND event_name = ?`;
        params.push(event);
      }
    
      if (device !== 'ALL') {
        query += ` AND device_name = ?`;
        params.push(device);
      }
    
      try {
        const [rows] = await pool.query(query, params);
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    