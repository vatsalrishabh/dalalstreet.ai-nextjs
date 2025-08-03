import React, { useState } from 'react';
import { Settings, ChevronDown, Check, Search, Save } from 'lucide-react';
import {Theme} from '@/components/tablet/theme';
import { updateSavedScreen } from '@/services/stockServices';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';
import { toast } from 'react-toastify';

type ColumnOption = {
  key: string;
  label: string;
};

type ColumnConfiguratorProps = {
  theme: Theme;
  show: boolean;
  toggle: () => void;
  columnOptions: ColumnOption[];
  visibleColumns: Record<string, boolean>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  loadingPreferences?: boolean;
};

const ColumnConfigurator: React.FC<ColumnConfiguratorProps> = ({
  theme,
  show,
  toggle,
  columnOptions,
  visibleColumns,
  setVisibleColumns,
  loadingPreferences = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const firebaseIdToken = useSelector((state: RootState) => state.auth.token);

  const filteredOptions = columnOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveColumns = async () => {
    if (!firebaseIdToken) {
      toast.error('❌ Please login to save column preferences');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    try {
      // Get selected column keys
      const selectedColumns = Object.entries(visibleColumns)
        .filter(([, isVisible]) => isVisible)
        .map(([key]) => key);

      console.log('Saving columns:', selectedColumns); // Debug log

      await updateSavedScreen(firebaseIdToken, selectedColumns);
      setSaveSuccess(true);
      toast.success('✅ Column preferences saved successfully!');
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        toggle();
        setSaveSuccess(false);
      }, 2000);
    } catch (error: unknown) {
      console.error('Error saving column preferences:', error);
      
      // Provide more specific error messages
      let errorMessage = '❌ Failed to save column preferences';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { status?: number } }).response;
        if (response?.status === 401) {
          errorMessage = '❌ Please login again to save preferences';
        } else if (response?.status === 404) {
          errorMessage = '❌ Save feature not available yet';
        } else if (response?.status && response.status >= 500) {
          errorMessage = '❌ Server error, please try again later';
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: string }).message;
        if (message?.includes('Network Error')) {
          errorMessage = '❌ Network error, please check your connection';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCount = Object.values(visibleColumns).filter(Boolean).length;

  const handleSelectAll = () => {
    const newVisibleColumns = { ...visibleColumns };
    Object.keys(newVisibleColumns).forEach(key => {
      newVisibleColumns[key] = true;
    });
    setVisibleColumns(newVisibleColumns);
  };

  const handleClearAll = () => {
    const newVisibleColumns = { ...visibleColumns };
    Object.keys(newVisibleColumns).forEach(key => {
      newVisibleColumns[key] = false;
    });
    // Keep name column always visible
    newVisibleColumns.name = true;
    setVisibleColumns(newVisibleColumns);
  };

  return (
    <div className="flex justify-end mb-6">
      <div className="relative">
        <button
          onClick={toggle}
          disabled={loadingPreferences}
          className={`flex items-center gap-2 px-4 py-2 ${theme.accent} rounded-xl text-sm font-medium transition-colors hover:opacity-80 ${
            loadingPreferences ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Settings className="w-4 h-4" />
          {loadingPreferences ? 'Loading...' : 'Configure Columns'}
          <ChevronDown className="w-4 h-4" />
        </button>

        {show && (
          <div
            className={`absolute right-0 top-full mt-2 w-80 ${theme.surface} ${theme.border} border rounded-xl shadow-2xl z-10`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Select Columns</h3>
                <span className="text-xs text-gray-500">
                  {selectedCount} selected
                </span>
              </div>

              {/* Search Box */}
              <div className="relative mb-3">
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search columns..."
                  className="pl-8 pr-2 py-1.5 w-full rounded-md border border-gray-300 text-sm bg-white text-black focus:outline-none"
                />
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                {/* Select All / Clear All buttons */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={handleSelectAll}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {filteredOptions.length > 0 ? (
                  filteredOptions.map(option => (
                    <label
                      key={option.key}
                      className={`flex items-center gap-3 cursor-pointer hover:${theme.surfaceHover} p-2 rounded-lg transition-colors`}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={visibleColumns[option.key]}
                          onChange={(e) =>
                            setVisibleColumns(prev => ({
                              ...prev,
                              [option.key]: e.target.checked
                            }))
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
                            visibleColumns[option.key]
                              ? 'bg-emerald-500 border-emerald-500'
                              : `border-gray-500 ${theme.surfaceHover}`
                          }`}
                        >
                          {visibleColumns[option.key] && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No columns found.</p>
                )}
              </div>

              {/* Save Button */}
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={toggle}
                  className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveColumns}
                  disabled={isSaving || selectedCount === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    saveSuccess
                      ? 'bg-green-600 text-white'
                      : isSaving || selectedCount === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {saveSuccess 
                    ? 'Saved!' 
                    : isSaving 
                    ? 'Saving...' 
                    : 'Save Columns'
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnConfigurator;
