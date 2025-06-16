import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { QuizList } from './components/quiz/QuizList';
import { QuizEditor } from './components/quiz/QuizEditor';
import { QuizViewer } from './components/quiz/QuizViewer';
import { Quiz, PublishSettings } from './types/quiz';
import { fetchQuizzes } from './services/quizApi';

// Separate the main app logic from the router to use hooks
function AppContent() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

// Recupera quizzes da API no carregamento inicial
  useEffect(() => {
    async function loadQuizzes() {
      try {
        const apiQuizzes = await fetchQuizzes();
        console.log("Quizzes carregados da API:", apiQuizzes);
        setQuizzes(apiQuizzes);
      } catch (error) {
        console.error("Erro ao carregar quizzes da API:", error);
      }
    }

    loadQuizzes();
  }, []);

  // Atualiza localStorage toda vez que quizzes mudar
  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    console.log("Quizzes salvos no localStorage:", quizzes);
  }, [quizzes]);

  const navigate = useNavigate();

  const handleCreateNew = () => {
    console.log('Redirecionando para criar novo quiz...');
    navigate('/editor');
  };

  const handleEdit = (quiz: Quiz) => {
    console.log('Redirecionando para editar o quiz com ID:', quiz);
    navigate(`/editor/${quiz.id}`);
  };

  const handleDelete = (quizId: string) => {
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
  };

  const handleSave = (quiz: Quiz) => {
    console.log("Quiz recebido para salvar:", quiz);
    if (quizzes.find(q => q.id === quiz.id)) {
        //Atualiza o quiz existente e mantem seu publishStatus
        setQuizzes((prev) =>
        prev.map((q) => (q.id === quiz.id ? quiz : q))
        );
        console.log("Quiz atualizado:", quiz);
    } else {
      //Adiciona um novo quiz com o publishStatus 'draft' 
      const newQuiz = { ...quiz, publishStatus: 'draft' };
      setQuizzes((prev) => [...prev, newQuiz]);
      console.log("Novo quiz adicionado:", newQuiz);
    }
    // Verifica o estado atualizado de quizzes
    console.log("Estado final de quizzes:", quizzes);

    // Navega para a pagina principal
    navigate('/');
  };

  const handlePublish = (quiz: Quiz, settings: PublishSettings) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quiz.id
          ? {
              ...q,
              publishStatus: 'published',
              publishedAt: new Date().toISOString(),
              expiresAt: settings.expiresAt,
              accessCode: settings.accessCode,
            }
          : q
      )
    );
    navigate('/');
  };

  const handleArchive = (quizId: string) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === quizId
          ? {
              ...q,
              publishStatus: 'archived',
            }
          : q
      )
    );
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Quiz Builder
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <QuizList
                quizzes={quizzes}
                onCreateNew={handleCreateNew}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onArchive={handleArchive}
              />
            } 
          />
          <Route 
            path="/editor/:quizId?" 
            element={
                <QuizEditorWrapper
                quizzes={quizzes}
                onSave={handleSave}
              />
            } 
          />
          <Route 
            path="/quiz/:id/preview" 
            element={<QuizViewer quizzes={quizzes} mode="preview" />} 
          />
          <Route 
            path="/quiz/:id" 
            element={<QuizViewer quizzes={quizzes} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrapper component to provide router context
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Wrapper component for QuizEditor to handle quizId parameter
function QuizEditorWrapper({ quizzes, onSave }: { quizzes: Quiz[]; onSave: (quiz: Quiz) => void }) {
  const { quizId } = useParams(); // Get the quizId from the URL
  const quizToEdit = quizId ? quizzes.find((quiz) => quiz.id === quizId) : undefined;

  return <QuizEditor quiz={quizToEdit} onSave={onSave} />;
}

export default App;
