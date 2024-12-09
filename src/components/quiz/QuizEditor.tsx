import React, { useState } from 'react';
import { Plus, Settings, Palette, Save, Eye } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '../ui/Button';
import { Quiz, Question } from '@/types/quiz';
import { generateId } from '@/lib/utils';
import { QuestionEditor } from './QuestionEditor';
import { QuizSettings } from './settings/QuizSettings';
import { ThemeSettings } from './settings/ThemeSettings';
import { QuizPreview } from './QuizPreview';

interface QuizEditorProps {
  quiz?: Quiz;
  onSave: (quiz: Quiz) => void;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ quiz, onSave }) => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(
    quiz || {
      id: generateId(),
      title: '',
      description: '',
      questions: [],
      theme: {
        primaryColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter',
      },
      settings: {
        showProgressBar: true,
        allowSkip: false,
        shuffleQuestions: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [showSettings, setShowSettings] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addQuestion = () => {
    const newQuestion: Question = {
      id: generateId(),
      type: 'multiple-choice',
      title: '',
      options: [''],
      required: true,
    };

    setCurrentQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const handleQuestionChange = (questionId: string, updatedQuestion: Question) => {
    setCurrentQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? updatedQuestion : q
      ),
    }));
  };

  const handleQuestionDelete = (questionId: string) => {
    setCurrentQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleSettingsChange = (settings: Quiz['settings']) => {
    setCurrentQuiz((prev) => ({ ...prev, settings }));
  };

  const handleThemeChange = (theme: Quiz['theme']) => {
    setCurrentQuiz((prev) => ({ ...prev, theme }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCurrentQuiz((quiz) => {
        const oldIndex = quiz.questions.findIndex((q) => q.id === active.id);
        const newIndex = quiz.questions.findIndex((q) => q.id === over.id);

        return {
          ...quiz,
          questions: arrayMove(quiz.questions, oldIndex, newIndex),
        };
      });
    }
  };

  const validateQuiz = () => {
    const newErrors: string[] = [];

    if (!currentQuiz.title.trim()) {
      newErrors.push('Quiz title is required');
    }

    if (currentQuiz.questions.length === 0) {
      newErrors.push('Add at least one question');
    }

    currentQuiz.questions.forEach((question, index) => {
      if (!question.title.trim()) {
        newErrors.push(`Question ${index + 1} requires a title`);
      }
      if (
        question.type === 'multiple-choice' &&
        (!question.options || question.options.some((opt) => !opt.trim()))
      ) {
        newErrors.push(
          `Question ${index + 1} requires all options to be filled`
        );
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (validateQuiz()) {
      onSave({
        ...currentQuiz,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {currentQuiz.title || 'New Quiz'}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Quiz
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-1">
              <p className="text-sm text-red-700">Please fix the following:</p>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <input
          type="text"
          placeholder="Quiz Title"
          className="text-3xl font-bold w-full border-none focus:outline-none focus:ring-0"
          value={currentQuiz.title}
          onChange={(e) =>
            setCurrentQuiz((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          placeholder="Quiz Description"
          className="mt-4 w-full border-none focus:outline-none focus:ring-0 text-gray-600"
          value={currentQuiz.description}
          onChange={(e) =>
            setCurrentQuiz((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={currentQuiz.questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {currentQuiz.questions.map((question, index) => (
              <QuestionEditor
                key={question.id}
                question={question}
                index={index}
                onChange={(updatedQuestion) =>
                  handleQuestionChange(question.id, updatedQuestion)
                }
                onDelete={() => handleQuestionDelete(question.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex items-center gap-4">
        <Button onClick={addQuestion} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Question
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => setShowSettings(true)}
        >
          <Settings className="w-4 h-4" />
          Quiz Settings
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => setShowTheme(true)}
        >
          <Palette className="w-4 h-4" />
          Theme Settings
        </Button>
      </div>

      {showSettings && (
        <QuizSettings
          settings={currentQuiz.settings}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showTheme && (
        <ThemeSettings
          theme={currentQuiz.theme}
          onChange={handleThemeChange}
          onClose={() => setShowTheme(false)}
        />
      )}

      {showPreview && (
        <QuizPreview
          quiz={currentQuiz}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};