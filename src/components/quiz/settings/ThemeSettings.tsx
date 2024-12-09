import React from 'react';
import { X } from 'lucide-react';
import { Quiz } from '@/types/quiz';
import { Button } from '../../ui/Button';

interface ThemeSettingsProps {
  theme: Quiz['theme'];
  onChange: (theme: Quiz['theme']) => void;
  onClose: () => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  theme,
  onChange,
  onClose,
}) => {
  const fontFamilies = ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Theme Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) =>
                onChange({ ...theme, primaryColor: e.target.value })
              }
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={theme.backgroundColor}
              onChange={(e) =>
                onChange({ ...theme, backgroundColor: e.target.value })
              }
              className="h-10 w-full rounded-md border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={theme.fontFamily}
              onChange={(e) =>
                onChange({ ...theme, fontFamily: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Preview</h4>
            <div
              className="p-4 rounded"
              style={{
                backgroundColor: theme.backgroundColor,
                fontFamily: theme.fontFamily,
              }}
            >
              <div
                className="p-2 rounded"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span className="text-white">Sample Question</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={onClose} className="w-full">
            Save Theme
          </Button>
        </div>
      </div>
    </div>
  );
};