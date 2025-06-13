const express = require('express');
const cors = require('cors');
const path = require('path');
const githubApi = require('./scripts/github-api');

const app = express();
app.use(cors());
app.use(express.json());

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await githubApi.getQuizzes();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get single quiz
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await githubApi.getQuizById(
      req.params.id,
      req.query.shareId
    );
    res.json(quiz);
  } catch (error) {
    res.status(404).json({ error: 'Quiz not found' });
  }
});

// Create/update quiz
app.post('/api/quizzes', async (req, res) => {
  try {
    const result = await githubApi.saveQuiz(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

// Delete quiz
app.delete('/api/quizzes/:id', async (req, res) => {
  try {
    await githubApi.deleteQuiz(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all to return index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

