import express from 'express';
import cors from 'cors';
import { query } from './db.js';

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',  // This should match the URL of your frontend
    credentials: true,  // Allows cookies to be sent with requests
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.get('/tasks', async (req, res) => {
    try {
        const { rows } = await query('SELECT * FROM tasks ORDER BY id ASC');
        res.send(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const { description } = req.body;
        const { rows } = await query('INSERT INTO tasks(description) VALUES($1) RETURNING *', [description]);
        res.status(201).send(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
