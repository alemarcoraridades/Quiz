require('dotenv').config();
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'QuizApp/v1.0',
});

const REPO_OWNER = 'alemarcoraridades';
const REPO_NAME = 'Quiz';
const QUIZ_PATH = 'data/quizzes';

// Get all quizzes
async function getQuizzes() {
  try {
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: QUIZ_PATH,
    });

    return Promise.all(data.map(async (file) => {
      const response = await fetch(file.download_url);
      return response.json();
    }));
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
}

// Get single quiz by ID
async function getQuizById(id, shareId = null) {
  try {
    const filename = `${shareId || id}.json`;
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${QUIZ_PATH}/${filename}`,
    });

    const response = await fetch(data.download_url);
    return response.json();
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}

// Create or update quiz
async function saveQuiz(quiz) {
  try {
    const filename = `${quiz.id}.json`;
    const content = Buffer.from(JSON.stringify(quiz, null, 2)).toString('base64');

    // Check if quiz exists
    let sha;
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `${QUIZ_PATH}/${filename}`,
      });
      sha = data.sha;
    } catch (e) {} // File doesn't exist

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${QUIZ_PATH}/${filename}`,
      message: sha ? `Update quiz ${quiz.id}` : `Create quiz ${quiz.id}`,
      content,
      sha,
    });

    return data;
  } catch (error) {
    console.error('Error saving quiz:', error);
    throw error;
  }
}

// Delete quiz
async function deleteQuiz(id) {
  try {
    const filename = `${id}.json`;
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${QUIZ_PATH}/${filename}`,
    });

    await octokit.repos.deleteFile({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${QUIZ_PATH}/${filename}`,
      message: `Delete quiz ${id}`,
      sha: data.sha,
    });

    return true;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
}

module.exports = {
  getQuizzes,
  getQuizById,
  saveQuiz,
  deleteQuiz
};
