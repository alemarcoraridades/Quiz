// Função para retornar o base URL atual considerando a variável do Vite
export const getBaseUrl = (): string => {
  return `${window.location.origin}${import.meta.env.BASE_URL}`;
};

// Função para gerar a URL de compartilhamento do quiz
export const getQuizShareUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}#/quiz/${quizId}`;
};

// Função para gerar a URL de visualização (preview) do quiz
export const getQuizPreviewUrl = (quizId: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}#/quiz/${quizId}/preview`;
};

