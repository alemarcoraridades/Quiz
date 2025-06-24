import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import * as githubApi from './scripts/github-api.js';

// __dirname hack for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await githubApi.getQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error('Failed to fetch quizzes', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get single quiz
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await githubApi.getQuizById(req.params.id, req.query.shareId);
    res.json(quiz);
  } catch (error) {
    console.error('Quiz not found', error);
    res.status(404).json({ error: 'Quiz not found' });
  }
});

// Create/update quiz
app.post('/api/quizzes', async (req, res) => {
  try {
    const result = await githubApi.saveQuiz(req.body);
    res.json(result);
  } catch (error) {
    console.error('Failed to save quiz', error);
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

// Delete quiz
app.delete('/api/quizzes/:id', async (req, res) => {
  try {
    await githubApi.deleteQuiz(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to delete quiz', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

// PUT quiz

app.put('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = { ...req.body, id: req.params.id };
    const result = await githubApi.saveQuiz(quiz);
    res.json(result);
  } catch (error) {
    console.error('Failed to update quiz', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});


// Serve static files from Vite build (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all: serve index.html for all non-API routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

