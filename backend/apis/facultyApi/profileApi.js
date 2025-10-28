import express from 'express';
const router = express.Router();

// Get faculty profile
router.get('/:email', async (req, res) => {
  try {
    const email  = req.params;
    const result = await req.db.query(
      'SELECT email, name, department FROM teachers WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update faculty profile
router.put('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, department } = req.body;

    const result = await req.db.query(
      `UPDATE teachers 
       SET name = $1, department = $2
       WHERE email = $3 RETURNING *`,
      [name, department, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
