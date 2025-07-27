import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

type SaveScreenProps = {
  theme: {
    accent: string;         // e.g., 'bg-green-600 text-white'
    surface: string;        // e.g., 'bg-black'
    surfaceHover: string;   // e.g., 'bg-gray-800'
    border: string;         // e.g., 'border border-green-500'
  };
  onSave: (title: string, description: string) => void;
};

const SaveScreen: React.FC<SaveScreenProps> = ({ theme, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    onSave(title, description);
    handleClose();
  };

  return (
    <div className="flex justify-end mb-6">
      <div className="relative">
        <button
          onClick={handleOpen}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-80 ${theme.accent || 'bg-green-600 text-white'}`}
        >
          <Save className="w-4 h-4" />
          Save Screen
        </button>

        {showModal && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className={`w-[400px] p-6 rounded-xl shadow-2xl z-50 border
              ${theme.surface || 'bg-black'}
              ${theme.border || 'border-green-500'}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Save Your Screen</h2>
                <button onClick={handleClose} className="text-gray-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border outline-none text-white placeholder-gray-400
                      ${theme.surfaceHover || 'bg-gray-900'}
                      border-gray-600`}
                    placeholder="Enter screen title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border outline-none text-white placeholder-gray-400
                      ${theme.surfaceHover || 'bg-gray-900'}
                      border-gray-600`}
                    placeholder="Enter screen description"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm rounded-lg border text-gray-300 hover:bg-gray-800 border-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-opacity
                    ${theme.accent || 'bg-green-600 text-white'} hover:opacity-80`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveScreen;
