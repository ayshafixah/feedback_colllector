const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// If server.js is inside a 'backend' folder, point static files to parent folder
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

let feedbacks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.post('/submit-feedback', (req, res) => {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const newFeedback = { name, rating, comment };
    feedbacks.push(newFeedback);

    console.log("New Feedback:", newFeedback);

    res.json({ message: "Feedback submitted successfully!" });
});

app.get('/all-feedbacks', (req, res) => {
    res.json(feedbacks);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});