import React from 'react';
import { X } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { Button } from '../../ui/Button';

interface QuizSettingsProps {
  settings: Quiz['settings'];
  onChange: (settings: Quiz['settings']) => void;
  onClose: () => void;
}

export const QuizSettings: React.FC<QuizSettingsProps> = ({
  settings,
  onChange,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Quiz Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Show Progress Bar</span>
              <p className="text-sm text-gray-500">Display progress while taking the quiz</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showProgressBar}
              onChange={(e) =>
                onChange({ ...settings, showProgressBar: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Allow Skipping Questions</span>
              <p className="text-sm text-gray-500">Let users skip non-required questions</p>
            </div>
            <input
              type="checkbox"
              checked={settings.allowSkip}
              onChange={(e) =>
                onChange({ ...settings, allowSkip: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Shuffle Questions</span>
              <p className="text-sm text-gray-500">Randomize question order</p>
            </div>
            <input
              type="checkbox"
              checked={settings.shuffleQuestions}
              onChange={(e) =>
                onChange({ ...settings, shuffleQuestions: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Show Question Numbers</span>
              <p className="text-sm text-gray-500">Display question numbers in preview</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showQuestionNumbers}
              onChange={(e) =>
                onChange({ ...settings, showQuestionNumbers: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">Show Description</span>
              <p className="text-sm text-gray-500">Display question descriptions</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showDescription}
              onChange={(e) =>
                onChange({ ...settings, showDescription: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="mt-6">
          <Button onClick={onClose} className="w-full">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};