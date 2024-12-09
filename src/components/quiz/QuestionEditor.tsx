import React from 'react';
import { Trash2, GripVertical, AlignLeft } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Question } from '@/types/quiz';
import { Button } from '../ui/Button';

interface QuestionEditorProps {
  question: Question;
  index: number;
  onChange: (updatedQuestion: Question) => void;
  onDelete: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  index,
  onChange,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTypeChange = (type: Question['type']) => {
    onChange({
      ...question,
      type,
      options: type === 'multiple-choice' ? [''] : undefined,
    });
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    if (!question.options) return;
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    onChange({ ...question, options: newOptions });
  };

  const addOption = () => {
    if (!question.options) return;
    onChange({ ...question, options: [...question.options, ''] });
  };

  const removeOption = (optionIndex: number) => {
    if (!question.options) return;
    const newOptions = question.options.filter((_, index) => index !== optionIndex);
    onChange({ ...question, options: newOptions });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-500 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center gap-2 text-gray-400 cursor-move"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
          <span className="text-lg font-medium">{index + 1}</span>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-2">
            <input
              type="text"
              placeholder="Question Title"
              className="text-lg font-medium w-full border-none focus:outline-none focus:ring-0"
              value={question.title}
              onChange={(e) => onChange({ ...question, title: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            {(['multiple-choice', 'text', 'rating', 'boolean'] as const).map((type) => (
              <Button
                key={type}
                variant={question.type === type ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleTypeChange(type)}
              >
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Button>
            ))}
          </div>

          <div>
            <textarea
              placeholder="Question Description (optional)"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-600"
              value={question.description || ''}
              onChange={(e) => onChange({ ...question, description: e.target.value })}
              rows={2}
            />
          </div>

          {question.type === 'multiple-choice' && (
            <div className="space-y-2">
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={option}
                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                  />
                  {question.options!.length > 1 && (
                    <button
                      onClick={() => removeOption(optionIndex)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="mt-2"
              >
                Add Option
              </Button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) => onChange({ ...question, required: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Required</span>
            </label>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};