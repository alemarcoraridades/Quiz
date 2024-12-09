import React, { useState } from 'react';
import { X, Calendar, Lock } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { Button } from '../../ui/Button';

interface PublishQuizModalProps {
  quiz: Quiz;
  onPublish: (settings: { expiresAt?: string; accessCode?: string }) => void;
  onClose: () => void;
}

export const PublishQuizModal: React.FC<PublishQuizModalProps> = ({
  quiz,
  onPublish,
  onClose,
}) => {
  const [expiresAt, setExpiresAt] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [useExpiration, setUseExpiration] = useState(false);
  const [useAccessCode, setUseAccessCode] = useState(false);

  const handlePublish = () => {
    onPublish({
      expiresAt: useExpiration ? expiresAt : undefined,
      accessCode: useAccessCode ? accessCode : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Publish Quiz</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <div className="flex">
              <div className="flex-1">
                <p className="text-sm text-blue-700">
                  Publishing "{quiz.title}"
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  This quiz will be available to anyone with the link
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={useExpiration}
                onChange={(e) => setUseExpiration(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Set Expiration Date</span>
                </div>
                {useExpiration && (
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={useAccessCode}
                onChange={(e) => setUseAccessCode(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Require Access Code</span>
                </div>
                {useAccessCode && (
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter access code"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handlePublish}>
            Publish Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};