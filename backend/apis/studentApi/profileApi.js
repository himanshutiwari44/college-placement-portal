import express from 'express';
const router = express.Router();

// Get student profile
router.get('/profile/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const result = await req.db.query(
            'SELECT * FROM students WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update student profile
router.put('/profile/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const {
            name, university, rollno, cgpa, contact, branch,
            admission_year, grad_year, semester, linkedin, github, portfolio
        } = req.body;

        const result = await req.db.query(
            `UPDATE students 
             SET name = COALESCE($1, name),
                 university = COALESCE($2, university),
                 rollno = COALESCE($3, rollno),
                 cgpa = COALESCE($4, cgpa),
                 contact = COALESCE($5, contact),
                 branch = COALESCE($6, branch),
                 admission_year = COALESCE($7, admission_year),
                 grad_year = COALESCE($8, grad_year),
                 semester = COALESCE($9, semester),
                 linkedin = COALESCE($10, linkedin),
                 github = COALESCE($11, github),
                 portfolio = COALESCE($12, portfolio)
             WHERE email = $13
             RETURNING *`,
            [name, university, rollno, cgpa, contact, branch,
             admission_year, grad_year, semester, linkedin,
             github, portfolio, email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student profile not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating student profile:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
