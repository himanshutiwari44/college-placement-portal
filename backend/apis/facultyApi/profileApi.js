import express from 'express';
const router = express.Router();


router.get('/profile/:email', async (req, res) => {
  try {
    const { email }  = req.params;
    const result = await req.db.query(
      'SELECT email, name, department, contact FROM teachers WHERE email = $1',
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


router.put('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, department, contact } = req.body;

    const result = await req.db.query(
      `UPDATE teachers 
       SET name = COALESCE($1, name), 
           department = COALESCE($2, department),
           contact = COALESCE($3, contact)
       WHERE email = $4 RETURNING email, name, department, contact`,
      [name, department, contact, email]
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
