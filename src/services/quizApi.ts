// src/services/quizApi.ts
//const API_BASE = import.meta.env.VITE_API_BASE || '/api';
const API_BASE = import.meta.env.VITE_API_BASE || 'https://quiz-production-af1b.up.railway.app/api';



export const fetchQuizzes = async () => {
  const response = await fetch(`${API_BASE}/quizzes`);
  return response.json();
};

export const fetchQuiz = async (id: string, shareId?: string) => {
  const url = shareId 
    ? `${API_BASE}/quizzes/${id}?shareId=${shareId}`
    : `${API_BASE}/quizzes/${id}`;
  const response = await fetch(url);
  return response.json();
};

export const saveQuiz = async (quiz: Quiz) => {
  const response = await fetch(`${API_BASE}/quizzes/${quiz.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quiz)
  });

  if (!response.ok) {
    throw new Error('Falha ao salvar quiz');
  }

  return response.json();
};


export const publishQuiz = async (quiz: Quiz, settings: { expiresAt?: string; accessCode?: string }) => {
  const response = await fetch(`${API_BASE}/quizzes/${quiz.id}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  return response.json();
};
